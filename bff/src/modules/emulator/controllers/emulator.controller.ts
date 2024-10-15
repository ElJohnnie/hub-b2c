import ExecuteEmulatorUsecase from '../usecases/execute-emulator.usecase';
import GetAvdsUsecase from '../usecases/get-avds.usecase';

export default class EmulatorController {
  constructor(
    private executeEmulator: ExecuteEmulatorUsecase,
    private getAvds: GetAvdsUsecase,
  ) {}

  async execute(req: any, res: any) {
    try {
      const result = await this.executeEmulator.execute(req.body);
      res.json({ output: result });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getEmulatorList(req: any, res: any) {
    try {
      const result = await this.getAvds.execute();
      res.json({ output: result });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
