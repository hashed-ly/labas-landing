import { ref, onMounted } from 'vue';
import {
  fetchDocuments,
  fetchDocumentBySlug,
  fetchSiteSettings,
  fetchTranslations,
  fetchNavigation,
} from '../lib/sanity';

/**
 * Composable for fetching content from Sanity CMS
 * @param {string} type - Document type to fetch
 * @param {string} slug - Optional slug for single document
 * @returns {Object} Reactive content data and loading state
 */
export function useSanityContent(type, slug = null) {
  const content = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchContent = async () => {
    try {
      loading.value = true;
      error.value = null;

      if (slug) {
        content.value = await fetchDocumentBySlug(type, slug);
      } else {
        content.value = await fetchDocuments(type);
      }
    } catch (err) {
      error.value = err;
      console.error(`Error fetching ${type}:`, err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchContent();
  });

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
  };
}

/**
 * Composable for fetching site settings
 * @returns {Object} Reactive site settings and loading state
 */
export function useSiteSettings() {
  const settings = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchSettings = async () => {
    try {
      loading.value = true;
      error.value = null;
      settings.value = await fetchSiteSettings();
    } catch (err) {
      error.value = err;
      console.error('Error fetching site settings:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchSettings();
  });

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
  };
}

/**
 * Composable for fetching navigation
 * @param {string} title - Navigation title
 * @returns {Object} Reactive navigation data and loading state
 */
export function useNavigation(title = 'Main Menu') {
  const navigation = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchNav = async () => {
    try {
      loading.value = true;
      error.value = null;
      navigation.value = await fetchNavigation(title);
    } catch (err) {
      error.value = err;
      console.error('Error fetching navigation:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchNav();
  });

  return {
    navigation,
    loading,
    error,
    refetch: fetchNav,
  };
}

