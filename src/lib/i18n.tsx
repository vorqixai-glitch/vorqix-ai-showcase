import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LocaleCode = "en" | "es" | "fr" | "de" | "pt" | "it" | "zh" | "ar";

export const LOCALES: { code: LocaleCode; label: string; short: string; rtl?: boolean }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "ar", label: "العربية", short: "AR", rtl: true },
];

const en = {
  "nav.contact": "Contact",
  "nav.github": "GitHub",
  "nav.searchPlaceholder": "Search projects…",
  "nav.noMatch": "No project matches",
  "nav.language": "Language",

  "hero.eyebrow": "Independent AI studio",
  "hero.title.a": "Machine intelligence,",
  "hero.title.em": "engineered",
  "hero.title.b": "with intent — and shipped.",
  "hero.bio":
    "Vorqix A.I designs and builds AI systems, automation tooling and production software. Everything below is pulled live from the studio's working repositories — no mockups, no placeholders.",
  "hero.cta.work": "Explore the work",
  "hero.cta.index": "Full index",

  "work.eyebrow": "I. The work",
  "work.title": "Live project index",
  "work.sync": "Sync",
  "work.searchPlaceholder": "Search projects, languages, descriptions…",
  "work.clear": "Clear",
  "work.all": "All",
  "work.sort.recent": "recent",
  "work.sort.stars": "stars",
  "work.sort.name": "name",
  "work.error": "Could not load the project index.",
  "work.empty": "No projects match that filter",
  "work.loadMore": "Load more",
  "work.remaining": "remaining",
  "work.powered": "Powered by Vorqix A.I",
  "work.public": "Public",
  "work.fallbackDesc": "An internal system under active development.",
  "work.system": "System",

  "platforms.eyebrow": "II. Beyond the repository",
  "platforms.title": "Hosted work",
  "platforms.pending": "Projects being added",

  "studio.eyebrow": "III. The studio",
  "studio.line.a": "We build the quiet machinery behind intelligent products.",
  "studio.line.b": "Precise where it matters. Shipped where it counts.",
  "studio.cta": "Start a conversation",

  "footer.blurb":
    "Applied intelligence, engineered with intent. Every project listed here is my own work — code, architecture and delivery.",
  "footer.work": "Work",
  "footer.platforms": "Platforms",
  "footer.about": "About",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved",
  "footer.credit": "Designed & engineered by Vorqix",

  "contact.eyebrow": "Contact",
  "contact.title": "Let's build something worth shipping.",
  "contact.lede":
    "Open to engineering roles, contract work and collaboration. The fastest route is email — I answer everything myself.",
  "contact.about": "About",
  "contact.about.p1":
    "Vorqix A.I is my engineering practice: applied intelligence built with intent rather than novelty. I design, write and ship the whole stack — data models, services, interfaces and the deployment around them.",
  "contact.about.p2":
    "The project index on this site is generated live from my own repositories, so it reflects what I am actually working on rather than a curated highlight reel. Finished systems, running experiments and work in progress all appear.",
  "contact.about.p3":
    "Interests: applied machine intelligence, automation platforms, developer tooling and systems that hold up under real use.",

  "project.back": "All projects",
  "project.learnMore": "Learn more on GitHub",
  "project.visit": "Visit project",
  "project.stack": "Stack",
  "project.readme": "Readme",
  "project.noReadme": "No readme published for this project yet.",
  "project.loading": "Loading project…",
  "project.notFound": "That project could not be loaded.",

  "time.today": "today",
  "time.d": "d ago",
  "time.mo": "mo ago",
  "time.y": "y ago",
};

export type TranslationKey = keyof typeof en;

type Dict = Partial<Record<TranslationKey, string>>;

