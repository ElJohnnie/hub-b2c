import { ShellAdapter } from '../../../@shared/adapters/shell-adapter';
import { CommandNotProvidedError } from '../../../@shared/exceptions/exceptions';
import { ShellFactory } from '../../../factories/shell-factory';

export default class ExecuteEmulatorUsecase {
  private projectRoot: string;
  private shellAdapter: ShellAdapter;
  private processCommand: any;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.processCommand = undefined;
    this.shellAdapter = ShellFactory.getShellAdapter();
  }

  async execute(body: { command: string }): Promise<any> {
    const { command } = body;

    if (!command) {
      throw new CommandNotProvidedError();
    }

    this.processCommand = this.shellAdapter.openCli(command, [], { detached: true });

    return new Promise<string>((resolve, reject) => {
      this.processCommand.stdout.on('error', (err: any) => {
        reject(new Error(`Erro ao abrir o terminal: ${err}`));
      });
      resolve('AVD aberto com o comando.');
    });
  }
}
