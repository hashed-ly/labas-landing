import { useI18n } from './useI18n';

/**
 * Enhanced i18n composable with safer translation handling
 * Provides fallback support and better error handling
 */
export function useSafeI18n() {
  const i18n = useI18n();
  
  /**
   * Safe translation function with fallback support
   * @param {string} key - Translation key (e.g., 'hero.title')
   * @param {string|null} fallback - Fallback text if key not found
   * @param {object} params - Interpolation parameters for the translation
   * @returns {string} The translated string or fallback
   * 
   * @example
   * // Basic usage with fallback
   * ts('hero.title', 'Default Title')
   * 
   * @example
   * // With parameters
   * ts('greeting.welcome', 'Welcome!', { name: 'Ahmad' })
   */
  const ts = (key, fallback = null, params = {}) => {
    try {
      const translation = i18n.t(key, params);
      
      // Vue I18n returns the key itself if translation is not found
      // This is a simple check to detect missing translations
      if (translation === key) {
        if (fallback) {
          if (import.meta.env.DEV) {
            console.warn(`[i18n] Missing translation for key: "${key}", using fallback: "${fallback}"`);
          }
          return fallback;
        }
        
        // In development, show a clear indicator
        if (import.meta.env.DEV) {
          console.error(`[i18n] Missing translation for key: "${key}" and no fallback provided`);
          return `[MISSING: ${key}]`;
        }
      }
      
      return translation;
    } catch (error) {
      console.error(`[i18n] Translation error for key "${key}":`, error);
      
      // Return fallback or key in case of error
      return fallback || (import.meta.env.DEV ? `[ERROR: ${key}]` : key);
    }
  };

  /**
   * Check if a translation key exists
   * @param {string} key - Translation key to check
   * @returns {boolean} True if the key exists
   */
  const hasKey = (key) => {
    try {
      const translation = i18n.t(key);
      return translation !== key;
    } catch {
      return false;
    }
  };

  /**
   * Get translation with pluralization support
   * @param {string} key - Translation key
   * @param {number} count - Count for pluralization
   * @param {object} params - Additional parameters
   * @returns {string} The translated string
   */
  const tp = (key, count, params = {}) => {
    return ts(key, null, { ...params, count });
  };

  return {
    ...i18n,
    ts,      // Safe translation
    hasKey,  // Check if key exists
    tp,      // Translation with pluralization
  };
}

