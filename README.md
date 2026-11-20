# Control de Gestión 2026 · Dirección Formación Profesional

Landing institucional ejecutable con Vue 3, GSAP/ScrollTrigger y Vite. Versión 0.6: textos depurados en todas las secciones y mapa real de la distribución de anexos, con fondo transparente y ampliación al hacer clic. Se mantienen el video Full HD y la identidad institucional.

## Levantar en tu computadora

Requisitos: Node.js 20.19+ o 22.12+ (se recomienda Node.js 24).

1. Descomprimir el ZIP.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar:

   npm install
   npm run dev

4. Abrir la dirección que informa Vite (habitualmente http://localhost:5173).

## Compilar para publicar en tu servidor

   npm run build

El resultado queda en dist/. Ese directorio contiene la versión estática lista para servir desde IIS, Nginx, Apache o un hosting estático. El ZIP también trae un directorio dist/ ya compilado para facilitar la primera prueba.

Para probar solamente la versión compilada:

   npm run preview

## Dónde modificar

- src/App.vue — secciones, navegación y animaciones.
- src/styles.css — paleta, tipografías, espacios y adaptación a celulares.
- src/data.js — indicadores, Departamentos, centros anexos, proyectos e hitos.
- public/assets/crests/ — escudos oficiales, copiados sin modificaciones.
- public/assets/photos/ — selección de fotografías extraídas del Word original.
- public/assets/maps/ — mapa de los centros anexos con fondo transparente, mapa completo para ampliar y fotografía original de referencia.
- public/assets/videos/ — montaje Full HD (1920 × 1080, 30 fps) de aproximadamente 41 segundos, elaborado con los ocho videos originales recibidos, y su imagen de respaldo.

La portada reproduce la secuencia en silencio y en bucle, con un velo azul noche ligero que permite distinguir mejor la formación y mantiene legibles el título y los escudos. En dispositivos que solicitan movimiento reducido se muestra la imagen fija. Para reemplazar el montaje, usar `public/assets/videos/hero-formacion-2026-hd.mp4`, conservando el nombre de archivo, y volver a compilar. Los ocho videos originales (más de 1 GB en conjunto) no se incluyen en el ZIP para mantenerlo liviano.

No se distribuye el Word completo dentro del sitio para evitar un proyecto de más de 130 MB. Los scripts de inspección y exportación quedan en scripts/ para futuras actualizaciones con el mismo documento.

## Criterio estadístico

La portada y el panorama respetan el total consolidado de **3.861 alumnos** (**711 cadetes y 3.150 aspirantes**) del informe generado el **19/11/2026**. Los anexos están incluidos en los Departamentos y **no se suman otra vez**.

La Escuela Superior informa por separado **1.515 convocados, 1.220 inscriptos y 512 aprobados**.

Pendiente de conciliar antes de la exposición final:

- Escuela Superior: diferencias con el resumen de la Dirección.
- Escuela de Oficiales: diferencia entre total de alumnos y desglose por promociones.
- Informes individuales de ciertos anexos: diferencias de matrícula respecto del consolidado.
- Canals: figura en el consolidado, pero no tiene un informe individual en el Word.

Las jornadas de tiro de Deán Funes se presentan como **12 jornadas**, no como 12 cursos distintos.

Las notas de conciliación estadística se documentan aquí para la revisión interna; se eliminaron de la presentación visual junto con los párrafos genéricos. El mapa de anexos es una preparación gráfica a partir de la imagen aportada, conservada como referencia en los archivos del proyecto.

## Identidad visual

Paleta de referencia aportada:

- Azul claro #A7EBF2
- Celeste petróleo #54ACBF
- Azul medio #26658C
- Azul oscuro #023859
- Azul noche #011C40
- Dorado de apoyo #C9AD77

Todos los escudos mantienen sus archivos originales.
