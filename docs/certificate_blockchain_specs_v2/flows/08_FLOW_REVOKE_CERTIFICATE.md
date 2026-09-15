# FLOW 08 — REVOKE CERTIFICATE END-TO-END

## React
Certificate detail khi `ISSUED`:
- button Thu hồi
- confirm dialog
- reason required
- submitting state
- refresh status sau success

## Backend
`POST /api/admin/certificates/:id/revoke`

Request:
```json
{ "reason": "..." }
```

Flow:
```text
validate ISSUED + reason
→ create blockchain attempt action=REVOKE_CERTIFICATE
→ contract.revokeCertificate
→ save txHash
→ wait receipt
├─ success → REVOKED + revokedAt + reason
└─ fail → giữ ISSUED + log failure attempt
```

## Verify impact
Public verify sau revoke phải trả `REVOKED`.

## Tests
- revoke success
- revoke contract failure
- already revoked
- non-admin forbidden
- public verify after revoke
