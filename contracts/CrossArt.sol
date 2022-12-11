// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {MultiERC721} from "./MultiERC721.sol";
import {Events} from "./libraries/Events.sol";
import {CallProxy} from "./interfaces/CallProxy.sol";

contract CrossArt {
    address private _deployer;
    uint private _thisChainId;

    // anycall contracts mapped to chainId
    address public _anycallcontract;

    // destinations contract
    mapping(uint => address) public destinations;

    // creator => nft contract addresses
    mapping(address => address[]) public creators;

    // nft contract address => collection metadata
    mapping(address => Collection) public collections;

    // mapping nft source chain address to this chain address
    mapping(address => address) private nftMaps;

    struct Collection {
        address[] whiteList;
        address[] blackList;
        bool isWhiteSystem;
        uint256 mintPrice;
        uint chainId;
        string cover;
        string avatar;
    }

    receive() external payable {}

    fallback() external payable {}

    constructor(address anycallcontract, uint chainId) {
        _anycallcontract = anycallcontract;
        _thisChainId = chainId;
        _deployer = msg.sender;
    }

    function deploy(
        string memory name,
        string memory symbol,
        uint[] memory supportedChains,
        address[] memory whiteList,
        address[] memory blackList,
        bool isWhiteSystem,
        uint256 mintPrice,
        string memory cover,
        string memory avatar
    ) public {
        MultiERC721 nft = new MultiERC721(
            name,
            symbol,
            supportedChains,
            _thisChainId,
            msg.sender
        );

        // set the nft source address
        nft.setSourceAddress(address(nft));

        nftMaps[address(nft)] = address(nft);

        collections[address(nft)] = Collection(
            whiteList,
            blackList,
            isWhiteSystem,
            mintPrice,
            _thisChainId,
            cover,
            avatar
        );

        emit Events.NftDeployed(
            address(nft),
            supportedChains,
            msg.sender,
            _thisChainId
        );
    }

    function mint(string memory uri, address contractAddress) public payable {
        MultiERC721 nft = MultiERC721(contractAddress);
        Collection memory collection = collections[contractAddress];

        if (msg.sender != nft.getCreator()) {
            require(
                msg.value >= collection.mintPrice,
                "Insuficient Mint Amount"
            );

            if (collection.isWhiteSystem) {
                bool eligible = _isEligble(
                    msg.sender,
                    collection.whiteList,
                    collection.blackList
                );
                require(eligible, "You're not eligible");
            }
        }

        uint tokenID = nft.mint(uri, msg.sender, 0);

        emit Events.NftMinted(contractAddress, tokenID);
    }

    function bridge(
        uint tokenID,
        address contractAddress,
        uint destinationChainId
    ) public payable {
        MultiERC721 nft = MultiERC721(contractAddress);
        require(
            nft.isChainSupported(destinationChainId),
            "unsupported destination chain"
        );

        require(
            msg.sender == nft.holderOf(tokenID),
            "you cant bridge this token"
        );

        bytes memory data = abi.encode(
            nft.getSourceAddress(),
            nft.tokenURI(tokenID),
            nft.getName(), // related for non existing nft
            nft.getSymbol(), // related for non existing nft
            nft.getSupportedChains(), // related for non existing nft
            nft.getCreator(), // related for non existing nft
            tokenID,
            nft.holderOf(tokenID)
        );

        // burn token on originated chain
        nft.burn(tokenID);

        // cross-chain message to mint same token
        // on destination chain
        CallProxy(_anycallcontract).anyCall{value: msg.value}(
            destinations[destinationChainId],
            // sending the encoded bytes of the string uri and decode on the destination chain
            data,
            destinationChainId,
            // Using 0 flag to pay fee on the source chain
            0,
            ""
        );
    }

    function anyExecute(
        bytes memory _data
    ) external returns (bool success, bytes memory result) {
        (
            address sourceAddress,
            string memory uri,
            string memory name, // related for non existing nft
            string memory symbol, // related for non existing nft
            uint[] memory supportedChains, // related for non existing nft
            address creator, // related for non existing nft
            uint256 tokenID,
            address holder
        ) = abi.decode(
                _data,
                (
                    address,
                    string,
                    string,
                    string,
                    uint[],
                    address,
                    uint256,
                    address
                )
            );

        bool existing = nftMaps[sourceAddress] != address(0);

        MultiERC721 nft;

        if (existing) {
            nft = MultiERC721(nftMaps[sourceAddress]);
        } else {
            nft = new MultiERC721(
                name,
                symbol,
                supportedChains,
                _thisChainId,
                creator
            );

            // set the nft source address
            nft.setSourceAddress(sourceAddress);
            nftMaps[sourceAddress] = address(nft);
        }

        nft.mint(uri, holder, tokenID);

        success = true;
        result = "";
    }

    function _isEligble(
        address minter,
        address[] memory whiteList,
        address[] memory blackList
    ) private pure returns (bool) {
        for (uint index = 0; index < blackList.length; index++) {
            if (minter == blackList[index]) {
                return false;
            }
        }
        for (uint index = 0; index < whiteList.length; index++) {
            if (minter == whiteList[index]) {
                return true;
            }
        }
        return false;
    }

    function addChain(
        uint chainId,
        address contractAddress
    ) public onlyDeployer {
        destinations[chainId] = contractAddress;
    }

    event Desposit(address account, uint256 amount);

    modifier onlyDeployer() {
        require(msg.sender == _deployer, "only owner can call this method");
        _;
    }
}
