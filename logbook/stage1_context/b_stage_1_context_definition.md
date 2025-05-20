[Back to main Logbook Page](../hci_logbook.md)

---
# B. Stage 1 - Context Definition


# B.1. Competitor Identification
>	The competitor analysis will entail an identification of all competitors, with brief descriptions and a collection of the look and feel of their solutions, e.g., with screenshots, etc. It will also include a detailed analysis of the competitor deemed the best or more representative. It ends with a summary of the main findings including an HCI SWOT analysis



## B.1a. Competitors


| **Competitor**           | **Description**                                                       | Information repository              |
| ------------------------ | --------------------------------------------------------------------- | ----------------------------------- |
| [Acessibilidade 360 App] | [plataforma com percursos acessiveis a pessoa de mobilidade reduzida] | [[Competitor Analysis]]             |
| [Wheelmap]               | [app para encontrar e marcar locais acessíveis a cadeiras de rodas]   |                                     |




## B.1b. Detailed Competitor Analysis
>	Choose the most notable competitor and do a more thorough analysis of their interactive solution


### - Heuristic Evaluation

#### Method
A avaliação heurística foi conduzida seguindo os princípios de Nielsen. O processo consistiu na identificação de problemas de usabilidade com base em 10 heurísticas predefinidas. Cada problema encontrado foi avaliado em termos de gravidade, numa escala de 0 a 5 (onde 1 representa um problema menor e 3 um problema crítico).

Após a avaliação individual, foi realizada uma sessão de consenso para consolidar as ideias e definir as recomendações para mitigar os problemas identificados.


#### Individual Evaluations
<!-- For the individual heuristic evaluations by each member of the group, you can use the templates below, grouping problems by heuristic OR each evaluator can have a table listing all the detected problems with the number of the violated heuristics on the second column. Whichever your choice, you should have a list of problems, the severity, and a recommendation to mitigate it -->



- [expert1_heuristic_evaluation_workbook](heuristic_evaluations/expert1_heuristic_evaluation_workbook.md)

- [expert2_heuristic_evaluation_workbook](heuristic_evaluations/expert2_heuristic_evaluation_workbook.md)


#### Consensus

>	After the individual analysis by each expert, all results should be gathered in a consensus table. If an expert has not found any of the problems found by other experts, they should analyse it, at this point, and give it a severity.

| **Issue**                             | **Expert 1** | **Expert 2** | Recommendations                             |
| ------------------------------------- | ------------ | ------------ | ------------------------------------------- |
| Opções limitadas de meio de locomoção | 3            | 3            | 										    |
| Limitação de escolhas de percursos    | 2            | 2            |                                             |
| Falta de infraestruturas              | 2            | 3            |                                             |
| Transições de zoom fracas             | 1            | 1            |                                             |


---
### - Cognitive Walkthrough

#### Method


#### Task Selection and Task Analysis

Escolhemos a task "Pesquisar uma rota" visto que é de longe a mais importante e o ponto fulcral da app.


| Task                        | Subtasks                               |
| --------------------------- | -------------------------------------- |
| **1. Pesquisar uma rota**   | Selecionar o item pesquisar            |
|                             | Digitar o destino pretendido            |
|                             | Escolher um dos serviços disponíveis   |
|                             | Escolher o tipo de transporte          |
|                             | Escolher uma das rotas possíveis       |
|                             | Iniciar navegação                      |


#### Results

**Task: Pesquisar uma rota**

