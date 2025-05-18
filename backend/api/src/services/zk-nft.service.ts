import * as snarkjs from "snarkjs";
import { mintNFT } from "./contract.service";

interface ProofInput {
	score: number;
	threshold: number;
}

interface ZKProof {
	a: [string, string];
	b: [[string, string], [string, string]];
	c: [string, string];
}

interface PlonkProof {
	pi_a: string[];
	pi_b: string[][];
	pi_c: string[];
}

export async function generateAndMintNFT(
	userAddress: string,
	score: number,
	roadmapId: number
) {
	if (score < 90) {
		throw new Error("Score must be at least 90% to mint NFT");
	}

	// Generate ZK proof
	const proof = await generateProof({ score, threshold: 90 });

	// Call contract to mint NFT
	const tokenURI = `https://your-metadata-url.com/roadmap-${roadmapId}.json`;

	return await mintNFT(roadmapId, proof, tokenURI);
}

async function generateProof(input: ProofInput): Promise<ZKProof> {
	// Load the circuit and proving key
	const result = await snarkjs.plonk.fullProve(
		{ score: input.score, threshold: input.threshold },
		"circuits/score_verification.circom",
		"circuits/score_verification.zkey"
	);

	const proof = result.proof as unknown as PlonkProof;

	return {
		a: proof.pi_a.slice(0, 2) as [string, string],
		b: [
			proof.pi_b[0].slice(0, 2) as [string, string],
			proof.pi_b[1].slice(0, 2) as [string, string],
		],
		c: proof.pi_c.slice(0, 2) as [string, string],
	};
}
