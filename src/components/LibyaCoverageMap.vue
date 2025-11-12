<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';
import { geoMercator, geoPath } from 'd3-geo';
import { useI18n } from '../composables/useI18n';

const MAP_SIZE = 360;
const MAP_SOURCE = '/Libya/ly.json';
const INITIAL_ZOOM = 1.7;
const INITIAL_TRANSLATE = { x: 0, y: -120 };
const SECONDARY = '#087E8B';
const ACCENT = '#EBC042';

const { t, locale } = useI18n();

const rawFeatures = ref([]);
const hoveredFeatureId = ref(null);
const selectedCity = ref('benghazi');
const loading = ref(true);
const svgWrapperRef = ref(null);

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  label: '',
});

const zoom = ref(INITIAL_ZOOM);
const minZoom = 1.2;
const maxZoom = 2.4;
const translate = reactive({ ...INITIAL_TRANSLATE });
const isMdUp = ref(false);
let mdMediaQuery = null;
let mdMediaQueryListener = null;

function updateBreakpointState(source) {
  if ('matches' in source) {
    isMdUp.value = source.matches;
  } else if ('target' in source && source.target) {
    isMdUp.value = source.target.matches;
  }
}

const cityConfigs = {
  benghazi: {
    featureNames: ['Benghazi'],
    label: { ar: 'بنغازي', en: 'Benghazi' },
    stats: { clinics: 24, hospitals: 9 },
    facilities: [
      {
        name: {
          ar: 'مركز بنغازي الطبي',
          en: 'Benghazi Medical Center',
        },
        type: 'hospital',
        focus: {
          ar: 'طوارئ وتخصصات دقيقة',
          en: 'Emergency & specialty care',
        },
      },
      {
        name: {
          ar: 'مستشفى الجلاء للجراحة والحوادث',
          en: 'Al Jalaa Trauma Hospital',
        },
        type: 'hospital',
        focus: {
          ar: 'جراحة عامة وطب الطوارئ',
          en: 'General surgery & trauma',
        },
      },
      {
        name: {
          ar: 'مجمع عيادات لا باس بنغازي',
          en: 'Labas Clinics Benghazi',
        },
        type: 'clinic',
        focus: {
          ar: 'طب الأسرة والرعاية المزمنة',
          en: 'Family medicine & chronic care',
        },
      },
      {
        name: {
          ar: 'مخبر التحاليل المركزية',
          en: 'Central Diagnostics Lab',
        },
        type: 'lab',
        focus: {
          ar: 'تحاليل مخبرية وتشخيص متكامل',
          en: 'Full diagnostics & lab services',
        },
      },
    ],
  },
  tripoli: {
    featureNames: ['Trípoli', 'Tripoli'],
    label: { ar: 'طرابلس', en: 'Tripoli' },
    stats: { clinics: 32, hospitals: 11 },
    facilities: [
      {
        name: {
          ar: 'مستشفى طرابلس الجامعي',
          en: 'Tripoli University Hospital',
        },
        type: 'hospital',
        focus: {
          ar: 'رعاية تخصصية وتعليمية',
          en: 'Teaching & specialty care',
        },
      },
      {
        name: {
          ar: 'مستشفى القلب بطرابلس',
          en: 'Tripoli Heart Hospital',
        },
        type: 'hospital',
        focus: {
          ar: 'أمراض القلب والقسطرة',
          en: 'Cardiology & cath labs',
        },
      },
      {
        name: {
          ar: 'مجمع عيادات لا باس طرابلس',
          en: 'Labas Clinics Tripoli',
        },
        type: 'clinic',
        focus: {
          ar: 'عيادات متعددة التخصصات',
          en: 'Multi-specialty outpatient care',
        },
      },
      {
        name: {
          ar: 'مختبر العاصمة المركزي',
          en: 'Capital Reference Lab',
        },
        type: 'lab',
        focus: {
          ar: 'تحاليل مخبرية متقدمة',
          en: 'Advanced laboratory diagnostics',
        },
      },
    ],
  },
  misrata: {
    featureNames: ['Misratah', 'Misrata'],
    label: { ar: 'مصراتة', en: 'Misrata' },
    stats: { clinics: 14, hospitals: 5 },
    facilities: [
      {
        name: {
          ar: 'مستشفى مصراتة المركزي',
          en: 'Misrata Central Hospital',
        },
        type: 'hospital',
        focus: {
          ar: 'رعاية طارئة وعناية مركزة',
          en: 'Emergency & critical care',
        },
      },
      {
        name: {
          ar: 'مستشفى الحكمة للتخصصات',
          en: 'Al-Hikma Specialty Hospital',
        },
        type: 'hospital',
        focus: {
          ar: 'جراحة تخصصية ورعاية النساء',
          en: 'Specialty surgery & women’s health',
        },
      },
      {
        name: {
          ar: 'مجمع عيادات لا باس مصراتة',
          en: 'Labas Clinics Misrata',
        },
        type: 'clinic',
        focus: {
          ar: 'رعاية أسرية ومتابعة مزمنة',
          en: 'Primary care & chronic follow-up',
        },
      },
    ],
  },
};

