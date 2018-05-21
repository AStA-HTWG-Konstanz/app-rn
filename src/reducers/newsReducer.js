import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_NEWS:
            return {
                ...state,           // keep the existing state
                news: action.news
            };
        case types.SET_NUMBER_NEWS:
            return {
                ...state,           // keep the existing state
                numberNews: action.numberNews
            };
        case types.SET_NEWS_CTGRY:
            return {
                ...state,
                news_ctgry: action.news_ctgry
            };
        default:
            return state;
    }
}