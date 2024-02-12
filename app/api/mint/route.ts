import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "The mint is over!",
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
