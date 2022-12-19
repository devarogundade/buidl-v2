// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {MultiERC721} from "./MultiERC721.sol";
import {Events} from "./libraries/Events.sol";
import {CallProxy} from "./interfaces/CallProxy.sol";

contract AnycallCollection {
    address private _deployer;
    uint private _thisChainId;

    // anycall contracts
    address public _anycallcontract;

    // network id => receivers contract
    mapping(uint => address) public receivers;

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
        address creator;
    }

    constructor(address anycallcontract, uint chainId) {
        _thisChainId = chainId;
        _anycallcontract = anycallcontract;
        _deployer = msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function createCollection(
        string memory name,
        string memory symbol,
        uint[] memory supportedChains,
        string memory cover,
        string memory avatar
    ) public {
        MultiERC721 nft = new MultiERC721(
            name,
            symbol,
            cover,
            avatar,
            supportedChains,
            _thisChainId,
            msg.sender
        );

        // set the nft source address
        address contractAddress = address(nft);

        nft.setSourceAddress(contractAddress);
        nftMaps[contractAddress] = contractAddress;

        collections[contractAddress] = Collection(
            collections[contractAddress].whiteList,
            collections[contractAddress].blackList,
            false,
            0,
            _thisChainId,
            nft.creator()
        );

        emit Events.ArtCollection(
            // metadata
            nft.name(),
            nft.symbol(),
            nft.cover(),
            nft.avatar(),
            // addresses
            nft.creator(),
            contractAddress,
            // sorting
            collections[contractAddress].whiteList,
            collections[contractAddress].blackList,
            false,
            0, // mintPrice
            // chains
            _thisChainId,
            nft.supportedChains()
        );
    }

    function updateCollection(
        address[] memory whiteList,
        address[] memory blackList,
        bool isWhiteSystem,
        uint256 mintPrice,
        address contractAddress
    ) public {
        MultiERC721 nft = MultiERC721(contractAddress);
        require(msg.sender == nft.creator(), "Unathorized");

        collections[contractAddress] = Collection(
            whiteList,
            blackList,
            isWhiteSystem,
            mintPrice,
            _thisChainId,
            nft.creator()
        );

        emit Events.ArtCollection(
            // metadata
            nft.name(),
            nft.symbol(),
            nft.cover(),
            nft.avatar(),
            // addresses
            nft.creator(),
            address(nft),
            // sorting
            whiteList,
            blackList,
            isWhiteSystem,
            mintPrice,
            // chains
            _thisChainId,
            nft.supportedChains()
        );
    }

    function mint(string memory uri, address contractAddress) public payable {
        MultiERC721 nft = MultiERC721(contractAddress);

        // middleware
        require(
            msg.sender == nft.creator(),
            "Only creator can call this method"
        );

        // mint nft
        uint tokenID = nft.mint(uri, msg.sender, 0, new uint[](0));

        emit Events.ArtItem(
            // id
            tokenID,
            // addresses
            msg.sender,
            address(nft),
            // chain
            _thisChainId
        );
    }

    function buy(address contractAddress) public payable {
        MultiERC721 nft = MultiERC721(contractAddress);
        Collection memory collection = collections[contractAddress];

        require(
            msg.sender != nft.creator(),
            "Only non creator can call this method"
        );

        require(msg.value >= collection.mintPrice, "Insuficient Mint Amount");

        if (collection.isWhiteSystem) {
            bool eligible = _isEligble(
                msg.sender,
                collection.whiteList,
                collection.blackList
            );
            require(eligible, "You're not eligible");
        }
    }

    function bridge(
        uint tokenID,
        address contractAddress,
        uint receiverChainId
    ) payable external {
        MultiERC721 nft = MultiERC721(contractAddress);

        require(
            nft.isChainSupported(receiverChainId),
            "unsupported destination chain"
        );

        require(
            msg.sender == nft.holderOf(tokenID),
            "you cant bridge this token"
        );

        bytes memory data = abi.encode(
            nft.sourceAddress(),
            nft.tokenURI(tokenID),
            nft.name(), // related for non existing nft
            nft.symbol(), // related for non existing nft
            nft.supportedChains(), // related for non existing nft
            nft.creator(), // related for non existing nft
            tokenID,
            nft.holderOf(tokenID),
            nft.history(tokenID),
            nft.cover(),
            nft.avatar()
        );

        require(
            receivers[receiverChainId] != address(0),
            "Add this destination chain receiver's address"
        );

        // cross-chain message to mint same token
        // on destination chain
        CallProxy(_anycallcontract).anyCall{value: msg.value}(
            // _to chain contract
            receivers[receiverChainId],
            // sending the encoded bytes of the string uri and decode on the destination chain
            data,
            // _to chain id
            receiverChainId,
            // using 0 flag to pay fee on the source chain without fallback
            0,
            // extras,
            ""
        );

        // burn token on originated chain
        nft.burn(tokenID);
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
            address holder,
            uint[] memory history,
            string memory cover,
            string memory avatar
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
                    address,
                    uint[],
                    string,
                    string
                )
            );

        execute(
            sourceAddress,
            uri,
            name,
            symbol,
            supportedChains,
            creator,
            tokenID,
            holder,
            history,
            cover,
            avatar
        );

        success = true;
        result = "";
    }

    function execute(
        address sourceAddress,
        string memory uri,
        string memory name, // related for non existing nft
        string memory symbol, // related for non existing nft
        uint[] memory supportedChains, // related for non existing nft
        address creator, // related for non existing nft
        uint256 tokenID,
        address holder,
        uint[] memory history,
        string memory cover,
        string memory avatar
    ) public onlyReceiver {
        bool existing = nftMaps[sourceAddress] != address(0);

        MultiERC721 nft;

        if (existing) {
            nft = MultiERC721(nftMaps[sourceAddress]);
        } else {
            nft = new MultiERC721(
                name,
                symbol,
                cover,
                avatar,
                supportedChains,
                _thisChainId,
                creator
            );

            // set the nft source address
            nft.setSourceAddress(sourceAddress);
            nftMaps[sourceAddress] = address(nft);
        }

        nft.mint(uri, holder, tokenID, history);
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
        receivers[chainId] = contractAddress;
    }

    modifier onlyDeployer() {
        require(msg.sender == _deployer, "only owner can call this method");
        _;
    }

    modifier onlyReceiver() {
        require(true, "Only executor can call this method");
        _;
    }
}
