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

        process.on('close', (code) => {
            if (code !== 0) {
                reject(errorOutput);
            } else {
                resolve(output);
            }
        });
    });
};
