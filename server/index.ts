const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (res, req) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
