
import express from 'express';
import cors from 'cors';
import commandRoutes from './routes/commandRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 2345;

app.use(cors());
app.use(express.json());

// servir arquivos estáticos aqui no server e tratar o server diretamente como um só
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', commandRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
