import React, { FC, useMemo, useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import "@solana/wallet-adapter-react-ui/styles.css";

const TOKEN_MINT = new PublicKey("H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh");

const MainDashboard: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balanceSOL, setBalanceSOL] = useState<number | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [bio, setBio] = useState<string>("Solana Devnet Explorer");

  useEffect(() => {
    if (!publicKey) return;

    connection.getBalance(publicKey).then((lamports) => {
      setBalanceSOL(lamports / 1e9);
    });

    getAssociatedTokenAddress(TOKEN_MINT, publicKey)
      .then((ata) => getAccount(connection, ata))
      .then((acc) => {
        setTokenBalance((Number(acc.amount) / 1e9).toLocaleString());
      })
      .catch(() => {
        setTokenBalance("0 (ATA не создан)");
      });
  }, [publicKey, connection]);

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", fontFamily: "sans-serif", padding: 24, border: "1px solid #e2e8f0", borderRadius: 12 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Solana Web3 MVP</h2>
        <WalletMultiButton />
      </header>

      {publicKey ? (
        <div>
          <div style={{ background: "#f8fafc", padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <p><strong>Адрес:</strong> <code>{publicKey.toBase58()}</code></p>
            <p><strong>SOL Баланс:</strong> {balanceSOL !== null ? `${balanceSOL} SOL` : "Загрузка..."}</p>
            <p><strong>Баланс SPL-токена:</strong> {tokenBalance} MY_TOKEN</p>
          </div>

          <div style={{ border: "1px solid #cbd5e1", padding: 16, borderRadius: 8 }}>
            <h3>On-Chain User Profile (PDA)</h3>
            <label style={{ display: "block", marginBottom: 8 }}>
              Биография профиля:
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4, boxSizing: "border-box" }}
              />
            </label>
            <button
              onClick={() => alert(`Профиль сохранен: ${bio}`)}
              style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}
            >
              Сохранить ончейн
            </button>
          </div>
        </div>
      ) : (
        <p style={{ color: "#64748b" }}>Пожалуйста, подключите кошелек для доступа к MVP-сервисам.</p>
      )}
    </div>
  );
};

export const App: FC = () => {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <MainDashboard />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
