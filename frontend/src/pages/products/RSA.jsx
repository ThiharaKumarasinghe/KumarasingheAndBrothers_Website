// Frontend React Component using node-forge
import React, { useState } from "react";
import forge from "node-forge";

const RSAEncryptComponent = () => {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const handleEncryptMessage = () => {
    // Public Key (same as the one used in the backend)
    const publicKeyPem = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArgaZmFQbtruGBxvU2Ogw
    Bltgn4UefX8l0VLp5xosrJfy6rsP380s6y60K8hp70F3Vz1TjsEXmm0gqTxnztzC
    tMezKhFiS5C4448TWeTunrPunQox49ciLA0BsYOWsay2lv4BwtUXmHINY7DMxjsp
    X/ze8UsdVVfxpiARDdWudpu6WLtMBDQeIfa1E3VtjGMivci7nCh1jSSiDZKIBsy5
    2qFjLlv+nNCwKwPPzNjzgAmyUexVQZCdwepGxLz0MdB9EUzHvopvoobAu7PPIWJL
    FmOmnHkGBKjz5goDlRNpoy7OGMJrXHdE+J2yINP14PK6IiXn/0vvCmnN7621g7Jx
    IwIDAQAB
    -----END PUBLIC KEY-----`;

    try {
      // Load the public key from PEM format using node-forge
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

      // Encrypt the message using the public key with OAEP padding
      const encrypted = publicKey.encrypt(message, "RSA-OAEP", {
        md: forge.md.sha256.create(), // Use SHA-256 hash for OAEP padding
      });

      // Encode the encrypted message in base64
      const encryptedBase64 = forge.util.encode64(encrypted);
      console.log(encryptedBase64)

      // Update the state with the encrypted message
      setEncryptedMessage(encryptedBase64);
    } catch (error) {
      console.error("Encryption failed:", error.message);
    }
  };

  return (
    <div className="mt-20">
      <h1>RSA Encryption Example</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        cols="50"
        className="mt-4"
        placeholder="Enter message to encrypt"
      />
      <button
        onClick={handleEncryptMessage}
        className="bg-lightGrey p-4 hover:scale-105 mt-4"
      >
        Encrypt Message
      </button>
      <h2>Encrypted Message:</h2>
      <textarea
        value={encryptedMessage}
        readOnly
        rows="5"
        cols="50"
        className="mt-4"
      />
    </div>
  );
};

export default RSAEncryptComponent;
