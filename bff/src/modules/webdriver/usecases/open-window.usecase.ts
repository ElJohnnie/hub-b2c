import UseCaseInterface from "../../../@shared/modules/usecases/use-cases.interface";
import path from 'path';
import { ShellFactory } from "../../../factories/shell-factory";

export default class OpenWindowUsecase implements UseCaseInterface {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(body: { dir: string; command: string; shell?: string }): Promise<any> {
        const { dir, command, shell } = body;

        const scriptPath = path.join(this.projectRoot, dir);
        const fullCommand = `cd ${scriptPath} && ${command}`;

        console.log(`Comando recebido: ${fullCommand}`);
        console.log(`Diretório: ${scriptPath}`);
        console.log(`Comando: ${command}`);
        console.log(`Shell: ${shell}`);

        const shellAdapter = ShellFactory.getShellAdapter();

        const process = shellAdapter.executeCommand(fullCommand, [], { shell: shell || '/bin/bash' });

        return new Promise<string>((resolve, reject) => {
            process.stdout.on("data", (data: { toString: () => string | PromiseLike<string>; }) => {
                console.log(`Saída: ${data.toString()}`);
                resolve(data.toString());
            });

            process.stderr.on("data", (error: { toString: () => any; }) => {
                console.log(`Erro: ${error.toString()}`);
                reject(`Erro: ${error.toString()}`);
            });

            process.on("error", (err: any) => {
                reject(`Erro ao executar o comando: ${err}`);
            });
        });
    }
}
