// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./interfaces/IZKVerifier.sol";

contract RoadmapNFT is ERC721URIStorage {
    uint256 private _tokenIds;
    IZKVerifier public verifier;
    mapping(address => mapping(uint256 => bool)) public hasMinted;

    event NFTMinted(
        address indexed to,
        uint256 indexed roadmapId,
        uint256 tokenId
    );

    constructor(
        address verifierAddress
    ) ERC721("Roadmap Completion NFT", "RMNFT") {
        require(verifierAddress != address(0), "Invalid verifier address");
        verifier = IZKVerifier(verifierAddress);
    }

    function mintWithProof(
        uint256 roadmapId,
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        string memory tokenURI
    ) external returns (uint256) {
        require(
            !hasMinted[msg.sender][roadmapId],
            "Already minted for this roadmap"
        );
        require(verifier.verifyProof(a, b, c), "Invalid ZK proof");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        hasMinted[msg.sender][roadmapId] = true;

        emit NFTMinted(msg.sender, roadmapId, newTokenId);
        return newTokenId;
    }

    function updateVerifier(address newVerifierAddress) external {
        require(newVerifierAddress != address(0), "Invalid verifier address");
        verifier = IZKVerifier(newVerifierAddress);
    }
}
