// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {AnycallCollection} from "./AnycallCollection.sol";

contract AnyCallReceiver {
    AnycallCollection private _collection;

    constructor(address collection) {
        _collection = AnycallCollection(collection);
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

        _collection.execute(
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
}
