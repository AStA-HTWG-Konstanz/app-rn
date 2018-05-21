import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';
import I18n from 'react-native-i18n';
import moment from "moment/moment";
import de from 'moment/locale/de';

export function getLanguage() {
    return (dispatch) => {
        connector.getLanguage()
            .then( function (language) {
                if (language === '') { // No selection yet
                    language = I18n.locale.substring(0, 2) === 'de' ? 'de' : 'en';
                }
                dispatch(setLanguage(language));
            })
            .catch((err) => {});
    }
}

export function setLanguage(language) {
    // Set app language
    switch(language) {
        case 'en':
            I18n.locale = 'en-US';
            break;
        case 'de':
            I18n.locale = 'de-US';
            break;
        default:
            if (__DEV__) {
                console.log('Unsupported language');
            }
            break;
    }

    connector.setLanguage(language);  // Save selection in local database
    language === 'de' ? moment.locale('de', de) : moment.locale('en');  // update moment.js


    // Alternate state to trigger a rerender
    return {
        type    : types.SET_LANGUAGE,
        language: language
    }
}
