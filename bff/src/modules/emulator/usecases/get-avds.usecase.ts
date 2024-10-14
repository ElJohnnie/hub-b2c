import path from 'path';
import os from 'os';
import { ShellFactory } from '../../../factories/shell-factory';

export default class GetAvdsUsecase {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(): Promise<any> {
        const scriptPath = path.join(this.projectRoot, "scripts");
        
        const shellAdapter = ShellFactory.getShellAdapter();

        const scriptFile = os.platform() === 'win32' 
            ? path.join(scriptPath, "getAdvs.bat")
            : path.join(scriptPath, "getAdvs.sh");

        const process = shellAdapter.runScript(scriptFile, [], { detached: false });

        return new Promise<string[]>((resolve, reject) => {
            let output = "";
            process.stdout.on("data", (data: { toString: () => string; }) => {
                output += data.toString();
            });
            process.stderr.on("data", (err: any) => {
                reject(`Erro ao capturar os dados: ${err}`);
            });
            process.on("close", (code: number) => {
                if (code === 0) {
                    resolve(output.split("\n").filter((item) => item));
                } else {
                    reject(`Processo terminou com código: ${code}`);
                }
            });
        });
    }
}