const es: Dict = {
  "nav.contact": "Contacto",
  "nav.searchPlaceholder": "Buscar proyectos…",
  "nav.noMatch": "Ningún proyecto coincide",
  "nav.language": "Idioma",
  "hero.eyebrow": "Estudio de IA independiente",
  "hero.title.a": "Inteligencia de máquina,",
  "hero.title.em": "diseñada",
  "hero.title.b": "con intención — y entregada.",
  "hero.bio":
    "Vorqix A.I diseña y construye sistemas de IA, herramientas de automatización y software en producción. Todo lo que ves se obtiene en vivo de los repositorios del estudio.",
  "hero.cta.work": "Ver el trabajo",
  "hero.cta.index": "Índice completo",
  "work.eyebrow": "I. El trabajo",
  "work.title": "Índice de proyectos en vivo",
  "work.sync": "Actualizar",
  "work.searchPlaceholder": "Buscar proyectos, lenguajes, descripciones…",
  "work.clear": "Limpiar",
  "work.all": "Todos",
  "work.sort.recent": "recientes",
  "work.sort.stars": "estrellas",
  "work.sort.name": "nombre",
  "work.error": "No se pudo cargar el índice de proyectos.",
  "work.empty": "Ningún proyecto coincide con ese filtro",
  "work.loadMore": "Ver más",
  "work.remaining": "restantes",
  "work.powered": "Impulsado por Vorqix A.I",
  "work.public": "Público",
  "work.fallbackDesc": "Un sistema interno en desarrollo activo.",
  "work.system": "Sistema",
  "platforms.eyebrow": "II. Más allá del repositorio",
  "platforms.title": "Trabajo alojado",
  "platforms.pending": "Proyectos en incorporación",
  "studio.eyebrow": "III. El estudio",
  "studio.line.a": "Construimos la maquinaria silenciosa detrás de productos inteligentes.",
  "studio.line.b": "Precisos donde importa. Entregados donde cuenta.",
  "studio.cta": "Iniciar una conversación",
  "footer.blurb":
    "Inteligencia aplicada, diseñada con intención. Cada proyecto aquí es trabajo propio — código, arquitectura y entrega.",
  "footer.work": "Trabajo",
  "footer.platforms": "Plataformas",
  "footer.about": "Acerca de",
  "footer.contact": "Contacto",
  "footer.rights": "Todos los derechos reservados",
  "footer.credit": "Diseñado y desarrollado por Vorqix",
  "contact.eyebrow": "Contacto",
  "contact.title": "Construyamos algo que valga la pena lanzar.",
  "contact.lede":
    "Abierto a puestos de ingeniería, trabajo por contrato y colaboración. La vía más rápida es el correo — respondo personalmente.",
  "contact.about": "Acerca de",
  "contact.about.p1":
    "Vorqix A.I es mi práctica de ingeniería: inteligencia aplicada con intención, no por novedad. Diseño, escribo y entrego toda la pila — modelos de datos, servicios, interfaces y su despliegue.",
  "contact.about.p2":
    "El índice de proyectos se genera en vivo desde mis repositorios, así que refleja en qué trabajo realmente. Sistemas terminados, experimentos y trabajo en curso aparecen por igual.",
  "contact.about.p3":
    "Intereses: inteligencia de máquina aplicada, plataformas de automatización, herramientas para desarrolladores y sistemas que resisten el uso real.",
  "project.back": "Todos los proyectos",
  "project.learnMore": "Ver más en GitHub",
  "project.visit": "Visitar proyecto",
  "project.stack": "Tecnologías",
  "project.readme": "Readme",
  "project.noReadme": "Este proyecto aún no publica un readme.",
  "project.loading": "Cargando proyecto…",
  "project.notFound": "No se pudo cargar ese proyecto.",
  "time.today": "hoy",
  "time.d": "d atrás",
  "time.mo": "mes atrás",
  "time.y": "a atrás",
};

