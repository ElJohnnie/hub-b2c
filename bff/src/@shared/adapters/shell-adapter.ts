export abstract class ShellAdapter {
  abstract openCli(command: string, args: string[], options: any): any;

  abstract runScript(scriptPath: string, args: string[], options: any): any;
}
