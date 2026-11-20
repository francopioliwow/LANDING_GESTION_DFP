export const crest = (name) => './assets/crests/' + name + '.png'
export const photo = (name) => './assets/photos/' + name + '.webp'

export const overview = {
  students: 3861,
  cadets: 711,
  aspirants: 3150,
  annexes: 23,
  instructors: 473,
  trainingReached: 9089,
  trainingTarget: 22706,
  retiredTrained: 388,
}

export const departments = [
  {
    id: 'superior',
    shortName: 'Escuela Superior',
    name: 'Escuela Superior de Policía',
    honorary: 'Brig. Gral. Juan Bautista Bustos',
    crest: crest('escuela-superior'),
    image: photo('superior_autoridades'),
    eyebrow: 'Perfeccionamiento y promoción jerárquica',
    description: 'Formación, capacitación y perfeccionamiento continuo del personal superior de la Policía de Córdoba.',
    stats: [
      { value: 1515, label: 'Convocados' },
      { value: 1220, label: 'Inscriptos' },
      { value: 512, label: 'Aprobados' },
      { value: 23, label: 'Personal estable' },
    ],
    note: 'Situación académica informada por el Departamento. Convocados e inscriptos difieren del resumen de la Dirección.',
  },
  {
    id: 'oficiales',
    shortName: 'Escuela de Oficiales',
    name: 'Escuela de Oficiales de Policía',
    honorary: 'Ltdor. Gral. Don José de San Martín',
    crest: crest('escuela-oficiales'),
    image: photo('oficiales_formacion'),
    eyebrow: 'Formación inicial de oficiales',
    description: 'Formación académica, operativa, ética y profesional de los futuros oficiales, con alcance en Capital y centros anexos.',
    stats: [
      { value: 711, label: 'Cadetes' },
      { value: 3, label: 'Promociones activas' },
      { value: 17, label: 'Capacitaciones informadas' },
      { value: 2, label: 'Anexos consignados' },
    ],
    note: 'El total de cadetes corresponde a la Escuela completa, incluidos sus anexos.',
  },
  {
    id: 'suboficiales',
    shortName: 'Escuela de Suboficiales',
    name: 'Escuela de Suboficiales de Policía',
    honorary: 'Gral. Manuel Belgrano',
    crest: crest('escuela-suboficiales'),
    image: photo('suboficiales_bandera'),
    eyebrow: 'Formación inicial de agentes',
    description: 'Formación profesional y humanística de los futuros suboficiales, articulada entre la sede Capital y los centros anexos.',
    stats: [
      { value: 3150, label: 'Aspirantes' },
      { value: 23, label: 'Centros anexos' },
      { value: 473, label: 'Docentes informados' },
      { value: 4, label: 'Promociones consignadas' },
    ],
    note: 'Alumnos y centros corresponden al consolidado de la Escuela; no se suman nuevamente los informes de anexos.',
  },
]

// Fuente: «Cantidad de alumnos por Anexo» del consolidado del
// Departamento Escuela de Suboficiales. Revisión de consistencia pendiente.
export const centers = [
  ['Valle Hermoso', 335],
  ['Villa Dolores', 279],
  ['Jesús María', 224],
  ['Río Cuarto', 165],
  ['Deán Funes', 125],
  ['Cruz del Eje', 123],
  ['Villa de Soto', 110],
  ['Bell Ville', 109],
  ['Villa Allende', 99],
  ['Malagueño', 81],
  ['Río Tercero', 77],
  ['San Carlos Minas', 65],
  ['San Francisco', 59],
  ['Villa María', 58],
  ['Río Segundo', 58],
  ['Santa Rosa de Río Primero', 56],
  ['Canals', 39],
  ['Alta Gracia', 37],
  ['Laboulaye', 36],
  ['Salsacate', 29],
  ['Villa Huidobro', 29],
  ['La Carlota', 14],
  ['Corral de Bustos', 14],
].map(([name, students]) => ({ name, students }))

export const projects = [
  {
    title: 'Formación y prácticas',
    department: 'Escuela de Suboficiales',
    image: photo('suboficiales_practicas'),
    detail: 'Prácticas profesionalizantes y preparación operativa.',
    tag: 'Formación aplicada',
  },
  {
    title: 'Entrenamiento territorial',
    department: 'Centro Anexo Deán Funes',
    image: photo('anexo_dean_funes'),
    detail: 'Jornadas de equipamiento, tiro y manejo de armas.',
    tag: '12 jornadas',
  },
  {
    title: 'Infraestructura educativa',
    department: 'Escuela de Oficiales',
    image: photo('oficiales_obras'),
    detail: 'Intervenciones y mejoras de espacios de formación.',
    tag: 'Mejoras edilicias',
  },
  {
    title: 'Articulación institucional',
    department: 'Escuela Superior',
    image: photo('superior_edificio'),
    detail: 'Instalaciones, proyectos y acciones de perfeccionamiento.',
    tag: 'Gestión institucional',
  },
]

export const milestones = [
  {
    month: 'ABR · MAY',
    year: '2026',
    title: 'Apertura de centros anexos',
    description: 'Inauguraciones de nuevos centros anexos registradas por la Escuela de Suboficiales.',
    image: photo('anexo_alta_gracia'),
  },
  {
    month: 'JUNIO',
    year: '2026',
    title: 'Inauguración de gimnasio cubierto',
    description: 'Inauguración del gimnasio cubierto informada por la Escuela Superior.',
    image: photo('superior_edificio'),
  },
  {
    month: 'DURANTE EL AÑO',
    year: '2026',
    title: 'Capacitaciones en Capital e interior',
    description: 'Desarrollo de capacitaciones, actividades operativas y prácticas en Capital e interior.',
    image: photo('suboficiales_formacion'),
  },
  {
    month: 'NOVIEMBRE',
    year: '2026',
    title: 'Consolidación del informe 2026',
    description: 'Integración de la información anual de la Dirección, los Departamentos y sus anexos.',
    image: photo('oficiales_ceremonia'),
  },
]

export const number = (n) => new Intl.NumberFormat('es-AR').format(n)
