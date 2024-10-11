export interface IApp {
  handleExecuteCommand: (dir: string, command: string, shell: string) => void;
  handleExecuteShellCommand: (dir: string, command: string) => void;
  handleExecuteEmulator: (command: string) => void;
  avdList: string[];
  output: string;
}
