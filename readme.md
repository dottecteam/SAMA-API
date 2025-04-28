# **Sistema de Atestados Médicos e Avaliações (SAMA)**
<img src="./src/static/images/logo.jpg" alt="SAMA logo">
<hr>

<br>
<br>

## **🤔 Sobre o projeto**
O **SAMA** é um sistema para **envio de atestados médicos** e **avaliações de equipes ágeis**, ele facilita a gestão de documentos médicos e o acompanhamento do desempenho de times, garantindo maior transparência e eficiência no processo.  

 **🎯 Principais objetivos**
- Digitalizar o envio e armazenamento de atestados médicos.  
- Permitir a avaliação contínua de equipes ágeis.  
- Melhorar a comunicação entre os usuários.  
- Simplificar processos administrativos.

<br> 
<br>

## **📚 Metodologia**

O desenvolvimento do projeto segue a metodologia ágil **Scrum**, uma forma adaptativa, iterativa e flexível, para estruturar o progresso do produto, utilizamos a divisão em **sprints**, garantindo entregas contínuas e de alto valor para o cliente.

<br>
<br>

## **📦 MVP**

✔ **Sprint 1** - Home page, cadastro de atestados, consulta de atestados e página FAQ. <a href='https://drive.google.com/file/d/1ywzBtuB1bd4RrZu-ZCTQt8jgHP-A-EsA/view?usp=sharing'>Clique aqui para acessar o vídeo!</a><br>
✔ **Sprint 2** - Cadastro de usuários, aprovação de atestados, dashboard de atestados, cadastro de equipes ágeis. <a href='https://drive.google.com/file/d/1jTk7eODt-Jak68Yrb946AIikA18FqWzU/view?usp=sharing'>Clique aqui para acessar o vídeo!</a><br>
⌚ **Sprint 3** - Comparador de gráficos e correção de detalhes.<br>

<br> 
<br>

## **📒 Backlog**
ID | Epic | User Story | DOR (Definition of ready) | Effort
-|-|-|-|-
1 | Home page | Como usuário geral, quero acessar a página inicial que contenha informações sobre o sistema e opções de navegação claras, para entender rapidamente o propósito do sistema e facilmente acessar as ferramentas. | Uma página inicial com título, descrição do sistema, seção de navegação e links para ferramentas principais. | 8
2 | Upload de atestados | Como aluno, quero cadastrar minhas informações e enviar atestados médicos, para a secretaria acessar e processar esses dados. | Um formulário que deve permitir o cadastro de informações e o envio de atestados médicos em PDF. | 13
3 | Login de secretaria | Como funcionário da secretaria, quero acessar o sistema de atestados médicos de forma limitada, para administrar os dados dos alunos com segurança. | Login ao sistema que será restrito aos funcionários da secretaria e testes de segurança para garantir que as informações dos alunos estajam protegidas contra acessos não autorizados. | 13
4 | Página de atestados (alunos) | Como aluno, quero visualizar uma lista de atestados médicos, para acessar facilmente as informações sobre meus afastamentos. | Uma lista que deve exibir a data inicial, final e o período do afastamento e a situação dos atestados (exemplos: "em análise", "aprovado" e "rejeitado"). | 13
5 | Página de atestados (secretaria) | Como funcionário da secretaria, quero visualizar uma lista de atestados médicos dos alunos, para gerenciar e acompanhar as informações de afastamento. | Uma lista organizada por data e período de afastamento, exibindo o nome dos alunos e ao clicar, devem ser mostrados detalhes (exemplos: dados pessoais e opção para mudar o status do atestado). | 20
6 | Login de alunos | Como aluno, quero acessar o sistema de atestados médicos, para enviar atestados e consultar minhas informações de forma rápida e centralizada. | Um formulário que possibilite o cadastro de um e-mail e uma senha, e que inclua um processo de confirmação por meio de um código enviado ao e-mail do aluno. | 13
7 | Dashboard (atestados) | Como funcionário da secretaria, quero visualizar uma seção com gráficos sobre as estatísticas dos alunos afastados, para comparar diferentes períodos e identificar tendências. | Gráficos de barras, linhas ou outros tipos gráficos que mostrem o número de alunos afastados por período, o funcionário deve poder selecionar diferentes períodos (exemplos: mensal, trimestral e anual) para comparar os dados, e deve ter uma opção de dowload do gráfico. | 20
8 | Cadastro de equipes | Como avaliador, quero cadastrar minha equipe no sistema, para avaliar seu desempenho, visualizar informações relevantes e tomar decisões mais eficientes. | Um formulário que deve permitir adicionar membros, definir suas funções e deve gerar automaticamente um ID de acesso. | 8
9 | Login de avaliadores | Como avaliador, quero acessar o sistema de equipes, para visualizar e administrar informações detalhadas sobre os membros. | Login ao sistema utilizando uma senha gerada no cadastro da equipe e testes de segurança, para garantir que os dados das equipes estejam protegidos. | 13
10 | Avaliação de equipes | Como avaliador, quero avaliar os membros por meio de métricas de desempenho, identificar pontos fortes e áreas de melhoria, para  ter uma melhor gestão e acompanhamento do time. | Uma seção que deve medir o desempenho por meio de avaliações (exemplo: PACER), atribuir uma nota baseada em critérios predefinidos e exibir um feedback descritivo. | 13
11 | Dashboard (equipes) | Como avaliador, quero acessar uma seção com gráficos sobre as estatísticas de desempenho dos membros, monitorar o progresso e identificar áreas de melhoria, para otimizar o desempenho e apoiar o crescimento contínuo da equipe. | Gráficos de barras, linhas ou outros tipos gráficos que reflitam as métricas de desempenho das equipes e deve haver uma opção de download do gráfico nos formatos PDF e XLSX. | 20
12 | Comparação de gráficos | Como avaliador, quero comparar diferentes gráficos de forma clara e interativa, para identificar facilmente as variações e tendências entre eles e tomar melhores decisões. | O sistema deve permitir que o avaliador selecione dois ou mais gráficos para comparação e deve destacar as variações significativas entre os gráficos de forma visual (exemplos: cores diferentes e indicadores). | 20

