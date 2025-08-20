export default async function handler(req, res) {
  try {
    const q = (req.query.q || "AI").toString();
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ status: "error", message: "Missing GNEWS_API_KEY" });
    }

    const url = new URL("https://gnews.io/api/v4/search");
    url.searchParams.set("q", q);
    url.searchParams.set("lang", "en");
    url.searchParams.set("token", apiKey);

    const r = await fetch(url);
    const data = await r.json();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (err) {
    return res.status(500).json({ status: "error", message: err?.message || "Unknown error" });
  }
}
