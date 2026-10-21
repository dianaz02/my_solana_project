import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
  createNft, 
  mplTokenMetadata 
} from "@metaplex-foundation/mpl-token-metadata";
import { 
  keypairIdentity, 
  generateSigner, 
  percentAmount 
} from "@metaplex-foundation/umi";
import * as fs from "fs";
import * as os from "os";

async function main() {
  console.log("=== Неделя 10: Минт NFT через Metaplex Token Metadata ===");
  
  // 1. Инициализируем Umi для Devnet
  const umi = createUmi("https://api.devnet.solana.com");

  // 2. Загружаем локальный кошелек
  const keypairPath = `${os.homedir()}/.config/solana/id.json`;
  const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  const keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(secretKey));
  umi.use(keypairIdentity(keypair));
  umi.use(mplTokenMetadata());

  console.log("Создатель NFT (Signer):", keypair.publicKey);

  // 3. Генерируем адрес для самого NFT
  const nftSigner = generateSigner(umi);

  console.log("Отправка транзакции создания NFT...");
  const tx = await createNft(umi, {
    mint: nftSigner,
    name: "Solana Student Developer #1",
    symbol: "SSD",
    uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-syntax/tokens/tokens/assets/nft.json",
    sellerFeeBasisPoints: percentAmount(0),
  }).sendAndConfirm(umi);

  console.log("NFT успешно создан!");
  console.log("Mint NFT:", nftSigner.publicKey);
  console.log(`Explorer: https://explorer.solana.com/address/${nftSigner.publicKey}?cluster=devnet`);
}

main().catch(console.error);
