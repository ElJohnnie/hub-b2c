import { CommandGateway } from "../../gateways/commandGateway";

export class OpenWindowProvider {
  private commandGateway: CommandGateway;

  constructor(commandGateway: CommandGateway) {
    this.commandGateway = commandGateway;
  }

  async openWindow(
    dir: string,
    command: string,
    shell: string
  ): Promise<string> {
    try {
      const result = await this.commandGateway.openWindow(
        dir,
        command,
        shell
      );
      return result;
    } catch {
      throw new Error("Erro ao executar comando");
    }
  }
}
