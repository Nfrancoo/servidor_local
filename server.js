import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/buscar", async (req, res) => {
  try {
    const query = req.query.q;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MiAppIonic/1.0 (contacto@miemail.com)"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Error en geocoding" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor Node corriendo en puerto " + PORT);
});