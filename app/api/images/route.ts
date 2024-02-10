import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";

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
				post_url: `${NEXT_PUBLIC_URL}/api/images?slide=` + (slideNum - 1),
			})
		);
	}

	accountAddress = message.interactor.verified_accounts[0];

	let next: number;

	if (slideNum == 9 && message?.button == 2) {
		getFrameHtmlResponse({
			buttons: [
				{
					label: "Claim the NFT",
				},
			],
			image: `${NEXT_PUBLIC_URL}/10.png`,
			post_url: `${NEXT_PUBLIC_URL}/api/mint`,
		});
	}
	if (slideNum == 0 && message?.button == 1) next = slideNum;
	else next = message?.button == 2 ? slideNum + 1 : slideNum - 1;

	// TODO: Resize images

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
			post_url: `${NEXT_PUBLIC_URL}/api/images?slide=` + next,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
