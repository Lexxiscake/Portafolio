export type Language = 'es' | 'en';

/**
 * Every user-facing project field is stored in both languages. The string
 * branch exists only for legacy entries while the data is migrated.
 */
export type LocalizedString = string | { es: string; en: string };

export function localized(value: LocalizedString, lang: Language): string {
  return typeof value === 'string' ? value : value[lang];
}

export interface ArchitectureStage {
  label: LocalizedString;
  detail: LocalizedString;
}

export interface Tradeoff {
  decision: LocalizedString;
  cost: LocalizedString;
  rationale: LocalizedString;
}

export interface ProjectDetail {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  category: 'ai' | 'security' | 'systems';
  year?: LocalizedString;
  role?: LocalizedString;
  status?: LocalizedString;
  tags: string[];
  metrics: LocalizedString[];
  /** One-line result shown on the card. Falls back to the first metric. */
  cardResult?: LocalizedString;
  summary: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  /** Optional history section, rendered only when present. */
  evolution?: LocalizedString;
  architecture: LocalizedString[];
  pipeline: ArchitectureStage[];
  tradeoffs: Tradeoff[];
  /** Code is hidden when there is no verified snippet. */
  code?: { snippet: string; language: string };
  githubUrl?: string;
}

export interface TranslationData {
  np: string;
  st: string;
  na: string;
  nc: string;
  role: string;
  hp: string;
  bub: string;
  t1: string;
  t2: string;
  shot: string;
  repo: string;
  cp: string;
  viewAll: string;
}

