import path from 'path';
import os from 'os';
import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';
import { ShellFactory } from '../../../factories/shell-factory';
import { CommandNotProvidedError, ShellExecutionError, DirectoryNotProvidedError } from '../../../@shared/exceptions/exceptions';

export default class CommandUseCase implements UseCaseInterface {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(body: { dir: string; command: string; shell?: string }) {
        const { dir, command } = body;
    
        if (!dir) {
            throw new DirectoryNotProvidedError();
        }

        if (!command) {
            throw new CommandNotProvidedError();
        }
        
        const resolvedDir = path.resolve(this.projectRoot, dir);
        console.log(`Diretório: ${resolvedDir}`);
        console.log(`Comando: ${command}`);

        const shellAdapter = ShellFactory.getShellAdapter();
        
        let fullCommand: string;

        if (os.platform() === 'win32') {
            fullCommand = `${command.trim()}`;
        } else {
            fullCommand = `sh ${command.trim()}`;
        }

        console.log(`Comando completo: ${fullCommand}`);

        const process = shellAdapter.openCli(fullCommand, [], { detached: true, cwd: resolvedDir });

        return new Promise<string>((resolve, reject) => {
            process.on('error', (err: any) => {
                reject(new ShellExecutionError(err.message));
            });
            resolve('Terminal aberto com o comando.');
        });
    }
}