const fr: Dict = {
  "nav.contact": "Contact",
  "nav.searchPlaceholder": "Rechercher des projets…",
  "nav.noMatch": "Aucun projet ne correspond",
  "nav.language": "Langue",
  "hero.eyebrow": "Studio d'IA indépendant",
  "hero.title.a": "Intelligence machine,",
  "hero.title.em": "conçue",
  "hero.title.b": "avec intention — et livrée.",
  "hero.bio":
    "Vorqix A.I conçoit et construit des systèmes d'IA, des outils d'automatisation et des logiciels en production. Tout ci-dessous provient en direct des dépôts du studio.",
  "hero.cta.work": "Découvrir le travail",
  "hero.cta.index": "Index complet",
  "work.eyebrow": "I. Le travail",
  "work.title": "Index de projets en direct",
  "work.sync": "Actualiser",
  "work.searchPlaceholder": "Rechercher projets, langages, descriptions…",
  "work.clear": "Effacer",
  "work.all": "Tous",
  "work.sort.recent": "récents",
  "work.sort.stars": "étoiles",
  "work.sort.name": "nom",
  "work.error": "Impossible de charger l'index des projets.",
  "work.empty": "Aucun projet ne correspond à ce filtre",
  "work.loadMore": "Voir plus",
  "work.remaining": "restants",
  "work.powered": "Propulsé par Vorqix A.I",
  "work.public": "Public",
  "work.fallbackDesc": "Un système interne en développement actif.",
  "work.system": "Système",
  "platforms.eyebrow": "II. Au-delà du dépôt",
  "platforms.title": "Travaux hébergés",
  "platforms.pending": "Projets en cours d'ajout",
  "studio.eyebrow": "III. Le studio",
  "studio.line.a": "Nous construisons la mécanique discrète des produits intelligents.",
  "studio.line.b": "Précis là où il faut. Livrés quand il faut.",
  "studio.cta": "Entamer la conversation",
  "footer.blurb":
    "Intelligence appliquée, conçue avec intention. Chaque projet ici est mon propre travail — code, architecture et livraison.",
  "footer.work": "Travail",
  "footer.platforms": "Plateformes",
  "footer.about": "À propos",
  "footer.contact": "Contact",
  "footer.rights": "Tous droits réservés",
  "footer.credit": "Conçu et développé par Vorqix",
  "contact.eyebrow": "Contact",
  "contact.title": "Construisons quelque chose qui mérite d'être livré.",
  "contact.lede":
    "Ouvert aux postes d'ingénierie, missions et collaborations. Le plus rapide reste l'email — je réponds moi-même.",
  "contact.about": "À propos",
  "contact.about.p1":
    "Vorqix A.I est ma pratique d'ingénierie : de l'intelligence appliquée avec intention plutôt que par nouveauté. Je conçois et livre toute la pile.",
  "contact.about.p2":
    "L'index de projets est généré en direct depuis mes dépôts : il reflète mon travail réel, pas une sélection soignée.",
  "contact.about.p3":
    "Intérêts : intelligence machine appliquée, plateformes d'automatisation, outillage développeur et systèmes robustes.",
  "project.back": "Tous les projets",
  "project.learnMore": "En savoir plus sur GitHub",
  "project.visit": "Voir le projet",
  "project.stack": "Technologies",
  "project.readme": "Readme",
  "project.noReadme": "Aucun readme publié pour ce projet.",
  "project.loading": "Chargement du projet…",
  "project.notFound": "Ce projet n'a pas pu être chargé.",
  "time.today": "aujourd'hui",
  "time.d": "j",
  "time.mo": "mois",
  "time.y": "ans",
};

