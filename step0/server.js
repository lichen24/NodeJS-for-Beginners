import express from "express";

const app = express();
app.use(express.json());

app.get("/items", (req, res) => {
  res.json({ message: "Get all items" });
});

app.get("/items/:id", (req, res) => {
  res.json({ message: `Get item ${req.params.id}` });
});

app.post("/items", (req, res) => {
  res.status(201).json({ message: "Item created" });
});

app.put("/items/:id", (req, res) => {
  res.json({ message: `Item ${req.params.id} updated` });
});

app.delete("/items/:id", (req, res) => {
  res.status(204).send();
});

export default app;