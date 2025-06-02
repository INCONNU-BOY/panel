const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const GITHUB_REPO = "INCONNU-BOY/MEGALODON-MD"; // Ton repo GitHub
const BRANCH = "main";

app.post("/create", async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) return res.status(400).json({ error: "Nom ou type manquant" });

  const serviceName = `${name} (${type}) - ${new Date().toISOString()}`;
  const payload = {
    name: serviceName,
    type: "web_service",
    repo: `https://github.com/${GITHUB_REPO}`,
    branch: BRANCH,
    rootDir: "/",
    buildCommand: "npm install",
    startCommand: "npm start",
    region: "oregon",
    plan: type === "illimité" ? "starter" : "free",
    envVars: [
      {
        key: "NOM_BOT",
        value: name
      }
    ]
  };

  try {
    const response = await axios.post("https://api.render.com/v1/services", payload, {
      headers: {
        Authorization: `Bearer ${RENDER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return res.json({
      message: "Bot lancé avec succès 🎉",
      dashboard: "https://dashboard.render.com/",
      service_url: response.data.serviceDetails.url || "En attente de l'activation..."
    });
  } catch (err) {
    return res.status(500).json({ error: "Erreur lors de la création", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Panel en ligne sur le port ${PORT}`));
