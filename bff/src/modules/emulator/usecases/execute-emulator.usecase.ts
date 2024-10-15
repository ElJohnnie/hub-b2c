import { CommandNotProvidedError } from '../../../@shared/exceptions/exceptions';
import { ShellFactory } from '../../../factories/shell-factory';

export default class ExecuteEmulatorUsecase {
    private projectRoot: string;

    constructor(projectRoot: string) {
        this.projectRoot = projectRoot;
    }

    async execute(body: { command: string }): Promise<any> {
        const { command } = body;

        if (!command) {
            throw new CommandNotProvidedError();
        }
        
        console.log(`Comando: ${command}`);

        const shellAdapter = ShellFactory.getShellAdapter();

        const process = shellAdapter.openCli(command, [], { detached: true });

        return new Promise<string>((resolve, reject) => {
            process.stdout.on("error", (err: any) => {
                reject(new Error(`Erro ao abrir o terminal: ${err}`));
            });
            resolve("AVD aberto com o comando.");
        });
    }
}
