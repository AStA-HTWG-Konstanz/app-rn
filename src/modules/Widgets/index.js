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

export const widgetFactory = function (widget, componentId) {
    switch (widget) {
        case widgetEnum.BALANCE:
            return <BalanceWidget key={'widget_BALANCE'}/>;
        case widgetEnum.CANTEEN:
            return <CanteenWidget componentId={componentId} key={'widget_CANTEEN'}/>;
        case widgetEnum.EVENT:
            return <EventWidget componentId={componentId} key={'widget_EVENT'}/>;
        case widgetEnum.ENDLICHT:
            return <EndlichtWidget componentId={componentId} key={'widget_ENDLICHT'}/>;
        case widgetEnum.GRADES:
            return <GradesWidget componentId={componentId} key={'widget_GRADES'}/>;
        case widgetEnum.LECTURE:
            return <LectureWidget componentId={componentId} key={'widget_LECTURE'}/>;
        case widgetEnum.NEWS:
            return <NewsWidget componentId={componentId} key={'widget_NEWS'}/>;
        //case widgetEnum.OPENING:
        //    return <OpeningHoursWidget componentId={componentId} key={'widget_OPENING'}/>;
        case settingsWidgetIndex:
            return <SettingsWidget componentId={componentId} key={'widget_SETTINGS'}/>;
        default:
            if (__DEV__) {
                console.log('Unsupported Widget: ', widget);
            }
            break;
    }
};
