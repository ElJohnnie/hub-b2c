import os from 'os';
import { LinuxShellAdapter } from '../adapters/linux/linux-shell-adapter';
import { WindowsShellAdapter } from '../adapters/windows/windows-shell-adapter';

export class ShellFactory {
  static getShellAdapter() {
    if (os.platform() === 'win32') {
      return new WindowsShellAdapter();
    } else if (os.platform() === 'linux') {
      return new LinuxShellAdapter();
    } else {
      throw new Error('Sistema operacional não suportado');
    }
  }
}
