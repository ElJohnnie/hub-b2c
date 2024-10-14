import { ExecuteCommandProvider } from "../providers/executeCommand";
import { ExecuteShellCommandProvider } from "../providers/executeShellCommand";
import { ExecuteEmulatorProvider } from "../providers/executeEmulator";
import { CommandGateway } from "../gateways/commandGateway";
import { ExecuteEmulatorListProvider } from "../providers/executeEmulatorList";

const executeCommandProvider = new ExecuteCommandProvider(new CommandGateway());

const executeShellCommandProvider = new ExecuteShellCommandProvider(
  new CommandGateway(),
);
const executeEmulatorProvider = new ExecuteEmulatorProvider(new CommandGateway());

const executeEmulatorListProvider = new ExecuteEmulatorListProvider(
  new CommandGateway(),
);

export const commandService = {
  async executeCommand(dir: string, command: string, shell: string) {
    try {
      const output = await executeCommandProvider.executeCommand(
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
      const output = await executeShellCommandProvider.executeShellCommand(
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
      const output = await executeEmulatorProvider.executeEmulator(command);
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },

  async executeEmulatorList(): Promise<string[]> {
    try {
      const output: string[] =
        await executeEmulatorListProvider.executeEmulatorList();
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },
};
