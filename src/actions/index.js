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
        const state = getState();

        //dispatch(newsActions.getAvailableNewsCategories());
        //dispatch(newsActions.getAvailableNumberOfNews());
        //dispatch(openingHoursActions.getBibOpeningHours());
        dispatch(endlichtActions.getEndlichtData());
        dispatch(eventActions.getEvents());
        dispatch(lectureActions.getLectures());
        dispatch(canteenActions.getMenu());
        dispatch(newsActions.getNews(0));  // 0 -> get first page of news

        if (state.loginReducer.isStudent) {  // employees don't need the following information
            dispatch(gradesActions.getGrades());
            dispatch(balanceActions.getBalance());
        }
    };
}
