<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { centers, crest, departments, milestones, number, overview, photo, projects } from './data'

gsap.registerPlugin(ScrollTrigger)

const sectionLinks = [
  { id: 'panorama', label: 'Panorama' },
  { id: 'escuelas', label: 'Escuelas' },
  { id: 'territorio', label: 'Territorio' },
  { id: 'formacion', label: 'Formación' },
  { id: 'gestion', label: 'Gestión' },
  { id: 'hitos', label: 'Hitos' },
]
const menuOpen = ref(false)
const currentSection = ref('inicio')
const selectedDeptId = ref('superior')
const showCenters = ref(false)
const showMap = ref(false)
const scrollProgress = ref(0)
const isFullscreen = ref(false)
const heroVideo = ref(null)
const currentDept = computed(() => departments.find((d) => d.id === selectedDeptId.value))
const mainCenters = [...centers].sort((a, b) => b.students - a.students).slice(0, 7)
const coverage = Math.round((overview.trainingReached / overview.trainingTarget) * 100)
let animationContext
let observer

const closeMenu = () => {
  menuOpen.value = false
}

const jumpTo = (id) => {
  closeMenu()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const updateScroll = () => {
  const maximum = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maximum > 0 ? (window.scrollY / maximum) * 100 : 0
}

const toggleFullscreen = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen()
  } catch {}
}

const updateFullscreen = () => {
  isFullscreen.value = Boolean(document.fullscreenElement)
}

const closeMapOnEscape = (event) => {
  if (event.key === 'Escape') {
    showMap.value = false
    closeMenu()
  }
}

watch(selectedDeptId, async () => {
  await nextTick()
  ScrollTrigger.refresh()
})

watch(showCenters, async () => {
  await nextTick()
  ScrollTrigger.refresh()
})

watch(showMap, (open) => {
  document.body.classList.toggle('map-is-open', open)
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) heroVideo.value?.pause()
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', updateScroll, { passive: true })
  document.addEventListener('fullscreenchange', updateFullscreen)
  document.addEventListener('keydown', closeMapOnEscape)

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((item) => item.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) currentSection.value = visible[0].target.id
    },
    { rootMargin: '-22% 0px -54% 0px', threshold: [0, 0.15, 0.35, 0.5] },
  )
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))

  animationContext = gsap.context(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.hero-brand-row', { opacity: 0, y: 18, duration: 0.72 })
        .from('.hero-title', { opacity: 0, y: 48, duration: 1.0 }, '-=0.48')
        .from('.hero-visual, .hero-inline-crest', { opacity: 0, scale: 0.9, duration: 1.05 }, '-=0.65')
        .from('.hero-ctas', { opacity: 0, y: 22, duration: 0.55 }, '-=0.55')

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 46,
          opacity: 0,
          duration: 0.86,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        })
      })
      gsap.utils.toArray('[data-count]').forEach((element) => {
        const target = Number(element.dataset.count)
        const tween = { value: 0 }
        gsap.to(tween, {
          value: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 95%', once: true },
          onUpdate: () => { element.textContent = number(Math.round(tween.value)) },
        })
      })
      gsap.utils.toArray('.territory-bar-fill').forEach((element) => {
        gsap.from(element, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        })
      })
    })
  }, document.documentElement)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  animationContext?.revert()
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', updateScroll)
  document.removeEventListener('fullscreenchange', updateFullscreen)
  document.removeEventListener('keydown', closeMapOnEscape)
  document.body.classList.remove('map-is-open')
})
</script>

