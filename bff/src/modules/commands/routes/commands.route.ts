import { Router } from 'express';
import CommandController from '../controllers/commands.controller';
import CommandUseCase from '../usecases/command.usecase';
import projectRoot from '../../../@shared/config/project-root';

const commandUsecase = new CommandUseCase(projectRoot);
const commandController = new CommandController(commandUsecase);

const commandRouter = Router();

commandRouter.post(
  '/',
  commandController.executeCommand.bind(commandController),
);

export default commandRouter;
