import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "./config";

const frameMetadata = getFrameMetadata({
	buttons: [
		{
			label: "⬅️",
		},
		{
			label: "➡️",
		},
	],
	image: `${NEXT_PUBLIC_URL}/0.jpg`,
	post_url: `${NEXT_PUBLIC_URL}/api/images`,
});

export const metadata: Metadata = {
	title: "Onframe This Gorilla Will Die In 1 Day",
	description: "Onframe This Gorilla Will Die In 1 Day",
	openGraph: {
		title: "Onframe This Gorilla Will Die In 1 Day",
		description: "Onframe This Gorilla Will Die In 1 Day",
		images: [`${NEXT_PUBLIC_URL}/0.jpg`],
	},
	other: {
		...frameMetadata,
	},
};

export default async function Page() {
	return (
		<>
			<h1>Onframe This Gorilla Will Die In 1 Day</h1>
		</>
	);
}
