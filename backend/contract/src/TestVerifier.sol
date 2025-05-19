// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IZKVerifier.sol";

contract TestVerifier is IZKVerifier {
    function verifyProof(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c
    ) external pure override returns (bool) {
        // For testing purposes, always return true
        return true;
    }
}
