import { CommandGateway } from "../../gateways/commandGateway";

export class ExecuteEmulatorListProvider {
  private commandGateway: CommandGateway;

  constructor(commandGateway: CommandGateway) {
    this.commandGateway = commandGateway;
  }

  async executeEmulatorList(): Promise<string[]> {
    try {
      const result = await this.commandGateway.getAVDsCommand();
      return result;
    } catch (err) {
      if (err) throw new Error("Erro ao executar comando", err);
      throw new Error("Erro ao executar comando");
    }
  }
}
