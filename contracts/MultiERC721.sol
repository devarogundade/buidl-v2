// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MultiERC721 is ERC721 {
    address private _creator;

    uint256 tokenID = 0;
    using Strings for uint256;

    mapping(uint256 => string) private tokenURIs;
    string private baseURIextended;

    uint private _primaryChain;
    uint[] public _supportedChains;

    // keeps track of each nft current chain
    mapping(uint => uint) public currentChains;

    constructor(
        string memory name,
        string memory symbol,
        uint[] memory supportedChains,
        uint primaryChain,
        address creator
    ) ERC721(name, symbol) {
        _creator = creator;
        _primaryChain = primaryChain;
        _supportedChains = supportedChains;
    }

    function getCreator() public view returns (address) {
        return _creator;
    }

    function mint(string memory uri, address to) public returns (uint) {
        tokenID++;
        _mint(to, tokenID);
        _setTokenURI(tokenID, uri);
        return tokenID;
    }

    function holderOf(uint256 tokenId) public view returns (address) {
        return _ownerOf(tokenId);
    }

    function isChainSupported(uint destChain) public view returns (bool) {
        for (uint index = 0; index < _supportedChains.length; index++) {
            if (_supportedChains[index] == destChain) {
              return true;
            }
        }
        return false;
    }

    function setBaseURI(string memory baseURI) external onlyCreator {
        baseURIextended = baseURI;
    }

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        require(_exists(tokenId), "!exist");
        tokenURIs[tokenId] = _tokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURIextended;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "!exist");

        string memory _tokenURI = tokenURIs[tokenId];
        string memory base = _baseURI();

        // if there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        // if both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        // if there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    modifier onlyCreator() {
        require(msg.sender == _creator, "only owner can call this method");
        _;
    }
}
