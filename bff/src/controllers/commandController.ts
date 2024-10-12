import { Request, Response } from 'express';
import { executeCommandUseCase } from '../usecases/executeCommand';
import { executeEmulatorUseCase } from '../usecases/executeEmulator';
import { executeShellCommandUseCase } from '../usecases/executeShellCommand';
import { getEmulatorListUseCase } from '../usecases/executeEmulator';
import { testCommandUseCase } from '../usecases/testCommand';

export const executeCommand = async (req: Request, res: Response) => {
    try {
        const result = await executeCommandUseCase(req.body);
        console.log(result);
        res.json({ output: result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const executeEmulator = async (req: Request, res: Response) => {
    try {
        const result = await executeEmulatorUseCase(req.body);
        res.json({ output: result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const executeGetEmulatorList = async (req: Request, res: Response) => {
    try {
        const result = await getEmulatorListUseCase();
        res.json({ output: result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const executeShellCommand = async (req: Request, res: Response) => {
    try {
        const result = await executeShellCommandUseCase(req.body);
        res.json({ output: result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const testCommand = async (req: Request, res: Response) => {
    try {
        const result = await testCommandUseCase();
        res.json({ output: result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
