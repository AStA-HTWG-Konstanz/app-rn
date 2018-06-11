import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_NEWS:
            if (action.page === 0) {  // refresh -> delete existing
                return {
                    ...state,           // keep the existing state
                    news: action.news
                };
            } else {
                let concat = state.news;
                concat.push(action.news);
                return {
                    ...state,           // keep the existing state
                    news: concat
                };
            }

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