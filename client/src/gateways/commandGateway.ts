export class CommandGateway {
  async executeCommand(
    dir: string,
    command: string,
    shell: string
  ): Promise<string> {
    const response = await fetch('http://localhost:5000/execute-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dir, command, shell }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao executar comando');
    }

    const data = await response.json();
    return data.output || 'Erro na resposta';
  }

  async executeEmulator(command: string): Promise<string> {
    const response = await fetch('http://localhost:5000/execute-emulator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao iniciar emulador');
    }

    const data = await response.json();
    return data.output || 'Erro na resposta';
  }

  async executeShellCommand(dir: string, command: string): Promise<string> {
    const response = await fetch(
      'http://localhost:5000/execute-shell-command',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dir, command }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao executar comando shell');
    }

    const data = await response.json();
    return data.output || 'Erro na resposta';
  }

  async testCommand(): Promise<string> {
    const response = await fetch('http://localhost:5000/test-command', {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao executar comando de teste');
    }

    const data = await response.json();
    return data.output || 'Erro na resposta';
  }

  async getAVDsCommand(): Promise<string> {
    const response = await fetch('http://localhost:5000/execute-emulator-list', {
      method: 'GET',
    });

    console.log(response);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao executar comando de teste');
    }

    const data = await response.json();
    return data.output || 'Erro na resposta';
  }
}