const de: Dict = {
  "nav.contact": "Kontakt",
  "nav.searchPlaceholder": "Projekte suchen…",
  "nav.noMatch": "Kein Projekt gefunden",
  "nav.language": "Sprache",
  "hero.eyebrow": "Unabhängiges KI-Studio",
  "hero.title.a": "Maschinelle Intelligenz,",
  "hero.title.em": "konstruiert",
  "hero.title.b": "mit Absicht — und ausgeliefert.",
  "hero.bio":
    "Vorqix A.I entwirft und baut KI-Systeme, Automatisierungswerkzeuge und Produktionssoftware. Alles unten stammt live aus den Repositories des Studios.",
  "hero.cta.work": "Arbeiten ansehen",
  "hero.cta.index": "Vollständiger Index",
  "work.eyebrow": "I. Die Arbeit",
  "work.title": "Live-Projektindex",
  "work.sync": "Aktualisieren",
  "work.searchPlaceholder": "Projekte, Sprachen, Beschreibungen suchen…",
  "work.clear": "Löschen",
  "work.all": "Alle",
  "work.sort.recent": "neueste",
  "work.sort.stars": "Sterne",
  "work.sort.name": "Name",
  "work.error": "Projektindex konnte nicht geladen werden.",
  "work.empty": "Keine Projekte für diesen Filter",
  "work.loadMore": "Mehr laden",
  "work.remaining": "verbleibend",
  "work.powered": "Powered by Vorqix A.I",
  "work.public": "Öffentlich",
  "work.fallbackDesc": "Ein internes System in aktiver Entwicklung.",
  "work.system": "System",
  "platforms.eyebrow": "II. Jenseits des Repositories",
  "platforms.title": "Gehostete Arbeiten",
  "platforms.pending": "Projekte werden ergänzt",
  "studio.eyebrow": "III. Das Studio",
  "studio.line.a": "Wir bauen die leise Maschinerie hinter intelligenten Produkten.",
  "studio.line.b": "Präzise, wo es zählt. Ausgeliefert, wenn es zählt.",
  "studio.cta": "Gespräch beginnen",
  "footer.blurb":
    "Angewandte Intelligenz, mit Absicht konstruiert. Jedes Projekt hier ist eigene Arbeit — Code, Architektur und Auslieferung.",
  "footer.work": "Arbeit",
  "footer.platforms": "Plattformen",
  "footer.about": "Über",
  "footer.contact": "Kontakt",
  "footer.rights": "Alle Rechte vorbehalten",
  "footer.credit": "Gestaltet und entwickelt von Vorqix",
  "contact.eyebrow": "Kontakt",
  "contact.title": "Lassen Sie uns etwas bauen, das es wert ist.",
  "contact.lede":
    "Offen für Engineering-Rollen, Projektarbeit und Zusammenarbeit. Am schnellsten per E-Mail — ich antworte selbst.",
  "contact.about": "Über",
  "contact.about.p1":
    "Vorqix A.I ist meine Ingenieurpraxis: angewandte Intelligenz mit Absicht statt Neuheit. Ich entwerfe und liefere den gesamten Stack.",
  "contact.about.p2":
    "Der Projektindex wird live aus meinen Repositories erzeugt und zeigt echte Arbeit statt einer kuratierten Auswahl.",
  "contact.about.p3":
    "Interessen: angewandte maschinelle Intelligenz, Automatisierungsplattformen, Entwicklerwerkzeuge und belastbare Systeme.",
  "project.back": "Alle Projekte",
  "project.learnMore": "Mehr auf GitHub",
  "project.visit": "Projekt öffnen",
  "project.stack": "Technologien",
  "project.readme": "Readme",
  "project.noReadme": "Für dieses Projekt gibt es noch kein Readme.",
  "project.loading": "Projekt wird geladen…",
  "project.notFound": "Dieses Projekt konnte nicht geladen werden.",
  "time.today": "heute",
  "time.d": "T",
  "time.mo": "Mon.",
  "time.y": "J",
};

