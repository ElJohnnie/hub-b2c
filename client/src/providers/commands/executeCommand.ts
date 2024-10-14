import { CommandGateway } from "../../gateways/commandGateway";

export class ExecuteCommandProvider {
  private commandGateway: CommandGateway;

  constructor(commandGateway: CommandGateway) {
    this.commandGateway = commandGateway;
  }

  async executeCommand(
    dir: string,
    command: string,
    shell: string
  ): Promise<string> {
    try {
      const result = await this.commandGateway.executeCommand(
        dir,
        command,
        shell
      );
      return result;
    } catch (error: unknown) {
      throw new Error("Erro ao executar comando");
    }
  }
}
