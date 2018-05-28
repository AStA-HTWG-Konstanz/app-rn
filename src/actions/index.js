//AKA manifest
import * as loginActions from 'src/actions/loginActions';
import * as canteenActions from 'src/actions/canteenActions'
import * as balanceActions from 'src/actions/balanceActions';
import * as dashboardActions from 'src/actions/dashboardActions';
import * as languageActions from 'src/actions/languageActions';
import * as eventActions from 'src/actions/eventActions';
import * as lectureActions from 'src/actions/lectureActions';
import * as openingHoursActions from 'src/actions/openingHoursActions';
import * as newsActions from 'src/actions/newsActions';
import * as endlichtActions from 'src/actions/endlichtActions';
import * as gradesActions from 'src/actions/gradesActions';

export const ActionCreators = Object.assign({},
    loginActions,
    canteenActions,
    balanceActions,
    dashboardActions,
    eventActions,
    languageActions,
    lectureActions,
    {fetchInitialData},
    openingHoursActions,
    newsActions,
    endlichtActions,
    gradesActions
);


export function fetchInitialData() {
    return function (dispatch, getState) {
        dispatch(newsActions.getAvailableNewsCategories());
        dispatch(newsActions.getAvailableNumberOfNews());
        dispatch(balanceActions.getBalance());
        dispatch(openingHoursActions.getBibOpeningHours());
        dispatch(endlichtActions.getEndlichtData());
        dispatch(eventActions.getEvents());
        dispatch(gradesActions.getGrades());
        dispatch(lectureActions.getLectures());
        dispatch(canteenActions.getMenu());
        dispatch(newsActions.getNews(0));  // 0 -> get first page of news
    };
}
