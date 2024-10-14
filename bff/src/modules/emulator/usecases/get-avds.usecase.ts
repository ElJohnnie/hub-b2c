import { spawn } from "child_process";
import os from "os";
import path from "path";

export default class GetAvdsUsecase {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(): Promise<any> {
        const scriptPath = path.join(this.projectRoot, "scripts");
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
            console.log(scriptPath);
            const emulatorShPath = path.join(scriptPath, "getAdvs.sh");
            console.log(emulatorShPath)

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
                console.log(output);
                resolve(output.split("\n").filter((item) => item));
                } else {
                console.log(`Processo terminou com código: ${code}`);
                reject(`Processo terminou com código: ${code}`);
                }
            });
            });
        }

        throw new Error("Sistema operacional não suportado");
    }
}