import { ExecuteCommandUseCase } from '../usecases/executeCommand';
import { ExecuteShellCommandUseCase } from '../usecases/executeShellCommand';
import { ExecuteEmulatorUseCase } from '../usecases/executeEmulator';
import { CommandGateway } from '../gateways/commandGateway';

const executeCommandUseCase = new ExecuteCommandUseCase(new CommandGateway());
const executeShellCommandUseCase = new ExecuteShellCommandUseCase(
  new CommandGateway()
);
const executeEmulatorUseCase = new ExecuteEmulatorUseCase(new CommandGateway());

export const commandController = {
  async executeCommand(dir: string, command: string, shell: string) {
    try {
      const output = await executeCommandUseCase.executeCommand(
        dir,
        command,
        shell
      );
      return output;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao executar comando');
    }
  },

  async executeShellCommand(dir: string, command: string) {
    try {
      const output = await executeShellCommandUseCase.executeShellCommand(
        dir,
        command
      );
      return output;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao executar shell command');
    }
  },

  async executeEmulator(command: string) {
    try {
      const output = await executeEmulatorUseCase.executeEmulator(command);
      return output;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao iniciar emulador');
    }
  },
};
