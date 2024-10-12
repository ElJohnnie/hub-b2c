import { spawn } from 'child_process';

export const testCommandUseCase = () => {
    const simpleCommand = 'echo Hello World';
    const process = spawn('bash', ['-c', simpleCommand]);

    let output = '';
    let errorOutput = '';

    return new Promise<string>((resolve, reject) => {
        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        process.on('error', (err) => {
            reject(`Erro ao abrir o terminal: ${err}`);
        });

        resolve('Terminal aberto com o comando.');
    });
};

