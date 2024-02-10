import { createPublicClient, createWalletClient, http } from "viem";
import { ABI, CHAIN, CONTRACT_ADDRESS, MINTER, PROVIDER_URL } from "../config";

require("dotenv").config();

const nftOwnerClient = createWalletClient({
	account: MINTER,
	chain: CHAIN,
	transport: http(PROVIDER_URL as string),
});

const publicClient = createPublicClient({
	chain: CHAIN,
	transport: http(PROVIDER_URL as string),
});

export default async function mint(to: string, id: number) {
	const { request } = await publicClient.simulateContract({
		account: MINTER,
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "mintTo",
		args: [to, id],
	});
	return await nftOwnerClient.writeContract(request);
}
