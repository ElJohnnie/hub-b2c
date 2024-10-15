import path from 'path';
import os from 'os';
import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';
import { ShellFactory } from '../../../factories/shell-factory';
import { ShellAdapter } from '../../../@shared/adapters/shell-adapter';
import {
  CommandNotProvidedError,
  ShellExecutionError,
} from '../../../@shared/exceptions/exceptions';

export default class CommandUseCase implements UseCaseInterface {
  private projectRoot: string;
  private resolvedDir: string;
  private finalCommand: string;
  private processCommand: any;
  private shellAdapter: ShellAdapter;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.resolvedDir = '';
    this.finalCommand = '';
    this.processCommand = undefined;
    this.shellAdapter = ShellFactory.getShellAdapter();
  }

  async execute(body: { dir: string; command: string; shell?: string }) {
    console.log('Executando comando');
    const { dir, command } = body;

    if (!command) {
      throw new CommandNotProvidedError();
    }

    if (dir){
      this.resolvedDir = path.resolve(this.projectRoot, dir);
      console.log(`Diretório: ${this.resolvedDir}`);
    }
    console.log(`Diretório: ${this.resolvedDir}`);
    console.log(`Comando: ${command}`);

    if (os.platform() === 'win32') {
      this.finalCommand = `${command.trim()}`;
    } else {
      this.finalCommand = `sh ${command.trim()}`;
    }

    console.log(`Comando completo: ${this.finalCommand}`);

    if (dir) {
      this.processCommand = this.shellAdapter.openCli(this.finalCommand, [], {
        detached: true,
        cwd: this.resolvedDir,
      });
    } else {
      console.log('Abrindo terminal sem diretório');
      this.processCommand = this.shellAdapter.runScript(undefined, [command], {
        detached: true,
      });
    }

    return new Promise<string>((resolve, reject) => {
      this.processCommand.on('error', (err: any) => {
        reject(new ShellExecutionError(err.message));
      });
      resolve('Terminal aberto com o comando.');
    });
  }
}
