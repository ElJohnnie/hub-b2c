import path from 'path';
import os from 'os';
import { ShellFactory } from '../../../factories/shell-factory';
import { DataCaptureError } from '../../../@shared/exceptions/exceptions';
import { ProcessExecutionError } from '../../../@shared/exceptions/exceptions';

export default class GetAvdsUsecase {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(): Promise<any> {
        const scriptPath = path.join(this.projectRoot, "scripts");

        console.log(`Script Path: ${scriptPath}`);
        
        const shellAdapter = ShellFactory.getShellAdapter();

        const scriptFile = os.platform() === 'win32' 
            ? path.join(scriptPath, "getAdvs.bat")
            : path.join(scriptPath, "getAdvs.sh");

        console.log(`Script: ${scriptFile}`);

        const process = shellAdapter.runScript(scriptFile, [], { detached: false });

        return new Promise<string[]>((resolve, reject) => {
            let output = "";
            
            process.stdout.on("data", (data: { toString: () => string; }) => {
                console.log(data.toString());
                output += data.toString();
            });

            process.stderr.on("data", (err: any) => {
                console.error(err.toString());
                reject(new DataCaptureError(err.toString()));
            });

            process.on("close", (code: number) => {
                if (code === 0) {
                    console.log("Processo terminou com sucesso");
                    resolve(output.split("\n").filter((item) => item.trim()));
                } else {
                    console.error(`Processo terminou com código: ${code}`);
                    reject(new ProcessExecutionError(code));
                }
            });
        });
    }
}
