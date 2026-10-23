import { createJupiterApiClient } from "@jup-ag/api";
import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import * as os from "os";

async function main() {
  console.log("=== Интеграция DeFi: Jupiter DEX Aggregator ===");
  const jupiterQuoteApi = createJupiterApiClient();

  // Параметры обмена: SOL -> USDC
  const inputMint = "So11111111111111111111111111111111111111112"; // Wrapped SOL
  const outputMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
  const amount = 10000000; // 0.01 SOL

  console.log("Запрос оптимального маршрута котировки (Jupiter Quote API)...");
  const quote = await jupiterQuoteApi.quoteGet({
    inputMint,
    outputMint,
    amount,
    slippageBps: 50,
  });

  console.log("Маршрут успешно построен:");
  console.log(`- Входной объём: ${amount / 1e9} SOL`);
  console.log(`- Ожидаемый объём: ${(Number(quote.outAmount) / 1e6).toFixed(4)} USDC`);
  console.log(`- Задействовано пулов в маршруте: ${quote.routePlan.length}`);

  // Получаем адрес локального кошелька для сборки транзакции
  const keypairPath = `${os.homedir()}/.config/solana/id.json`;
  const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  const wallet = Keypair.fromSecretKey(Uint8Array.from(secretKey));

  const swapResult = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: quote,
      userPublicKey: wallet.publicKey.toBase58(),
      dynamicComputeUnitLimit: true,
    },
  });

  console.log("\nТранзакция свопа готова к отправке (сериализованный вид):");
  console.log(swapResult.swapTransaction.slice(0, 80) + "... [Truncated]");
}

main().catch(console.error);
