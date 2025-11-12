import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const arPath = path.join(__dirname, '../src/locales/ar.json');
const enPath = path.join(__dirname, '../src/locales/en.json');

const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

/**
 * Recursively get all keys from a nested object
 * @param {Object} obj - The object to traverse
 * @param {string} prefix - The current key prefix
 * @returns {Array<string>} Array of dot-notation keys
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    // Skip comment keys
    if (key.startsWith('_')) continue;
    
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/**
 * Check for empty or placeholder values
 * @param {Object} obj - The object to check
 * @param {string} prefix - The current key prefix
 * @returns {Array<string>} Array of keys with empty values
 */
function findEmptyValues(obj, prefix = '') {
  let emptyKeys = [];
  for (const key in obj) {
    if (key.startsWith('_')) continue;
    
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      emptyKeys = emptyKeys.concat(findEmptyValues(obj[key], fullKey));
    } else if (typeof obj[key] === 'string' && (obj[key].trim() === '' || obj[key] === 'TODO')) {
      emptyKeys.push(fullKey);
    }
  }
  return emptyKeys;
}

console.log('🔍 Validating translation files...\n');

const arKeys = new Set(getAllKeys(ar));
const enKeys = new Set(getAllKeys(en));

const missingInEn = [...arKeys].filter(k => !enKeys.has(k));
const missingInAr = [...enKeys].filter(k => !arKeys.has(k));
const emptyInAr = findEmptyValues(ar);
const emptyInEn = findEmptyValues(en);

let hasErrors = false;
let hasWarnings = false;

// Check for missing keys
if (missingInEn.length > 0) {
  console.error('❌ Missing in English (en.json):');
  missingInEn.forEach(k => console.error(`   - ${k}`));
  console.error('');
  hasErrors = true;
}

if (missingInAr.length > 0) {
  console.error('❌ Missing in Arabic (ar.json):');
  missingInAr.forEach(k => console.error(`   - ${k}`));
  console.error('');
  hasErrors = true;
}

// Check for empty values
if (emptyInAr.length > 0) {
  console.warn('⚠️  Empty or placeholder values in Arabic (ar.json):');
  emptyInAr.forEach(k => console.warn(`   - ${k}`));
  console.warn('');
  hasWarnings = true;
}

if (emptyInEn.length > 0) {
  console.warn('⚠️  Empty or placeholder values in English (en.json):');
  emptyInEn.forEach(k => console.warn(`   - ${k}`));
  console.warn('');
  hasWarnings = true;
}

// Success summary
if (!hasErrors && !hasWarnings) {
  console.log('✅ All translation keys match perfectly!');
  console.log(`📊 Total keys: ${arKeys.size} (Arabic) / ${enKeys.size} (English)`);
  console.log('');
} else if (!hasErrors) {
  console.log('✅ All translation keys are present!');
  console.log(`📊 Total keys: ${arKeys.size} (Arabic) / ${enKeys.size} (English)`);
  console.log('⚠️  But some values need attention (see warnings above)');
  console.log('');
} else {
  console.error('💥 Translation validation failed!');
  console.error('');
  process.exit(1);
}

