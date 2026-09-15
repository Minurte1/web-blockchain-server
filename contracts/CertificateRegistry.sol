// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CertificateRegistry {
    struct Certificate {
        bytes32 documentHash;
        uint256 issuedAt;
        address issuer;
        bool exists;
        bool revoked;
    }

    address public immutable owner;
    mapping(string => Certificate) private certificates;

    event CertificateIssued(string certificateCode, bytes32 documentHash, address issuer, uint256 issuedAt);
    event CertificateRevoked(string certificateCode, address issuer, uint256 revokedAt);

    error Unauthorized();
    error CertificateAlreadyExists();
    error CertificateNotFound();
    error CertificateAlreadyRevoked();
    error InvalidDocumentHash();

    constructor() {
        owner = msg.sender;
    }

    modifier onlyIssuer() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    function issueCertificate(string calldata certificateCode, bytes32 documentHash) external onlyIssuer {
        if (certificates[certificateCode].exists) revert CertificateAlreadyExists();
        if (documentHash == bytes32(0)) revert InvalidDocumentHash();
        certificates[certificateCode] = Certificate(documentHash, block.timestamp, msg.sender, true, false);
        emit CertificateIssued(certificateCode, documentHash, msg.sender, block.timestamp);
    }

    function getCertificate(string calldata certificateCode) external view returns (bytes32 documentHash, uint256 issuedAt, address issuer, bool exists, bool revoked) {
        Certificate memory certificate = certificates[certificateCode];
        return (certificate.documentHash, certificate.issuedAt, certificate.issuer, certificate.exists, certificate.revoked);
    }

    function verifyCertificate(string calldata certificateCode, bytes32 documentHash) external view returns (bool) {
        Certificate memory certificate = certificates[certificateCode];
        return certificate.exists && !certificate.revoked && certificate.documentHash == documentHash;
    }

    function revokeCertificate(string calldata certificateCode) external onlyIssuer {
        Certificate storage certificate = certificates[certificateCode];
        if (!certificate.exists) revert CertificateNotFound();
        if (certificate.revoked) revert CertificateAlreadyRevoked();
        certificate.revoked = true;
        emit CertificateRevoked(certificateCode, msg.sender, block.timestamp);
    }
}
