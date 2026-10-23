import { 
  Connection, 
  Keypair, 
  Transaction, 
  SystemProgram, 
  ComputeBudgetProgram, 
  clusterApiUrl, 
  sendAndConfirmTransaction 
} from "@solana/web3.js";
import * as fs from "fs";
import * as os from "os";

async function main() {
  console.log("=== Неделя 11: Оптимизация Compute Budget и Priority Fee ===");
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const keypairPath = `${os.homedir()}/.config/solana/id.json`;
  const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  const sender = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  const recipient = Keypair.generate();

  // 1. Ограничиваем лимит Compute Units под размер инструкции (экономит затраты ресурсов)
  const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
    units: 1000,
  });

  // 2. Устанавливаем приоритетную комиссию (Micro-lamports за CU) для защиты от зависания
  const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 25000,
  });

  // 3. Получаем минимальный баланс для освобождения от аренды (Rent Exemption)
  const rentExemptBalance = await connection.getMinimumBalanceForRentExemption(0);

  const transferTx = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient.publicKey,
    lamports: rentExemptBalance,
  });

  const transaction = new Transaction()
    .add(modifyComputeUnits)
    .add(addPriorityFee)
    .add(transferTx);

  console.log("Отправка оптимизированной транзакции...");
  const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

  console.log("Транзакция успешно подтверждена с кастомным Compute Budget!");
  console.log(`Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

main().catch(console.error);
