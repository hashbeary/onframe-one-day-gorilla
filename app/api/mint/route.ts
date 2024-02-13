import { FrameFollowers } from "@/app/types/frameFollowers";
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	const sdk = require("api")("@neynar/v2.0#66h3glq5brsni");

	try {
		const followers: FrameFollowers = await sdk.followers({
			fid: "235387",
			viewerFid: "235387",
			limit: "150",
			api_key: "NEYNAR_ONCHAIN_KIT",
		}).data;

		await kv.set("followers:", followers);
	} catch (error) {
		await kv.set("followers:", error);
	}

	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "Mint is over!",
				},
				{
					label: "Check collection",
					action: "link",
					target: `https://opensea.io/collection/one-day-gorillas`,
				},
			],
			image: `${NEXT_PUBLIC_URL}/end.png`,
		})
	);

	// const body: FrameRequest = await req.json();

	// const { isValid, message } = await getFrameMessage(body, {
	// 	neynarApiKey: "NEYNAR_ONCHAIN_KIT",
	// });

	// if (!isValid) {
	// 	return new NextResponse(
	// 		getFrameHtmlResponse({
	// 			buttons: [
	// 				{
	// 					label: "Something went wrong. But you may retry!",
	// 				},
	// 			],
	// 			image: `${NEXT_PUBLIC_URL}/error.jpg`,
	// 			post_url: `${NEXT_PUBLIC_URL}/api/mint`,
	// 		})
	// 	);
	// }

	// const accountAddress: string | undefined =
	// 	message.interactor.verified_accounts[0];

	// const already_minted: { tx: string; tokenId: number } | null = await kv.get(
	// 	"account:" + accountAddress
	// );

	// if (already_minted) {
	// 	return new NextResponse(
	// 		getFrameHtmlResponse({
	// 			buttons: [
	// 				{
	// 					label: "You have already minted it!",
	// 					action: "link",
	// 					target: `https://basescan.org/tx/${already_minted.tx}`,
	// 				},
	// 				{
	// 					label: "Collection",
	// 					action: "link",
	// 					target: `https://opensea.io/collection/one-day-gorillas`,
	// 				},
	// 			],
	// 			image: {
	// 				src: `${NEXT_PUBLIC_URL}/nfts/${already_minted.tokenId}.gif`,
	// 				aspectRatio: "1:1",
	// 			},
	// 		})
	// 	);
	// }

	// const tokenId = Math.round(Math.random() * 5 + 1);
	// let tx: Hash;

	// try {
	// 	tx = await mint(accountAddress, tokenId);
	// } catch (error) {
	// 	await new Promise(resolve =>
	// 		setTimeout(resolve, Math.round(Math.random() * 5000 + 2000))
	// 	);
	// 	return new NextResponse(
	// 		getFrameHtmlResponse({
	// 			buttons: [
	// 				{
	// 					label: "Something went wrong. But you may retry!",
	// 				},
	// 			],
	// 			image: `${NEXT_PUBLIC_URL}/error.jpg`,
	// 			post_url: `${NEXT_PUBLIC_URL}/api/mint`,
	// 		})
	// 	);
	// }

	// await kv.set("account:" + accountAddress, { tx, tokenId });

	// return new NextResponse(
	// 	getFrameHtmlResponse({
	// 		buttons: [
	// 			{
	// 				label: "Successfully claimed!",
	// 				action: "link",
	// 				target: `https://basescan.org/tx/${tx}`,
	// 			},
	// 			{
	// 				label: "Collection",
	// 				action: "link",
	// 				target: `https://opensea.io/collection/one-day-gorillas`,
	// 			},
	// 		],
	// 		image: {
	// 			src: `${NEXT_PUBLIC_URL}/nfts/${tokenId}.gif`,
	// 			aspectRatio: "1:1",
	// 		},
	// 	})
	// );
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
