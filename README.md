# Agenda Docente 🎒

Painel para organizar provas, trabalhos, paradas pedagógicas, conselhos de classe, formações, eventos, planejamentos mensais e a rotina entre a **Escola Claudete** e o **Mundo do Saber**. Site estático — não precisa de servidor.

## Estrutura dos arquivos

```
├── index.html          → o painel em si (estrutura, estilo e funcionamento)
├── agenda-config.js     → escolas, categorias e mascote — edite aqui
├── firebase-config.js   → chave da sincronização entre dispositivos — edite aqui
├── assets/
│   └── prigeosc.png
└── README.md
```

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado).
2. Suba estes itens (`index.html`, `agenda-config.js`, `firebase-config.js`, a pasta `assets/` e este `README.md`) para a raiz do repositório — pelo site do GitHub em **"Add file → Upload files"**, ou via `git`.
3. Vá em **Settings → Pages**.
4. Em **"Build and deployment"**, escolha **Source: Deploy from a branch**, branch **main**, pasta **/ (root)**, e clique em **Save**.
5. Em alguns minutos o GitHub mostra o link do site:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## Como editar as informações

Abra o arquivo **`agenda-config.js`** direto pelo GitHub (ícone de lápis) e ajuste:

- **Escolas** — nome de cada escola (ou adicione uma terceira, copiando um bloco `{ id: ..., name: ... }`)
- **Categorias** — o texto e a cor de cada categoria (Provas, Trabalhos, Paradas Pedagógicas, Conselhos de Classe, Formações, Eventos, Planejamento Mensal, Rotina/Outros)
- **Mascote** — nome e imagem exibidos no canto superior e no banner

Cada campo tem um comentário explicando o que é. Depois de editar, clique em **"Commit changes"** — o site atualiza sozinho em alguns minutos.

Para trocar a imagem da Prigeosc, envie um novo arquivo para `assets/` com o mesmo nome (`prigeosc.png`), ou com outro nome ajustando `MASCOT_PHOTO` em `agenda-config.js`.

## Grade de Horários (barra lateral)

Logo acima de "Categorias", na barra lateral, tem "Grade de Horários": suas aulas da semana, por turno (Matutino/Vespertino), já com os valores da sua grade atual como ponto de partida.

- Clique em qualquer campo (número/horário da aula ou a turma em cada dia) para editar — salva sozinho ao clicar fora.
- **"+ aula"** adiciona uma linha no turno selecionado; o ✕ que aparece ao passar o mouse na linha remove ela.
- **"+ turno"** cria uma aba nova (ex.: Noturno); o ✕ ao lado do nome do turno remove ele.
- Os dados de partida (usados só na primeira vez que o site abre num navegador novo) ficam em `agenda-config.js`, na seção `SCHEDULE_DEFAULT` — depois de editar pelo site isso não é mais necessário.
- Se a sincronização entre dispositivos (Firebase) estiver ativada, a grade sincroniza junto com os eventos.

## Como usar no dia a dia

- **Lançamento rápido** (no banner do topo): título, categoria, escola e data — pra registrar algo em segundos.
- **Formulário detalhado** (mais abaixo, ao lado do painel do dia): mesmos campos, mais horário, data final (para paradas pedagógicas ou eventos de vários dias) e observações.
- **Cartão "O que tem hoje"**: mostra automaticamente os compromissos do dia atual.
- **Calendário**: clique em qualquer dia para ver/editar os eventos daquela data.
- **Filtros na lateral**: escolha uma escola específica ou "todas", e ligue/desligue categorias na legenda para focar só no que importa.
- **Central de alertas**: lista o que vem nos próximos 14 dias, de qualquer mês.

**Sem sincronização configurada:** os registros ficam salvos no armazenamento local do navegador (`localStorage`). Cada navegador/dispositivo guarda os seus próprios dados.

## Sincronização entre dispositivos

Por padrão a agenda salva só no navegador onde foi usada. Para ver os mesmos eventos no celular e no computador, ative a sincronização gratuita com o **Firebase** (mesmo serviço usado no Painel dos Pets). Leva uns 10 minutos, uma vez só:

1. Acesse **https://console.firebase.google.com** e faça login com uma conta Google.
2. Se você já configurou o Painel dos Pets, pode **reaproveitar o mesmo projeto** — pule para o passo 4. Senão, clique em **"Criar projeto"**, dê um nome (ex.: `agenda-docente`) e siga o assistente (pode desativar o Google Analytics).
3. Dentro do projeto, clique no ícone **`</>`** ("Web") para adicionar um app da Web. Dê um apelido, **não** marque "Configurar também o Firebase Hosting", e registre.
4. Copie o bloco `firebaseConfig` mostrado pelo Firebase.
5. Abra o arquivo **`firebase-config.js`** da agenda e substitua o conteúdo pelos dados copiados, no formato:
   ```js
   const FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
6. No menu lateral do console Firebase: **Compilação → Firestore Database → Criar banco de dados** (pule se já existe, do Painel dos Pets). Escolha uma região e inicie em modo produção.
7. **Compilação → Authentication → Sign-in method** e ative o provedor **"Anônimo"** (pule se já ativado).
8. No Firestore, aba **"Regras"**, use (ou amplie, se já tiver a regra do Painel dos Pets) o conteúdo abaixo e publique:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /painel-pets/{docId} {
         allow read, write: if request.auth != null;
       }
       match /agenda-docente/{docId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
9. Salve o `firebase-config.js` (commit no GitHub). Em alguns minutos o rodapé da agenda passa a mostrar **"🔄 Sincronizado entre dispositivos"**.

A agenda e o Painel dos Pets podem usar o mesmo projeto Firebase sem conflito — cada um grava numa "coleção" separada (`agenda-docente` e `painel-pets`).

**Sobre privacidade:** a chave do Firebase não é secreta — quem controla o acesso são as regras do passo 8. Com elas, qualquer pessoa que souber a URL do site e entrar anonimamente também consegue ler/editar os dados. Para uma agenda de trabalho isso costuma ser aceitável; para mais privacidade, as regras podem ser restritas ainda mais.
