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

    mapping(address => address) private nftMaps;

    receive() external payable {}

    fallback() external payable {}

    constructor(address anycallcontract) {
        _anycallcontract = anycallcontract;
        _deployer = msg.sender;
    }

    function deploy(
        string memory name,
        string memory symbol,
        uint[] memory supportedChains
    ) public payable {
        MultiERC721 nft = new MultiERC721(
            name,
            symbol,
            supportedChains,
            _thisChainId,
            msg.sender
        );

        mint("", address(nft));

        emit Events.NftDeployed(
            address(nft),
            supportedChains,
            msg.sender,
            _thisChainId
        );
    }

    function mint(string memory uri, address contractAddress) public {
        MultiERC721 nft = MultiERC721(contractAddress);
        require(nft.getCreator() == msg.sender, "you cant mint this token");
        uint tokenID = nft.mint(uri, msg.sender);

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

        string memory uri = nft.tokenURI(tokenID);
        string memory data = uri;

        CallProxy(_anycallcontract).anyCall{value: msg.value}(
            destinations[destinationChainId],
            // sending the encoded bytes of the string uri and decode on the destination chain
            abi.encode(data),
            destinationChainId,
            // Using 0 flag to pay fee on the source chain
            0,
            ""
        );
    }

    function anyExecute(
        bytes memory _data
    ) external returns (bool success, bytes memory result) {
        // string memory data = abi.decode(_data, (string));
        // string memory uri = data;

        // address sourceContractAddress;
        // bool exists = address(0) != nftMaps[sourceContractAddress];

        uint[] memory sc;

        // if (!exists) {
        MultiERC721 nft = new MultiERC721("Sample", "SMP", sc, 1, address(0));

        // sourceContractAddress = address(nft);
        // }

        success = true;
        result = "";
    }

    function addChain(
        uint chainId,
        address contractAddress
    ) public onlyDeployer {
        destinations[chainId] = contractAddress;
    }

    modifier onlyDeployer() {
        require(msg.sender == _deployer, "only owner can call this method");
        _;
    }
}
