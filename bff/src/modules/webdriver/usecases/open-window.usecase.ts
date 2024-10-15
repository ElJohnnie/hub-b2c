import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';
import path from 'path';
import { ShellFactory } from '../../../factories/shell-factory';
import { ProcessExecutionError } from '../../../@shared/exceptions/exceptions';
import { ProcessOutputError } from '../../../@shared/exceptions/exceptions';

export default class OpenWindowUsecase implements UseCaseInterface {
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async execute(body: {
    dir: string;
    command: string;
    shell?: string;
  }): Promise<any> {
    const { dir, command, shell } = body;

    const scriptDir = path.join(this.projectRoot, dir);
    console.log(`Diretório do script: ${scriptDir}`);
    console.log(`Comando: ${command}`);

    const shellAdapter = ShellFactory.getShellAdapter();

    const process = shellAdapter.runWebdriver(command, scriptDir);

    return new Promise<string>((resolve, reject) => {
      let output = '';

      process.stdout?.on('data', (data: { toString: () => string }) => {
        output += data.toString();
        console.log(`Saída: ${data.toString()}`);
      });

      process.stderr?.on('data', (error: { toString: () => string }) => {
        console.log(`Erro: ${error.toString()}`);
        reject(new ProcessOutputError(error.toString()));
      });

      process.on('close', (code: number) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new ProcessExecutionError(code));
        }
      });

      process.on('error', (err: any) => {
        console.log(err);
        reject(new ProcessExecutionError(err.toString()));
      });
    });
  }
}
