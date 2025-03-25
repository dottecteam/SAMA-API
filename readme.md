# **Sistema de Atestados Médicos e Avaliações (SAMA)**
<p align="center">
      <img src="./src/static/images/logo.jpg" alt="logo do SAMA">
<br>
<hr>
<br>

## 📖 Objetivo do Projeto

>O **SAMA** é um sistema para **envio de atestados médicos** e **avaliações de equipes ágeis**. Ele facilita a gestão de documentos médicos e o acompanhamento do desempenho de times, garantindo maior transparência e eficiência no processo.  

💡 **Principais objetivos:**  
✔ Digitalizar o envio e armazenamento de atestados médicos.  
✔ Permitir a avaliação contínua de equipes ágeis.  
✔ Melhorar a comunicação entre funcionários e gestores.  
✔ Simplificar processos administrativos.

<br> 

## 📚Metodologia

O desenvolvimento do projeto seguiu o framework ágil Scrum, um método adaptativo, iterativo e flexível. Para estruturar o progresso do produto, utilizamos a divisão em Sprints, garantindo entregas contínuas e de alto valor para o cliente.

<br>
</br>

## 🚀 **Recursos**

O **SAMA** foi desenvolvido utilizando as seguintes tecnologias e bibliotecas para garantir um sistema funcional e eficiente:

- **[Bootstrap](https://getbootstrap.com/)**: Framework CSS responsivo para criar interfaces modernas e acessíveis com design flexível.
- **[Bootstrap Icons](https://icons.getbootstrap.com/)**: Conjunto de ícones de alta qualidade que foram integrados para melhorar a experiência visual do usuário.
- **[jQuery](https://jquery.com/)**: Biblioteca JavaScript que facilita a manipulação de elementos HTML e a criação de interações dinâmicas no frontend.
- **[Flask](https://flask.palletsprojects.com/)**: Framework web em Python utilizado para o desenvolvimento do backend, garantindo um servidor simples e poderoso para o gerenciamento de requisições.

Essas tecnologias foram escolhidas para proporcionar uma aplicação rápida, com um design responsivo e funcionalidades dinâmicas, atendendo aos requisitos do sistema de forma eficiente.

<br>
</br>

## **Backlog do Produto**


| **ID** | **Epic**                  | **User Story**                                                                 | **DOR (Definição de Preparado)**                                                                                                                                                        | **Effort** | **Sprint** |
|--------|---------------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|------------|
| 1      | Home page                 | Como usuário geral, quero acessar a página inicial para entender o propósito do sistema e acessar ferramentas. | Uma página inicial com título, descrição do sistema, seção de navegação e links para ferramentas principais.                                                                            | 8          | 1          |
| 2      | Cadastro de atestados     | Como aluno, quero cadastrar minhas informações pessoais e enviar atestados médicos para a secretaria. | Formulário para cadastro de informações pessoais e envio de atestados médicos em PDF.                                                                                                     | 13         | 1          |
| 3      | Acesso de secretaria      | Como funcionário da secretaria, quero acessar o sistema de atestados médicos de forma limitada. | Login para acesso restrito à secretaria e testes de segurança para garantir a proteção dos dados.                                                                                         | 13         | 1          |
| 4      | Página de atestados (alunos) | Como aluno, quero visualizar uma lista de atestados médicos para acessar informações sobre meus afastamentos. | Lista organizada por ordem alfabética com nome do aluno e status dos atestados (exemplos: "em análise", "aprovado" e "rejeitado").                                                        | 13         | 1          |
| 5      | Página de atestados (secretaria) | Como funcionário da secretaria, quero visualizar a lista de atestados médicos dos alunos para gerenciar as informações. | Lista organizada por data e período de afastamento, com detalhes ao clicar sobre o atestado (dados pessoais e status).                                                                   | 20         | 1          |
| 6      | Dashboard (atestados)      | Como funcionário da secretaria, quero visualizar gráficos sobre as estatísticas dos alunos afastados. | Gráficos de barras, linhas ou outros tipos, com filtros para comparar diferentes períodos (mensal, trimestral, anual) e opção de download.                                             | 20         | 2          |
| 7      | Cadastro de equipes       | Como avaliador, quero cadastrar minha equipe no sistema para avaliar seu desempenho. | Formulário que permite adicionar membros, definir funções e gerar automaticamente um código de acesso personalizável.                                                                  | 8          | 2          |
| 8      | Acesso de avaliadores     | Como avaliador, quero acessar o sistema de equipes para administrar informações dos membros. | Login com código gerado no cadastro da equipe e testes de segurança para proteger os dados.                                                                                             | 13         | 2          |
| 9      | Avaliação de equipes      | Como avaliador, quero avaliar os membros da equipe por meio de métricas de desempenho. | Seção para medir desempenho com avaliações baseadas em critérios (exemplo: PACER), nota e feedback descritivo.                                                                         | 13         | 2          |
| 10     | Dashboard (equipes)       | Como avaliador, quero acessar gráficos sobre o desempenho das equipes e identificar áreas de melhoria. | Gráficos de desempenho das equipes com opção de download nos formatos PDF e XLSX.                                                                                                      | 20         | 2          |
| 11     | Comparação de gráficos    | Como avaliador, quero comparar diferentes gráficos de desempenho para identificar variações e tendências. | Sistema para selecionar e comparar dois ou mais gráficos, destacando variações visuais com cores e indicadores.                                                                        | 20         | 3          |

<br>
</br>

## 👨‍💻**Colaboradores** 

|      Nome      |    Função       |                            Github                             |                           Linkedin                           |
| :--------------: | :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  Cauã Mehiel Faria Cursino  | Developer  | <a href="https://github.com/Cacow69"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/cauã-cursino-748485235/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> |
|  Gabriel Borges de Toledo  | Developer | <a href="https://github.com/Gabe-Borges"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/gabriel-borges-de-toledo-b922a433b/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin$logoColor=white"> </a>
|  Guilherme Silva Corrêa  | Developer | <a href="https://github.com/Vaporwaffle"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> |<a href="https://www.linkedin.com/in/guilherme-silva-corr%C3%AAa-a4a36b316/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin$logoColor=white"> </a>
|  João Paulo Aparecido Santos  | Scrum master  | <a href="https://github.com/jopaul0"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/joaosantos02/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> |
|  Kauan Victor Domingues do Nascimento  | Developer | <a href="https://github.com/KauanDomingues"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/kauan-domingues-3b00a5276/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> | 
|  Luiz Gabriel Lakner dos Santos  | Developer | <a href="https://github.com/Lakner13"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/gabriel-lakner-734528264/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin$logoColor=white"> </a>
|  Ramon Batista Varjão  | Product owner | <a href="https://github.com/gitDeRamon"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> |

