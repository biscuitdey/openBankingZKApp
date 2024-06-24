import { ed25519 } from "@noble/curves/ed25519";
import * as circomlib from "circomlibjs";
import * as crypto from "crypto";

export async function createKeypair(): Promise<{
  privateKey: string;
  publicKey: string;
}> {
  const eddsa = await circomlib.buildEddsa();
  const babyJub = await circomlib.buildBabyjub();
  const privateKey = ed25519.utils.randomPrivateKey();
  const eddsaPrivateKey = Buffer.from(privateKey).toString("hex");
  const publicKeyPoints = eddsa.prv2pub(privateKey);
  const packedPublicKey = babyJub.packPoint(publicKeyPoints);
  const eddsaPublicKey = Buffer.from(packedPublicKey).toString("hex");

  return { privateKey: eddsaPrivateKey, publicKey: eddsaPublicKey };
}

export async function createSignature(
  payload: {
    name: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
  },
  privateKey: string
): Promise<string> {
  const hashedPayload = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest();

  const eddsa = await circomlib.buildEddsa();
  const babyJub = await circomlib.buildBabyjub();
  const packedPrivateKey = new Uint8Array(Buffer.from(privateKey, "hex"));
  const eddsaSignature = eddsa.signPedersen(packedPrivateKey, hashedPayload);
  const packedSignature = eddsa.packSignature(eddsaSignature);
  const signature = Buffer.from(packedSignature).toString("hex");

  return signature;
}
