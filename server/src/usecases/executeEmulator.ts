import { spawn } from 'child_process';
import os from 'os';

export const executeEmulatorUseCase = async (body: { command: string }) => {
    const { command } = body;

    if (os.platform() === 'win32') {
        const terminalCommand = 'cmd.exe';
        const terminalArgs = ['/c', 'start', 'cmd.exe', '/k', command];

        const process = spawn(terminalCommand, terminalArgs, { detached: true });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            process.on('close', (code) => {
                if (code === 127) {
                    reject('Erro: Comando não encontrado.');
                } else {
                    resolve('Terminal aberto com o comando no Windows.');
                }
            });
        });
    } else if (os.platform() === 'linux') {
        const terminalCommand = 'xterm';
        const terminalArgs = ['-hold', '-e', command];

        const process = spawn(terminalCommand, terminalArgs, { detached: true });
        return new Promise<string>((resolve, reject) => {
            process.on('error', (err) => {
                reject(`Erro ao abrir o terminal: ${err}`);
            });
            process.on('close', (code) => {
                if (code === 127) {
                    reject('Erro: Comando não encontrado.');
                } else {
                    resolve('Terminal aberto com o comando no Linux.');
                }
            });
        });
    } else {
        throw new Error('Sistema operacional não suportado');
    }
};


export const getEmulatorListUseCase = () => {
    if (os.platform() === "win32") {
        const bashRun = spawn("/bin/bash", ["../scripts/getAdvs.bat"]);
		return new Promise<string>((resolve, reject) => {
			bashRun.on("error", (err) => {
			reject(`Erro ao abrir o terminal: ${err}`);
			});
			bashRun.stderr.on("data", (err) => {
			reject(`Erro ao capturar os dados: ${err}`);
			});
			bashRun.stdout.on("data", (data) => {
			resolve(data);
			console.log("stdout: ${data}");
			});
		});
    } else if (os.platform() === "linux") {
		const bashRun = spawn("bash", ["../scripts/getAdvs.bat"]);
		return new Promise<string>((resolve, reject) => {
			bashRun.on("error", (err) => {
			reject(`Erro ao abrir o terminal: ${err}`);
			});
			bashRun.stderr.on("data", (err) => {
			reject(`Erro ao capturar os dados: ${err}`);
			});
			bashRun.stdout.on("data", (data) => {
			resolve(data);
			console.log("stdout: ${data}");
			});
		});
    }
  
    throw new Error("Sistema operacional não suportado");
};