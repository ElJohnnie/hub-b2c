import { spawn, exec } from 'child_process';
import { ShellAdapter } from '../../@shared/adapters/shell-adapter';
import path from 'path';

export class WindowsShellAdapter extends ShellAdapter {
  openCli(command: string, args: string[], options: any) {
    const terminalCommand = 'cmd.exe';
    const terminalArgs = ['/c', 'start', 'cmd.exe', '/k', command, ...args];
    return spawn(terminalCommand, terminalArgs, options);
  }

  runScript(scriptPath?: string, args: string[] = [], options?: any) {
    if (!scriptPath) {
      return spawn('cmd.exe', ['/c', ...args], options);
    }
    const script = path.resolve(scriptPath);
    return spawn('cmd.exe', ['/c', script, ...args], options);
  }

  runWebdriver(command: string, scriptDir: string) {
    return exec(command, { shell: 'cmd.exe', cwd: scriptDir });
  }
}
