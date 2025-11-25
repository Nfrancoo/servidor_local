import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

// 1. Pon tu token aquí
const LOCATIONIQ_KEY = "pk.b34b27df341308fad7ac019c60c9e6eb"; 

app.get("/buscar", async (req, res) => {
  try {
    const query = req.query.q;
    
    // 2. CAMBIO DE URL: Usamos LocationIQ en vez de nominatim
    const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(query)}&format=json`;

    const response = await fetch(url); // Ya no necesitas headers complejos aquí
    const data = await response.json();
    
    // LocationIQ puede devolver error en formato JSON, verificamos
    if (data.error) throw new Error(data.error);
    
    res.json(data);

  } catch (err) {
    console.error(err); // Importante para ver qué pasa en la consola de Render
    res.status(500).json({ error: "Error en geocoding" });
  }
});

app.get("/reverse", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    
    // 3. CAMBIO DE URL: Reverse Geocoding con LocationIQ
    const url = `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${lon}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

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