const pt: Dict = {
  "nav.contact": "Contato",
  "nav.searchPlaceholder": "Buscar projetos…",
  "nav.noMatch": "Nenhum projeto corresponde",
  "nav.language": "Idioma",
  "hero.eyebrow": "Estúdio de IA independente",
  "hero.title.a": "Inteligência de máquina,",
  "hero.title.em": "projetada",
  "hero.title.b": "com intenção — e entregue.",
  "hero.bio":
    "A Vorqix A.I projeta e constrói sistemas de IA, ferramentas de automação e software em produção. Tudo abaixo vem ao vivo dos repositórios do estúdio.",
  "hero.cta.work": "Ver o trabalho",
  "hero.cta.index": "Índice completo",
  "work.eyebrow": "I. O trabalho",
  "work.title": "Índice de projetos ao vivo",
  "work.sync": "Sincronizar",
  "work.searchPlaceholder": "Buscar projetos, linguagens, descrições…",
  "work.clear": "Limpar",
  "work.all": "Todos",
  "work.sort.recent": "recentes",
  "work.sort.stars": "estrelas",
  "work.sort.name": "nome",
  "work.error": "Não foi possível carregar o índice de projetos.",
  "work.empty": "Nenhum projeto corresponde a esse filtro",
  "work.loadMore": "Carregar mais",
  "work.remaining": "restantes",
  "work.powered": "Desenvolvido pela Vorqix A.I",
  "work.public": "Público",
  "work.fallbackDesc": "Um sistema interno em desenvolvimento ativo.",
  "work.system": "Sistema",
  "platforms.eyebrow": "II. Além do repositório",
  "platforms.title": "Trabalhos hospedados",
  "platforms.pending": "Projetos sendo adicionados",
  "studio.eyebrow": "III. O estúdio",
  "studio.line.a": "Construímos a máquina silenciosa por trás de produtos inteligentes.",
  "studio.line.b": "Precisos onde importa. Entregues quando conta.",
  "studio.cta": "Iniciar uma conversa",
  "footer.blurb":
    "Inteligência aplicada, construída com intenção. Cada projeto aqui é trabalho próprio — código, arquitetura e entrega.",
  "footer.work": "Trabalho",
  "footer.platforms": "Plataformas",
  "footer.about": "Sobre",
  "footer.contact": "Contato",
  "footer.rights": "Todos os direitos reservados",
  "footer.credit": "Projetado e desenvolvido pela Vorqix",
  "contact.eyebrow": "Contato",
  "contact.title": "Vamos construir algo que vale a pena lançar.",
  "contact.lede":
    "Aberto a vagas de engenharia, contratos e colaborações. O caminho mais rápido é o e-mail — respondo pessoalmente.",
  "contact.about": "Sobre",
  "contact.about.p1":
    "A Vorqix A.I é minha prática de engenharia: inteligência aplicada com intenção, não por novidade. Projeto e entrego toda a stack.",
  "contact.about.p2":
    "O índice de projetos é gerado ao vivo dos meus repositórios, refletindo o trabalho real em vez de uma seleção curada.",
  "contact.about.p3":
    "Interesses: inteligência de máquina aplicada, plataformas de automação, ferramentas para desenvolvedores e sistemas resilientes.",
  "project.back": "Todos os projetos",
  "project.learnMore": "Saiba mais no GitHub",
  "project.visit": "Visitar projeto",
  "project.stack": "Tecnologias",
  "project.readme": "Readme",
  "project.noReadme": "Nenhum readme publicado para este projeto.",
  "project.loading": "Carregando projeto…",
  "project.notFound": "Não foi possível carregar esse projeto.",
  "time.today": "hoje",
  "time.d": "d atrás",
  "time.mo": "mes atrás",
  "time.y": "a atrás",
};

