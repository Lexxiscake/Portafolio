export type Language = 'es' | 'en';

export interface ArchitectureStage {
  label: string;
  detail: string;
}

export interface Tradeoff {
  decision: string;
  cost: string;
  rationale: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'security' | 'systems';
  year: string;
  role: string;
  status: string;
  tags: string[];
  metrics: string[];
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  pipeline: ArchitectureStage[];
  tradeoffs: Tradeoff[];
  codeSnippet: string;
  codeLanguage: string;
  githubUrl: string;
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
    hp: 'Me gusta el desarrollo de software, sobre todo el backend. Diseño lógica sólida, estructuro datos y construyo sistemas que funcionan bien detrás de todo. Ahora exploro IA, automatización y redes.',
    bub: 'Estudiante de Ing en sistemas, amante de la cultura japonesa y de himiko toga muejeje. Creador de codes con un toque geek/otaku.',
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
    hp: 'I like software development, especially backend. I design solid logic, structure data, and build systems that work well behind the scenes. I am exploring AI, automation, and networking.',
    bub: 'Systems Engineering student, lover of Japanese culture and of Himiko Toga, mwahaha. Code creator with a geek/otaku touch.',
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
    subtitle: 'Agente de escritorio con memoria local y acciones controladas',
    category: 'ai',
    year: '2025 — presente',
    role: 'Arquitectura · backend local · UI',
    status: 'Activo',
    tags: ['TypeScript', 'Electron', 'SQLite FTS5', 'Live2D'],
    metrics: [
      'Búsqueda en memoria local < 12ms con SQLite FTS5',
      '0 dependencia de nube para inferencia y persistencia',
      'Ejecución de acciones con allowlist y confirmación humana',
    ],
    summary:
      'Kaoru es un agente de escritorio hecho en Electron. Guarda la memoria en SQLite FTS5, corre la inferencia en el equipo y solo ejecuta acciones que estén en una lista blanca.',
    problem:
      'Los asistentes que dependen de la nube tienen latencia variable, mandan datos a terceros y suelen pedir permisos amplios sobre el sistema. Quería un agente útil sin abrir esa superficie.',
    solution:
      'Separé la interfaz del proceso principal con IPC y contextIsolation. La memoria se consulta con FTS5, y cada acción pasa por una allowlist y una confirmación antes de ejecutarse.',
    architecture: [
      'Puente IPC asíncrono entre la UI y Node, con contextIsolation y validación de payload.',
      'Memoria en SQLite con FTS5, consultas parametrizadas y consolidación de conversaciones.',
      'Dispatcher de acciones con allowlist, revisión del comando y confirmación humana.',
    ],
    pipeline: [
      { label: 'UI Live2D', detail: 'React · estados de conversación' },
      { label: 'IPC Bridge', detail: 'contextIsolation · payload validation' },
      { label: 'Memory Engine', detail: 'SQLite FTS5 · consolidación' },
      { label: 'Action Dispatcher', detail: 'allowlist · confirmación humana' },
    ],
    tradeoffs: [
      {
        decision: 'Inferencia 100% local',
        cost: 'Menor capacidad de razonamiento que un modelo frontier',
        rationale: 'La memoria y las conversaciones no salen del equipo.',
      },
      {
        decision: 'SQLite FTS5 en vez de vector DB',
        cost: 'Búsqueda lexical, no embeddings densos',
        rationale: 'Un solo archivo, cero servicios que mantener y consultas por debajo de 12 ms.',
      },
      {
        decision: 'Ejecución de comandos con allowlist',
        cost: 'Menos automatización libre',
        rationale: 'Prefiero perder automatización antes que ejecutar un comando sin revisión.',
      },
    ],
    codeSnippet: `// La memoria vive en el equipo. FTS5 evita depender de un servicio externo.
export async function queryMemory(
  db: Database,
  query: string,
  limit = 5
): Promise<MemoryEntry[]> {
  const stmt = db.prepare(\`
    SELECT id, content, rank, timestamp
    FROM memory_entries
    WHERE memory_entries MATCH ?
    ORDER BY rank
    LIMIT ?
  \`);

  // rank de FTS5 es negativo: menor valor = mejor coincidencia.
  // El límite va bindeado, nunca interpolado en el SQL.
  return stmt.all(query, limit) as MemoryEntry[];
}`,
    codeLanguage: 'typescript',
    githubUrl: 'https://github.com/Lexxiscake/kaoru',
  },
  {
    id: 'linux-hardener',
    title: 'Linux Hardener',
    subtitle: 'Auditoría y hardening de Linux con checks idempotentes',
    category: 'security',
    year: '2025 — presente',
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
    codeSnippet: `#!/usr/bin/env bash
# Perfil conservador: audita primero, muta solo con --apply.
set -euo pipefail

apply_sysctl() {
  local key="$1" value="$2"

  # Verifica el valor actual antes de escribir: idempotencia real.
  if [[ "$(sysctl -n "$key")" == "$value" ]]; then
    printf '[SKIP] %s already set to %s\\n' "$key" "$value"
    return 0
  fi

  sysctl -w "\${key}=\${value}" >/dev/null
  printf '%s = %s\\n' "$key" "$value" >> /etc/sysctl.d/99-hardened.conf
}

apply_sysctl "net.ipv4.tcp_syncookies" "1"
apply_sysctl "net.ipv4.conf.all.rp_filter" "1"
apply_sysctl "net.ipv4.conf.all.accept_redirects" "0"`,
    codeLanguage: 'bash',
    githubUrl: 'https://github.com/Lexxiscake/linux-hardener',
  },
  {
    id: 'gestion-medica',
    title: 'Gestión Clínica & Triaje',
    subtitle: 'Backend para citas, expedientes y quirófanos',
    category: 'systems',
    year: '2024 — 2025',
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
    codeSnippet: `CREATE PROCEDURE sp_RegistrarConsulta
    @PacienteId INT,
    @MedicoId INT,
    @Diagnostico NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    -- Transacción corta: el lock no cubre llamadas externas ni UI.
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Consultas (PacienteId, MedicoId, Fecha, Diagnostico)
        VALUES (@PacienteId, @MedicoId, GETUTCDATE(), @Diagnostico);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;`,
    codeLanguage: 'sql',
    githubUrl: 'https://github.com/Lexxiscake/gestion-medica',
  },
];

export const AVATAR_IMAGE = '/images/avatar-128.png';
export const HERO_IMAGE = '/images/hero-720.jpg';
