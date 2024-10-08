import { Router } from 'express';
import { executeCommand, executeEmulator, executeShellCommand, testCommand } from '../controllers/commandController';

const router = Router();

router.post('/execute-command', executeCommand);
router.post('/execute-emulator', executeEmulator);
router.post('/execute-shell-command', executeShellCommand);
router.post('/test-command', testCommand);

export default router;
