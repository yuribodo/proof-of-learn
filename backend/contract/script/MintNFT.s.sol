// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RoadmapNFT.sol";

contract MintNFTScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // load from .env or hardcoded safely
        address backendSigner = vm.envAddress("BACKEND_SIGNER_ADDRESS");

        new RoadmapNFT(backendSigner);

        vm.stopBroadcast();
    }
}

