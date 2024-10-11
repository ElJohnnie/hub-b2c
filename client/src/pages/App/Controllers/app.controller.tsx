import "../../../styles/globals.css";
import "@telefonica/mistica/css/mistica.css";
import React, { useEffect, useState } from "react";

import { commandController } from "../../../controllers/commandController";
import { AppView } from "../views/App.view";

const AppController: React.FC = () => {
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
    console.log(dir, command);
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
    <AppView
      handleExecuteCommand={handleExecuteCommand}
      handleExecuteEmulator={handleExecuteEmulator}
      handleExecuteShellCommand={handleExecuteShellCommand}
      avdList={avdList}
      output={output}
    />
  );
};

export default AppController;
