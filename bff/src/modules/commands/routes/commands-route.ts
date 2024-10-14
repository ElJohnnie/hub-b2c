import { Router } from 'express';
import CommandController from '../controllers/commands-controller';
import CommandUseCase from '../usecases/command.use-case';
import projectRoot from '../../@shared/config/project-root';

const commandController = new CommandController(
    new CommandUseCase(projectRoot)
);

const commandRouter = Router();

commandRouter.post('/', commandController.executeCommand);

export default commandRouter;