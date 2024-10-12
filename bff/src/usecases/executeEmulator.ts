import { spawn } from "child_process";
import os from "os";
import path from "path";

export const executeEmulatorUseCase = async (body: { command: string }) => {
  const { command } = body;

  console.log(`Comando: ${command}`);

  if (os.platform() === "win32") {
    const terminalCommand = "cmd.exe";
    const terminalArgs = ["/c", "start", "cmd.exe", "/k", command];

    const process = spawn(terminalCommand, terminalArgs, { detached: true });
    return new Promise<string>((resolve, reject) => {
      process.stdout.on("error", (err) => {
        reject(`Erro ao abrir o terminal: ${err}`);
      });
      resolve("AVD aberto com o comando no Windows.");
    });
  } else if (os.platform() === "linux") {
    const terminalCommand = "xterm";
    const terminalArgs = ["-e", command];

    const process = spawn(terminalCommand, terminalArgs, { detached: true });
    return new Promise<string>((resolve, reject) => {
      process.stdout.on("error", (err) => {
        console.log("Erro ao abrir o terminal: ", err);
        reject(`Erro ao abrir o terminal: ${err}`);
      });
      resolve("AVD aberto com o comando no Linux.");
    });
  } else {
    throw new Error("Sistema operacional não suportado");
  }
};

export const getEmulatorListUseCase = (): Promise<string[]> => {
  const scriptPath = path.join(__dirname, "../../src/scripts");
  if (os.platform() === "win32") {
    const emulatorBatPath = path.join(scriptPath, "getAdvs.bat");
    const bashRun = spawn("cmd.exe", ["/c", emulatorBatPath]);

    return new Promise<string[]>((resolve, reject) => {
      let output = "";
      bashRun.stdout.on("data", (data) => {
        output += data.toString();
      });
      bashRun.stderr.on("data", (err) => {
        reject(`Erro ao capturar os dados: ${err}`);
      });
      bashRun.on("close", (code) => {
        if (code === 0) {
          resolve(output.split("\n").filter((item) => item));
        } else {
          reject(`Processo terminou com código: ${code}`);
        }
      });
    });
  } else if (os.platform() === "linux") {
    const emulatorShPath = path.join(scriptPath, "getAdvs.sh");
    const process = spawn("bash", [emulatorShPath]);

    return new Promise<string[]>((resolve, reject) => {
      let output = "";
      process.stdout.on("data", (data) => {
        output += data.toString();
      });
      process.stderr.on("data", (err) => {
        reject(`Erro ao capturar os dados: ${err}`);
      });
      process.on("close", (code) => {
        if (code === 0) {
          resolve(output.split("\n").filter((item) => item));
        } else {
          reject(`Processo terminou com código: ${code}`);
        }
      });
    });
  }

  throw new Error("Sistema operacional não suportado");
};
