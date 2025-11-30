# Backend: Encryption & Secrets

This file documents how the backend handles sensitive data and encryption.

Environment variables

- `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT`: Postgres connection settings.
- `PORT`: Express server port.
- `JWT_SECRET`: Secret for signing JWTs.
- `JWT_EXPIRES_IN`: JWT expiration (e.g. `1h`).
- `SALT_ROUNDS`: Optional, bcrypt salt rounds (default 10).
- `FIELD_ENC_KEY`: Base64-encoded 32-byte key used for field-level AES-256-GCM encryption.

Generating an encryption key (one-off)

Run Node and use the helper to generate a key:

```powershell
node -e "console.log(require('./src/utils/crypto.js').generateKey())"
```

Set `FIELD_ENC_KEY` to the printed base64 string in your environment or secrets manager.

Notes & best practices

- Passwords are stored hashed using `bcrypt` (`password_hash` column). Do not store plaintext passwords.
- Field-level encryption (AES-256-GCM) is provided for optional PII columns (`secret_encrypted` used as example). Manage keys securely (use a KMS in production).
- Use TLS when connecting to the database (configure your Postgres provider / connection string accordingly).
- For at-rest encryption of the entire database, prefer provider-managed encryption (disk-level / TDE) instead of rolling your own when possible.
