import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: true, // `false` if you want to ensure fresh data
});

// Image URL builder
const builder = imageUrlBuilder(client);

/**
 * Generate image URL from Sanity image object
 * @param {Object} source - Sanity image object
 * @returns {string} Image URL
 */
export function urlFor(source) {
  return builder.image(source);
}

/**
 * Fetch all documents of a given type
 * @param {string} type - Document type
 * @returns {Promise<Array>} Array of documents
 */
export async function fetchDocuments(type) {
  const query = `*[_type == "${type}"]`;
  return await client.fetch(query);
}

/**
 * Fetch a single document by slug
 * @param {string} type - Document type
 * @param {string} slug - Document slug
 * @returns {Promise<Object>} Document object
 */
export async function fetchDocumentBySlug(type, slug) {
  const query = `*[_type == "${type}" && slug.current == "${slug}"][0]`;
  return await client.fetch(query);
}

/**
 * Fetch site settings
 * @returns {Promise<Object>} Site settings object
 */
export async function fetchSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`;
  return await client.fetch(query);
}

/**
 * Fetch all translations grouped by category
 * @returns {Promise<Object>} Translations object
 */
export async function fetchTranslations() {
  const query = `*[_type == "translation"] {
    key,
    value,
    category
  }`;
  
  const translations = await client.fetch(query);
  
  // Convert flat array to nested object structure
  const result = { en: {}, ar: {} };
  
  translations.forEach((translation) => {
    const keys = translation.key.split('.');
    let enCurrent = result.en;
    let arCurrent = result.ar;
    
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        // Last key - assign value
        enCurrent[key] = translation.value.en || '';
        arCurrent[key] = translation.value.ar || '';
      } else {
        // Intermediate key - create object if doesn't exist
        enCurrent[key] = enCurrent[key] || {};
        arCurrent[key] = arCurrent[key] || {};
        enCurrent = enCurrent[key];
        arCurrent = arCurrent[key];
      }
    });
  });
  
  return result;
}

/**
 * Fetch navigation menu
 * @param {string} title - Navigation title (default: "Main Menu")
 * @returns {Promise<Object>} Navigation object
 */
export async function fetchNavigation(title = 'Main Menu') {
  const query = `*[_type == "navigation" && title == "${title}"][0]`;
  return await client.fetch(query);
}

