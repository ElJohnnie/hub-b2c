import "./styles/globals.css";
import "@telefonica/mistica/css/mistica.css";
import NavBar from "./components/nav-bar/NavBar";
import React, { useEffect, useState } from "react";
import EmulatorForm from "./components/forms/EmulatorForm";
import { commandController } from "./controllers/commandController";
import {
  Callout,
  Grid,
  GridItem,
  BoxedRowList,
  BoxedRow,
  ResponsiveLayout,
  skinVars,
  Text4,
} from "@telefonica/mistica";

const App: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [avdList, setAvdList] = useState<string[]>([]);
  const handleExecuteCommand = async (
    dir: string,
    command: string,
    shell: string,
  ) => {
    try {
      const result = await commandController.executeCommand(
        dir,
        command,
        shell,
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
    <ResponsiveLayout>
      <NavBar />
      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Grid columns={3} rows={1} gap={12}>
          <GridItem>
            <Text4 weight="regular" color={skinVars.colors.backgroundBrand}>
              Janelas
            </Text4>
            <BoxedRowList>
              <BoxedRow
                title=""
                description={"Dashboard Kubernetes"}
                onPress={() =>
                  handleExecuteCommand(
                    "webdriver/kubernetes-b2c",
                    "pip install -r requirements.txt && python3 kubernetes.py",
                    "/bin/bash",
                  )
                }
              />
            </BoxedRowList>
          </GridItem>
          <GridItem>
            <Text4 weight="regular" color={skinVars.colors.backgroundBrand}>
              Terminais
            </Text4>
            <BoxedRowList>
              <BoxedRow
                title=""
                description={"Tagueamentos"}
                onPress={() =>
                  handleExecuteShellCommand("scripts", "tracking.sh")
                }
              />
            </BoxedRowList>
          </GridItem>
          <GridItem>
            <Text4 weight="regular" color={skinVars.colors.backgroundBrand}>
              Emulador
            </Text4>
            <BoxedRowList>
              <EmulatorForm
                onSubmit={handleExecuteEmulator}
                avdsList={avdList}
              />
            </BoxedRowList>
          </GridItem>
        </Grid>
        <div className="mb-8" />
        <Callout description={output}></Callout>
      </div>
    </ResponsiveLayout>
  );
};

export default App;