const it: Dict = {
  "nav.contact": "Contatti",
  "nav.searchPlaceholder": "Cerca progetti…",
  "nav.noMatch": "Nessun progetto corrisponde",
  "nav.language": "Lingua",
  "hero.eyebrow": "Studio di IA indipendente",
  "hero.title.a": "Intelligenza artificiale,",
  "hero.title.em": "progettata",
  "hero.title.b": "con intenzione — e consegnata.",
  "hero.bio":
    "Vorqix A.I progetta e costruisce sistemi di IA, strumenti di automazione e software in produzione. Tutto qui sotto arriva dal vivo dai repository dello studio.",
  "hero.cta.work": "Esplora il lavoro",
  "hero.cta.index": "Indice completo",
  "work.eyebrow": "I. Il lavoro",
  "work.title": "Indice progetti in tempo reale",
  "work.sync": "Aggiorna",
  "work.searchPlaceholder": "Cerca progetti, linguaggi, descrizioni…",
  "work.clear": "Pulisci",
  "work.all": "Tutti",
  "work.sort.recent": "recenti",
  "work.sort.stars": "stelle",
  "work.sort.name": "nome",
  "work.error": "Impossibile caricare l'indice dei progetti.",
  "work.empty": "Nessun progetto corrisponde al filtro",
  "work.loadMore": "Carica altri",
  "work.remaining": "rimanenti",
  "work.powered": "Realizzato da Vorqix A.I",
  "work.public": "Pubblico",
  "work.fallbackDesc": "Un sistema interno in sviluppo attivo.",
  "work.system": "Sistema",
  "platforms.eyebrow": "II. Oltre il repository",
  "platforms.title": "Lavori ospitati",
  "platforms.pending": "Progetti in aggiunta",
  "studio.eyebrow": "III. Lo studio",
  "studio.line.a": "Costruiamo la macchina silenziosa dietro i prodotti intelligenti.",
  "studio.line.b": "Precisi dove conta. Consegnati quando serve.",
  "studio.cta": "Iniziamo a parlare",
  "footer.blurb":
    "Intelligenza applicata, progettata con intenzione. Ogni progetto qui è lavoro mio — codice, architettura e consegna.",
  "footer.work": "Lavoro",
  "footer.platforms": "Piattaforme",
  "footer.about": "Chi sono",
  "footer.contact": "Contatti",
  "footer.rights": "Tutti i diritti riservati",
  "footer.credit": "Progettato e sviluppato da Vorqix",
  "contact.eyebrow": "Contatti",
  "contact.title": "Costruiamo qualcosa che merita di essere spedito.",
  "contact.lede":
    "Disponibile per ruoli di ingegneria, contratti e collaborazioni. La via più rapida è l'email — rispondo di persona.",
  "contact.about": "Chi sono",
  "contact.about.p1":
    "Vorqix A.I è la mia pratica ingegneristica: intelligenza applicata con intenzione, non per novità. Progetto e consegno l'intero stack.",
  "contact.about.p2":
    "L'indice dei progetti è generato dal vivo dai miei repository: mostra il lavoro reale, non una selezione curata.",
  "contact.about.p3":
    "Interessi: intelligenza applicata, piattaforme di automazione, strumenti per sviluppatori e sistemi affidabili.",
  "project.back": "Tutti i progetti",
  "project.learnMore": "Scopri di più su GitHub",
  "project.visit": "Apri il progetto",
  "project.stack": "Tecnologie",
  "project.readme": "Readme",
  "project.noReadme": "Nessun readme pubblicato per questo progetto.",
  "project.loading": "Caricamento progetto…",
  "project.notFound": "Impossibile caricare questo progetto.",
  "time.today": "oggi",
  "time.d": "g fa",
  "time.mo": "mesi fa",
  "time.y": "anni fa",
};

