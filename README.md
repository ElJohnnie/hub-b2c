# Hub B2C

**Hub B2C** é uma aplicação desktop desenvolvida utilizando **Electron**, **React** e **Express** para oferecer uma interface intuitiva e funcional aos desenvolvedores que trabalham na área de **Vivo Telefônica B2C**. Este projeto visa centralizar uma série de rotinas e necessidades de desenvolvimento do time B2C, facilitando o dia a dia e proporcionando uma experiência de usuário dinâmica e responsiva.

A aplicação combina um back-end robusto utilizando **Express.js** com uma interface front-end moderna em **React**, e é projetada para centralizar comandos e a abertura de janelas necessárias para facilitar o fluxo de trabalho dos desenvolvedores.

## Tecnologias Utilizadas

- **Electron**: Para empacotamento e execução do aplicativo como um software desktop.
- **React.js**: Framework JavaScript para construção da interface de usuário.
- **Express.js**: Framework Node.js utilizado para gerenciar as rotas do servidor e API RESTful.
- **Node.js**: Ambiente de execução JavaScript utilizado tanto no front-end quanto no back-end.
- **TypeScript**: Linguagem usada para adicionar tipagem estática ao JavaScript, melhorando a segurança e manutenibilidade do código.
- **Python 3**: Inicialmente para gerar as janelas chromedriver, mas em princípio será descontinuado.

## Pré-requisitos

Antes de iniciar a instalação do projeto, você precisará ter as seguintes ferramentas instaladas no seu sistema:

- [Node.js](https://nodejs.org/) (versão 18.10+)
- [npm](https://www.npmjs.com/)
- [Electron](https://www.electronjs.org/)
- [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads): A aplicação utiliza o ChromeDriver para algumas funcionalidades, como testes ou interação com o navegador, e precisa estar instalado e configurado corretamente. Você pode baixar o ChromeDriver e adicioná-lo ao seu PATH.
- [Python3](https://www.python.org/): O Python3 é necessário para o funcionamento de algumas partes do projeto. Certifique-se de que ele está instalado e configurado corretamente no seu sistema.

**Aviso**: No [Ubuntu](https://ubuntu.com/), o **Xterm** também pode ser necessário para o correto funcionamento da interface gráfica do Electron, pois ele é utilizado para manipulação de terminais em algumas distribuições. Para instalar o Xterm, use o seguinte comando:
    ```bash
    sudo apt install xterm

## Estrutura do Projeto

    hub-b2c/
    ├── client/                     # Aplicação React (front-end)
    │   ├── public/                 
    │   ├── src/
    │   └── build/                  # Arquivos estáticos gerados após build, são direcionados ao public no bff
    ├── bff/                        # Aplicação Express (back-end), responsável por servir tanto o front quanto a camada de serviços
    │   ├── src/
    │   └── dist/                   # Arquivos compilados
    ├── dist/                       # Aplicação empacotada (AppImage, deb, exe, etc.)
    ├── src/                        # Arquivos principais do Electron
    ├── electron-builder.json        # Configuração de empacotamento
    ├── package.json
    └── README.md

## Erros Comuns

### Erro de GLIBCXX
Caso ocorra um erro relacionado ao `libstdc++.so.6`, verifique se todas as dependências do sistema estão atualizadas, ou ajuste as versões de bibliotecas conforme necessário.

### ChromeDriver não encontrado
Se a aplicação falhar ao localizar o ChromeDriver, verifique se ele foi instalado e se está disponível no PATH do sistema. Acesse [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) para obter a versão compatível com o seu navegador.

