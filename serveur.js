const express = require("express");
const app = express();

app.use(express.json());

// test serveur
app.get("/", (req, res) => {
    res.send("API KibaWallet OK 🚀");
});

// créer paiement
app.post("/create-payment", (req, res) => {
    const { amount } = req.body;

    res.json({
        status: "success",
        amount: amount
    });
});

// webhook
app.post("/webhook", (req, res) => {
    console.log("Paiement reçu", req.body);
    res.sendStatus(200);
});

// PORT IMPORTANT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
});