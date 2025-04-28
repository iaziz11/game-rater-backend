import { getCredits, getGamesFromQuery } from "./services/apiService.js";
import { getListsFromUser } from "./services/userService.js";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
let access_token = "";
let expire_time = 0;

app.use(express.json());
app.use(cors());
app.use(async (req, res, next) => {
  if (access_token == "" || Date.now() >= expire_time) {
    try {
      const data = await getCredits();
      access_token = data.access_token;
      expire_time = Date.now() + data.expires_in;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Basic route
app.get("/", (req, res) => {
  return res.send("Hello, Node.js backend!");
});

app.get("/search", async (req, res) => {
  let query = req.query["q"];
  if (!query) {
    return res.send("Please send valid query");
  }
  try {
    const games = await getGamesFromQuery(query, access_token);
    return res.json(games);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
});

app.get("/user/:id/lists", async (req, res) => {
  let userId = req.params.id;
  await getListsFromUser(userId);
  return res.send("Hopefully worked.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
