import { spawn } from 'child_process';
import path from 'path';
import os from 'os';

const projectRoot = process.cwd();

export const executeShellCommandUseCase = async (body: { dir: string; command: string }) => {
    const { dir, command } = body;
    const fullCommand = `cd ${path.resolve(projectRoot, 'src', dir)} && chmod +x ${command.trim()} && ./${command.trim()}; exec sh`;

    console.log(`Comando recebido para shell: ${fullCommand}`);
    console.log(`Diretório: ${path.resolve(projectRoot, dir)}`);
    console.log(`Comando: ${command}`);

    if (os.platform() === 'win32') {
        const terminalCommand = 'cmd.exe';
        const terminalArgs = ['/c', 'start', 'cmd.exe', '/k', fullCommand];

        const process = spawn(terminalCommand, terminalArgs, { detached: true });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            resolve('Terminal aberto com o comando no Windows.');
        });
    } else if (os.platform() === 'linux') {
        const terminalCommand = 'xterm';
        const terminalArgs = ['-hold', '-e', fullCommand];

        const process = spawn(terminalCommand, terminalArgs, { detached: true });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            resolve('Terminal aberto com o comando no Linux.');
        });
    } else {
        throw new Error('Sistema operacional não suportado');
    }
};
