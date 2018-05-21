import I18n from 'react-native-i18n';

// Import all locales
import en from './en.json';
import de from './de.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    en,
    de
};

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
    return I18n.t(name, params);
}

export function getLanguages() {
    return ['de', 'en'];
}

export default I18n;
