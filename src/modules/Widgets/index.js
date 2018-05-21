import React from 'react';
import { settingsWidgetIndex, widgetEnum } from 'src/config/settings';

import { CanteenWidget } from './CanteenWidget';
import { BalanceWidget } from './BalanceWidget';
import { EndlichtWidget } from './EndlichtWidget';
import { GradesWidget } from './GradesWidget';
import { LectureWidget } from './LectureWidget';
import { NewsWidget } from './NewsWidget';
import { EventWidget } from './EventWidget';
import { OpeningHoursWidget } from './OpeningHoursWidget';
import { SettingsWidget } from './SettingsWidget';

export const widgetFactory = function (widget: widgetEnum, passedNavigator) {
    switch (widget) {
        case widgetEnum.BALANCE:
            return <BalanceWidget key={'widget_BALANCE'}/>;
        case widgetEnum.CANTEEN:
            return <CanteenWidget navigator={passedNavigator} key={'widget_CANTEEN'}/>;
        case widgetEnum.EVENT:
            return <EventWidget navigator={passedNavigator} key={'widget_EVENT'}/>;
        case widgetEnum.ENDLICHT:
            return <EndlichtWidget navigator={passedNavigator} key={'widget_ENDLICHT'}/>;
        case widgetEnum.GRADES:
            return <GradesWidget navigator={passedNavigator} key={'widget_GRADES'}/>;
        case widgetEnum.LECTURE:
            return <LectureWidget navigator={passedNavigator} key={'widget_LECTURE'}/>;
        case widgetEnum.NEWS:
            return <NewsWidget navigator={passedNavigator} key={'widget_NEWS'}/>;
        //case widgetEnum.OPENING:
        //    return <OpeningHoursWidget navigator={passedNavigator} key={'widget_OPENING'}/>;
        case settingsWidgetIndex:
            return <SettingsWidget navigator={passedNavigator} key={'widget_SETTINGS'}/>;
        default:
            if (__DEV__) {
                console.log('Unsupported Widget: ', widget);
            }
            break;
    }
};
