import OpenWindowUsecase from "../usecases/open-window.usecase";


export default class OpenWindowController {
    constructor(
        private openWindowUsecase: OpenWindowUsecase,
    ) {}
    
    async openWindow(req: any, res: any) { 
        try {
            const result = await this.openWindowUsecase.execute(req.body);
            res.json({ output: result });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}