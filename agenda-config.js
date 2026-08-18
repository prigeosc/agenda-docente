/* =========================================================================
   CONFIGURAÇÃO DA AGENDA DOCENTE
   -------------------------------------------------------------------------
   Edite os dados abaixo sempre que precisar. Depois de editar, salve o
   arquivo e suba (commit) no GitHub — o site atualiza sozinho.

   ESCOLAS
   -------
   Cada escola tem:
     id   -> identificador único, sem espaços/acentos (não mude depois de
             já ter eventos salvos com essa escola)
     name -> nome exibido no painel

   Para adicionar uma escola nova, copie um bloco inteiro (de { até },) e
   ajuste. Para remover, apague o bloco correspondente.

   CATEGORIAS
   ----------
   Cada categoria tem:
     label -> nome exibido (nas abas, legenda e formulário)
     color -> cor de identificação no calendário (formato hexadecimal)

   A chave antes de cada categoria (ex.: "provas") é o identificador
   interno — não precisa mudar, só o texto de "label" e a cor.

   MASCOTE
   -------
   MASCOT_NAME  -> nome exibido junto à imagem
   MASCOT_PHOTO -> caminho da imagem dentro da pasta assets/
   ========================================================================= */

const SCHOOLS = [
  { id: 'claudete',     name: 'Escola Claudete' },
  { id: 'mundodosaber', name: 'Mundo do Saber' },
];

const CATEGORIES = {
  provas:        { label: 'Provas',              color: '#C24B3F' },
  trabalhos:     { label: 'Trabalhos',           color: '#C9932E' },
  paradas:       { label: 'Paradas Pedagógicas', color: '#2F7D8C' },
  conselhos:     { label: 'Conselhos de Classe', color: '#7A5AA8' },
  formacoes:     { label: 'Formações',           color: '#3B6FB6' },
  eventos:       { label: 'Eventos',             color: '#C15B8C' },
  planejamento:  { label: 'Planejamento Mensal', color: '#4C8C6B' },
  outros:        { label: 'Rotina / Outros',     color: '#7D8290' },
};

const MASCOT_NAME = 'Prigeosc';
const MASCOT_PHOTO = 'assets/prigeosc.png';

/* =========================================================================
   GRADE DE HORÁRIOS
   -------------------------------------------------------------------------
   Isto aqui é só o ponto de partida (o que aparece na primeira vez que o
   site abre em um navegador novo). Depois disso, a grade é editada
   direto no site (clique em qualquer campo da grade, na barra lateral,
   para digitar) e o que você editar lá fica salvo — não precisa mais
   tocar neste arquivo, a não ser que queira resetar os valores padrão.

   Cada turno tem:
     id    -> identificador único, sem espaços/acentos
     title -> nome exibido na aba (ex.: "Matutino")
     time  -> faixa de horário exibida embaixo do título da aba
     rows  -> lista de linhas, na ordem em que aparecem:
        { aula, horario, dias: { seg, ter, qua, qui, sex } }  -> linha de aula
        { recreio: "10:00 – 10:15" }                          -> linha de recreio

   Para adicionar/remover turnos ou aulas depois de já estar usando o site,
   use os botões "+ turno" e "+ aula" direto na barra lateral — é mais
   fácil do que editar aqui.
   ========================================================================= */

const SCHEDULE_DAYS = [
  { key: 'seg', label: 'S' },
  { key: 'ter', label: 'T' },
  { key: 'qua', label: 'Q' },
  { key: 'qui', label: 'Q' },
  { key: 'sex', label: 'S' },
];

const SCHEDULE_DEFAULT = [
  {
    id: 'matutino',
    title: 'Matutino',
    time: '07:45 – 11:45',
    rows: [
      { aula: '1ª', horario: '07:45–08:30', dias: { seg: '73', ter: '61', qua: '3',   qui: '61', sex: '91' } },
      { aula: '2ª', horario: '08:30–09:15', dias: { seg: '71', ter: '3',  qua: '3',   qui: '71', sex: '61' } },
      { aula: '3ª', horario: '09:15–10:00', dias: { seg: '91', ter: '71', qua: '902', qui: '73', sex: '81' } },
      { recreio: '10:00 – 10:15' },
      { aula: '4ª', horario: '10:15–11:00', dias: { seg: '—',  ter: '91', qua: '902', qui: '83', sex: '81' } },
      { aula: '5ª', horario: '11:00–11:45', dias: { seg: '—',  ter: '83', qua: '—',   qui: '81', sex: '83' } },
    ],
  },
  {
    id: 'vespertino',
    title: 'Vespertino',
    time: '13:15 – 17:15',
    rows: [
      { aula: '1ª', horario: '13:15–14:00', dias: { seg: '72', ter: '—',  qua: '—', qui: '62', sex: '94' } },
      { aula: '2ª', horario: '14:00–14:45', dias: { seg: '92', ter: '—',  qua: '—', qui: '62', sex: '82' } },
      { aula: '3ª', horario: '14:45–15:30', dias: { seg: '62', ter: '—',  qua: '—', qui: '72', sex: '82' } },
      { recreio: '15:30 – 15:45' },
      { aula: '4ª', horario: '15:45–16:30', dias: { seg: '94', ter: '82', qua: '—', qui: '—',  sex: '92' } },
      { aula: '5ª', horario: '16:30–17:15', dias: { seg: '72', ter: '94', qua: '—', qui: '—',  sex: '—'  } },
    ],
  },
];
