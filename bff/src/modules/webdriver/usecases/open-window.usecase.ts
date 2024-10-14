import UseCaseInterface from "../../@shared/usecases/use-cases.interface";
import { exec } from 'child_process';
import path from 'path';

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

        return new Promise<string>((resolve, reject) => {
            exec(fullCommand, { shell: shell || '/bin/bash' }, (error, stdout, stderr) => {
                if (stderr) {
                    console.log(`Erro: ${stderr}`);
                    reject(`Erro: ${stderr}, ${error}`);
                } else {
                    console.log(`Saída: ${stdout}`);
                    resolve(stdout);
                }
            });

            resolve(`Comando recebido com sucesso`);
        });
    }
}