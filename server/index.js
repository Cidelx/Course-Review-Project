import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

app.get("/api/projects", async (req, res) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/api/skills", async (req, res) => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.post("/api/messages", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { error } = await supabase
    .from("messages")
    .insert([{ name, email, message }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ status: "Message stored" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});