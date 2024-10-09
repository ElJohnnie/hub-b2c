import { CommandGateway } from '../gateways/commandGateway';

export class ExecuteEmulatorListUseCase {
  private commandGateway: CommandGateway;

  constructor(commandGateway: CommandGateway) {
    this.commandGateway = commandGateway;
  }

  async executeEmulatorList(): Promise<string> {
    try {
      const result = await this.commandGateway.getAVDsCommand();
      return result;
    } catch(err) {
      return String(err);
    }
  }

}
