import { CommandGateway } from "../gateways/commandGateway";

export class ExecuteEmulatorUseCase {
  private commandGateway: CommandGateway;

  constructor(commandGateway: CommandGateway) {
    this.commandGateway = commandGateway;
  }

  async executeEmulator(command: string): Promise<string> {
    try {
      const result = await this.commandGateway.executeEmulator(command);
      return result;
    } catch {
      throw new Error("Erro ao iniciar emulador");
    }
  }
}
