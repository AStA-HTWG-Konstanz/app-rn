
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
    //NEWS    : 2,

    // upright widgets


    // square widgets
    BALANCE : 2,
    EVENT   : 3,
    ENDLICHT: 4,
    GRADES  : 5,
    //last index (6) is reserved for settings widget
};
export const settingsWidgetIndex = 6;

export const widgetEnumKeys = Object.keys(widgetEnum);  // to access i18n
export const lengthwiseThreshold = 2;
export const squareThreshold = 2;


export const widgetPreselectionStudent = [
    widgetEnum.CANTEEN,
    widgetEnum.EVENT,
    widgetEnum.BALANCE,
    widgetEnum.GRADES,
    widgetEnum.ENDLICHT,
    widgetEnum.LECTURE
];

export const widgetPreselectionEmployee = [
    widgetEnum.CANTEEN,
    widgetEnum.EVENT,
    widgetEnum.ENDLICHT,
    widgetEnum.LECTURE
];
