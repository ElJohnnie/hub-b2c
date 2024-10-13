
import express from 'express';
import cors from 'cors';
import commandRoutes from './routes/commandRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 2345;

app.use(cors());
app.use(express.json());

const publicPath = process.env.PUBLIC_PATH || path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use('/', commandRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
