import UseCaseInterface from '../../../@shared/modules/usecases/use-cases.interface';

export default class CommandController {
  constructor(private CommandUsecase: UseCaseInterface) {}

  async executeCommand(req: any, res: any) {
    try {
      const result = await this.CommandUsecase.execute(req.body);
      console.log(result);
      res.json({ output: result });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
