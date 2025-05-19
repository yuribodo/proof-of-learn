import { connect, Contract, keyStores, Near } from "near-api-js";
import { contractConfig } from "../config";

interface RoadmapNFTContract extends Contract {
	mintWithProof: (args: {
		roadmapId: number;
		a: [string, string];
		b: [[string, string], [string, string]];
		c: [string, string];
		tokenURI: string;
	}) => Promise<any>;
	hasMinted: (args: {
		accountId: string;
		roadmapId: number;
	}) => Promise<boolean>;
	updateVerifier: (args: { newVerifierAddress: string }) => Promise<void>;
}

let near: Near;
let contract: RoadmapNFTContract;

export async function initializeContract() {
	const keyStore = new keyStores.InMemoryKeyStore();

	const nearConfig = {
		networkId: contractConfig.near.networkId,
		nodeUrl: contractConfig.near.nodeUrl,
		keyStore,
		walletUrl: contractConfig.near.walletUrl,
		helperUrl: contractConfig.near.helperUrl,
		explorerUrl: contractConfig.near.explorerUrl,
	};

	near = await connect(nearConfig);
	const account = await near.account(contractConfig.near.contractAccountId);

	contract = new Contract(account, contractConfig.near.contractAccountId, {
		viewMethods: ["hasMinted"], // View methods from your contract
		changeMethods: ["mintWithProof", "updateVerifier"], // Change methods from your contract
	}) as RoadmapNFTContract;

	return { contract, account };
}

// Example of how to use the contract methods
export async function mintNFT(
	roadmapId: number,
	proof: {
		a: [string, string];
		b: [[string, string], [string, string]];
		c: [string, string];
	},
	tokenURI: string
) {
	if (!contract) {
		await initializeContract();
	}
	return await contract.mintWithProof({
		roadmapId,
		a: proof.a,
		b: proof.b,
		c: proof.c,
		tokenURI,
	});
}
