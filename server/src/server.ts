
import express from 'express';
import cors from 'cors';
import commandRoutes from './routes/commandRoutes';

const app = express();
const PORT = process.env.PORT || 2345;

app.use(cors());
app.use(express.json());

app.use('/', commandRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
