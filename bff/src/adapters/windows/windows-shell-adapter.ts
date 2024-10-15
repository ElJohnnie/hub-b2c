import { spawn } from 'child_process';
import { ShellAdapter } from '../../@shared/adapters/shell-adapter';
import path from 'path';

export class WindowsShellAdapter extends ShellAdapter {
  openCli(command: string, args: string[], options: any) {
    const terminalCommand = 'cmd.exe';
    const terminalArgs = ['/c', 'start', 'cmd.exe', '/k', command, ...args];
    return spawn(terminalCommand, terminalArgs, options);
  }

  runScript(scriptPath: string, args: string[] = [], options: any) {
    const script = path.resolve(scriptPath);
    return spawn('cmd.exe', ['/c', script, ...args], options);
  }
}
