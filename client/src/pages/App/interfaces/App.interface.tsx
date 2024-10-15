export interface IApp {
  handleOpenWindow: (dir: string, command: string, shell: string) => void;
  handleExecuteCommand: (dir: string, command: string, shell: string) => void;
  handleExecuteShellCommand: (dir: string, command: string) => void;
  avdList: string[];
  output: string;
  category: string;
  setCategory: (category: string) => void;
  avdName: string;
  setAvdName: (avdName: string) => void;
  gpuOption: string;
  setGpuOption: (gpuOption: string) => void;
  handleSubmit: () => void;
  isDesktopOrBigger: boolean;
}
