import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  return res.json({ status: 'Pelada da Hora tá on! ⚽' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});