<template>
  <div class="site-shell">
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }" aria-hidden="true"></div>
    <header class="site-header">
      <a class="site-brand" href="#inicio" @click="closeMenu">
        <img :src="crest('direccion-formacion')" alt="Escudo de la Dirección Formación Profesional" />
        <span><strong>FORMACIÓN PROFESIONAL</strong><small>CONTROL DE GESTIÓN 2026</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Navegación principal">
        <a v-for="link in sectionLinks" :key="link.id" :class="{ active: currentSection === link.id }" :href="'#' + link.id">{{ link.label }}</a>
      </nav>
      <div class="header-actions">
        <button class="presentation-button" @click="toggleFullscreen">{{ isFullscreen ? 'Salir de pantalla completa' : 'Presentar' }}</button>
        <button class="menu-toggle" type="button" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'" aria-controls="mobile-navigation" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Menú">
        <a v-for="link in sectionLinks" :key="link.id" :href="'#' + link.id" @click="closeMenu">{{ link.label }}</a>
        <button type="button" class="mobile-present" @click="closeMenu(); toggleFullscreen()">{{ isFullscreen ? 'Salir de pantalla completa' : 'Presentar' }}</button>
      </nav>
    </header>

    <main>
      <section id="inicio" class="hero section-anchor">
        <div class="hero-video-backdrop" aria-hidden="true">
          <img class="hero-video-poster" :src="'./assets/videos/hero-poster-hd.webp'" alt="" />
          <video
            ref="heroVideo"
            class="hero-video"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            :poster="'./assets/videos/hero-poster-hd.webp'"
          >
            <source :src="'./assets/videos/hero-formacion-2026-hd.mp4'" type="video/mp4" />
          </video>
        </div>
        <div class="hero-content page-container">
          <div class="hero-copy">
            <div class="hero-brand-row">
              <div class="hero-police-wordmark" aria-label="Policía de la Provincia de Córdoba">
                <span class="police-wordmark-main">POLICÍA</span>
                <span class="police-wordmark-sub">DE LA PROVINCIA DE CÓRDOBA</span>
              </div>
              <div class="hero-agency-logos">
                <img :src="crest('policia')" alt="Escudo de la Policía de Córdoba" />
                <img :src="crest('recursos-humanos')" alt="Escudo de Recursos Humanos" />
              </div>
            </div>
            <div class="hero-hierarchy">
              <span>Dirección General de Recursos Humanos</span>
              <span>Subdirección General de Recursos Humanos</span>
              <span>Dirección Formación Profesional</span>
            </div>
            <div class="hero-heading-row">
              <h1 class="hero-title">CONTROL<br />DE <span>GESTIÓN</span><em>2026</em></h1>
              <img class="hero-inline-crest" :src="crest('direccion-formacion')" alt="" aria-hidden="true" />
            </div>
            <div class="hero-ctas">
              <button class="button-primary" @click="jumpTo('panorama')">Explorar resultados</button>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div class="hero-crest-frame">
              <img :src="crest('direccion-formacion')" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="panorama" class="section section-anchor section-panorama">
        <div class="page-container">
          <div class="section-heading" data-reveal>
            <h2>La Dirección <span>en cifras.</span></h2>
          </div>
          <div class="panorama-layout">
            <article class="main-stat-card" data-reveal>
              <div class="card-topline"><span>FORMACIÓN INICIAL</span></div>
              <div class="main-stat-number" :data-count="overview.students">{{ number(overview.students) }}</div>
              <h3>Alumnos en formación</h3>
              <div class="population-track" role="img" aria-label="711 cadetes y 3.150 aspirantes">
                <div class="cadets" :style="{ width: (overview.cadets / overview.students * 100) + '%' }"></div>
                <div class="aspirants" :style="{ width: (overview.aspirants / overview.students * 100) + '%' }"></div>
              </div>
              <div class="population-legend">
                <div><span class="key key-gold"></span><strong>711</strong><small>Cadetes</small></div>
                <div><span class="key key-blue"></span><strong>3.150</strong><small>Aspirantes</small></div>
              </div>
              <div class="main-stat-decoration" aria-hidden="true">DFP</div>
            </article>
            <div class="secondary-stats">
              <article class="mini-stat" data-reveal>
                <strong data-count="3">3</strong>
                <span>Departamentos de formación</span>
              </article>
              <article class="mini-stat" data-reveal>
                <strong :data-count="overview.annexes">{{ number(overview.annexes) }}</strong>
                <span>Centros anexos de Suboficiales</span>
              </article>
              <article class="mini-stat" data-reveal>
                <strong :data-count="overview.instructors">{{ number(overview.instructors) }}</strong>
                <span>Docentes de Suboficiales</span>
              </article>
              <article class="mini-stat accent-stat" data-reveal>
                <strong :data-count="overview.trainingReached">{{ number(overview.trainingReached) }}</strong>
                <span>Personal capacitado</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="escuelas" class="section section-anchor section-schools">
        <div class="page-container">
          <div class="section-heading" data-reveal>
            <h2>Tres escuelas. <span>Una Dirección.</span></h2>
          </div>
          <div class="school-tabs" role="tablist" aria-label="Seleccionar Departamento" data-reveal>
            <button v-for="dept in departments" :key="dept.id" role="tab" :aria-selected="selectedDeptId === dept.id" :class="{ selected: selectedDeptId === dept.id }" @click="selectedDeptId = dept.id">
              <img :src="dept.crest" :alt="'Escudo de ' + dept.shortName" />
              <span>{{ dept.shortName }}</span>
            </button>
          </div>
          <Transition name="school" mode="out-in">
            <div :key="currentDept.id" class="school-detail">
              <div class="school-photo">
                <img :src="currentDept.image" :alt="'Actividad institucional de ' + currentDept.shortName" />
                <div class="school-photo-overlay"></div>
                <img class="school-floating-crest" :src="currentDept.crest" :alt="'Escudo de ' + currentDept.shortName" />
              </div>
              <div class="school-information">
                <h3>{{ currentDept.name }}</h3>
                <p class="honorary">{{ currentDept.honorary }}</p>
                <div class="school-metrics">
                  <div v-for="stat in currentDept.stats" :key="stat.label">
                    <strong>{{ number(stat.value) }}</strong>
                    <span>{{ stat.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <section id="territorio" class="section section-anchor section-territory">
        <div class="page-container">
          <div class="section-heading" data-reveal>
            <h2>Formación <span>en territorio.</span></h2>
          </div>
          <div class="territory-layout">
            <div class="territory-illustration" data-reveal>
              <button class="territory-map-button" type="button" aria-label="Ampliar mapa de centros anexos de Córdoba" @click="showMap = true">
                <img :src="'./assets/maps/anexos-cordoba.png'" alt="Mapa provincial de centros anexos de formación, divididos por ámbito norte y sur" />
                <span>AMPLIAR MAPA <span aria-hidden="true">↗</span></span>
              </button>
              <div class="territory-map-key" aria-label="Referencias territoriales">
                <span><i class="map-key-north"></i> ÁMBITO NORTE</span>
                <span><i class="map-key-south"></i> ÁMBITO SUR</span>
              </div>
            </div>
            <div class="territory-chart" data-reveal>
              <div class="chart-caption">
                <h3>Centros con mayor matrícula</h3>
              </div>
              <div class="territory-bars">
                <div v-for="(center, i) in mainCenters" :key="center.name" class="territory-row">
                  <div class="territory-row-label"><span>{{ center.name }}</span><strong>{{ number(center.students) }}</strong></div>
                  <div class="territory-bar-track"><div class="territory-bar-fill" :style="{ width: (center.students / mainCenters[0].students * 100) + '%' }"></div></div>
                </div>
              </div>
              <button class="text-button" @click="showCenters = !showCenters">{{ showCenters ? 'Ocultar centros' : 'Ver todos los centros' }} <span>{{ showCenters ? '−' : '+' }}</span></button>
            </div>
          </div>
          <div v-if="showCenters" class="centers-expanded">
            <div v-for="center in centers" :key="center.name"><span>{{ center.name }}</span><strong>{{ number(center.students) }}</strong></div>
          </div>
        </div>
      </section>

      <section id="formacion" class="section section-anchor section-training">
        <div class="page-container">
          <div class="section-heading" data-reveal>
            <h2>Preparación, <span>conocimiento y acción.</span></h2>
          </div>
          <div class="training-layout">
            <article class="training-feature" data-reveal>
              <div class="training-feature-top">JORNADAS DE FORTALECIMIENTO INSTITUCIONAL <span>DFP</span></div>
              <div class="training-feature-main">
                <div>
                  <strong class="training-big" :data-count="overview.trainingReached">{{ number(overview.trainingReached) }}</strong>
                  <p>Personal capacitado</p>
                  <small>Meta: {{ number(overview.trainingTarget) }}</small>
                </div>
                <div class="coverage-ring" :style="{ '--coverage': coverage + '%' }"><div><strong>{{ coverage }}%</strong><span>AVANCE</span></div></div>
              </div>
            </article>
            <div class="training-aside">
              <article class="training-aside-card" data-reveal>
                <span>CAPACITACIÓN EN RETIRO</span>
                <strong :data-count="overview.retiredTrained">{{ number(overview.retiredTrained) }}</strong>
                <h3>Personal retirado capacitado</h3>
              </article>
              <article class="training-aside-card training-aside-image" data-reveal>
                <img :src="photo('anexo_dean_funes')" alt="Prácticas en el Centro Anexo Deán Funes" />
                <div class="training-aside-image-shade"></div>
                <div class="training-aside-image-content"><span>PRÁCTICA OPERATIVA · DEÁN FUNES</span><strong>12 jornadas</strong></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="gestion" class="section section-anchor section-management">
        <div class="page-container">
          <div class="section-heading" data-reveal>
            <h2>Gestión que <span>se transforma en resultados.</span></h2>
          </div>
          <div class="project-grid">
            <article v-for="(project, index) in projects" :key="project.title" class="project-card" :class="{ featured: index === 0 }" data-reveal>
              <div class="project-photo"><img :src="project.image" :alt="project.title + ', ' + project.department" /></div>
              <div class="project-content">
                <span>{{ project.department }}</span>
                <h3>{{ project.title }}</h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="hitos" class="section section-anchor section-milestones">
        <div class="page-container">
          <div class="section-heading" data-reveal>
            <h2>Un año de <span>acciones concretas.</span></h2>
          </div>
          <div class="timeline">
            <article v-for="milestone in milestones" :key="milestone.title" class="timeline-item" data-reveal>
              <div class="timeline-date"><span>{{ milestone.month }}</span><strong>{{ milestone.year }}</strong></div>
              <div class="timeline-axis"><span></span></div>
              <div class="timeline-content"><h3>{{ milestone.title }}</h3></div>
              <div class="timeline-photo"><img :src="milestone.image" :alt="milestone.title" /></div>
            </article>
          </div>
        </div>
      </section>

      <section id="cierre" class="finale section-anchor">
        <div class="finale-grid" aria-hidden="true"></div>
        <div class="finale-inner page-container" data-reveal>
          <img class="finale-crest" :src="crest('direccion-formacion')" alt="Escudo de la Dirección Formación Profesional" />
          <div class="eyebrow">POLICÍA DE LA PROVINCIA DE CÓRDOBA</div>
          <h2>FORMACIÓN<br /><span>PROFESIONAL</span></h2>
          <p>Control de Gestión · 2026</p>
          <div class="finale-departments">
            <img v-for="dept in departments" :key="dept.id" :src="dept.crest" :alt="'Escudo de ' + dept.shortName" />
          </div>
        </div>
      </section>
    </main>
    <footer class="site-footer"><span>DIRECCIÓN FORMACIÓN PROFESIONAL · POLICÍA DE CÓRDOBA</span><span>CONTROL DE GESTIÓN 2026</span></footer>
    <div v-if="showMap" class="territory-map-overlay" role="dialog" aria-modal="true" aria-label="Mapa de centros anexos de Córdoba" @click.self="showMap = false">
      <button class="map-overlay-close" type="button" aria-label="Cerrar mapa" @click="showMap = false">×</button>
      <img :src="'./assets/maps/anexos-cordoba-completo.png'" alt="Mapa ampliado de centros anexos con leyenda de ámbito norte y sur" />
    </div>
  </div>
</template>
