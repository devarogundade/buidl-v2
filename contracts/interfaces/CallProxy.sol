// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface CallProxy {
    function anyCall(
        address _to,
        bytes calldata _data,
        uint256 _toChainID,
        uint256 _flags,
        bytes calldata _extdata
    ) external payable;

    function context()
        external
        view
        returns (address from, uint256 fromChainID, uint256 nonce);

    function executor() external view returns (address executor);
}
