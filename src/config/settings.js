
export const constants = {
    newsPerPage : 10
};

export const newsCategoriesPreselection = [
    'AStA',
    'Hochschule'
];

export const widgetEnum = {
    // lengthwise widgets
    CANTEEN : 0,
    LECTURE : 1,
    NEWS    : 2,

    // upright widgets
    BALANCE : 3,

    // square widgets
    EVENT   : 4,
    ENDLICHT: 5,
    GRADES  : 6,
    //last index (7) is reserved for settings widget
};
export const settingsWidgetIndex = 7;

export const widgetEnumKeys = Object.keys(widgetEnum);  // to access i18n
export const lengthwiseThreshold = 3;
export const squareThreshold = 4;


export const widgetPreselection = [
    widgetEnum.LECTURE,
    widgetEnum.CANTEEN,
    widgetEnum.BALANCE,
    widgetEnum.EVENT,
    widgetEnum.NEWS
];
