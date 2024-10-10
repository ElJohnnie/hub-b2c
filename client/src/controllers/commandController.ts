import { ExecuteCommandUseCase } from "../usecases/executeCommand";
import { ExecuteShellCommandUseCase } from "../usecases/executeShellCommand";
import { ExecuteEmulatorUseCase } from "../usecases/executeEmulator";
import { CommandGateway } from "../gateways/commandGateway";
import { ExecuteEmulatorListUseCase } from "../usecases/executeEmulatorList";

const executeCommandUseCase = new ExecuteCommandUseCase(new CommandGateway());

const executeShellCommandUseCase = new ExecuteShellCommandUseCase(
  new CommandGateway(),
);
const executeEmulatorUseCase = new ExecuteEmulatorUseCase(new CommandGateway());

const executeEmulatorListUseCase = new ExecuteEmulatorListUseCase(
  new CommandGateway(),
);

export const commandController = {
  async executeCommand(dir: string, command: string, shell: string) {
    try {
      const output = await executeCommandUseCase.executeCommand(
        dir,
        command,
        shell,
      );
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },

  async executeShellCommand(dir: string, command: string) {
    try {
      const output = await executeShellCommandUseCase.executeShellCommand(
        dir,
        command,
      );
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },

  async executeEmulator(command: string) {
    try {
      const output = await executeEmulatorUseCase.executeEmulator(command);
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },

  async executeEmulatorList(): Promise<string[]> {
    try {
      const output: string[] =
        await executeEmulatorListUseCase.executeEmulatorList();
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },
};
