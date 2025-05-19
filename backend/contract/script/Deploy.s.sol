// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/RoadmapNFT.sol";
import "../src/TestVerifier.sol";
contract DeployScript is Script {
    function run() public {
        // Get the private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("CONTRACT_PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the test verifier first
        TestVerifier verifier = new TestVerifier();
        console.log("TestVerifier deployed to:", address(verifier));

        // Deploy the RoadmapNFT contract with the verifier address
        RoadmapNFT nft = new RoadmapNFT(address(verifier));
        console.log("RoadmapNFT deployed to:", address(nft));

        vm.stopBroadcast();
    }
}
