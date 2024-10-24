const Orders = require("../models/Orders");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const path = require("path");
const NodeRSA = require("node-rsa");
const forge = require('node-forge');


const crypto = require("crypto");

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

// Load private key from file (this stays on the server)
// const privateKeyPath = path.join(__dirname, 'private_key.pem');

// // // Read the private key file
// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// get orders using email
const getOrdersUsingEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Orders.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post order
// const postOrder = async (req, res) => {
//   const { email, name, cart, totalPrice } = req.body;
//   try {
//     const existingOrder = await Orders.findOne({ cart });
//     if (existingOrder) {
//       return res.status(400).json({ message: "Order already exists!" });
//     }
//     const order = await Orders.create({ email, name, cart, totalPrice });
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const postOrder = async (req, res) => {
//     const { encryptedData } = req.body;

//     try {
//         // Decrypt the encrypted data using the private key
//         const decryptedData = crypto.privateDecrypt(
//             {
//                 key: privateKey,
//                 padding: crypto.constants.RSA_PKCS1_PADDING,
//             },
//             Buffer.from(encryptedData, "base64") // Convert base64-encoded string to buffer
//         );

//         // Convert decrypted data back to JSON
//         const orderDetails = JSON.parse(decryptedData.toString());

//         // Extract order details
//         const { email, name, cart, totalPrice } = orderDetails;

//         // Check if the order already exists
//         const existingOrder = await Orders.findOne({ cart });
//         if (existingOrder) {
//             return res.status(400).json({ message: "Order already exists!" });
//         }

//         // Create a new order
//         const order = await Orders.create({ email, name, cart, totalPrice });

//         // Respond with the created order
//         res.status(201).json(order);
//     } catch (error) {
//         console.error('Decryption error:', error); // Log the error details
//         res.status(500).json({ message: error.message });
//     }
// };

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  const userID = req.params.id;
  try {
    const order = await Orders.findByIdAndDelete(userID);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post order with AES decryption
const postOrder = async (req, res) => {
  const { encryptedData,encrypted_AES_Key_Base64 } = req.body;
  // Decryption secret key
// Load the private key from PEM format using node-forge
const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);

// Decode the base64 encoded encrypted message
const encryptedBytes = forge.util.decode64(encrypted_AES_Key_Base64);

// Decrypt the message using the private key with OAEP padding
const secretKey = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
  md: forge.md.sha256.create(), // Use SHA-256 hash for OAEP padding
});
// console.log(secretKey)







//   const secretKey = process.env.AES_SECRET_KEY;
//   console.log(secretKey)

  try {
    // Decrypt the incoming encrypted data
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Extract the order details from decrypted data
    const { email, name, cart, totalPrice } = decryptedData;

    // Check if the order already exists
    const existingOrder = await Orders.findOne({ cart });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists!" });
    }

    // Create a new order
    const order = await Orders.create({ email, name, cart, totalPrice });

    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    // Handle decryption or database errors
    res.status(500).json({ message: error.message });
  }
};

// // Post order with AES decryption
// const postOrder = async (req, res) => {
//     const { encryptedData } = req.body;
//     // Decryption secret key
//     const secretKey = process.env.AES_SECRET_KEY;
//   //   console.log(secretKey)
  
//     try {
//       // Decrypt the incoming encrypted data
//       const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//       const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  
//       // Extract the order details from decrypted data
//       const { email, name, cart, totalPrice } = decryptedData;
  
//       // Check if the order already exists
//       const existingOrder = await Orders.findOne({ cart });
//       if (existingOrder) {
//         return res.status(400).json({ message: "Order already exists!" });
//       }
  
//       // Create a new order
//       const order = await Orders.create({ email, name, cart, totalPrice });
  
//       // Respond with the created order
//       res.status(201).json(order);
//     } catch (error) {
//       // Handle decryption or database errors
//       res.status(500).json({ message: error.message });
//     }
//   };

