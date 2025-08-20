export default async function handler(req, res) {
  try {
    const q = (req.query.q || "AI").toString();
    const apiKey = process.env.NEWSAPI_KEY; // <-- SIMPAN di Vercel, bukan VITE_*

    if (!apiKey) {
      return res.status(500).json({ status: "error", message: "Missing NEWSAPI_KEY" });
    }

    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", q);
    url.searchParams.set("language", "en");
    url.searchParams.set("pageSize", "10");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("apiKey", apiKey);

    const r = await fetch(url, { headers: { "User-Agent": "VercelFunction" } });
    const data = await r.json();

    // Pass-through status code when possible
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (err) {
    return res.status(500).json({ status: "error", message: err?.message || "Unknown error" });
  }
}
