import "./styles/globals.css";
import '@telefonica/mistica/css/mistica.css';
import NavBar from "./components/nav-bar/NavBar";
import React, { useEffect, useState } from "react";
import Button from "./components/buttons/Button";
import EmulatorForm from "./components/forms/EmulatorForm";
import Output from "./components/core/Output";
import { commandController } from "./controllers/commandController";
import { ButtonPrimary } from "@telefonica/mistica";

const App: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [avdList, setAvdList] = useState<string[]>([]);
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
      setOutput("Erro ao executar comando");
    }
  };

  const handleExecuteShellCommand = async (dir: string, command: string) => {
    try {
      const result = await commandController.executeShellCommand(dir, command);
      setOutput(result);
    } catch {
      setOutput("Erro ao executar shell command");
    }
  };

  const handleExecuteEmulator = async (command: string) => {
    try {
      const result = await commandController.executeEmulator(command);
      setOutput(result);
    } catch {
      setOutput("Erro ao iniciar emulador");
    }
  };

  const handleGetEmulator = async () => {
    try {
      const result = await commandController.executeEmulatorList();
      setAvdList(result);
    } catch (err) {
      setOutput(String(err));
    }
  };

  useEffect(() => {
    (async () => {
      await handleGetEmulator();
    })();
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <NavBar />
      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            label="Kubernetes-b2c: Ubuntu"
            onClick={() =>
              handleExecuteCommand(
                "webdriver/kubernetes-b2c",
                "pip install -r requirements.txt && python3 kubernetes.py",
                "/bin/bash"
              )
            }
          />
          <Button
            label="Shell Tagueamento: Ubuntu"
            onClick={() => handleExecuteShellCommand("scripts", "tracking.sh")}
          />
          <ButtonPrimary
            onPress={() => handleGetEmulator()}
          >Comando de teste</ButtonPrimary>
        </div>

        <div className="mb-8">
          <h2 className="text-xl text-center font-semibold text-purple-800 mb-4">
            Iniciar Emulador Android
          </h2>
          <EmulatorForm onSubmit={handleExecuteEmulator} avdsList={avdList} />
        </div>

        <Output output={output} />
      </div>
    </div>
  );
};

export default App;
