// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/RoadmapNFT.sol";

contract MockVerifier is IZKVerifier {
    bool public shouldVerify;

    constructor(bool _shouldVerify) {
        shouldVerify = _shouldVerify;
    }

    function verifyProof(
        uint256[2] calldata,
        uint256[2][2] calldata,
        uint256[2] calldata
    ) external view override returns (bool) {
        return shouldVerify;
    }
}

contract RoadmapNFTTest is Test {
    RoadmapNFT nft;
    MockVerifier verifier;
    address user = address(1);
    uint256[2] a;
    uint256[2][2] b;
    uint256[2] c;
    string tokenURI = "ipfs://test-uri";

    function setUp() public {
        verifier = new MockVerifier(true);
        nft = new RoadmapNFT(address(verifier));
    }

    function testMintWithValidProof() public {
        vm.prank(user);
        uint256 tokenId = nft.mintWithProof(1, a, b, c, tokenURI);

        assertEq(nft.ownerOf(tokenId), user);
        assertEq(nft.tokenURI(tokenId), tokenURI);
        assertTrue(nft.hasMinted(user, 1));
    }

    function testMintFailsIfAlreadyMinted() public {
        vm.prank(user);
        nft.mintWithProof(1, a, b, c, tokenURI);

        vm.prank(user);
        vm.expectRevert("Already minted for this roadmap");
        nft.mintWithProof(1, a, b, c, tokenURI);
    }

    function testMintFailsIfProofInvalid() public {
        verifier = new MockVerifier(false);
        nft = new RoadmapNFT(address(verifier));

        vm.prank(user);
        vm.expectRevert("Invalid ZK proof");
        nft.mintWithProof(1, a, b, c, tokenURI);
    }

    function testUpdateVerifier() public {
        address newVerifier = address(42);
        nft.updateVerifier(newVerifier);
        assertEq(address(nft.verifier()), newVerifier);
    }
}
