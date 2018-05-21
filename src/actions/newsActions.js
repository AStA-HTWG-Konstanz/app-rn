import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';
import {setRefreshing} from "./dashboardActions";

export function getNews(page) {
    return (dispatch) => {
        connector.getNews(page)
            .then( function (news) {
                    dispatch(receiveNews(news, page));
                    dispatch(setRefreshing(false));
                }
            ).catch((err) => {});
    }
}

export function receiveNews(news, page) {
    // call reducer
    return {
        type    : types.SET_NEWS,
        news    : news,
        page    : page
    }
}

export function getAvailableNumberOfNews() {
    return (dispatch) => {
        connector.getAvailableNumberOfNews()
            .then( function (numberNews) {
                    dispatch(receiveNumberNews(numberNews));
            })
            .catch((err) => {});
    }
}

export function receiveNumberNews(numberNews) {
    return {
        type        : types.SET_NUMBER_NEWS,
        numberNews  : numberNews
    }
}

export function getAvailableNewsCategories(local) {
    return (dispatch) => {
        connector.getAvailableNewsCategories(local)
            .then( function (news_ctgry) {
                    dispatch(receiveNewsCtgry(news_ctgry));
                }
            ).catch((err) => {});
    }
}

export function receiveNewsCtgry(news_ctgry) {
    return {
        type        : types.SET_NEWS_CTGRY,
        news_ctgry  : news_ctgry
    }
}

export function changeNewsCtgrySelected(news_ctgry, selected) {
    return (dispatch) => {
        connector.setSelectedNewsCtgry(news_ctgry, selected)
            .then(() => dispatch(getAvailableNewsCategories(true)));  // get local categories and merge with new selection
    }
}
