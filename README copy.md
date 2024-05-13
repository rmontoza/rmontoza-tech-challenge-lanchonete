# tech-challenge-lanchonete
Projeto de Trabalho FIAP - Arquitetura de Sistemas

Necessário ter instalado no computador o DOCKER
Guia de instalação:

1) Windows
https://docs.docker.com/desktop/install/windows-install/
2) Linux
https://docs.docker.com/desktop/install/ubuntu/
3) Mac
https://docs.docker.com/desktop/install/mac-install/


Comando para executar e encerrar a aplicação :

A) Primeira execução:
    docker-compose up --build
B) Encerrar a aplicação
    docker-compose down
C) Executar sem o build /  Serve para executar as demais vezes após a compilação dos containers.
    docker-compose up


Para Desevolver:

1) Necessário ter o NodeJs V20 instalado.
2) IDE utilizo VSCode mas pode ser algum de preferência
3) Instalar o MongoDB. 
    https://www.mongodb.com/docs/manual/administration/install-community/
4) Instalar o Compass, gerenciador do MongoDB
    https://www.mongodb.com/docs/compass/current/install/
    
Passos para instalação simples do NodeJs.
1) Instalar o NVM (Gerenciador de versões do NodeJs)
    https://github.com/nvm-sh/nvm
2) Após a instalação do NVM, executar o seguinte comando para baixar e instalar o NodeJs.
    nvm install v20
3) Após a instalação do node com o comando supracitado, abrir a aplicação no VSCode ou a IDE de preferência, e executar os seguintes comandos:
    A) npm i
    B) npm start



