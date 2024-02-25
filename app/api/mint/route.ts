import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	// return new NextResponse(
	// 	getFrameHtmlResponse({
	// 		buttons: [
	// 			{
	// 				label: "Mint is over!",
	// 			},
	// 			{
	// 				label: "Check collection",
	// 				action: "link",
	// 				target: `https://opensea.io/collection/one-day-gorillas`,
	// 			},
	// 		],
	// 		image: `${NEXT_PUBLIC_URL}/end.png`,
	// 	})
	// );

	const body: FrameRequest = await req.json();

	const { isValid, message } = await getFrameMessage(body, {
		neynarApiKey: "NEYNAR_ONCHAIN_KIT",
	});

	if (!isValid) {
		return new NextResponse(
			getFrameHtmlResponse({
				buttons: [
					{
						label: "Something went wrong. But you may retry!",
					},
				],
				image: `${NEXT_PUBLIC_URL}/error.jpg`,
				post_url: `${NEXT_PUBLIC_URL}/api/mint`,
			})
		);
	}

	const tokenId = Math.round(Math.random() * 5 + 1);

	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "🦍 🍌 🔵",
					action: "link",
					target: `https://zora.co/collect/zora:0x7e35caf6abc257b5be0fbe7ef085807fd282c6ef/${tokenId}`,
				},
			],
			image: {
				src: `${NEXT_PUBLIC_URL}/nfts/${tokenId}.gif`,
				aspectRatio: "1:1",
			},
			postUrl: `https://zora.co/collect/zora:0x7e35caf6abc257b5be0fbe7ef085807fd282c6ef/${tokenId}`,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