<br>
<br>

## **📝 Sprint backlog**
Funcionalidade | Definição de preparado | Prioridade | Sprint
-|-|-|-
Página inicial | Uma página inicial com título, descrição do sistema, seção de navegação e links para ferramentas principais. | Baixa | 1
Envio de atestados | Um formulário que deve permitir o cadastro de informações e o envio de atestados médicos em PDF. | Alta | 1
Acesso de secretaria | Login ao sistema que será restrito aos funcionários da secretaria e testes de segurança para garantir que as informações dos alunos estajam protegidas contra acessos não autorizados. | Alta | 1
Página de atestados (alunos) | Uma lista que deve exibir a data inicial, final e o período do afastamento e a situação dos atestados (exemplos: "em análise", "aprovado" e "rejeitado"). | Média | 1
Página de atestados (secretaria) | Uma lista organizada por data e período de afastamento, exibindo o nome dos alunos e ao clicar, devem ser mostrados detalhes (exemplos: dados pessoais e opção para mudar o status do atestado). | Média | 1
Acesso de alunos | Um formulário que possibilite o cadastro de um e-mail e uma senha, e que inclua um processo de confirmação por meio de um código enviado ao e-mail do aluno. | Média | 2
Painel de gráficos (atestados) | Gráficos de barras, linhas ou outros tipos gráficos que mostrem o número de alunos afastados por período, o funcionário deve poder selecionar diferentes períodos (exemplos: mensal, trimestral e anual) para comparar os dados, e deve ter uma opção de dowload do gráfico. | Média | 2
Cadastro de equipes | Um formulário que deve permitir adicionar membros, definir suas funções e deve gerar automaticamente um ID de acesso. | Média | 2
Acesso de avaliadores | Login ao sistema utilizando uma senha gerada no cadastro da equipe e testes de segurança, para garantir que os dados das equipes estejam protegidos. | Média | 2
Avaliação de equipes | Uma seção que deve medir o desempenho por meio de avaliações (exemplo: PACER), atribuir uma nota baseada em critérios predefinidos e exibir um feedback descritivo. | Alta | 3
Painel de gráficos (equipes) | Gráficos de barras, linhas ou outros tipos gráficos que reflitam as métricas de desempenho das equipes e deve haver uma opção de download do gráfico nos formatos PDF e XLSX. | Média | 3
Comparação de gráficos | Um sistema que deve permitir que o avaliador selecione dois ou mais gráficos para comparação e deve destacar as variações significativas entre os gráficos de forma visual (exemplos: cores diferentes e indicadores). | Média | 3

<br>
<br>

## **💻 Linguagens utilizadas**

<br>

<p align="center">
      <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
      <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
      <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>

<br>
<br>

## **🚀 Recursos**

Para garantir um sistema mais funcional e eficiente, o **SAMA** está sendo desenvolvido utilizando as seguintes tecnologias:

- **[Bootstrap](https://getbootstrap.com/)**: Biblioteca de CSS para criar interfaces modernas, responsivas e com design flexível.
- **[jQuery](https://jquery.com/)**: Biblioteca de JavaScript que facilita a manipulação de elementos HTML e a criação de interações dinâmicas no front-end.
- **[Flask](https://flask.palletsprojects.com/)**: Biblioteca de Python para o desenvolvimento do back-end, garantindo um servidor simples para o gerenciamento de requisições.
- **[Visual Studio Code](https://code.visualstudio.com/)**: Editor de código leve e versátil, com suporte a extensões e múltiplas linguagens.
- **Ajax**: Tecnologia web que permite a atualização dinâmica de partes da página.

<br>
<br>

## **👨‍💻 Colaboradores**

Nome | Função | Github | Linkedin
-|-|-|-
Cauã Mehiel Faria Cursino | Developer | <a href="https://github.com/Cacow69"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/cauã-cursino-748485235/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
Gabriel Borges de Toledo | Developer | <a href="https://github.com/Gabe-Borges"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/gabriel-borges-de-toledo-b922a433b/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
Guilherme Silva Corrêa | Developer | <a href="https://github.com/Vaporwaffle"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/guilherme-silva-corr%C3%AAa-a4a36b316/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
João Paulo Aparecido Santos | Scrum master | <a href="https://github.com/jopaul0"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/joaosantos02/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
Kauan Victor Domingues do Nascimento | Developer | <a href="https://github.com/KauanDomingues"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/kauan-domingues-3b00a5276/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
Luiz Gabriel Lakner dos Santos | Developer | <a href="https://github.com/Lakner13"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/gabriel-lakner-734528264/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin$logoColor=white"> </a>
Ramon Batista Varjão | Product owner | <a href="https://github.com/gitDeRamon"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
