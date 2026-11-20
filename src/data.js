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
    stats: [
      { value: 1515, label: 'Convocados' },
      { value: 1220, label: 'Inscriptos' },
      { value: 512, label: 'Aprobados' },
      { value: 23, label: 'Personal estable' },
    ],
  },
  {
    id: 'oficiales',
    shortName: 'Escuela de Oficiales',
    name: 'Escuela de Oficiales de Policía',
    honorary: 'Ltdor. Gral. Don José de San Martín',
    crest: crest('escuela-oficiales'),
    image: photo('oficiales_formacion'),
    stats: [
      { value: 711, label: 'Cadetes' },
      { value: 3, label: 'Promociones activas' },
      { value: 17, label: 'Capacitaciones' },
      { value: 2, label: 'Anexos' },
    ],
  },
  {
    id: 'suboficiales',
    shortName: 'Escuela de Suboficiales',
    name: 'Escuela de Suboficiales de Policía',
    honorary: 'Gral. Manuel Belgrano',
    crest: crest('escuela-suboficiales'),
    image: photo('suboficiales_bandera'),
    stats: [
      { value: 3150, label: 'Aspirantes' },
      { value: 23, label: 'Centros anexos' },
      { value: 473, label: 'Docentes' },
      { value: 4, label: 'Promociones' },
    ],
  },
]

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
  },
  {
    title: 'Entrenamiento territorial',
    department: 'Centro Anexo Deán Funes',
    image: photo('anexo_dean_funes'),
  },
  {
    title: 'Infraestructura educativa',
    department: 'Escuela de Oficiales',
    image: photo('oficiales_obras'),
  },
  {
    title: 'Articulación institucional',
    department: 'Escuela Superior',
    image: photo('superior_edificio'),
  },
]

export const milestones = [
  {
    month: 'ABR · MAY',
    year: '2026',
    title: 'Apertura de centros anexos',
    image: photo('anexo_alta_gracia'),
  },
  {
    month: 'JUNIO',
    year: '2026',
    title: 'Inauguración de gimnasio cubierto',
    image: photo('superior_edificio'),
  },
  {
    month: 'DURANTE EL AÑO',
    year: '2026',
    title: 'Capacitaciones en Capital e interior',
    image: photo('suboficiales_formacion'),
  },
]

export const number = (n) => new Intl.NumberFormat('es-AR').format(n)
