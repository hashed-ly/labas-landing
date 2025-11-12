/**
 * Type definitions for Vue I18n
 * This provides autocomplete and type safety for translation keys
 */

import type en from '../locales/en.json';

type MessageSchema = typeof en;

declare module 'vue-i18n' {
  // Provide the message schema to vue-i18n
  export interface DefineLocaleMessage extends MessageSchema {}
  
  // Optional: Define custom datetime formats
  export interface DefineDateTimeFormat {
    short: {
      year: 'numeric';
      month: 'short';
      day: 'numeric';
    };
    long: {
      year: 'numeric';
      month: 'long';
      day: 'numeric';
      weekday: 'long';
      hour: 'numeric';
      minute: 'numeric';
    };
  }
  
  // Optional: Define custom number formats
  export interface DefineNumberFormat {
    currency: {
      style: 'currency';
      currency: string;
    };
    decimal: {
      style: 'decimal';
      minimumFractionDigits: number;
      maximumFractionDigits: number;
    };
  }
}

