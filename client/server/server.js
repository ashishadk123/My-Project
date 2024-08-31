const express = require("express");
const app = express();

app.use(express.json());

app.post("/verify", (req, res) => {
  const { code } = req.body;

  if (code.length !== 6 || code[5] === "7") {
    return res.status(400).json({ error: "Verification Error" });
  }

  return res.status(200).json({ success: true });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
