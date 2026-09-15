# Certificate Blockchain API

## Local setup

1. Copy `.env.example` to `.env`.
2. Start MongoDB with `docker compose up -d`.
3. Install dependencies with `npm install`.
4. In a separate terminal, run `npm run contract:node`.
5. Run `npm run contract:deploy:local` and put the printed address in `CERTIFICATE_CONTRACT_ADDRESS`.
6. Run `npm run dev`.

The foundation health endpoint is `GET /api/health`.
web-blockchain code đồ án thue
