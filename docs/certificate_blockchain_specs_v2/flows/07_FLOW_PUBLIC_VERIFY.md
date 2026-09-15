# FLOW 07 — PUBLIC VERIFY END-TO-END

## React
Route: `/verify/:certificateCode`

States:
- LOADING
- VALID
- INVALID
- REVOKED
- NOT_FOUND

## Backend
`GET /api/public/certificates/verify/:certificateCode`

## Logic
```text
load DB
→ rebuild canonical hash
→ compare local hash với DB hash
→ query blockchain
→ compare on-chain hash
→ check revoked
→ result
```

VALID chỉ khi toàn bộ điều kiện trong spec tổng thể đúng.

## DB
Ghi `verification_logs`.

## QR
QR của Certificate phải trỏ tới:
`{CLIENT_URL}/verify/{certificateCode}`

## Tests
- valid
- modified DB data
- revoked
- not found
- wrong on-chain hash
- React render mỗi state
