import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import Gorillas from "./abi/Gorillas.json";
require("dotenv").config({ path: ".env.local" });

export const NEXT_PUBLIC_URL = "https://onframe-one-day-gorilla.vercel.app";
export const WALLET_KEY = process.env.WALLET_KEY;
export const MINTER = privateKeyToAccount(WALLET_KEY as `0x${string}`);
export const PROVIDER_URL = process.env.PROVIDER_URL;
export const CONTRACT_ADDRESS = "0x2026E58bFdaF3eAd9E9a469F479DB0f8F13EFD44";
export const CHAIN = sepolia;
export const ABI = Gorillas.abi;
