import { Router } from 'express';
import OpenWindowController from '../controller/webdriver.controller';
import OpenWindowUsecase from '../usecases/open-window.usecase';
import projectRoot from '../../../@shared/config/project-root';

const openWindowRouter = Router();

const openWindowController = new OpenWindowController(new OpenWindowUsecase(projectRoot));


openWindowRouter.post('/', openWindowController.openWindow.bind(openWindowController));


export default openWindowRouter;