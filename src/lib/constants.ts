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
    subtitle: {
      es: 'Auditoría y endurecimiento base para servidores Ubuntu y Debian',
      en: 'Baseline audit and hardening for Ubuntu and Debian servers',
    },
    category: 'security',
    year: { es: 'Abril 2026', en: 'April 2026' },
    status: { es: 'Activo', en: 'Active' },
    tags: ['Python', 'Typer', 'Pydantic', 'GitHub Actions'],
    metrics: [
      {
        es: '15 checks en 4 módulos: SSH, firewall, fail2ban y sistema',
        en: '15 checks across 4 modules: SSH, firewall, fail2ban, and system',
      },
      {
        es: 'Si sshd -t falla, el sshd_config original se restaura solo',
        en: 'If sshd -t fails, the original sshd_config is restored automatically',
      },
      {
        es: '18 tests con pytest y CI en Python 3.11 y 3.12',
        en: '18 tests with pytest and CI on Python 3.11 and 3.12',
      },
    ],
    cardResult: {
      es: '15 checks en 4 módulos; si sshd -t falla, se restaura el sshd_config original',
      en: '15 checks across 4 modules; if sshd -t fails, the original sshd_config is restored',
    },
    summary: {
      es: 'CLI que audita y endurece un servidor Ubuntu o Debian recién creado: SSH, firewall UFW y fail2ban. Respalda cada archivo antes de tocarlo, valida SSH antes de recargarlo y permite revertir. Incluye modo simulación y reportes en JSON y Markdown.',
      en: 'CLI that audits and hardens a freshly created Ubuntu or Debian server: SSH, UFW firewall, and fail2ban. It backs up every file before touching it, validates SSH before reloading it, and allows rollback. It includes a simulation mode and JSON and Markdown reports.',
    },
    problem: {
      es: 'Un VPS recién creado suele traer SSH con acceso como root, el firewall apagado, sin fail2ban y con paquetes sin actualizar. Arreglarlo a mano es repetitivo, y el error más caro es quedarte fuera del servidor por un sshd_config roto o por un firewall que bloquea tu propio puerto.',
      en: 'A freshly created VPS usually ships with SSH root access, the firewall off, no fail2ban, and unpatched packages. Fixing it by hand is repetitive, and the most expensive mistake is locking yourself out of the server because of a broken sshd_config or a firewall that blocks your own port.',
    },
    solution: {
      es: 'Una CLI con los comandos audit, apply, check, rollback y report. audit solo lee y da una puntuación de 0 a 100. apply lee un config.yml y, antes de escribir cualquier archivo, guarda un respaldo con marca de tiempo. En SSH corre sshd -t después de modificar la configuración y, si falla, restaura el original y aborta. En UFW agrega siempre el puerto SSH antes de activar el firewall. Con --dry-run muestra cada comando sin ejecutarlo.',
      en: 'A CLI with the audit, apply, check, rollback, and report commands. audit only reads and returns a score from 0 to 100. apply reads a config.yml and, before writing any file, saves a timestamped backup. For SSH it runs sshd -t after changing the configuration and, if it fails, restores the original and aborts. For UFW it always adds the SSH port before enabling the firewall. With --dry-run it shows every command without executing it.',
    },
    pipeline: [
      {
        label: { es: 'Auditar', en: 'Audit' },
        detail: { es: 'checks de solo lectura · puntuación 0-100', en: 'read-only checks · score 0-100' },
      },
      {
        label: { es: 'Simular', en: 'Simulate' },
        detail: { es: '--dry-run, sin escribir nada', en: '--dry-run, writes nothing' },
      },
      {
        label: { es: 'Aplicar', en: 'Apply' },
        detail: { es: 'respaldo + validación con sshd -t', en: 'backup + validation with sshd -t' },
      },
      {
        label: { es: 'Verificar y revertir', en: 'Verify and roll back' },
        detail: { es: 'nuevo audit · rollback por componente', en: 'new audit · per-component rollback' },
      },
    ],
    tradeoffs: [
      {
        decision: { es: 'Python + Typer en vez de Bash puro', en: 'Python + Typer instead of pure Bash' },
        cost: {
          es: 'Necesita Python 3.11+ en el servidor',
          en: 'Requires Python 3.11+ on the server',
        },
        rationale: {
          es: 'Se puede probar con pytest, valida el YAML con Pydantic y da la misma salida en todas las distros',
          en: 'It can be tested with pytest, validates YAML with Pydantic, and produces the same output on every distro',
        },
      },
      {
        decision: {
          es: 'Validar con sshd -t y restaurar el respaldo',
          en: 'Validate with sshd -t and restore the backup',
        },
        cost: {
          es: 'Más código y depende de que exista el binario',
          en: 'More code, and it depends on the binary being present',
        },
        rationale: {
          es: 'Un sshd_config roto es la forma más común de bloquearse en un servidor remoto',
          en: 'A broken sshd_config is the most common way to lock yourself out of a remote server',
        },
      },
      {
        decision: {
          es: 'audit y apply en módulos separados',
          en: 'audit and apply in separate modules',
        },
        cost: {
          es: 'Hay que pasar dos veces: auditar y luego corregir',
          en: 'You have to run twice: audit, then fix',
        },
        rationale: {
          es: 'Auditar es seguro sin config ni permisos de escritura, y se prueba sin simular archivos',
          en: 'Auditing is safe without config or write permissions, and it can be tested without simulating files',
        },
      },
      {
        decision: {
          es: 'Solo Ubuntu/Debian y solo UFW',
          en: 'Ubuntu/Debian only and UFW only',
        },
        cost: {
          es: 'No cubre Rocky, Alma ni otros firewalls',
          en: 'It does not cover Rocky, Alma, or other firewalls',
        },
        rationale: {
          es: 'Prefiero probar bien dos familias antes de prometer más',
          en: 'I prefer to test two families well before promising more',
        },
      },
    ],
    architecture: [
      {
        es: 'utils/shell.run() es el único punto donde se ejecutan comandos; ahí viven el --dry-run y el log.',
        en: 'utils/shell.run() is the only place where commands are executed; --dry-run and logging live there.',
      },
      {
        es: 'Configuración validada con Pydantic v2 antes de ejecutar cualquier módulo.',
        en: 'Configuration validated with Pydantic v2 before running any module.',
      },
      {
        es: 'Reportes con puntuación: PASS = 1, WARN = 0.5, FAIL = 0.',
        en: 'Reports with a score: PASS = 1, WARN = 0.5, FAIL = 0.',
      },
      {
        es: 'Límites: Rocky/Alma, auditd, políticas de contraseñas y exportación a Ansible están planeados para v3; hoy no están.',
        en: 'Limits: Rocky/Alma, auditd, password policies, and Ansible export are planned for v3; they are not there today.',
      },
    ],
    githubUrl: 'https://github.com/Lexxiscake/linux-hardener',
  },
  {
    id: 'horarios-universitarios',
    title: {
      es: 'Sistema de Gestión de Horarios Universitarios',
      en: 'University Schedule Management System',
    },
    subtitle: {
      es: 'Carga de materias sin conflictos con Backtracking y SQL Server',
      en: 'Subject scheduling without conflicts using Backtracking and SQL Server',
    },
    category: 'systems',
    tags: ['Python', 'PyQt5', 'SQL Server', 'Backtracking'],
    metrics: [
      {
        es: 'Genera un horario completo y válido con un solo clic',
        en: 'Generates a complete, valid schedule with a single click',
      },
      {
        es: 'Valida 4 restricciones: disponibilidad del maestro, cruces del grupo, aulas y reglas guardadas en SQL Server',
        en: 'Validates 4 constraints: teacher availability, group conflicts, classrooms, and rules stored in SQL Server',
      },
    ],
    cardResult: {
      es: 'Horario completo y sin cruces con un solo clic, validando 4 restricciones',
      en: 'Complete, conflict-free schedule with a single click, validating 4 constraints',
    },
    summary: {
      es: 'Aplicación de escritorio para administrar materias, maestros y horarios de una universidad. Su módulo principal genera la carga de materias con Backtracking, asignando maestros y horarios sin cruces a partir de lo guardado en SQL Server.',
      en: 'Desktop application to manage subjects, teachers, and schedules for a university. Its main module generates subject assignments with Backtracking, assigning teachers and time slots without conflicts based on what is stored in SQL Server.',
    },
    problem: {
      es: 'Armar la carga de materias de una carrera implica cuadrar maestros, grupos, horarios y aulas sin que nada se cruce, y cualquier cambio obliga a revisar todo otra vez.',
      en: "Building a degree program's subject load means balancing teachers, groups, schedules, and classrooms so that nothing conflicts, and any change forces you to review everything again.",
    },
    solution: {
      es: 'Una aplicación de escritorio en PyQt5 conectada a SQL Server con pyodbc. Tiene catálogo de materias, maestros con disponibilidad por día y hora, y horarios por carrera y semestre. La carga inteligente toma una materia sin asignar, busca un maestro disponible y, si hay conflicto, retrocede y prueba otra combinación.',
      en: 'A desktop application built with PyQt5 and connected to SQL Server through pyodbc. It has a subject catalog, teachers with availability by day and time, and schedules by degree and semester. Intelligent scheduling takes an unassigned subject, looks for an available teacher, and if there is a conflict, backtracks and tries another combination.',
    },
    pipeline: [
      {
        label: { es: 'Interfaz PyQt5', en: 'PyQt5 interface' },
        detail: { es: 'vistas .ui', en: '.ui views' },
      },
      {
        label: { es: 'Lógica de interfaces', en: 'Interface logic' },
        detail: { es: 'controladores', en: 'controllers' },
      },
      {
        label: { es: 'Carga inteligente', en: 'Intelligent scheduling' },
        detail: { es: 'Backtracking', en: 'Backtracking' },
      },
      {
        label: { es: 'SQL Server', en: 'SQL Server' },
        detail: { es: 'pyodbc · scripts en BD/', en: 'pyodbc · scripts in BD/' },
      },
    ],
    tradeoffs: [
      {
        decision: { es: 'Backtracking', en: 'Backtracking' },
        cost: {
          es: 'En el peor caso el tiempo crece de forma exponencial con el número de materias y maestros',
          en: 'In the worst case, time grows exponentially with the number of subjects and teachers',
        },
        rationale: {
          es: 'Asigna materia por materia y retrocede ante un conflicto hasta cerrar un horario completo y válido',
          en: 'It assigns subject by subject and backtracks on a conflict until it closes a complete, valid schedule',
        },
      },
      {
        decision: {
          es: 'Disponibilidad y restricciones guardadas en SQL Server',
          en: 'Availability and constraints stored in SQL Server',
        },
        cost: {
          es: 'Cada decisión depende de consultar la base',
          en: 'Every decision depends on querying the database',
        },
        rationale: {
          es: 'Los datos son la fuente de verdad y se editan desde la propia aplicación',
          en: 'The data is the source of truth and is edited from the application itself',
        },
      },
      {
        decision: {
          es: 'Vistas, lógica y base de datos en carpetas separadas',
          en: 'Views, logic, and database in separate folders',
        },
        cost: { es: 'Más archivos', en: 'More files' },
        rationale: {
          es: 'Los .ui se editan sin tocar la lógica',
          en: 'The .ui files are edited without touching the logic',
        },
      },
    ],
    architecture: [
      {
        es: 'Vistas en archivos .ui de PyQt5, separadas de los controladores.',
        en: 'Views in PyQt5 .ui files, separated from the controllers.',
      },
      {
        es: 'Scripts SQL de tablas y procedimientos en BD/.',
        en: 'SQL scripts for tables and procedures in BD/.',
      },
      {
        es: 'Conexión Python a SQL Server con pyodbc.',
        en: 'Python connection to SQL Server with pyodbc.',
      },
    ],
  },
];

import { withBasePath } from './site';

export const AVATAR_IMAGE = withBasePath('/images/avatar-128.png');
export const HERO_IMAGE = withBasePath('/images/hero-720.jpg');
