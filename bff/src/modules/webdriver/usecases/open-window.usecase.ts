import UseCaseInterface from "../../../@shared/modules/usecases/use-cases.interface";
import path from 'path';
import { ShellFactory } from "../../../factories/shell-factory";
import { ProcessExecutionError } from '../../../@shared/exceptions/exceptions';
import { ProcessOutputError } from '../../../@shared/exceptions/exceptions';

export default class OpenWindowUsecase implements UseCaseInterface {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(body: { dir: string; command: string; shell?: string }): Promise<any> {
        const { dir, command, shell } = body;

        const scriptPath = path.join(this.projectRoot, 'src', dir);
        const fullCommand = `cd ${scriptPath} && ${command}`;

        console.log(`Comando recebido: ${fullCommand}`);
        console.log(`Diretório: ${scriptPath}`);
        console.log(`Comando: ${command}`);
        console.log(`Shell: ${shell}`);

        const shellAdapter = ShellFactory.getShellAdapter();

        const process = shellAdapter.runScript(fullCommand, [], { shell: shell || '/bin/bash' });

        return new Promise<string>((resolve, reject) => {
            process.stdout.on("data", (data: { toString: () => string | PromiseLike<string>; }) => {
                console.log(`Saída: ${data.toString()}`);
                resolve(data.toString());
            });

            process.stderr.on("data", (error: { toString: () => any; }) => {
                console.error(`Erro capturado: ${error.toString()}`);
                reject(new ProcessOutputError(error.toString()));
            });

            process.on("error", (err: any) => {
                reject(new ProcessExecutionError(err.toString())); 
            });
        });
    }
}