const normalizeKey = (value) =>
  (value || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');

const featureNameLookup = (() => {
  const map = new Map();
  Object.entries(cityConfigs).forEach(([key, cfg]) => {
    cfg.featureNames.forEach((name) => {
      map.set(normalizeKey(name), key);
    });
  });
  return map;
})();

const processedFeatures = computed(() => {
  if (!rawFeatures.value.length) return [];

  const filtered = rawFeatures.value.filter((feature) => !!feature.geometry);
  const collection = { type: 'FeatureCollection', features: filtered };
  const projection = geoMercator()
    .center([17, 28])
    .fitSize([MAP_SIZE, MAP_SIZE], collection);
  const pathGenerator = geoPath(projection);

  return filtered.map((feature, index) => {
    const name = feature.properties?.name ?? `Region ${index + 1}`;
    const key = featureNameLookup.get(normalizeKey(name)) || null;
    return {
      id: `${index}-${name}`,
      name,
      key,
      d: pathGenerator(feature),
      centroid: pathGenerator.centroid(feature),
    };
  });
});

const cityChips = computed(() =>
  Object.entries(cityConfigs).map(([key, cfg]) => ({
    key,
    label: locale.value === 'ar' ? cfg.label.ar : cfg.label.en,
  }))
);

const selectedCityData = computed(
  () => cityConfigs[selectedCity.value] ?? null
);

const collapsedCities = reactive({});
const selectedCityLabel = computed(() =>
  selectedCityData.value
    ? locale.value === 'ar'
      ? selectedCityData.value.label.ar
      : selectedCityData.value.label.en
    : ''
);

const typeLabels = computed(() => ({
  hospital: t('about.map.types.hospital'),
  clinic: t('about.map.types.clinic'),
  lab: t('about.map.types.lab'),
}));

const facilityPanelPosition = computed(() =>
  locale.value === 'ar'
    ? 'md:right-4 lg:right-24 md:translate-x-[35%] lg:-translate-x-[90%] lg:translate-y-[15%]'
    : 'md:left-4 lg:left-24 md:-translate-x-[35%] lg:translate-x-[90%] lg:translate-y-[15%]'
);

const isFacilitiesCollapsed = computed(() => {
  const cityKey = selectedCity.value;
  if (!(cityKey in collapsedCities)) {
    collapsedCities[cityKey] = !isMdUp.value;
  }
  return collapsedCities[cityKey];
});

const facilitiesToggleLabel = computed(() =>
  isFacilitiesCollapsed.value
    ? locale.value === 'ar'
      ? 'عرض القائمة'
      : 'Show list'
    : locale.value === 'ar'
    ? 'إخفاء القائمة'
    : 'Hide list'
);

const panelTranslationClass = computed(() =>
  isFacilitiesCollapsed.value
    ? 'translate-y-4 md:translate-y-11'
    : 'translate-y-0'
);

function tooltipLabel(feature) {
  if (!feature) return '';
  if (feature.key && cityConfigs[feature.key]) {
    const cfg = cityConfigs[feature.key];
    return locale.value === 'ar' ? cfg.label.ar : cfg.label.en;
  }
  return feature.name;
}

function handleFeatureEnter(feature, event) {
  hoveredFeatureId.value = feature.id;
  tooltip.label = tooltipLabel(feature);
  tooltip.visible = !!tooltip.label;
  updateTooltipPosition(event);
}

function handleFeatureMove(event) {
  if (!tooltip.visible) return;
  updateTooltipPosition(event);
}

function handleFeatureLeave() {
  hoveredFeatureId.value = null;
  tooltip.visible = false;
}

function handleFeatureClick(feature) {
  if (feature.key && cityConfigs[feature.key]) {
    selectedCity.value = feature.key;
  }
}

function updateTooltipPosition(event) {
  if (!svgWrapperRef.value) return;
  const bounds = svgWrapperRef.value.getBoundingClientRect();
  tooltip.x = event.clientX - bounds.left + 16;
  tooltip.y = event.clientY - bounds.top + 16;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function handleZoom(step) {
  zoom.value = parseFloat(
    clamp(zoom.value + step, minZoom, maxZoom).toFixed(2)
  );
  // Maintain focus on current city after zoom
  focusOnCurrentCity();
}

function resetView() {
  zoom.value = INITIAL_ZOOM;
  // Reset zoom but maintain focus on current city
  focusOnCurrentCity();
}

const mapTransform = computed(
  () => `translate(${translate.x}, ${translate.y}) scale(${zoom.value})`
);

// Focus target position - locale-aware to leave space for facility panel
const focusTarget = computed(() => {
  if (isMdUp.value) {
    return {
      x: locale.value === 'ar' ? MAP_SIZE * 0.8 : MAP_SIZE * 0.12,
      y: MAP_SIZE * 0.46,
    };
  }
  return {
    x: locale.value === 'ar' ? MAP_SIZE * 0.68 : MAP_SIZE * 0.18,
    y: MAP_SIZE * 0.66,
  };
});

function focusOnCurrentCity() {
  if (!processedFeatures.value.length) return;
  const feature = processedFeatures.value.find(
    (f) => f.key === selectedCity.value
  );
  if (!feature) return;

  const scale = zoom.value;
  const { x: targetX, y: targetY } = focusTarget.value;
  // Center the city's centroid at the focus target position
  translate.x = targetX / scale - feature.centroid[0];
  translate.y = targetY / scale - feature.centroid[1];
}

function getFeatureFill(feature) {
  const isCity = !!feature.key;
  const isSelected = feature.key === selectedCity.value;
  const isHovered = feature.id === hoveredFeatureId.value;

  if (isSelected) return 'rgba(8, 126, 139, 0.28)';
  if (isHovered && isCity) return 'rgba(8, 126, 139, 0.18)';
  if (isCity) return 'rgba(8, 126, 139, 0.12)';
  return 'rgba(8, 126, 139, 0.08)';
}

function getFeatureStroke(feature) {
  return feature.key ? 'rgba(8, 126, 139, 0.52)' : 'rgba(8, 126, 139, 0.2)';
}

function toggleFacilitiesCollapse() {
  const cityKey = selectedCity.value;
  collapsedCities[cityKey] = !isFacilitiesCollapsed.value;
}

// Watch for city selection, locale changes, or map data loading to auto-focus
watch(
  [selectedCity, locale, () => processedFeatures.value.length],
  () => {
    if (processedFeatures.value.length > 0) {
      focusOnCurrentCity();
    }
  },
  { immediate: false }
);

onMounted(async () => {
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    mdMediaQuery = window.matchMedia('(min-width: 768px)');
    updateBreakpointState(mdMediaQuery);
    mdMediaQueryListener = (event) => {
      updateBreakpointState(event);
      focusOnCurrentCity();
    };
    if (mdMediaQuery.addEventListener) {
      mdMediaQuery.addEventListener('change', mdMediaQueryListener);
    } else {
      mdMediaQuery.addListener(mdMediaQueryListener);
    }
  }

  try {
    const response = await fetch(MAP_SOURCE);
    const data = await response.json();
    rawFeatures.value = Array.isArray(data.features) ? data.features : [];
  } catch (error) {
    console.error('Failed to load Libya map data', error);
  } finally {
    loading.value = false;
    // Focus on initial city after map loads
    if (processedFeatures.value.length > 0) {
      focusOnCurrentCity();
    }
  }
});

onUnmounted(() => {
  if (mdMediaQuery && mdMediaQueryListener) {
    if (mdMediaQuery.removeEventListener) {
      mdMediaQuery.removeEventListener('change', mdMediaQueryListener);
    } else {
      mdMediaQuery.removeListener(mdMediaQueryListener);
    }
  }
});
</script>

<template>
  <div class="space-y-8 p-0 md:px-8 md:py-4">
    <div class="flex flex-col gap-3">
      <h3 class="text-2xl font-semibold text-text">
        {{ t('about.map.title') }}
      </h3>
      <p class="text-sm text-text/60 leading-relaxed">
        {{ t('about.map.subtitle') }}
      </p>

      <div class="flex flex-wrap gap-2 pt-2">
        <button
          v-for="chip in cityChips"
          :key="chip.key"
          class="px-3 py-1.5 rounded-full text-sm font-medium transition"
          :class="[
            chip.key === selectedCity
              ? 'bg-secondary text-white shadow-soft'
              : 'bg-white text-text/70 border border-secondary/20 hover:text-text',
          ]"
          type="button"
          @click="selectedCity = chip.key"
        >
          <span>{{ chip.label }}</span>
        </button>
      </div>
    </div>

    <div class="relative -mx-6 sm:mx-0">
      <div
        ref="svgWrapperRef"
        class="relative w-full"
        :style="{ paddingBottom: '80%', minHeight: '420px' }"
      >
        <svg
          class="absolute inset-0 w-full h-full overflow-visible z-0"
          :viewBox="`0 0 ${MAP_SIZE} ${MAP_SIZE}`"
          role="img"
          aria-label="Libya coverage map"
        >
          <template v-if="!loading && processedFeatures.length">
            <g :transform="mapTransform">
              <g v-for="feature in processedFeatures" :key="feature.id">
                <path
                  :d="feature.d"
                  :fill="getFeatureFill(feature)"
                  :stroke="getFeatureStroke(feature)"
                  stroke-width="1"
                  class="transition-colors duration-300 cursor-pointer"
                  @mouseenter="(event) => handleFeatureEnter(feature, event)"
                  @mousemove="handleFeatureMove"
                  @mouseleave="handleFeatureLeave"
                  @click="handleFeatureClick(feature)"
                />

                <!-- Brand mark SVG for city markers -->
                <g
                  v-if="feature.key && cityConfigs[feature.key]"
                  :transform="`translate(${feature.centroid[0] - 8}, ${
                    feature.centroid[1] - 8
                  }) scale(0.14)`"
                  class="transition-all duration-300"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M71.841 12.5504C71.8677 14.4543 71.5239 16.3446 70.8294 18.1122C70.1349 19.8797 69.1036 21.4893 67.795 22.848C64.9924 25.1532 61.5351 26.4752 57.9367 26.6176C56.0713 26.7097 54.2066 26.424 52.4502 25.7769C50.6939 25.1299 49.0808 24.1344 47.7042 22.848C45.2935 19.9818 43.9775 16.3257 43.9975 12.5504C43.9975 4.31356 48.6613 0.130087 57.9889 0H58.5718C67.4179 0 71.841 4.18348 71.841 12.5504Z"
                    :fill="feature.key === selectedCity ? SECONDARY : '#ffffff'"
                    class="transition-colors duration-300"
                  />
                  <path
                    opacity="0.6"
                    d="M72.3726 40.7855L43.3197 69.4056C35.243 77.362 35.1454 90.3595 43.1019 98.4363C51.0583 106.513 64.0558 106.611 72.1326 98.6542L101.185 70.0342C109.262 62.0777 109.36 49.0802 101.403 41.0034C93.4469 32.9266 80.4494 32.8291 72.3726 40.7855Z"
                    :fill="feature.key === selectedCity ? ACCENT : '#ffffff'"
                    class="transition-colors duration-300"
                  />
                  <path
                    opacity="0.6"
                    d="M14.4064 69.2794L43.0264 98.3322C50.9829 106.409 63.9804 106.507 72.0572 98.5501C80.134 90.5937 80.2315 77.5962 72.275 69.5194L43.655 40.4665C35.6986 32.3897 22.7011 32.2922 14.6243 40.2486C6.54749 48.2051 6.44995 61.2026 14.4064 69.2794Z"
                    :fill="feature.key === selectedCity ? ACCENT : '#ffffff'"
                    class="transition-colors duration-300"
                  />
                </g>
              </g>
            </g>
          </template>

          <template v-else>
            <text
              :x="MAP_SIZE / 2"
              :y="MAP_SIZE / 2"
              text-anchor="middle"
              alignment-baseline="middle"
              class="fill-text/40 text-sm"
            >
              Loading map…
            </text>
          </template>
        </svg>

        <transition name="fade">
          <div
            v-if="tooltip.visible && tooltip.label"
            class="pointer-events-none absolute z-50 rounded-lg bg-secondary text-white text-xs font-medium px-3 py-1.5 shadow-lg"
            :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
          >
            {{ tooltip.label }}
          </div>
        </transition>

        <div
          class="relative w-full max-w-sm mx-auto md:mx-0 md:absolute md:top-6 md:w-[260px] md:max-w-[72vw] sm:w-[280px] lg:w-[310px] rounded-3xl border border-secondary/20 shadow-soft p-4 space-y-4 transition-transform duration-500 transform z-30 flex flex-col h-fit"
          :class="[
            facilityPanelPosition,
            panelTranslationClass,
            locale === 'ar' ? 'bg-white/95' : 'bg-white/85 backdrop-blur-md',
          ]"
        >
          <div
            v-if="selectedCityData"
            class="space-y-4 z-100"
            :class="locale === 'ar' ? 'flex-row-reverse' : 'flex-row'"
          >
            <div class="flex flex-col gap-3 md:gap-4">
              <div
                class="flex items-center gap-2"
                :class="
                  locale === 'ar'
                    ? 'flex-row-reverse justify-end'
                    : 'justify-start'
                "
              >
                <button
                  class="h-10 w-10 rounded-full bg-white border border-secondary/25 text-secondary shadow-soft flex items-center justify-center text-lg font-semibold transition hover:bg-secondary hover:text-white"
                  type="button"
                  aria-label="Zoom in"
                  @click="handleZoom(0.2)"
                >
                  +
                </button>
                <button
                  class="h-10 w-10 rounded-full bg-white border border-secondary/25 text-secondary shadow-soft flex items-center justify-center text-lg font-semibold transition hover:bg-secondary hover:text-white"
                  type="button"
                  aria-label="Zoom out"
                  @click="handleZoom(-0.2)"
                >
                  −
                </button>
                <button
                  class="h-10 w-10 rounded-full bg-white border border-secondary/25 text-secondary shadow-soft flex items-center justify-center text-sm font-semibold transition hover:bg-secondary hover:text-white"
                  type="button"
                  aria-label="Reset view"
                  @click="resetView"
                >
                  ⟳
                </button>
              </div>

              <div
                class="flex items-start gap-3"
                :class="locale === 'ar' ? 'flex-row-reverse text-end' : ''"
              >
                <div
                  class="flex-1"
                  :class="locale === 'ar' ? 'text-end' : 'text-start'"
                >
                  <p
                    class="text-sm font-semibold text-secondary uppercase tracking-wide"
                  >
                    {{ selectedCityLabel }}
                  </p>
                  <p class="text-xs text-text/60 mt-1">
                    {{ t('about.map.cityStats', selectedCityData.stats) }}
                  </p>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary/80 transition"
                  @click="toggleFacilitiesCollapse"
                >
                  <span>
                    {{ facilitiesToggleLabel }}
                  </span>
                  <span aria-hidden="true">
                    {{ isFacilitiesCollapsed ? '+' : '−' }}
                  </span>
                </button>
              </div>
            </div>

            <transition name="fade">
              <div
                v-show="!isFacilitiesCollapsed"
                class="space-y-3 pr-1 transition-[max-height,opacity] duration-300 ease-in-out"
                :class="
                  isFacilitiesCollapsed
                    ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                    : 'max-h-64 md:max-h-72 opacity-100 overflow-y-auto'
                "
              >
                <div
                  v-for="facility in selectedCityData.facilities"
                  :key="facility.name.en"
                  class="rounded-2xl border border-secondary/15 bg-white p-3 shadow-soft"
                >
                  <div class="flex items-center justify-between gap-3">
                    <p class="text-sm font-semibold text-text">
                      {{
                        locale === 'ar' ? facility.name.ar : facility.name.en
                      }}
                    </p>
                    <span
                      class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary"
                    >
                      {{ typeLabels[facility.type] || facility.type }}
                    </span>
                  </div>
                  <p class="text-xs text-text/60 leading-relaxed mt-2">
                    {{
                      locale === 'ar' ? facility.focus.ar : facility.focus.en
                    }}
                  </p>
                </div>
              </div>
            </transition>
          </div>
          <div v-else class="text-xs text-text/60">
            {{ t('about.map.empty') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
