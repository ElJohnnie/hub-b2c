import { spawn } from 'child_process';
import os from 'os';

export const executeEmulatorUseCase = async (body: { command: string }) => {
    const { command } = body;

    if (os.platform() === 'win32') {
        const terminalCommand = 'cmd.exe';
        const terminalArgs = ['/c', 'start', 'cmd.exe', '/k', command];

        const process = spawn(terminalCommand, terminalArgs, { detached: true });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            process.on('close', (code) => {
                if (code === 127) {
                    reject('Erro: Comando não encontrado.');
                } else {
                    resolve('Terminal aberto com o comando no Windows.');
                }
            });
        });
    } else if (os.platform() === 'linux') {
        const terminalCommand = 'xterm';
        const terminalArgs = ['-hold', '-e', command];

        const process = spawn(terminalCommand, terminalArgs, { detached: true });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            process.on('close', (code) => {
                if (code === 127) {
                    reject('Erro: Comando não encontrado.');
                } else {
                    resolve('Terminal aberto com o comando no Linux.');
                }
            });
        });
    } else {
        throw new Error('Sistema operacional não suportado');
    }
};
