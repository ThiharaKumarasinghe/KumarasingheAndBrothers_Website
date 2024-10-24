// Import node-forge
const forge = require('node-forge');

// Generate RSA key pair (public and private keys)
function generateKeyPair() {
  return forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
}

// Encrypt function (using public key)
function encryptTextRSA(plainText, publicKey) {
  const encrypted = publicKey.encrypt(plainText, 'RSA-OAEP', {
    md: forge.md.sha256.create(), // Hash function for OAEP padding
  });
  return forge.util.encode64(encrypted);
}

// Decrypt function (using private key)
function decryptTextRSA(encryptedText, privateKey) {
  const encryptedBytes = forge.util.decode64(encryptedText);
  const decrypted = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
    md: forge.md.sha256.create(), // Hash function for OAEP padding
  });
  return decrypted;
}

// PEM-formatted keys (as strings)
const privateKeyPEM = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEArgaZmFQbtruGBxvU2OgwBltgn4UefX8l0VLp5xosrJfy6rsP
380s6y60K8hp70F3Vz1TjsEXmm0gqTxnztzCtMezKhFiS5C4448TWeTunrPunQox
49ciLA0BsYOWsay2lv4BwtUXmHINY7DMxjspX/ze8UsdVVfxpiARDdWudpu6WLtM
BDQeIfa1E3VtjGMivci7nCh1jSSiDZKIBsy52qFjLlv+nNCwKwPPzNjzgAmyUexV
QZCdwepGxLz0MdB9EUzHvopvoobAu7PPIWJLFmOmnHkGBKjz5goDlRNpoy7OGMJr
XHdE+J2yINP14PK6IiXn/0vvCmnN7621g7JxIwIDAQABAoIBABr6xPc7xZbSgxiO
X7TyZ6JPVQSGI9BQVQbwdCOIXaKzD/haNeom1K7wF64DV9ZoRN3j5moRqjIedwYl
v5uaLXQk0wmo659MJDiLUZ8J11YIDpc5dxCb+sfvivKqtEMpbp6sFI57G48JJ5BB
Xw3ggC1Jy9qGywO/KvnsAMOEpulA63pPKBDqbweQRKdJxQPs6nIxIgoDMCrmJyND
xN3TQbh5aqdW15PSj9MUdsoS5geLz5sNbpXj5jsJi7Qm3Pmm+UiDhy5+7O3fkdFe
wLrCUqG0K+5y6pVkL30jdZz40rvAQwDhnyuX+RF+8P7WicZHgIdG22QVEf3HP/k1
5FeD60kCgYEA7iIoGNiv9zJdGcQ+4ZJ5t1Mo/ZNR2Sr62Z+W+pBHQFEf2RRAN7Wx
3hsYCDvcYocv05xseON2hN8+LguC1qBjZS5CXItci3TM8619y87u5Wm8XbRlXihb
BqCV0OINlC/2jD4qIEGmm3vLUe35/tSus7jeBroRtQFGP0NlnYEbRqUCgYEAuxUf
t5CbW+gM7osGs0Xc3NRZRYj6xWIyd1rnN1HQ6ilnqPCOYQS/ViYWFB14fpnzNpzq
Y+wnPxnbcCLcEoTr+2t9hZiqiKNcokYwyVduC7culG/e0Z6SUf0KtWN8GDR/oqdF
ijlIKJTRCVHlcoeioe9hkCYuxwcvL/U6PSWulicCgYEArDS1LGqerbOVEgoRsww6
yvDvZpi/ir2DFBdNljr527AOyOvVGLRjQQv00BeB4xqB4pRu+Oj9D09lZuTaJB1u
Y4AVa1k4fnzjraAbpWQq7GoPVvAakgG6+crtLFYcnboln/tgeV0gf7YBLWlb7QWe
pMcegFzUa0HVq/AwLrtrnyUCgYALKVl5FDGQrCmJWdYOgA6LRkgFNATyHcexA0Vk
MYdrUQkUNTXpZ+UaeK88h/2WYAz4pyf8yiwVQa+r4wiKOk/x8hnNDKyv9j8il1l1
ybeRD17CEGKU0wcbySMIa2UN9KPgymYFtyEs+qP2EGLGEH2Nd8C0XvLPgQg5rkHJ
QCRIZQKBgDiVmpuSzj7L0ATh8XWIMnm4WEZOpC6dSBsMud+BUwbd+HqC9xuVsaO4
ex1n57bzvgSy6XhlNNahgHFxkSlSflHKiG3hAxHUddc7Xi8x9k3IDDh56AMG/eAu
qFyd2vVzBVlF7DZsRbtbcoGL7FTl4JzM8/rOLbWNMqGcoEjXyGru
-----END RSA PRIVATE KEY-----`;

const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArgaZmFQbtruGBxvU2Ogw
Bltgn4UefX8l0VLp5xosrJfy6rsP380s6y60K8hp70F3Vz1TjsEXmm0gqTxnztzC
tMezKhFiS5C4448TWeTunrPunQox49ciLA0BsYOWsay2lv4BwtUXmHINY7DMxjsp
X/ze8UsdVVfxpiARDdWudpu6WLtMBDQeIfa1E3VtjGMivci7nCh1jSSiDZKIBsy5
2qFjLlv+nNCwKwPPzNjzgAmyUexVQZCdwepGxLz0MdB9EUzHvopvoobAu7PPIWJL
FmOmnHkGBKjz5goDlRNpoy7OGMJrXHdE+J2yINP14PK6IiXn/0vvCmnN7621g7Jx
IwIDAQAB
-----END PUBLIC KEY-----`;

// // Convert PEM-formatted keys to Node-forge key objects
// const publicKey = forge.pki.publicKeyFromPem(publicKeyPEM);
// const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);

// // Now you can use these keys for encryption and decryption
// const originalText = 'Hello, this is a secret message using RSA!';
// const encryptedText = encryptTextRSA(originalText, publicKey);
// console.log('Encrypted Text:', encryptedText);

// const decryptedText = decryptTextRSA(encryptedText, privateKey);
// console.log('Decrypted Text:', decryptedText);

encryptedMessage="NNreO5JSRuML8RRc8RLxpAaZWZIOA9PNnVW99xQDT1BiRNNXuGttoYacNXavfkQUIBkC0gIn2KYzPdSK86xeEuFM146ywc70ylfgIoaZbkpuchmbWVfaArkgfpfCp1DyJh3yLByUrY52hunGVLJJXC5CzzbNvQUB1lXvIlY0BGFyKxVJeD/N+btcwyWTlG7kKyRtLJqmVPTRsKSGz95YcIyJTf5T6TcgycZ6qho70L1j2oOo7+61YJ3sIP/KpPmRRE8ae0374WxdoCuSkTtB74YLD+w5RwjkGV7gGGNX3PPhpXB6uU52LHKGmqmkdPU/6fDH5mhoLoKIYxF8Vh3SgA=="
const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);

    // Decode the base64 encoded encrypted message
    const encryptedBytes = forge.util.decode64(encryptedMessage);

    // Decrypt the message using the private key with OAEP padding
    const decrypted = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
      md: forge.md.sha256.create(), // Use SHA-256 hash for OAEP padding
    });

    console.log(decrypted)