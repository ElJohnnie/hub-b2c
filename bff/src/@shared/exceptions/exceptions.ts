export class DirectoryNotProvidedError extends Error {
    constructor() {
        super('Diretório não informado.');
        this.name = 'DirectoryNotProvidedError';
    }
}

export class CommandNotProvidedError extends Error {
    constructor() {
        super('Comando não informado.');
        this.name = 'CommandNotProvidedError';
    }
}

export class ShellExecutionError extends Error {
    constructor(message: string) {
        super(`Erro ao abrir o terminal e ou executar comando: ${message}`);
        this.name = 'ShellExecutionError';
    }
}

export class DataCaptureError extends Error {
    constructor(message: string) {
        super(`Erro ao capturar os dados: ${message}`);
        this.name = 'DataCaptureError';
    }
}

export class ProcessExecutionError extends Error {
    constructor(code: number) {
        super(`Processo terminou com código: ${code}`);
        this.name = 'ProcessExecutionError';
    }
}

export class ProcessOutputError extends Error {
    constructor(message: string) {
        super(`Erro capturado no stderr: ${message}`);
        this.name = 'ProcessOutputError';
    }
}

