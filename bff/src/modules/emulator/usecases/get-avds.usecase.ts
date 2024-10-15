import path from 'path';
import os from 'os';
import { ShellFactory } from '../../../factories/shell-factory';
import { DataCaptureError } from '../../../@shared/exceptions/exceptions';
import { ProcessExecutionError } from '../../../@shared/exceptions/exceptions';
import { ShellAdapter } from '../../../@shared/adapters/shell-adapter';

export default class GetAvdsUsecase {
  private projectRoot: string;
  private scriptPath: string;
  private scriptFile: string;
  private shellAdapter: ShellAdapter;
  private processCommand: any;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.scriptPath = '';
    this.scriptFile = '';
    this.shellAdapter = ShellFactory.getShellAdapter();
  }

  async execute(): Promise<any> {
    this.scriptPath = path.join(this.projectRoot, 'scripts');

    console.log(`Script Path: ${this.scriptPath}`);

    this.scriptFile =
      os.platform() === 'win32'
        ? path.join(this.scriptPath, 'getAdvs.bat')
        : path.join(this.scriptPath, 'getAdvs.sh');

    console.log(`Script: ${this.scriptFile}`);

    this.processCommand = this.shellAdapter.runScript(this.scriptFile, [], { detached: false });

    return new Promise<string[]>((resolve, reject) => {
      let output = '';

      this.processCommand.stdout.on('data', (data: { toString: () => string }) => {
        console.log(data.toString());
        output += data.toString();
      });

      this.processCommand.stderr.on('data', (err: any) => {
        console.error(err.toString());
        reject(new DataCaptureError(err.toString()));
      });

      this.processCommand.on('close', (code: number) => {
        if (code === 0) {
          console.log('Processo terminou com sucesso');
          resolve(output.split('\n').filter((item) => item.trim()));
        } else {
          console.error(`Processo terminou com código: ${code}`);
          reject(new ProcessExecutionError(code));
        }
      });
    });
  }
}
