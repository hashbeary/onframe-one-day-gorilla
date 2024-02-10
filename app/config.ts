import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import Gorillas from "./abi/Gorillas.json";
require("dotenv").config({ path: ".env.local" });

export const NEXT_PUBLIC_URL = "https://onframe-one-day-gorilla.vercel.app";
export const WALLET_KEY = process.env.WALLET_KEY;
export const MINTER = privateKeyToAccount(WALLET_KEY as `0x${string}`);
export const PROVIDER_URL = process.env.PROVIDER_URL;
export const CONTRACT_ADDRESS = "0xc61D94302C0BD19b944c80162D84B8C19a4673d4";
export const CHAIN = sepolia;
export const ABI = Gorillas.abi;
