import { exec, spawn } from 'child_process';
import { ShellAdapter } from '../../@shared/adapters/shell-adapter';
import path from 'path';

export class LinuxShellAdapter extends ShellAdapter {
  openCli(command: string, args: string[], options: any) {
    const terminalCommand = 'xterm';
    const terminalArgs = ['-e', command, ...args];
    console.log(`Comando: ${terminalArgs}`);
    return spawn(terminalCommand, terminalArgs, options);
  }

  runScript(scriptPath?: string, args: string[] = [], options?: any) {
    if (!scriptPath) {
      return spawn('bash', [...args], options);
    }
    const script = path.resolve(scriptPath);
    return spawn('bash', [script, ...args], options);
  }

  runWebdriver(command: string, scriptDir: string) {
    return exec(command, { shell: '/bin/bash', cwd: scriptDir });
  }
}
