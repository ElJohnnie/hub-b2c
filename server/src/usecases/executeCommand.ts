import { exec } from 'child_process';
import path from 'path';

const projectRoot = process.cwd();

export const executeCommandUseCase = async (body: { dir: string; command: string; shell?: string }) => {
    const { dir, command, shell } = body;

    const fullCommand = `cd ${path.resolve(projectRoot, 'src', dir)} && ${command}`;

    console.log(`Comando recebido: ${fullCommand}`);
    console.log(`Diretório: ${path.resolve(__dirname, dir)}`);
    console.log(`Comando: ${command}`);
    console.log(`Shell: ${shell}`);

    return new Promise<string>((resolve, reject) => {
        exec(fullCommand, { shell: shell || '/bin/bash' }, (error, stdout, stderr) => {
            if (stderr) {
                reject(`Erro: ${stderr}, ${error}`);
            } else {
                resolve(stdout);
            }
        });

        resolve(`Comando recebido com sucesso`);
    });
};
