# Solana Devnet Anchor Project

**Program ID:** `86CHuwRate63ooTL7bdaRt9ZhpiygbPt7sbrn3rFoXts`  
**Explorer:** [Посмотреть программу в Solana Explorer](https://explorer.solana.com/address/86CHuwRate63ooTL7bdaRt9ZhpiygbPt7sbrn3rFoXts?cluster=devnet)  
**Кошелек разработчика:** `9BkAVDLf5WVX8o4LiqeDHYoMPCJYhPTDQRrK6icFiRgU`

---

## Недели 1–4: Основы Solana, Rust и окружение
- **Среда разработки:** WSL (Ubuntu), Solana CLI, Node.js, Yarn, Anchor Framework
- **Сеть:** Solana Devnet
- **Базовые операции:** Генерация ключевых пар кошелька, запрос тестнета (Airdrop Devnet SOL), компиляция программ на Rust в eBPF байткод

## Недели 5–6: Смарт-контракт на Anchor и PDA (Program Derived Addresses)
- **Контракт:** `programs/my_solana_project/src/lib.rs`
- **Функционал:** Создание ончейн-профиля пользователя (`UserProfile`) с детерминированным расчетом адреса через сиды `["user-profile", authority]`
- **Тесты:** Интеграционное тестирование инструкций через Mocha/Chai (`tests/my_solana_project.ts`)
- **Деплой:** Развертывание программы в Devnet и генерация IDL

## Неделя 7: SPL Tokens и Token Extensions
- **Token Mint:** `H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh`
- **Owner ATA:** `4SEAxQJK9K1djmJi3gMZ83vG3WhFVCH1jkJS8fQ1NZr6`
- **Initial Supply:** 1 000 000 (Decimals: 9)
- **Explorer:** [Посмотреть токен в Explorer](https://explorer.solana.com/address/H78rVj4iPpk7meP7T73yWL54YYP4cCpPYqgJmcqp2zYh?cluster=devnet)
- **Транзакция перевода:** [Посмотреть перевод в Explorer](https://explorer.solana.com/tx/4fEgjjt5GSzVH8EN1jHVn2Ltf4dUtqmbJqjhXeRVd4i5FxBJUNJrXnvea1LCsqbgj6Rn7Wps5BxJJXCmZuVRtFTw?cluster=devnet)
- **Скрипт перевода:** `scripts/transfer_token.ts`

## Неделя 8: РК1; BUILD SPRINT: первый Web3 MVP
- **Архитектура прототипа:** React 18 + TypeScript + Vite + Solana Wallet Adapter
- **Интеграция:** Подключение кошельков Phantom/Solflare, чтение балансов SOL и собственного SPL-токена, управление PDA-профилем
- **Расположение фронтенда:** каталог `/app`

## Неделя 9: DeFi на Solana
- **Интегрированный протокол:** Jupiter Swap API (DEX Aggregator)
- **Функционал:** Оптимальный расчет маршрута ликвидности и генерация сериализованных транзакций свопа пар токенов (SOL/USDC)
- **Скрипт проверки:** `scripts/defi_swap.ts`

## Неделя 10: NFT & Metaplex
- **Стандарт:** Metaplex MPL Token Metadata (Umi Framework)
- **Функционал:** Программный минт невзаимозаменяемого токена (NFT) с ончейн-метаданными в сети Devnet
- **Скрипт запуска:** `scripts/mint_nft.ts`

## Неделя 11: Безопасность смарт-контрактов & Compute Budget
- **Аудит безопасности контракта:**
  - Проверка Signer Authorization (контроль прав через `Signer<'info>`)
  - Изоляция аккаунтов через Anchor PDA constraints (`seeds`, `bump`)
  - Защита от атак повторной инициализации через `init` / Rent Exemption
- **Оптимизация транзакций:**
  - Использование `ComputeBudgetProgram.setComputeUnitLimit` для точного задания CU
  - Внедрение динамических `microLamports` (Priority Fees) для устойчивости к перегрузкам сети
- **Скрипт оптимизации:** `scripts/compute_budget_tx.ts`
