const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// CHANGE THIS to something only you share with trusted people
const ADMIN_SECRET = "this is not the real password";

app.use(cors());
app.use(express.json());

app.post("/create-client", (req, res) => {
  const { name, secret } = req.body || {};

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'name'" });
  }

  // Basic "auth" so random people can't hit this
  if (secret !== ADMIN_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Sanitize username a bit
  const safeName = name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!safeName) {
    return res.status(400).json({ error: "Invalid username after sanitizing" });
  }

  const scriptPath = "/home/ubuntu/make-vpn-user.sh";
  const easyRsaDir = "/home/ubuntu/easy-rsa";
  const ovpnPath = path.join(easyRsaDir, `${safeName}.ovpn`);

  console.log(`Creating VPN user: ${safeName}`);

  exec(`${scriptPath} ${safeName}`, (err, stdout, stderr) => {
    if (err) {
      console.error("Script error:", err, stderr);
      return res.status(500).json({ error: "Error running script" });
    }

    fs.readFile(ovpnPath, "utf8", (readErr, data) => {
      if (readErr) {
        console.error("Read error:", readErr);
        return res.status(500).json({ error: "Could not read .ovpn file" });
      }

      // Return as a downloadable file
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${safeName}.ovpn"`
      );
      res.setHeader("Content-Type", "application/x-openvpn-profile");
      res.send(data);
    });
  });
});

app.get("/", (req, res) => {
  res.send("VPN API is running");
});

app.listen(PORT, () => {
  console.log(`VPN API listening on port ${PORT}`);
});
