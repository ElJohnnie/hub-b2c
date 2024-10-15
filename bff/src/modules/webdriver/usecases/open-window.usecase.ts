import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';
import path from 'path';
import { ShellFactory } from '../../../factories/shell-factory';
import { ProcessExecutionError } from '../../../@shared/exceptions/exceptions';
import { ProcessOutputError } from '../../../@shared/exceptions/exceptions';
import { ShellAdapter } from '../../../@shared/adapters/shell-adapter';

export default class OpenWindowUsecase implements UseCaseInterface {
  private projectRoot: string;
  private scriptPath: string;
  private scriptFile: string;
  private shellAdapter: ShellAdapter;
  private processCommand: any;

  constructor(projectRoot: string) {
    this.scriptPath = ''; 
    this.scriptFile = '';
    this.projectRoot = projectRoot;
    this.shellAdapter = ShellFactory.getShellAdapter();
  }

  async execute(body: {
    dir: string;
    command: string;
    shell?: string;
  }): Promise<any> {
    const { dir, command, shell } = body;

    this.scriptPath = path.join(this.projectRoot, dir);
    console.log(`Diretório do script: ${this.scriptPath}`);
    console.log(`Comando: ${command}`);


    this.processCommand = this.shellAdapter.runWebdriver(command, this.scriptPath);

    return new Promise<string>((resolve, reject) => {
      let output = '';

      this.processCommand.stdout?.on('data', (data: { toString: () => string }) => {
        output += data.toString();
        console.log(`Saída: ${data.toString()}`);
      });

      this.processCommand.stderr?.on('data', (error: { toString: () => string }) => {
        console.log(`Erro: ${error.toString()}`);
        reject(new ProcessOutputError(error.toString()));
      });

      this.processCommand.on('close', (code: number) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new ProcessExecutionError(code));
        }
      });

      this.processCommand.on('error', (err: any) => {
        console.log(err);
        reject(new ProcessExecutionError(err.toString()));
      });
    });
  }
}
