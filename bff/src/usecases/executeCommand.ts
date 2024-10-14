import { exec } from 'child_process';
import path from 'path';

let projectRoot = process.cwd();
if(process.env.SERVER_PATH) {
    projectRoot = process.env.SERVER_PATH
} else {
    projectRoot = process.cwd();
}

export const executeCommandUseCase = async (body: { dir: string; command: string; shell?: string }) => {
    const { dir, command, shell } = body;

    const scriptPath = path.join(projectRoot, dir);

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
};
