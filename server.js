const express = require("express");
const app = express();

app.use(express.json());

// 🔥 URL KibaWallet
const KIBA_API_URL = "https://kiba-ai-pay--julesvernemsg.replit.app/api/kiba/payments";

// ==========================
// 💰 CREER UN PAIEMENT
// ==========================
app.post("/create-payment", async (req, res) => {
    try {
        const { amount, description } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount manquant" });
        }

        const response = await fetch(KIBA_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,
                currency: "XOF",
                description: description || "Commande boutique"
            })
        });

        const data = await response.json();

        return res.json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
});

// ==========================
// 🔔 WEBHOOK (confirmation paiement)
// ==========================
app.post("/webhook", (req, res) => {
    console.log("🔥 Paiement reçu :", req.body);

    // ici tu peux :
    // - valider commande
    // - livrer produit
    // - sauvegarder en base

    res.sendStatus(200);
});

// ==========================
// 🚀 LANCEMENT SERVEUR
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur démarré sur le port " + PORT);
});