export const DICTIONARY: Record<Language, TranslationData> = {
  es: {
    np: 'Proyectos',
    st: 'Tijuana, Baja California · MX',
    na: 'Sobre mí',
    nc: 'Contacto',
    role: 'Ingeniería en Sistemas',
    hp: 'Me gusta el desarrollo de software, especialmente el backend, aunque no desaprovecharía la oportunidad de aprender y experimentar en frontend. Disfruto diseñar lógica sólida, estructurar datos y construir sistemas que funcionan bien detrás de todo.\n\nActualmente exploro inteligencia artificial, automatización y redes, buscando entender cómo conectar sistemas de forma eficiente y escalable.',
    bub: 'Estudiante de Ing. en Sistemas en el ITT (ingreso agosto 2023, 7mo semestre).',
    t1: 'Proyectos',
    t2: 'Cómo trabajo',
    shot: '[CASO]',
    repo: 'GitHub',
    cp: 'Si quieres comentar un proyecto, una duda técnica o una colaboración, escríbeme con el contexto. Incluye qué intentas hacer, qué has probado y qué restricciones tienes.',
    viewAll: 'Ver proyectos →',
  },
  en: {
    np: 'Projects',
    st: 'Tijuana, Baja California · MX',
    na: 'About',
    nc: 'Contact',
    role: 'Systems Engineering',
    hp: 'I like software development, especially backend, though I would not pass up the opportunity to learn and experiment on the frontend. I enjoy designing solid logic, structuring data, and building systems that work well behind the scenes.\n\nI am currently exploring artificial intelligence, automation, and networking, seeking to understand how to connect systems efficiently and at scale.',
    bub: 'Systems Engineering student at ITT (started August 2023, 7th semester).',
    t1: 'Projects',
    t2: 'How I work',
    shot: '[CASE]',
    repo: 'GitHub',
    cp: 'If you want to talk about a project, a technical question, or a collaboration, write to me with the context. Include what you are trying to do, what you have tried, and your constraints.',
    viewAll: 'View projects →',
  },
};

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: 'kaoru',
    title: 'Kaoru AI Agent',
    subtitle: {
      es: 'Asistente de escritorio con memoria local, proactividad auditable y acciones controladas por permisos',
      en: 'Desktop assistant with local memory, auditable proactivity, and permission-controlled actions',
    },
    category: 'ai',
    year: { es: 'Julio 2026', en: 'July 2026' },
    status: { es: 'Beta', en: 'Beta' },
    tags: ['JavaScript', 'Electron', 'SQLite', 'Live2D'],
    metrics: [
      {
        es: 'Decisión proactiva determinista: cada mensaje admitido se rastrea hasta su puntuación, pesos y política',
        en: 'Deterministic proactive decision: every admitted message can be traced to its score, weights, and policy',
      },
      {
        es: 'Permisos allow/ask/deny fuera del LLM, con sandbox de procesos, verificación forzada y revert de tareas',
        en: 'Allow/ask/deny permissions outside the LLM, with process sandbox, forced verification, and task rollback',
      },
      {
        es: 'CI con calidad, tests, E2E y build en Windows, macOS y Linux; instaladores publicados en GitHub Releases',
        en: 'CI with quality, tests, E2E, and build on Windows, macOS, and Linux; installers published on GitHub Releases',
      },
    ],
    cardResult: {
      es: 'Cada mensaje proactivo se rastrea hasta su puntuación y política; el modelo no puede concederse permisos',
      en: 'Every proactive message can be traced to its score and policy; the model cannot grant itself permissions',
    },
    summary: {
      es: 'Asistente de escritorio hecho con Electron que conversa, recuerda, propone y actúa con tu permiso. Tiene memoria local con decaimiento temporal, un motor proactivo cuya decisión se puede rastrear y permisos allow/ask/deny resueltos fuera del modelo.',
      en: 'Desktop assistant built with Electron that chats, remembers, proposes, and acts with your permission. It has local memory with temporal decay, a proactive engine whose decision can be traced, and allow/ask/deny permissions resolved outside the model.',
    },
    problem: {
      es: 'Quería un asistente que no se limitara a responder: que recordara, propusiera y pudiera actuar en la computadora, sin darle a un modelo de lenguaje control sin límites sobre ella.',
      en: 'I wanted an assistant that did not just answer: one that could remember, propose, and act on the computer, without giving a language model unlimited control over it.',
    },
    evolution: {
      es: 'Empezó como un proyecto personal: quería un asistente con un motor de proactividad, que propusiera cosas por iniciativa propia en vez de esperar a que le hablara. Fue creciendo hasta convertirse en un asistente persistente, con una memoria propia, que puede ejecutar acciones dentro de la computadora. Cada paso trajo un problema nuevo: la proactividad obligó a decidir cuándo callarse, la memoria a decidir qué olvidar y las acciones a decidir qué no puede hacer.',
      en: 'It started as a personal project: I wanted an assistant with a proactivity engine that would propose things on its own initiative instead of waiting for me to talk to it. It grew into a persistent assistant with its own memory that can execute actions inside the computer. Each step brought a new problem: proactivity forced me to decide when to stay quiet, memory to decide what to forget, and actions to decide what it cannot do.',
    },
    solution: {
      es: 'Kaoru combina chat, voz sintetizada y un avatar Live2D. La memoria vive en SQLite con sqlite-vec y embeddings locales, con decaimiento temporal. Lo proactivo pasa por un núcleo de decisión determinista y el modelo solo redacta el texto. Las acciones pasan por permisos allow/ask/deny que se resuelven fuera del modelo. El LLM es configurable: Groq, Gemini u OpenAI con fallback, o un endpoint local.',
      en: 'Kaoru combines chat, synthesized voice, and a Live2D avatar. Memory lives in SQLite with sqlite-vec and local embeddings, with temporal decay. Proactive work goes through a deterministic decision core and the model only writes the text. Actions go through allow/ask/deny permissions resolved outside the model. The LLM is configurable: Groq, Gemini, or OpenAI with fallback, or a local endpoint.',
    },
    pipeline: [
      {
        label: { es: 'Sensores', en: 'Sensors' },
        detail: { es: 'SO · Git · LSP · título de ventana · eventos', en: 'OS · Git · LSP · window title · events' },
      },
      {
        label: { es: 'Decisión determinista', en: 'Deterministic decision' },
        detail: {
          es: 'score · gate de contexto · ACT, QUEUE, DROP, ESCALATE',
          en: 'score · context gate · ACT, QUEUE, DROP, ESCALATE',
        },
      },
      {
        label: { es: 'LLM redacta', en: 'LLM writes' },
        detail: { es: 'Groq · Gemini · OpenAI o endpoint local', en: 'Groq · Gemini · OpenAI or local endpoint' },
      },
      {
        label: { es: 'Permisos y ejecución', en: 'Permissions and execution' },
        detail: {
          es: 'allow-ask-deny · PathGuard · sandbox · verificación',
          en: 'allow-ask-deny · PathGuard · sandbox · verification',
        },
      },
    ],
    tradeoffs: [
      {
        decision: {
          es: 'Decisión proactiva determinista; el LLM solo redacta',
          en: 'Deterministic proactive decision; the LLM only writes',
        },
        cost: {
          es: 'Más reglas y pesos que mantener, y menos flexibilidad que dejar decidir al modelo',
          en: 'More rules and weights to maintain, and less flexibility than letting the model decide',
        },
        rationale: {
          es: 'Puedo rastrear por qué se admitió un mensaje: puntuación, pesos y política',
          en: 'I can trace why a message was admitted: score, weights, and policy',
        },
      },
      {
        decision: { es: 'Permisos fuera del modelo', en: 'Permissions outside the model' },
        cost: {
          es: 'Más confirmaciones y menos autonomía',
          en: 'More confirmations and less autonomy',
        },
        rationale: {
          es: 'El modelo propone, pero no puede concederse permisos; la autonomía se ajusta con observe, suggest o act',
          en: 'The model proposes but cannot grant itself permissions; autonomy is adjusted with observe, suggest, or act',
        },
      },
      {
        decision: {
          es: 'Memoria local con embeddings ONNX en SQLite',
          en: 'Local memory with ONNX embeddings in SQLite',
        },
        cost: {
          es: 'Dependencias nativas que hay que recompilar para el ABI de Electron y un modelo de embeddings que cargar',
          en: 'Native dependencies that must be rebuilt for the Electron ABI and an embedding model to load',
        },
        rationale: {
          es: 'La memoria, los embeddings y la telemetría se quedan en el equipo',
          en: 'Memory, embeddings, and telemetry stay on the machine',
        },
      },
      {
        decision: {
          es: 'Proveedor LLM configurable con fallback',
          en: 'Configurable LLM provider with fallback',
        },
        cost: {
          es: 'Lo que el modelo necesita para responder sale hacia el proveedor elegido',
          en: 'What the model needs to answer leaves for the chosen provider',
        },
        rationale: {
          es: 'Puedo cambiar de modelo o usar uno local sin tocar el agente',
          en: 'I can switch models or use a local one without touching the agent',
        },
      },
    ],
    architecture: [
      {
        es: 'Grafo de conocimiento en SQLite + sqlite-vec: similitud coseno ponderada por recencia, decaimiento de nodos viejos y resolución de contradicciones.',
        en: 'Knowledge graph in SQLite + sqlite-vec: cosine similarity weighted by recency, decay of old nodes, and contradiction resolution.',
      },
      {
        es: 'Agente de código con LSP real, parches con diff, verificación posterior y rollback automático; checkpoint por tarea con /revertir-tarea.',
        en: 'Code agent with real LSP, diff patches, post-edit verification, and automatic rollback; per-task checkpoint with /revertir-tarea.',
      },
      {
        es: 'Chat con streaming por IPC, Markdown sanitizado con DOMPurify y renderer con contextIsolation y sandbox.',
        en: 'Chat with IPC streaming, Markdown sanitized with DOMPurify, and a renderer with contextIsolation and sandbox.',
      },
      {
        es: 'Límites conocidos: beta; macOS experimental; instaladores sin firmar ni notarizar; sin entrada por micrófono.',
        en: 'Known limits: beta; experimental macOS; unsigned and unnotarized installers; no microphone input.',
      },
      {
        es: 'El modelo Live2D incluido (March 7th) es propiedad de HoYoverse; es un proyecto de fan no oficial.',
        en: 'The included Live2D model (March 7th) is property of HoYoverse; this is an unofficial fan project.',
      },
    ],
    githubUrl: 'https://github.com/Lexxiscake/Kaoru-Agent',
  },
  {
    id: 'linux-hardener',
    title: 'Linux Hardener',
    subtitle: 'Auditoría y hardening de Linux con checks idempotentes',
    category: 'security',
    year: 'Abril 2026',
    role: 'Diseño de checks · CI/CD · documentación',
    status: 'Activo',
    tags: ['Linux', 'Bash', 'CIS Benchmark', 'GitHub Actions'],
    metrics: [
      '45+ controles CIS Level 1 & 2 automatizados',
      'Matriz CI validada en Ubuntu, Fedora y Arch',
      'Rollback explícito ante cambios incompatibles',
    ],
    summary:
      'Scripts para revisar y endurecer servidores Linux: kernel, SSH, PAM, permisos SUID, firewall y módulos. Cada check se puede ejecutar solo para auditar o con --apply para cambiar el sistema, y deja evidencia en JSON o Markdown.',
    problem:
      'Aplicar un baseline CIS a mano lleva horas y es fácil romper SSH o dejar un servicio sin arrancar. Muchos scripts populares mezclan auditoría y cambios sin una ruta clara para volver atrás.',
    solution:
      'El motor detecta la distro y el kernel, ejecuta checks idempotentes y separa el reporte de la remediación. GitHub Actions prueba el perfil en contenedores de Ubuntu, Fedora y Arch antes de publicarlo.',
    architecture: [
      'Bootstrap con detección de gestor de paquetes, distro y versión de kernel.',
      'Módulos separados para sysctl, SSH, PAM, filesystem y binarios SUID.',
      'Reporte JSON/Markdown con severidad, evidencia y ruta de rollback.',
    ],
    pipeline: [
      { label: 'Bootstrap', detail: 'distro · kernel · package manager' },
      { label: 'Audit Engine', detail: 'checks idempotentes · severidad' },
      { label: 'Report', detail: 'JSON · Markdown · rollback path' },
      { label: 'CI Matrix', detail: 'Ubuntu · Fedora · Arch' },
    ],
    tradeoffs: [
      {
        decision: 'Checks conservadores por defecto',
        cost: 'No maximiza la puntuación CIS',
        rationale: 'Prefiero no tocar SSH o servicios críticos hasta revisar el reporte.',
      },
      {
        decision: 'Bash + coreutils',
        cost: 'Menos portabilidad que Python',
        rationale: 'Cero runtime extra en servidores mínimos y scripts fáciles de leer.',
      },
      {
        decision: 'Auditar sin mutar por defecto',
        cost: 'Requiere una segunda ejecución para remediar',
        rationale: 'Así una auditoría no puede tumbar un servicio por accidente.',
      },
    ],
    githubUrl: 'https://github.com/Lexxiscake/linux-hardener',
  },
  {
    id: 'gestion-medica',
    title: 'Gestión Clínica & Triaje',
    subtitle: 'Backend para citas, expedientes y quirófanos',
    category: 'systems',
    year: 'Noviembre 2025',
    role: 'Backend · T-SQL · modelo de datos',
    status: 'Caso de estudio',
    tags: ['Python', 'SQL Server', 'T-SQL', 'ACID'],
    metrics: [
      '0 deadlocks en reservas concurrentes con transacciones cortas',
      'Consultas históricas 74% más rápidas con índices no agrupados',
      'RBAC y auditoría de accesos a datos clínicos',
    ],
    summary:
      'Sistema para gestionar expedientes, consultas y reservas de quirófano. La lógica está en Python y la integridad y concurrencia se resuelven en SQL Server.',
    problem:
      'Dos recepcionistas podían reservar el mismo horario al mismo tiempo y las pantallas con historial tardaban en cargar. También hacía falta separar lo que podía ver cada rol.',
    solution:
      'Separé el acceso a datos en una capa DAO, usé procedimientos almacenados para las escrituras críticas y ajusté los índices a los filtros que realmente se usaban. Cada acceso a expedientes queda auditado.',
    architecture: [
      'Capa DAO con pool de conexiones y consultas parametrizadas.',
      'Procedimientos almacenados T-SQL con transacciones cortas y manejo TRY/CATCH.',
      'RBAC y auditoría de accesos a expedientes y notas clínicas.',
    ],
    pipeline: [
      { label: 'PyQt5 Client', detail: 'roles · flujo clínico' },
      { label: 'DAO Layer', detail: 'pool · queries parametrizadas' },
      { label: 'Stored Procedures', detail: 'T-SQL · transacciones cortas' },
      { label: 'SQL Server', detail: 'ACID · índices · auditoría' },
    ],
    tradeoffs: [
      {
        decision: 'SQL Server relacional',
        cost: 'Licencia y mayor complejidad operativa',
        rationale: 'Los datos clínicos necesitan integridad referencial y transacciones claras.',
      },
      {
        decision: 'Stored procedures para escrituras críticas',
        cost: 'Menos testeo unitario convencional',
        rationale: 'El plan de ejecución queda estable y el control de concurrencia no depende del ORM.',
      },
      {
        decision: 'Transacciones cortas + reintentos',
        cost: 'Mayor complejidad en la capa de aplicación',
        rationale: 'Menos bloqueos, aunque la aplicación tiene que saber cuándo reintentar.',
      },
    ],
    githubUrl: 'https://github.com/Lexxiscake/gestion-medica',
  },
];

import { withBasePath } from './site';

export const AVATAR_IMAGE = withBasePath('/images/avatar-128.png');
export const HERO_IMAGE = withBasePath('/images/hero-720.jpg');
