const PHRASES = [
  {
    id: 1,
    title: "Morning Coffee Routine",
    original: "I drink a cup of hot coffee every morning.",
    translation: "Eu bebo uma xícara de café quente toda manhã.",
    changeWord: "coffee",
    options: ["tea", "water", "juice", "milk"],
    promptPersonalize: "Em qual momento ou local você prefere tomar sua bebida de manhã?",
    samplePersonalized: "I drink a cup of green tea in my bedroom every morning."
  },
  {
    id: 2,
    title: "Starting the Day",
    original: "I wake up at six thirty to start my daily tasks.",
    translation: "Eu acordo às seis e meia para começar minhas tarefas diárias.",
    changeWord: "six thirty",
    options: ["seven o'clock", "eight AM", "five AM", "six AM"],
    promptPersonalize: "O que você gosta de fazer assim que acorda?",
    samplePersonalized: "I wake up at seven o'clock to stretch my body."
  },
  {
    id: 3,
    title: "Going to Work/Study",
    original: "I usually take the bus to go to work.",
    translation: "Eu geralmente pego o ônibus para ir ao trabalho.",
    changeWord: "bus",
    options: ["subway", "car", "train", "bicycle"],
    promptPersonalize: "Para onde você costuma ir no seu início de dia?",
    samplePersonalized: "I usually take the car to go to college."
  },
  {
    id: 4,
    title: "Checking Messages",
    original: "I check my email as soon as I sit at my desk.",
    translation: "Eu checo meu e-mail assim que me sento na minha mesa.",
    changeWord: "email",
    options: ["messages", "calendar", "notifications", "phone"],
    promptPersonalize: "Qual é a primeira coisa que você checa no seu celular ou computador?",
    samplePersonalized: "I check my WhatsApp messages as soon as I sit at my desk."
  },
  {
    id: 5,
    title: "Planning the Day",
    original: "I write down my main priorities for the day.",
    translation: "Eu escrevo minhas principais prioridades para o dia.",
    changeWord: "write down",
    options: ["organize", "review", "type", "select"],
    promptPersonalize: "Como você organiza o que precisa fazer hoje?",
    samplePersonalized: "I organize my main goals for the week."
  },
  {
    id: 6,
    title: "Healthy Habit",
    original: "I drink a big glass of water before breakfast.",
    translation: "Eu bebo um grande copo de água antes do café da manhã.",
    changeWord: "breakfast",
    options: ["working", "exercising", "sleeping", "going out"],
    promptPersonalize: "Que hábito saudável você tem ou quer ter diariamente?",
    samplePersonalized: "I drink a big glass of water before exercising."
  },
  {
    id: 7,
    title: "Listening to Podcasts/Music",
    original: "I like listening to English podcasts while commuting.",
    translation: "Eu gosto de ouvir podcasts em inglês enquanto me me desloco.",
    changeWord: "podcasts",
    options: ["music", "audiobooks", "news", "songs"],
    promptPersonalize: "O que você gosta de ouvir durante o seu tempo livre ou trajeto?",
    samplePersonalized: "I like listening to upbeat music while commuting."
  },
  {
    id: 8,
    title: "Focus & Productivity",
    original: "I stay focused for two hours without checking my phone.",
    translation: "Eu me mantenho focado por duas horas sem checar meu celular.",
    changeWord: "two hours",
    options: ["thirty minutes", "one hour", "four hours", "the whole morning"],
    promptPersonalize: "Por quanto tempo você consegue se focar direto?",
    samplePersonalized: "I stay focused for one hour without checking Instagram."
  },
  {
    id: 9,
    title: "Lunch Break",
    original: "I usually have a light lunch around noon.",
    translation: "Eu geralmente tenho um almoço leve por volta do meio-dia.",
    changeWord: "light",
    options: ["healthy", "quick", "delicious", "warm"],
    promptPersonalize: "Como é o seu almoço habitual?",
    samplePersonalized: "I usually have a healthy lunch around one PM."
  },
  {
    id: 10,
    title: "Learning New Things",
    original: "I learn something new about technology every day.",
    translation: "Eu aprendo algo novo sobre tecnologia todos os dias.",
    changeWord: "technology",
    options: ["English", "business", "design", "programming"],
    promptPersonalize: "Sobre qual assunto você adora aprender diariamente?",
    samplePersonalized: "I learn something new about English grammar every day."
  },
  {
    id: 11,
    title: "Taking a Break",
    original: "I take a short break to clear my head.",
    translation: "Eu faço uma pausa curta para esfriar a cabeça.",
    changeWord: "short",
    options: ["10-minute", "relaxing", "quick", "coffee"],
    promptPersonalize: "O que você faz durante a sua pausa no trabalho/estudos?",
    samplePersonalized: "I take a coffee break to walk outside."
  },
  {
    id: 12,
    title: "Physical Activity",
    original: "I go for a quick walk in the afternoon.",
    translation: "Eu dou uma caminhada rápida à tarde.",
    changeWord: "walk",
    options: ["run", "jog", "workout session", "bike ride"],
    promptPersonalize: "Que exercício ou movimento físico você faz no seu dia?",
    samplePersonalized: "I go for a short workout session in the evening."
  },
  {
    id: 13,
    title: "Teamwork / Interaction",
    original: "I speak with my team to discuss our goal.",
    translation: "Eu converso com minha equipe para discutir nossa meta.",
    changeWord: "team",
    options: ["friend", "manager", "colleague", "partner"],
    promptPersonalize: "Com quem você costuma conversar para alinhar seus planos?",
    samplePersonalized: "I speak with my friend to discuss our study project."
  },
  {
    id: 14,
    title: "Solving Problems",
    original: "I try to solve difficult problems step by step.",
    translation: "Eu tento resolver problemas difíceis passo a passo.",
    changeWord: "difficult",
    options: ["complex", "daily", "work", "technical"],
    promptPersonalize: "Que tipo de desafio você gosta de resolver com calma?",
    samplePersonalized: "I try to solve coding problems step by step."
  },
  {
    id: 15,
    title: "Expressing Gratitude",
    original: "I am grateful for another productive day.",
    translation: "Sou grato(a) por mais um dia produtivo.",
    changeWord: "productive",
    options: ["blessed", "peaceful", "exciting", "wonderful"],
    promptPersonalize: "Pelo que você se sente mais grato(a) no dia de hoje?",
    samplePersonalized: "I am grateful for another peaceful day with my family."
  },
  {
    id: 16,
    title: "Reading Habit",
    original: "I read ten pages of a book before bed.",
    translation: "Eu leio dez páginas de um livro antes de dormir.",
    changeWord: "ten",
    options: ["five", "twenty", "a few", "fifteen"],
    promptPersonalize: "O que você gosta de ler antes de descansar?",
    samplePersonalized: "I read five pages of an English book before bed."
  },
  {
    id: 17,
    title: "Evening Routine",
    original: "I prepare my clothes for tomorrow evening.",
    translation: "Eu preparo minhas roupas para a noite de amanhã.",
    changeWord: "clothes",
    options: ["bag", "schedule", "meals", "notes"],
    promptPersonalize: "O que você costuma preparar com antecedência?",
    samplePersonalized: "I prepare my schedule for tomorrow morning."
  },
  {
    id: 18,
    title: "Digital Detox",
    original: "I turn off my screen an hour before sleeping.",
    translation: "Eu desligo minha tela uma hora antes de dormir.",
    changeWord: "screen",
    options: ["computer", "television", "phone", "notifications"],
    promptPersonalize: "Quanto tempo antes de dormir você se afasta dos eletrônicos?",
    samplePersonalized: "I turn off my phone 30 minutes before sleeping."
  },
  {
    id: 19,
    title: "Speaking Confidence",
    original: "I feel more confident speaking English every day.",
    translation: "Eu me sinto mais confiante falando inglês a cada dia.",
    changeWord: "confident",
    options: ["comfortable", "fluent", "relaxed", "motivated"],
    promptPersonalize: "Como você quer se sentir ao falar inglês nas suas conversas?",
    samplePersonalized: "I feel more comfortable speaking English with my coworkers."
  },
  {
    id: 20,
    title: "Overcoming Mistakes",
    original: "I am not afraid of making mistakes in English.",
    translation: "Eu não tenho medo de cometer erros em inglês.",
    changeWord: "afraid",
    options: ["scared", "ashamed", "worried", "nervous"],
    promptPersonalize: "Qual receio você está superando no aprendizado?",
    samplePersonalized: "I am not worried about making small mistakes when practicing."
  },
  {
    id: 21,
    title: "Time Management",
    original: "I dedicate thirty minutes a day to practicing speaking.",
    translation: "Eu dedico vinte minutos por dia para praticar conversação.",
    changeWord: "thirty minutes",
    options: ["fifteen minutes", "one hour", "ten minutes", "forty-five minutes"],
    promptPersonalize: "Quanto tempo do seu dia você reserva exclusivamente para o inglês?",
    samplePersonalized: "I dedicate fifteen minutes every morning to practicing speaking."
  },
  {
    id: 22,
    title: "Making Progress",
    original: "My vocabulary is getting better every week.",
    translation: "Meu vocabulário está ficando melhor a cada semana.",
    changeWord: "vocabulary",
    options: ["pronunciation", "listening skill", "fluency", "confidence"],
    promptPersonalize: "Qual habilidade sua você sente que mais se desenvolveu?",
    samplePersonalized: "My listening skill is getting better every single day."
  },
  {
    id: 23,
    title: "Mindset & Habit",
    original: "Consistency is the secret to my English success.",
    translation: "Consistência é o segredo para o meu sucesso no inglês.",
    changeWord: "Consistency",
    options: ["Practice", "Patience", "Dedication", "Discipline"],
    promptPersonalize: "Qual virtude você considera mais importante para conquistar seus objetivos?",
    samplePersonalized: "Daily practice is the secret to my English success."
  },
  {
    id: 24,
    title: "Shopping Routine",
    original: "I buy fresh fruit at the market on weekends.",
    translation: "Eu compro frutas frescas no mercado nos fins de semana.",
    changeWord: "fruit",
    options: ["vegetables", "groceries", "bread", "snacks"],
    promptPersonalize: "O que você gosta de comprar para sua casa semanalmente?",
    samplePersonalized: "I buy organic groceries at the supermarket on Saturdays."
  },
  {
    id: 25,
    title: "Cooking at Home",
    original: "I enjoy cooking dinner for my family on Sundays.",
    translation: "Eu gosto de cozinhar o jantar para minha família aos domingos.",
    changeWord: "dinner",
    options: ["lunch", "breakfast", "special meals", "pasta"],
    promptPersonalize: "Qual refeição você gosta de preparar com carinho?",
    samplePersonalized: "I enjoy cooking a healthy lunch for my partner on weekends."
  },
  {
    id: 26,
    title: "Budgeting & Saving",
    original: "I save a portion of my income every month.",
    translation: "Eu meço e guardo uma porção da minha renda todo mês.",
    changeWord: "income",
    options: ["salary", "money", "earnings", "budget"],
    promptPersonalize: "Qual hábito financeiro positivo você pratica?",
    samplePersonalized: "I save twenty percent of my salary every month."
  },
  {
    id: 27,
    title: "Travel Goals",
    original: "I plan to travel to an English-speaking country soon.",
    translation: "Eu planejo viajar para um país de língua inglesa em breve.",
    changeWord: "country",
    options: ["city", "destination", "place", "location"],
    promptPersonalize: "Para onde você tem o sonho de viajar utilizando seu inglês?",
    samplePersonalized: "I plan to travel to Canada next year with my friends."
  },
  {
    id: 28,
    title: "Helping Others",
    original: "I love helping my friends learn new skills.",
    translation: "Eu amo ajudar meus amigos a aprenderem novas habilidades.",
    changeWord: "friends",
    options: ["colleagues", "family", "students", "teammates"],
    promptPersonalize: "Quem você gosta de motivar e apoiar no dia a dia?",
    samplePersonalized: "I love helping my coworkers solve difficult challenges."
  },
  {
    id: 29,
    title: "Reflecting on Growth",
    original: "I look back and see how much I have grown.",
    translation: "Eu olho para trás e vejo o quanto eu cresci.",
    changeWord: "grown",
    options: ["improved", "learned", "achieved", "progressed"],
    promptPersonalize: "O que te dá orgulho de ter conquistado nos últimos meses?",
    samplePersonalized: "I look back and see how much my speaking has improved."
  },
  {
    id: 30,
    title: "Mastering the Habit",
    original: "I am now fluent, confident, and unstoppable in English!",
    translation: "Agora sou fluente, confiante e imparável no inglês!",
    changeWord: "unstoppable",
    options: ["prepared", "ready", "empowered", "successful"],
    promptPersonalize: "Escreva sua mensagem final de vitória para você mesmo(a) em inglês!",
    samplePersonalized: "I am now fluent, confident, and completely ready for the world!"
  }
];
