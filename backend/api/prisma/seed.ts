import { prismaClient } from "../lib/prismaClient";

async function main() {
	await prismaClient.users.deleteMany();


}

main()
	.then(async () => {
		await prismaClient.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prismaClient.$disconnect();
		process.exit(1);
	});
