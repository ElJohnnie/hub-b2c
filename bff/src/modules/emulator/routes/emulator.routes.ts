import { Router } from 'express';
import EmulatorController from '../controllers/emulator.controller';
import ExecuteEmulatorUsecase from '../usecases/execute-emulator.usecase';
import GetAvdsUsecase from '../usecases/get-avds.usecase';
import projectRoot from '../../../@shared/config/project-root';

const emulatorController = new EmulatorController(
    new ExecuteEmulatorUsecase(projectRoot), 
    new GetAvdsUsecase(projectRoot)
);

const emulatorRouter = Router();

emulatorRouter.post('/', emulatorController.execute.bind(emulatorController));
emulatorRouter.get('/list', emulatorController.getEmulatorList.bind(emulatorController));

export default emulatorRouter;