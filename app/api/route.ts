import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	const body: FrameRequest = await req.json();
	const slideNum: number = Number(
		new URLSearchParams(new URL(req.url).search).get("slide")
	);
	let accountAddress: string = "";

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
				image: `${NEXT_PUBLIC_URL}/error.png`,
				post_url: `${NEXT_PUBLIC_URL}/api?slide=` + (slideNum - 1),
			})
		);
	}

	accountAddress = message.interactor.verified_accounts[0];

	let next: number;

	if (slideNum == 10 && message?.button == 2) {
		return new NextResponse(
			// getFrameHtmlResponse({
			// 	buttons: [
			// 		{
			// 			label: "Mint",
			// 			action: "mint" as "post" | "post_redirect" | undefined,
			// 			target:
			// 		},
			// 	],
			// 	image: `${NEXT_PUBLIC_URL}/${next}.png`,
			// 	post_url: `${NEXT_PUBLIC_URL}/api?slide=` + next,
			// })
			`<!DOCTYPE html><html><head><meta property="fc:frame:button:1" content="Mint" />
			<meta property="fc:frame:button:1:action" content="mint" />
			<meta property="fc:frame:button:1:target" content="eip155:11155111:0x2026E58bFdaF3eAd9E9a469F479DB0f8F13EFD44<:token_id>"><meta property="fc:frame:image" content=${NEXT_PUBLIC_URL}/error.png" /><meta property="fc:frame" content="vNext" /></head></html>`
		);
	}
	if (slideNum == 0 && message?.button == 1) next = slideNum;
	else next = message?.button == 2 ? slideNum + 1 : slideNum - 1;

	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "⬅️",
				},
				{
					label: "➡️",
				},
			],
			image: `${NEXT_PUBLIC_URL}/${next}.png`,
			post_url: `${NEXT_PUBLIC_URL}/api?slide=` + next,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