// Post order with RSA decryption------------------------------------------------------------
// Your RSA private key (keep this private and secure!)
// const privateKey = `-----BEGIN PRIVATE KEY-----
// MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVHkzH8s9GWfl+
// 1ttZPn1LHfSqO8Ojs9JoevoupKES5AlqLh6pBAKLk0C/HfHRs1UQc9IQvUk0ViHp
// qDGb0PP6gNIOgeWFhZZgic01Urg4Em2cXoEGaN42HXQ7iJLD03E4tKG2kMHv0+DN
// ErlctzY/mi9eKNDA82AXOrlEAjZ3jSqSGzkE2Xoou3dTAkPdrrc8NfKuNR2ocp+3
// qxAQyXa/ChBq6G9VKA6X3rP27DPQpFbWLotBdy14Cn41DkJ58UEGyG2XcoQmzBRM
// epFuCuNM2+bnc+1R4d8e1Q5iN9jOb/sQ+lSys1l4Jkc2Z8HtXoSmVGM4Jl9D+jFg
// DIgxWLtLAgMBAAECggEAFFFMEeROBJ5mxbb9rRO8G5uJxhYdinUKYqz64JcS0VGb
// zMla6RmARUc7h67LT5C5MuQtB5Xa3xQrS7xcggf+7i9WL57YSJCSlDXCbZUHP7CX
// GbqwptBsEoCB4UizApaRMzI9ZHQl0IkUdKyr7+uQqyrVcGVsSBYBDjk0nAUXKcOv
// fj4p6axrDY3HjuqTC6bWQK1ne3d3q9YoIeRvPpqOpNpkRyZCjlu7NKbUotqkbMEH
// /sY3XDBnCcr0Bhdbb5ETK/XT662K6a/lV92N4Vf5ZqnHUioJmeTLMTm7Knilnknc
// gQRZttY19Ff0U2XutWoh76Lzi+2/nikPAlhOpT6deQKBgQDEl9Hz3NktVTBXrEbx
// AdHzCJJfvwt0dXWeIzlIqUZO1EkRx1Kxkxj53fi7tyaSvs2axXEaL4iI5cDbpvw3
// Ux5rG6elT67H3X7kx8HpQ3Pu2alELAK4kfmdGa5ynCsf9EZEYx6SHEtiUSx1NGkJ
// T5D2n6HwiZHLV+DOaJnDIPxh6QKBgQDCLeZ45Of7dueBnz7NBn8fLrQRgvtMlutK
// I8X2KZQe8jicxrBlxPmTzhDhBZvhDC2NNiH3OrwqHtZ2Y5nKY/lq0wghYit4w6M/
// x9ajPPwp8UPAZFXgeqGvx2Zixhkawj0+PnvFBN63731VqP+8YF6q1K/re3gqXZSW
// OsS4bwhfEwKBgDT6aNTb1hbWVzG5NmDqSabBz5hHxpF6udiEy4IeQ9kocgx9d3Zt
// GpTzUX1crONs0cF8pa8V0ih6Kc/Hnz5VguQATtxIreQkd3a1sjbnO43JUEkTxyPw
// CqFgc1dlaGWzEWCKiYl8YIA9OcrX9dpRe9JKUHyexhBTPTzCiXVBJWJJAoGAOYHA
// fNNGBModG91eive+lCyPtZP1+qPDgQyBJzr/G/8eVwfc2/bu9yATDaFMneSuZODA
// RGjHqy3A1AUBWdgr2MAw6zoYp8ZAxbXYUjXQdFd4ejT83eNTmSxTnTMP4kXeP13f
// 5+ReVVj+5GyNeGuN/cfJZdMGLn3ScH9tHTX847MCgYEAs+UzzqJwP+kGEgD1vSL8
// 4sKHI0q7qBCkpnXA2KLBP1GBNEte9txdF2YYjttnwFTTiwgaQON3gFMX7acTUJ1s
// L21f9KZnMMkdE6iWnlhPq+NSuNoak1+yXeemyVFeObQZfx0i98GMbh884sWsFY8v
// 3kRgucdYzONqWPw7rF6tW88=
// -----END PRIVATE KEY-----
// `;




const postOrderRSA = async (req, res) => {
  const { encryptedData } = req.body;
  console.log(encryptedData);

  try {
    // Load the private key from PEM format using node-forge
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);

    // Decode the base64 encoded encrypted message
    const encryptedBytes = forge.util.decode64(encryptedData);

    // Decrypt the message using the private key with OAEP padding
    const decrypted = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
      md: forge.md.sha256.create(), // Use SHA-256 hash for OAEP padding
    });
    console.log(decrypted)
    const cartItems = JSON.parse(decrypted);

    // Extract the order details from decrypted data
    const { email, name, cart, totalPrice } = cartItems;

    // Check if the order already exists
    const existingOrder = await Orders.findOne({ cart });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists!" });
    }

    // Create a new order
    const order = await Orders.create({ email, name, cart, totalPrice });

    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    console.error("Decryption failed:", error.message);
    res.status(500).json({ error: "Decryption failed" });
  }

};

module.exports = {
  getOrdersUsingEmail,
  postOrder,
  getAllOrders,
  deleteOrder,
  postOrderRSA,
};
