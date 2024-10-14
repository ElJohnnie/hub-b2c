import { spawn } from 'child_process';
import path from 'path';
import os from 'os';

let projectRoot = process.cwd();
if (process.env.SERVER_PATH) {
    projectRoot = process.env.SERVER_PATH;
} else {
    projectRoot = process.cwd();
}

export const executeShellCommandUseCase = async (body: { dir: string; command: string }) => {
    const { dir, command } = body;
    
    const resolvedDir = path.resolve(projectRoot, dir);
    console.log(`Diretório: ${resolvedDir}`);
    console.log(`Comando: ${command}`);

    if (os.platform() === 'win32') {
        const fullCommand = `chmod +x ${command.trim()} && ./${command.trim()}`;
        const terminalCommand = 'cmd.exe';
        const terminalArgs = ['/c', 'start', 'cmd.exe', '/k', fullCommand];

        const process = spawn(terminalCommand, terminalArgs, { detached: true, cwd: resolvedDir });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            resolve('Terminal aberto com o comando no Windows.');
        });
    } else if (os.platform() === 'linux') {
        const terminalCommand = 'xterm';
        const fullCommand = `chmod +x ${command.trim()} && ./${command.trim()}`;
        const terminalArgs = ['-e', fullCommand];

        const process = spawn(terminalCommand, terminalArgs, { detached: true, cwd: resolvedDir });
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
