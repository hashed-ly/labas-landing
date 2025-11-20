<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue';
import { geoMercator, geoPath } from 'd3-geo';
import { useI18n } from '../composables/useI18n';

const MAP_SOURCE = '/Libya/ly.json';
const INITIAL_ZOOM = 1.7;
const INITIAL_TRANSLATE = { x: 0, y: -120 };
const SECONDARY = '#087E8B';
const ACCENT = '#EBC042';

const { t, locale } = useI18n();

const rawFeatures = ref([]);
const hoveredFeatureId = ref(null);
const loading = ref(true);
const svgWrapperRef = ref(null);
const windowWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1024
);

// Responsive MAP_SIZE based on breakpoints
const MAP_SIZE = computed(() => {
  if (windowWidth.value < 640) {
    return 240; // Mobile
  } else if (windowWidth.value < 768) {
    return 400; // Small
  } else if (windowWidth.value < 1024) {
    return 440; // Medium
  } else if (windowWidth.value < 1280) {
    return 480; // Large
  } else {
    return 560; // XL
  }
});

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
    windowWidth.value = window.innerWidth;
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  label: '',
});

const zoom = ref(INITIAL_ZOOM);
const translate = reactive({ x: 0, y: 0 });

const cityConfigs = {
  benghazi: {
    featureNames: ['Benghazi'],
    label: { ar: 'بنغازي', en: 'Benghazi' },
    coordinates: { lat: 32.1167, lng: 20.0667 },
  },
  tripoli: {
    featureNames: ['Trípoli', 'Tripoli'],
    label: { ar: 'طرابلس', en: 'Tripoli' },
    coordinates: { lat: 32.8872, lng: 13.1913 },
  },
  misrata: {
    featureNames: ['Misratah', 'Misrata'],
    label: { ar: 'مصراتة', en: 'Misrata' },
    coordinates: { lat: 32.3754, lng: 15.0925 },
  },
  zawiya: {
    featureNames: ['Az Zawiyah', 'Zawiya'],
    label: { ar: 'الزاوية', en: 'Zawiya' },
    coordinates: { lat: 32.7572, lng: 12.7278 },
  },
  marqab: {
    featureNames: ['Al Marqab', 'Marqab'],
    label: { ar: 'المرقب', en: 'Marqab' },
    coordinates: { lat: 32.5, lng: 14.2667 },
  },
  sirte: {
    featureNames: ['Surt', 'Sirte'],
    label: { ar: 'سرت', en: 'Sirte' },
    coordinates: { lat: 31.2089, lng: 16.5881 },
  },
  derna: {
    featureNames: ['Derna'],
    label: { ar: 'درنة', en: 'Derna' },
    coordinates: { lat: 32.7667, lng: 22.6333 },
  },
  jabalalakhdar: {
    featureNames: ['Al Jabal al Akhdar'],
    label: { ar: 'الجبل الأخضر', en: 'Al Jabal al Akhdar' },
    coordinates: { lat: 32.5, lng: 21.5 },
  },
  marj: {
    featureNames: ['Al Marj'],
    label: { ar: 'المرج', en: 'Al Marj' },
    coordinates: { lat: 32.4833, lng: 20.8333 },
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

// Projection for the map - computed once and reused
const mapProjection = computed(() => {
  if (!rawFeatures.value.length) return null;

  const filtered = rawFeatures.value.filter((feature) => !!feature.geometry);
  const collection = { type: 'FeatureCollection', features: filtered };
  const projection = geoMercator()
    .center([17, 28])
    .fitSize([MAP_SIZE.value, MAP_SIZE.value], collection);

  return projection;
});

const processedFeatures = computed(() => {
  if (!rawFeatures.value.length || !mapProjection.value) return [];

  const filtered = rawFeatures.value.filter((feature) => !!feature.geometry);
  const pathGenerator = geoPath(mapProjection.value);

  return filtered.map((feature, index) => {
    const name = feature.properties?.name ?? `Region ${index + 1}`;
    const key = featureNameLookup.get(normalizeKey(name)) || null;
    return {
      id: `${index}-${name}`,
      name,
      key,
      d: pathGenerator(feature),
    };
  });
});

// City markers with accurate coordinates
const cityMarkers = computed(() => {
  if (!mapProjection.value) return [];

  return Object.entries(cityConfigs)
    .map(([key, config]) => {
      const [x, y] = mapProjection.value([
        config.coordinates.lng,
        config.coordinates.lat,
      ]);
      return {
        key,
        x,
        y,
        label: locale.value === 'ar' ? config.label.ar : config.label.en,
      };
    })
    .filter(
      (marker) => marker.x && marker.y && !isNaN(marker.x) && !isNaN(marker.y)
    );
});

function handleFeatureEnter(feature, event) {
  // Skip hover for city features
  if (feature.key) return;
  hoveredFeatureId.value = feature.id;
  tooltip.label = feature.name;
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
  // No action needed - just show pins
}

function updateTooltipPosition(event) {
  if (!svgWrapperRef.value) return;
  const bounds = svgWrapperRef.value.getBoundingClientRect();
  tooltip.x = event.clientX - bounds.left + 16;
  tooltip.y = event.clientY - bounds.top + 16;
}

const mapTransform = computed(
  () => `translate(${translate.x}, ${translate.y}) scale(${zoom.value})`
);

function getFeatureFill(feature) {
  const isCity = !!feature.key;
  const isHovered = feature.id === hoveredFeatureId.value;

  if (isCity) return 'rgba(8, 126, 139, 0.12)';
  // Hover effect only for non-city regions
  if (isHovered) return 'rgba(8, 126, 139, 0.18)';
  return 'rgba(8, 126, 139, 0.08)';
}

function getFeatureStroke(feature) {
  return feature.key ? 'rgba(8, 126, 139, 0.52)' : 'rgba(8, 126, 139, 0.2)';
}

onMounted(async () => {
  try {
    const response = await fetch(MAP_SOURCE);
    const data = await response.json();
    rawFeatures.value = Array.isArray(data.features) ? data.features : [];
  } catch (error) {
    console.error('Failed to load Libya map data', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="relative w-full">
    <div ref="svgWrapperRef" class="relative w-full map-container">
      <svg
        class="absolute inset-0 w-full h-full overflow-visible z-0"
        :viewBox="`0 0 ${MAP_SIZE.value} ${MAP_SIZE.value}`"
        role="img"
        aria-label="Libya coverage map"
      >
        <template v-if="!loading && processedFeatures.length">
          <g :transform="mapTransform">
            <!-- Map regions/districts -->
            <g v-for="feature in processedFeatures" :key="feature.id">
              <path
                :d="feature.d"
                :fill="getFeatureFill(feature)"
                :stroke="getFeatureStroke(feature)"
                stroke-width="0.8"
                :class="[
                  'transition-colors duration-300',
                  feature.key ? 'pointer-events-none' : 'cursor-pointer',
                ]"
                @mouseenter="(event) => handleFeatureEnter(feature, event)"
                @mousemove="handleFeatureMove"
                @mouseleave="handleFeatureLeave"
              />
            </g>

            <!-- City markers with accurate coordinates -->
            <g
              v-for="marker in cityMarkers"
              :key="marker.key"
              :transform="`translate(${marker.x}, ${marker.y})`"
              class="cursor-pointer"
            >
              <!-- Subtle pulse circle -->
              <circle
                cx="0"
                cy="0"
                r="10"
                :fill="SECONDARY"
                opacity="0.1"
                class="animate-pulse"
              />

              <!-- Brand mark SVG -->
              <g transform="translate(-8, -8) scale(0.14)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M71.841 12.5504C71.8677 14.4543 71.5239 16.3446 70.8294 18.1122C70.1349 19.8797 69.1036 21.4893 67.795 22.848C64.9924 25.1532 61.5351 26.4752 57.9367 26.6176C56.0713 26.7097 54.2066 26.424 52.4502 25.7769C50.6939 25.1299 49.0808 24.1344 47.7042 22.848C45.2935 19.9818 43.9775 16.3257 43.9975 12.5504C43.9975 4.31356 48.6613 0.130087 57.9889 0H58.5718C67.4179 0 71.841 4.18348 71.841 12.5504Z"
                  :fill="SECONDARY"
                  class="transition-colors duration-300"
                />
                <path
                  opacity="0.6"
                  d="M72.3726 40.7855L43.3197 69.4056C35.243 77.362 35.1454 90.3595 43.1019 98.4363C51.0583 106.513 64.0558 106.611 72.1326 98.6542L101.185 70.0342C109.262 62.0777 109.36 49.0802 101.403 41.0034C93.4469 32.9266 80.4494 32.8291 72.3726 40.7855Z"
                  :fill="ACCENT"
                  class="transition-colors duration-300"
                />
                <path
                  opacity="0.6"
                  d="M14.4064 69.2794L43.0264 98.3322C50.9829 106.409 63.9804 106.507 72.0572 98.5501C80.134 90.5937 80.2315 77.5962 72.275 69.5194L43.655 40.4665C35.6986 32.3897 22.7011 32.2922 14.6243 40.2486C6.54749 48.2051 6.44995 61.2026 14.4064 69.2794Z"
                  :fill="ACCENT"
                  class="transition-colors duration-300"
                />
              </g>
            </g>
          </g>
        </template>

        <template v-else>
          <text
            :x="MAP_SIZE.value / 2"
            :y="MAP_SIZE.value / 2"
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
    </div>
  </div>
</template>

<style scoped>
.map-container {
  padding-bottom: 100%;
  min-height: 400px;
}

@media (min-width: 640px) {
  .map-container {
    padding-bottom: 90%;
    min-height: 450px;
  }
}

@media (min-width: 768px) {
  .map-container {
    padding-bottom: 80%;
    min-height: 500px;
  }
}

@media (min-width: 1024px) {
  .map-container {
    padding-bottom: 75%;
    min-height: 560px;
  }
}

@media (min-width: 1280px) {
  .map-container {
    padding-bottom: 70%;
    min-height: 600px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>