| Step # | Task/Action to Perform               | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Is Action Successful? (Yes/No) | Suggestions for Improvement |
|--------|--------------------------------------|------------------------------------------------|-------|----------------------------------------------------------------------------------------|------------------------------|-----------------------------|
| 1      | Selecionar o ícone pesquisar        | Yes                                            |       | Yes                                                                                    | Yes                          | Suggestion 1               |
| 2      | Digitar o destino pretendido        | Yes                                            |       | Yes                                                                                    | Yes                          | Suggestion 2               |
| 3      | Escolher um dos serviços disponíveis | Yes                                            |       | Yes                                                                                    | Yes                          | Suggestion 3               |
| 4      | Escolher o tipo de transporte       | Yes                                            |       | Yes                                                                                    | Yes                          | Suggestion 4               |
| 5      | Escolher uma das rotas possíveis    | Yes                                            |       | Yes                                                                                    | Yes                          | Suggestion 5               |
| 6      | Iniciar navegação                   | Yes                                            |       | Yes                                                                                    | Yes                          | Suggestion 6               |


## B.1c. Overall Analysis

A análise revelou que os principais problemas enfrentados pelos utilizadores incluem a falta de opções de personalização na escolha de percursos e dificuldades na usabilidade do zoom. Além disso, a necessidade de uma atualização em tempo real das condições de acesso foi destacada como essencial.

### Análise SWOT

| **SWOT**        | **Detalhes** |
|-----------------|-------------|
| **Forças**      | Interface intuitiva, suporte a múltiplos serviços de transporte, feedback positivo de utilizadores. |
| **Fraquezas**   | Falta de personalização na escolha de percursos, tempos de carregamento elevados, dificuldade de acessibilidade. |
| **Oportunidades** | Melhorar a acessibilidade com ajustes na interface, permitir seleção mais flexível de rotas, oferecer recomendações em tempo real. |
| **Ameaças**     | Concorrência de apps bem estabelecidas, resistência dos utilizadores a mudar para uma nova solução, mudanças nas políticas de transporte. |


Recomendações para Melhorias:

- Melhoria no Sistema de Zoom – Implementar transições suaves e opções para quem tem menor destreza manual.
- Maior Personalização de Percursos – Permitir que o utilizador escolha percursos baseados em preferências pessoais.
- Atualizações em Tempo Real – Mostrar alertas sobre mudanças nas condições de percurso ou acessibilidade.


# B.2. Users
>	For the users, there are two goals: 1) understand the current status of users in the domain you are addressing. How do they manage, what are the main tasks they do, if they use some tool for the purpose, what are current challenges, what might be improved, what might be new features, ...


## B.2a. Method

Fizemos um pequeno guião de pergunta chaves para os quais ambicionavamos respostas e fomos voltando a entrevista para elas deixando os entrevistados falar de outros problemas e também dar ideias. Tivemos facilidade com os users visto serem bastante extrovertidos. Foram consideradas estas perguntas:
- Conseguem ver mais algum tipo de incapacidade motora a ser retratada nesta aplicação (tendo como base as nossas capacidades)?
- Como seriam as melhores formas de fazer a avaliação de um espaço (likes, comentários, ...)?

## B.2b. Results

>	This section tracks all informal user interviews, summarizing key insights and linking to detailed notes for each session. 

### Interview List 
| Date       | Participant / Role | Key Insights                                                                 | Link to Notes                |     |
| ---------- | ------------------ | ---------------------------------------------------------------------------- | ---------------------------- | --- |
| 26-02-2025 | Rodrigo / student  | Botão que aumenta e diminui o zoom para pessoas sem muito controlo das mãos  |                              |     |
| 26-02-2025 |  José / Student    | Atualização em tempo real dos acessos (se continuam em bom estado)           |                              |     |
|            |                    | Fazer um forma de avaliação com distinções entre bons e maus comentários     |                              |     |

### Common Themes & Patterns 

- **Recurring Problems:** 
	- Botão que aumenta e diminui o zoom mal implementado.
	- Não há liberdade na escolha de percursos.
- **Frequently Used Tools:** 
	- Google APIs
	- JavaScript
- **Desired Features / Solutions:** 
	- Botão que aumenta e diminui o zoom para pessoas sem muito controlo das mãos.
	- Atualização em tempo real dos acessos (se continuam em bom estado).
- --- 



---
[Back to main Logbook Page](../hci_logbook.md)

---
