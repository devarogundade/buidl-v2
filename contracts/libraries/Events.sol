// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

library Events {
    event NftDeployed(
        address contractAddress,
        uint[] supportedChains,
        address creator,
        uint chainId
    );
    event NftMinted(address contractAddress, uint tokenID);
}
