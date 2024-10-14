import { spawn } from "child_process";
import os from "os";
import path from "path";

export default class ExecuteEmulatorUsecase {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(body: { command: string }): Promise<any> {
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
    }


}