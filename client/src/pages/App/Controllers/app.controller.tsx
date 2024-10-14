import "../../../styles/globals.css";
import "@telefonica/mistica/css/mistica.css";
import React, { useEffect, useState } from "react";

import { commandController } from "../../../controllers/commandController";
import { AppView } from "../views/App.view";
import { detectOS } from "../../../utils/detect-os";
import useWindowDimensions from "../../../hooks/use-window-size";
const AppController: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [avdList, setAvdList] = useState<string[]>([]);

  const [avdName, setAvdName] = useState<string>("");
  const [gpuOption, setGpuOption] = useState<string>("");
  const [isDesktopOrBigger, setIsDesktopOrBigger] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  const handleSubmit = (): void => {
    let command = "";
    const os = detectOS();
    if (os === "Windows") {
      command = `%USERPROFILE%\\AppData\\Local\\Android\\Sdk\\emulator\\emulator -avd ${avdName} -gpu ${gpuOption}`;
    }
    if (os === "Linux") {
      command = `~/Android/Sdk/emulator/emulator -avd ${avdName} -gpu ${gpuOption}`;
    }

    handleExecuteEmulator(command);
  };
  
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

  useEffect(() => {
    setOutput("");
  }, [category]);

  useEffect(() => {
    if (width && width >= 1024) {
      setIsDesktopOrBigger(true);
    } else {
      setIsDesktopOrBigger(false);
    }
  }, [width]);

  return (
    <AppView
      handleExecuteCommand={handleExecuteCommand}
      handleExecuteShellCommand={handleExecuteShellCommand}
      avdList={avdList}
      output={output}
      category={category}
      setCategory={setCategory}
      avdName={avdName}
      setAvdName={setAvdName}
      gpuOption={gpuOption}
      setGpuOption={setGpuOption}
      handleSubmit={handleSubmit}
      isDesktopOrBigger={isDesktopOrBigger}
    />
  );
};

export default AppController;