const zh: Dict = {
  "nav.contact": "联系",
  "nav.github": "GitHub",
  "nav.searchPlaceholder": "搜索项目…",
  "nav.noMatch": "没有匹配的项目",
  "nav.language": "语言",
  "hero.eyebrow": "独立人工智能工作室",
  "hero.title.a": "机器智能，",
  "hero.title.em": "精心构建",
  "hero.title.b": "并真正交付。",
  "hero.bio":
    "Vorqix A.I 设计并构建人工智能系统、自动化工具与生产级软件。以下内容全部实时来自工作室的代码仓库。",
  "hero.cta.work": "查看作品",
  "hero.cta.index": "完整索引",
  "work.eyebrow": "一、作品",
  "work.title": "实时项目索引",
  "work.sync": "同步",
  "work.searchPlaceholder": "搜索项目、语言或描述…",
  "work.clear": "清除",
  "work.all": "全部",
  "work.sort.recent": "最新",
  "work.sort.stars": "星标",
  "work.sort.name": "名称",
  "work.error": "无法加载项目索引。",
  "work.empty": "没有符合筛选条件的项目",
  "work.loadMore": "加载更多",
  "work.remaining": "剩余",
  "work.powered": "由 Vorqix A.I 提供技术支持",
  "work.public": "公开",
  "work.fallbackDesc": "正在积极开发中的内部系统。",
  "work.system": "系统",
  "platforms.eyebrow": "二、仓库之外",
  "platforms.title": "已托管作品",
  "platforms.pending": "项目正在添加中",
  "studio.eyebrow": "三、工作室",
  "studio.line.a": "我们构建智能产品背后安静运转的机器。",
  "studio.line.b": "在关键处精确，在需要时交付。",
  "studio.cta": "开始对话",
  "footer.blurb": "应用智能，精心构建。这里的每个项目都是我亲自完成的代码、架构与交付。",
  "footer.work": "作品",
  "footer.platforms": "平台",
  "footer.about": "关于",
  "footer.contact": "联系",
  "footer.rights": "保留所有权利",
  "footer.credit": "由 Vorqix 设计与开发",
  "contact.eyebrow": "联系",
  "contact.title": "一起打造值得交付的产品。",
  "contact.lede": "欢迎工程岗位、合约项目与合作洽谈。邮件最快——由我本人回复。",
  "contact.about": "关于",
  "contact.about.p1":
    "Vorqix A.I 是我的工程实践：以目的而非新奇为导向的应用智能。我负责设计、编写并交付整套技术栈。",
  "contact.about.p2":
    "本站的项目索引实时来自我的代码仓库，呈现真实进行中的工作，而非精选集锦。",
  "contact.about.p3": "关注方向：应用机器智能、自动化平台、开发者工具与经得起实际使用的系统。",
  "project.back": "全部项目",
  "project.learnMore": "在 GitHub 上了解更多",
  "project.visit": "访问项目",
  "project.stack": "技术栈",
  "project.readme": "说明文档",
  "project.noReadme": "该项目尚未发布说明文档。",
  "project.loading": "正在加载项目…",
  "project.notFound": "无法加载该项目。",
  "time.today": "今天",
  "time.d": "天前",
  "time.mo": "个月前",
  "time.y": "年前",
};

