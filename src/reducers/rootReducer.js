// Combine different reducers and make them accessible

import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import canteenReducer from './canteenReducer';
import balanceReducer from './balanceReducer';
import dashboardReducer from './dashboardReducer';
import languageReducer from './languageReducer';
import lectureReducer from './lectureReducer';
import openingHoursReducer from './openingHoursReducer';
import newsReducer from './newsReducer';
import endlichtReducer from './endlichtReducer';
import eventReducer from './eventReducer';
import gradesReducer from './gradesReducer';


const rootReducer = combineReducers({
    loginReducer,
    canteenReducer,
    balanceReducer,
    dashboardReducer,
    endlichtReducer,
    eventReducer,
    gradesReducer,
    languageReducer,
    lectureReducer,
    openingHoursReducer,
    newsReducer
});

export default rootReducer;
