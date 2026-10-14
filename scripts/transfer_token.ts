import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import * as fs from "fs";
import * as os from "os";

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const keypairPath = `${os.homedir()}/.config/solana/id.json`;
  const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  const sender = Keypair.fromSecretKey(Uint8Array.from(secretKey));

  const mint = new PublicKey("H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh");
  const recipient = Keypair.generate();

  console.log("Отправитель:", sender.publicKey.toBase58());
  console.log("Получатель:", recipient.publicKey.toBase58());

  const senderAta = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    sender.publicKey
  );

  const recipientAta = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    recipient.publicKey
  );

  const signature = await transfer(
    connection,
    sender,
    senderAta.address,
    recipientAta.address,
    sender,
    500 * 10 ** 9
  );

  console.log("Успешный перевод токенов! Сигнатура транзакции:");
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

main().catch(console.error);
