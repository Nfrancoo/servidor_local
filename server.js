import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // ★ IMPORTANTE

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

app.get("/reverse", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    
    // URL de Nominatim para Reverse Geocoding
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        // Nominatim exige un User-Agent válido
        "User-Agent": "MiAppIonic/1.0 (tucorreo@gmail.com)" 
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en reverse geocoding" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor Node corriendo en puerto " + PORT);
});
