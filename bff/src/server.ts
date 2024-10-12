
import express from 'express';
import cors from 'cors';
import commandRoutes from './routes/commandRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 2345;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/public/index.html'));
});

app.use('/', commandRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
