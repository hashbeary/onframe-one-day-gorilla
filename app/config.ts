import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import Gorillas from "./abi/Gorillas.json";
require("dotenv").config({ path: ".env.local" });

export const NEXT_PUBLIC_URL = "https://onframe-one-day-gorilla.vercel.app";
export const WALLET_KEY = process.env.WALLET_KEY;
export const MINTER = privateKeyToAccount(WALLET_KEY as `0x${string}`);
export const PROVIDER_URL = process.env.PROVIDER_URL;
export const CONTRACT_ADDRESS = "0x305292F1672EA773bc4BE5D17bDECb0B8691fa77";
export const CHAIN = base;
export const ABI = Gorillas.abi;
