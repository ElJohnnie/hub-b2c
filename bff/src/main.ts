
import express from 'express';
import cors from 'cors';
import path from 'path';
import commandRouter from './modules/commands/routes/commands.route';
import publicPath from './@shared/config/public-path';
import dotenv from 'dotenv';
import emulatorRouter from './modules/emulator/routes/emulator.routes';
import openWindowRouter from './modules/webdriver/routes/webdriver.routes';

const app = express();
const PORT = process.env.PORT || 2345;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use('/execute-shell-command', commandRouter);
app.use('/emulator', emulatorRouter);
app.use('/open-window', openWindowRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
