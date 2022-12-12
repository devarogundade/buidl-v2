// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

library Events {
    event ArtCollection(
        // metadata
        string name,
        string symbol,
        string cover,
        string avatar,

        // addresses
        address creator,
        address contractAddress,

        // sorting
        address[] whiteList,
        address[] blackList,
        bool isWhiteSystem,
        uint256 mintPrice,

        // chains
        uint chainId,
        uint[] supportedChains
    );
    event ArtItem(
        // id
        uint tokenID,

        // addresses
        address owner,
        address contractAddress,

        // chain
        uint chainId
    );
}
