import { CommandGateway } from "../gateways/commandGateway";

export class ExecuteShellCommandUseCase {
  private commandGateway: CommandGateway;

  constructor(commandGateway: CommandGateway) {
    this.commandGateway = commandGateway;
  }

  async executeShellCommand(dir: string, command: string): Promise<string> {
    try {
      const result = await this.commandGateway.executeShellCommand(
        dir,
        command,
      );
      return result;
    } catch (error) {
      throw new Error("Erro ao executar shell command");
    }
  }
}
