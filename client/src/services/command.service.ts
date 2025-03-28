import { ExecuteCommandProvider } from "../providers/commands/executeCommand";
import { ExecuteShellCommandProvider } from "../providers/commands/executeShellCommand";
import { ExecuteEmulatorProvider } from "../providers/emulator/executeEmulator";
import { CommandGateway } from "../gateways/commandGateway";
import { ExecuteEmulatorListProvider } from "../providers/emulator/executeEmulatorList";
import { OpenWindowProvider } from "../providers/webdriver/openWindow";

const openWindowProvider = new OpenWindowProvider(new CommandGateway());

const executeCommandProvider = new ExecuteCommandProvider(new CommandGateway());

const executeShellCommandProvider = new ExecuteShellCommandProvider(
  new CommandGateway(),
);
const executeEmulatorProvider = new ExecuteEmulatorProvider(new CommandGateway());

const executeEmulatorListProvider = new ExecuteEmulatorListProvider(
  new CommandGateway(),
);

export const commandService = {

  async openWindow(dir: string, command: string, shell: string) {
    try {
      const output = await openWindowProvider.openWindow(
        dir,
        command,
        shell,
      );
      return output;
    } catch (error: unknown) {
      throw new Error((error as Error).message || "Erro ao executar comando");
    }
  },
  
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