const ar: Dict = {
  "nav.contact": "تواصل",
  "nav.searchPlaceholder": "ابحث في المشاريع…",
  "nav.noMatch": "لا يوجد مشروع مطابق",
  "nav.language": "اللغة",
  "hero.eyebrow": "استوديو ذكاء اصطناعي مستقل",
  "hero.title.a": "ذكاء الآلة،",
  "hero.title.em": "مُهندَس",
  "hero.title.b": "بنيّة واضحة — ومُسلَّم فعلاً.",
  "hero.bio":
    "تصمم Vorqix A.I وتبني أنظمة ذكاء اصطناعي وأدوات أتمتة وبرمجيات إنتاجية. كل ما يظهر أدناه يُجلب مباشرة من مستودعات الاستوديو.",
  "hero.cta.work": "استعرض الأعمال",
  "hero.cta.index": "الفهرس الكامل",
  "work.eyebrow": "أولاً. الأعمال",
  "work.title": "فهرس المشاريع المباشر",
  "work.sync": "تحديث",
  "work.searchPlaceholder": "ابحث عن مشاريع أو لغات أو أوصاف…",
  "work.clear": "مسح",
  "work.all": "الكل",
  "work.sort.recent": "الأحدث",
  "work.sort.stars": "النجوم",
  "work.sort.name": "الاسم",
  "work.error": "تعذّر تحميل فهرس المشاريع.",
  "work.empty": "لا توجد مشاريع مطابقة لهذا الفلتر",
  "work.loadMore": "عرض المزيد",
  "work.remaining": "متبقٍ",
  "work.powered": "مدعوم من Vorqix A.I",
  "work.public": "عام",
  "work.fallbackDesc": "نظام داخلي قيد التطوير النشط.",
  "work.system": "نظام",
  "platforms.eyebrow": "ثانياً. ما وراء المستودع",
  "platforms.title": "أعمال مستضافة",
  "platforms.pending": "تتم إضافة المشاريع",
  "studio.eyebrow": "ثالثاً. الاستوديو",
  "studio.line.a": "نبني الآلية الهادئة خلف المنتجات الذكية.",
  "studio.line.b": "دقّة حيث يجب. وتسليم حين يهم.",
  "studio.cta": "ابدأ محادثة",
  "footer.blurb": "ذكاء تطبيقي مُهندَس بنيّة. كل مشروع هنا من عملي — الكود والمعمارية والتسليم.",
  "footer.work": "الأعمال",
  "footer.platforms": "المنصات",
  "footer.about": "نبذة",
  "footer.contact": "تواصل",
  "footer.rights": "جميع الحقوق محفوظة",
  "footer.credit": "تصميم وتطوير Vorqix",
  "contact.eyebrow": "تواصل",
  "contact.title": "لنبنِ شيئاً يستحق الإطلاق.",
  "contact.lede":
    "منفتح على وظائف هندسية وأعمال تعاقدية وتعاون. أسرع طريق هو البريد — أرد بنفسي.",
  "contact.about": "نبذة",
  "contact.about.p1":
    "Vorqix A.I هي ممارستي الهندسية: ذكاء تطبيقي مبني بنيّة لا بدافع الجدة. أصمم وأكتب وأسلّم المنظومة كاملة.",
  "contact.about.p2":
    "فهرس المشاريع يُولَّد مباشرة من مستودعاتي، فيعكس عملي الحقيقي لا مجرد مختارات.",
  "contact.about.p3":
    "الاهتمامات: ذكاء الآلة التطبيقي، منصات الأتمتة، أدوات المطورين، وأنظمة تصمد في الاستخدام الفعلي.",
  "project.back": "كل المشاريع",
  "project.learnMore": "اعرف المزيد على GitHub",
  "project.visit": "زيارة المشروع",
  "project.stack": "التقنيات",
  "project.readme": "الملف التعريفي",
  "project.noReadme": "لم يُنشر ملف تعريفي لهذا المشروع بعد.",
  "project.loading": "جارٍ تحميل المشروع…",
  "project.notFound": "تعذّر تحميل هذا المشروع.",
  "time.today": "اليوم",
  "time.d": "يوم مضى",
  "time.mo": "شهر مضى",
  "time.y": "سنة مضت",
};

const DICTS: Record<LocaleCode, Dict> = { en, es, fr, de, pt, it, zh, ar };

const STORAGE_KEY = "vorqix.locale";

type Ctx = {
  locale: LocaleCode;
  setLocale: (l: LocaleCode) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
    if (stored && DICTS[stored]) {
      setLocaleState(stored);
      return;
    }
    const nav = window.navigator.language.slice(0, 2) as LocaleCode;
    if (DICTS[nav]) setLocaleState(nav);
  }, []);

  useEffect(() => {
    const meta = LOCALES.find((l) => l.code === locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = meta?.rtl ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((l: LocaleCode) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => DICTS[locale]?.[key] ?? en[key],
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
