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
	const gifs = new Set([3, 4, 8, 10]);

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
				post_url: `${NEXT_PUBLIC_URL}/api/images?slide=` + (slideNum - 1),
			})
		);
	}

	let nextSlide: number;

	if (slideNum == 9 && message?.button == 2) {
		return new NextResponse(
			getFrameHtmlResponse({
				buttons: [
					{
						label: "Claim it!",
					},
				],
				image: `${NEXT_PUBLIC_URL}/10.gif`,
				post_url: `${NEXT_PUBLIC_URL}/api/mint`,
			})
		);
	}

	if (slideNum == 0 && message?.button == 1) nextSlide = slideNum;
	else nextSlide = message?.button == 2 ? slideNum + 1 : slideNum - 1;

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
			image: `${NEXT_PUBLIC_URL}/${nextSlide}.${
				gifs.has(nextSlide) ? "gif" : "jpg"
			}`,
			post_url: `${NEXT_PUBLIC_URL}/api/images?slide=` + nextSlide,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
