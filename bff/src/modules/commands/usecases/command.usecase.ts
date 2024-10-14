import { spawn } from 'child_process';
import path from 'path';
import os from 'os';
import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';

export default class CommandUseCase implements UseCaseInterface {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(body: { dir: string; command: string; shell?: string }) {
        const { dir, command } = body;
    
        const resolvedDir = path.resolve(this.projectRoot, dir);
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
    }
}