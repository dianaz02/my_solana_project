# Solana Devnet Anchor Project
Program ID: 86CHuwRate63ooTL7bdaRt9ZhpiygbPt7sbrn3rFoXts
Explorer: https://explorer.solana.com/address/86CHuwRate63ooTL7bdaRt9ZhpiygbPt7sbrn3rFoXts?cluster=devnet

## Неделя 7: SPL Tokens и Token Extensions
- **Token Mint:** `H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh`
- **Owner ATA:** `4SEAxQJK9K1djmJi3gMZ83vG3WhFVCH1jkJS8fQ1NZr6`
- **Initial Supply:** 1 000 000
- **Decimals:** 9
- **Token Explorer:** [Посмотреть токен в Explorer](https://explorer.solana.com/address/H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh?cluster=devnet)
- **Transfer Transaction:** [Посмотреть перевод в Explorer](https://explorer.solana.com/tx/4fEgjjt5GSzVH8EN1jHVn2Ltf4dUtqmbJqjhXeRVd4i5FxBJUNJrXnvea1LCsqbgj6Rn7Wps5BxJJXCmZuVRtFTw?cluster=devnet)
- **Client Script:** `scripts/transfer_token.ts`

## Неделя 8: РК1; BUILD SPRINT: первый Web3 MVP
- **Архитектура прототипа:** React 18 + TypeScript + Vite + Solana Wallet Adapter
- **Интеграция:** Чтение балансов SOL и собственного SPL-токена `H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh`, управление PDA-профилем
- **Расположение:** каталог `/app`

## Неделя 9: DeFi на Solana
- **Интегрированный протокол:** Jupiter Swap API (DEX Aggregator)
- **Функционал:** Автоматический расчет оптимального пула ликвидности и генерация сериализованных транзакций свопа между парами токенов (SOL/USDC)
- **Скрипт проверки:** `scripts/defi_swap.ts`

## Неделя 10: NFT & Metaplex
- **Стандарт:** Metaplex MPL Token Metadata (Umi Framework)
- **Функционал:** Программный минт невзаимозаменяемого токена (NFT) с ончейн-метаданными в сети Devnet
- **Скрипт запуска:** `scripts/mint_nft.ts`

## Неделя 11: Безопасность смарт-контрактов & Compute Budget
- **Аудит безопасности контракта:**
  - Проверка Signer Authorization (контроль прав через `Signer<'info>`)
  - Изоляция аккаунтов через Anchor PDA constraints (`seeds`, `bump`)
  - Защита от переполнений и re-initialization атак через `init_if_needed` / `init`
- **Оптимизация транзакций:**
  - Использование `ComputeBudgetProgram.setComputeUnitLimit` для точного задания CU
  - Внедрение динамических `microLamports` (Priority Fees) для гарантированного прохождения транзакций
- **Скрипт оптимизации:** `scripts/compute_budget_tx.ts`
