import mint from "@/app/lib/mint";
import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
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

	const accountAddress: string | undefined =
		message.interactor.verified_accounts[0];

	const already_minted = await kv.get("account:" + accountAddress);

	if (already_minted || !accountAddress) {
		return new NextResponse(
			getFrameHtmlResponse({
				buttons: [
					{
						label: already_minted
							? "You have already minted it!"
							: "You have to connect your wallet",
					},
				],
				image: `${NEXT_PUBLIC_URL}/error.jpg`,
				post_url: `${NEXT_PUBLIC_URL}/api/images?slide=0`,
			})
		);
	}

	const tokenId = Math.round(Math.random() * 5 + 1);

	const storage_success = await kv.set("account:" + accountAddress, true);

	if (!storage_success) {
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

	const tx_success = await mint(accountAddress, tokenId);

	if (!tx_success) {
		await kv.del(accountAddress);

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

	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "Successfully claimed!",
				},
			],

			image: `${NEXT_PUBLIC_URL}/nfts/${tokenId}.jpg`,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
