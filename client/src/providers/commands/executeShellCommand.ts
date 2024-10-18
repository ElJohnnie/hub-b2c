import { CommandGateway } from "../../gateways/commandGateway";

export class ExecuteShellCommandProvider {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Erro ao executar shell command");
    }
  }
}
