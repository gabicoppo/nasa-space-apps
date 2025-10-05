// app/data/quizData.js

export const quizData = [
  {
    id: 1,
    questionText: "Qual foi o primeiro __animal a orbitar a Terra__, abrindo caminho para futuros programas de pesquisa biomédica no espaço?",
    options: ["Ham, o chimpanzé", "Félicette, a gata", "Laika, a cadela", "Albert II, o macaco"],
    correctAnswer: "Laika, a cadela",
    graphData: {
      nodes: [
        { data: { id: "Laika", name: "Laika", type: "Animal", color: '#ffa500', description: "Uma cadela espacial soviética, o primeiro ser vivo a orbitar a Terra.", link: "https://www.google.com/search?q=Laika+(dog)" } },
        { data: { id: "Sputnik 2", name: "Sputnik 2", type: "Spacecraft", color: '#4682b4', description: "A espaçonave que levou Laika ao espaço em 1957.", link: "https://www.google.com/search?q=Sputnik+2" } },
        { data: { id: "Bion program", name: "Bion Program", type: "Program", color: '#9370db', description: "Programa de biosatélites que se beneficiou dos dados da missão de Laika.", link: "https://www.google.com/search?q=Bion+program" } }
      ],
      edges: [
        { data: { source: "Laika", target: "Sputnik 2", description: "Laika foi lançada a bordo da Sputnik 2." } },
        { data: { source: "Laika", target: "Bion program", description: "A missão de Laika forneceu dados essenciais para o futuro programa Bion." } }
      ]
    }
  },
  {
    id: 2,
    questionText: "Qual país lançou o biosatélite __Bion-M 1__, focado em experimentos com camundongos (Mus musculus)?",
    options: ["EUA", "China", "Rússia", "Agência Espacial Europeia"],
    correctAnswer: "Rússia",
    graphData: {
      nodes: [
        { data: { id: "Russia", name: "Rússia", type: "Country", color: '#ff6347', description: "País com um longo histórico em exploração espacial.", link: "https://www.google.com/search?q=Russia" } },
        { data: { id: "Bion-M 1", name: "Bion-M 1", type: "Spacecraft", color: '#4682b4', description: "Um biosatélite projetado para experimentos de ciências da vida no espaço.", link: "https://www.google.com/search?q=Bion-M+1" } },
        { data: { id: "Mus musculus", name: "Mus musculus", type: "Species", color: '#32cd32', description: "O camundongo, amplamente utilizado como organismo modelo em pesquisa.", link: "https://www.google.com/search?q=Mus+musculus" } },
      ],
      edges: [
        { data: { source: "Russia", target: "Bion-M 1", description: "A Rússia lançou o Bion-M 1 em 2013." } },
        { data: { source: "Bion-M 1", target: "Mus musculus", description: "A missão Bion-M 1 estudou os efeitos da microgravidade em camundongos." } }
      ]
    }
  },
  {
    id: 3,
    questionText: "A missão STS-90 da NASA, também conhecida como __NeuroLab__, utilizou qual animal como organismo modelo para pesquisa neurológica?",
    options: ["Macacos Rhesus", "Peixe-zebra", "Camundongos", "Moscas-das-frutas"],
    correctAnswer: "Camundongos",
    graphData: {
      nodes: [
        { data: { id: "STS-90", name: "STS-90 (NeuroLab)", type: "Space Mission", color: '#20b2aa', description: "Missão do Ônibus Espacial focada em neurociência.", link: "https://www.google.com/search?q=STS-90" } },
        { data: { id: "Mus musculus", name: "Camundongos", type: "Species", color: '#32cd32', description: "O principal organismo modelo para os experimentos da NeuroLab.", link: "https://www.google.com/search?q=Mus+musculus" } },
        { data: { id: "NASA", name: "NASA", type: "Agency", color: '#0b3d91', description: "Agência espacial dos EUA.", link: "https://www.google.com/search?q=NASA" } }
      ],
      edges: [
        { data: { source: "NASA", target: "STS-90", description: "A NASA operou a missão STS-90." } },
        { data: { source: "STS-90", target: "Mus musculus", description: "A missão STS-90 realizou experimentos neurológicos em camundongos." } }
      ]
    }
  },
];