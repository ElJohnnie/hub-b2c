export interface ShellAdapter {
  openCli(command: string, args: string[], options: any): any;
  runScript(scriptPath?: string, args?: string[], options?: any): any;
  runWebdriver(command: string, scriptDir: string): any;
}
