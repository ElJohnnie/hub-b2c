import path from 'path';
import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';
import { ShellFactory } from '../../../factories/shell-factory';

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

        const shellAdapter = ShellFactory.getShellAdapter();
        
        const fullCommand = `chmod +x ${command.trim()} && ./${command.trim()}`;
        const process = shellAdapter.executeCommand(fullCommand, [], { detached: true, cwd: resolvedDir });

        return new Promise<string>((resolve, reject) => {
            process.on('error', (err: any) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            resolve('Terminal aberto com o comando.');
        });
    }
}
