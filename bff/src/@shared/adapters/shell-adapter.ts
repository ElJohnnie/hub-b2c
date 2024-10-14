export abstract class ShellAdapter {
  abstract executeCommand(command: string, args: string[], options: any): any;

  abstract runScript(scriptPath: string, args: string[], options: any): any;
}
