import express from "express";
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "my_secret_token"; // <-- set your own secret

// ✅ Webhook verification (Meta requires this)
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Handle incoming messages
app.post("/webhook", (req, res) => {
  console.log("📩 New incoming webhook:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ✅ Start server
app.listen(3000, () => console.log("🚀 Webhook is live on port 3000"));
