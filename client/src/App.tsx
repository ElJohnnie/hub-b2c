import './styles/globals.css';
import NavBar from './components/nav-bar/NavBar';
import React, { useState } from 'react';
import Button from './components/buttons/Button';
import EmulatorForm from './components/forms/EmulatorForm';
import Output from './components/core/Output';
import { commandController } from './controllers/commandController';

const App: React.FC = () => {
  const [output, setOutput] = useState<string>('');

  const handleExecuteCommand = async (
    dir: string,
    command: string,
    shell: string
  ) => {
    try {
      const result = await commandController.executeCommand(
        dir,
        command,
        shell
      );
      setOutput(result);
    } catch {
      setOutput('Erro ao executar comando');
    }
  };

  const handleExecuteShellCommand = async (dir: string, command: string) => {
    try {
      const result = await commandController.executeShellCommand(dir, command);
      setOutput(result);
    } catch {
      setOutput('Erro ao executar shell command');
    }
  };

  const handleExecuteEmulator = async (command: string) => {
    try {
      const result = await commandController.executeEmulator(command);
      setOutput(result);
    } catch {
      setOutput('Erro ao iniciar emulador');
    }
  };

  const handleGetEmulator = async () => {
    try {
      const result = await commandController.executeEmulatorList();
      setOutput(result);
    } catch(err) {
      setOutput(String(err));
    }
  };

  return (
    <div className='bg-gray-100 p-8'>
      <NavBar />
      <div className='mx-auto bg-white p-6 rounded-lg shadow-lg'>
        <div className='mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Button
            label='Kubernetes-b2c: Ubuntu'
            onClick={() =>
              handleExecuteCommand(
                'webdriver/kubernetes-b2c',
                'pip install -r requirements.txt && python3 kubernetes.py',
                '/bin/bash'
              )
            }
          />
          <Button
            label='Shell Tagueamento: Ubuntu'
            onClick={() => handleExecuteShellCommand('scripts', 'tracking.sh')}
          />
          <Button
            label='Comando de teste'
            onClick={() => handleGetEmulator()}
          />
        </div>

        <div className='mb-8'>
          <h2 className='text-xl text-center font-semibold text-purple-800 mb-4'>
            Iniciar Emulador Android
          </h2>
          <EmulatorForm onSubmit={handleExecuteEmulator} />
        </div>

        <Output output={output} />
      </div>
    </div>
  );
};

export default App;
