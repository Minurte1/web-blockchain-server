# FLOW 04 — ISSUE CERTIFICATE END-TO-END

## Đây là flow quan trọng nhất

## React
Route: `/admin/certificates/create`

Form:
- student
- certificateCode
- certificateName
- degreeType
- major
- classification
- issueDate
- institution

Submit:
```text
Admin bấm Cấp văn bằng
→ disable submit
→ gọi API
→ hiển thị processing
→ điều hướng detail
→ show ISSUED hoặc BLOCKCHAIN_FAILED
```

## Backend API
`POST /api/admin/certificates`

Flow bắt buộc:
```text
Auth/RBAC
→ validate
→ check student/institution/duplicate
→ DB create PENDING
→ canonical hash
→ save documentHash
→ create blockchain transaction attempt
→ contract.issueCertificate
→ nhận tx.hash
→ save tx.hash + SUBMITTED
→ await receipt
├─ success → ISSUED + CONFIRMED + blockNumber
└─ fail → BLOCKCHAIN_FAILED + FAILED + error
```

## Blockchain
Dùng `CertificateRegistry.issueCertificate`.

Không được:
- Blockchain trước DB
- delete certificate khi fail
- ISSUED ngay khi mới có txHash

## React detail result
Sau response phải thấy đúng:
- status
- blockchainStatus
- hash
- transactionHash nếu có
- blockNumber khi confirmed
- error khi failed

## Tests
- success
- RPC unavailable
- revert
- duplicate code
- unauthorized
- frontend submit/loading/error
