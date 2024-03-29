import React, { Component } from 'react';
import { Platform, RefreshControl, ScrollView, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { style } from './styles'
import { lengthwiseThreshold, settingsWidgetIndex, squareThreshold } from 'src/config/settings';
import { getSettingsButton } from 'src/config/navigation';
import { widgetFactory } from 'src/modules/Widgets';
import { ActionCreators } from 'src/actions';
import { getBackgroundView } from 'src/config/styles';


class Dashboard extends Component{
    constructor(props) {
        super(props);
        if (Platform.OS === 'ios') {
            props.navigator.setButtons(getSettingsButton(props.navigator));
        }
    }

    _renderSelection() {
        const {navigator} = this.props;

        let views = [];
        if (this.props.widgetSelection) {
            let widgetSelection = Object.assign([], this.props.widgetSelection);
            // HACK: push settings widget at the end of the list
            widgetSelection.push(settingsWidgetIndex);

            let i = 0;
            while (i < widgetSelection.length) {  // don't forget to increment i after adding a widget
                if (widgetSelection[i] < lengthwiseThreshold) {  // most simple case. Just add widget because it takes the full width
                    views.push(widgetFactory(widgetSelection[i], navigator));
                    ++i;
                } else if (widgetSelection[i] >= lengthwiseThreshold  && widgetSelection[i] < squareThreshold) {  // upright widget on the left side
                    const leftUpright = widgetFactory(widgetSelection[i], navigator);
                    ++i;

                    // Check if next widgets fit beside the upright widget
                    let besideWidgets = [];
                    for (let k = 0; k < 2; k++) {  // maximally two widgets fit beside an upright widget
                        if (i + 1 > widgetSelection.length) {  // index out of bounds
                            break;
                        }
                        if (widgetSelection[i] >= squareThreshold) {
                            besideWidgets.push(widgetFactory(widgetSelection[i], navigator));
                            ++i;
                        } else {
                            break;
                        }
                    }

                    views.push(
                        <View
                            style={style.singleWidget}
                            key={'uprightContainer' + i}
                        >
                            {leftUpright}
                            <View style={style.singleWidget2}>
                                {besideWidgets}
                            </View>
                        </View>
                    );
                } else if(widgetSelection[i] >= squareThreshold) {
                    if (widgetSelection[i+1] >= squareThreshold) { // 2 square widgets next to each other
                        views.push(
                            <View
                                style={style.singleWidget}
                                key={'uprightContainer' + i}
                            >
                                {widgetFactory(widgetSelection[i], navigator)}
                                {widgetFactory(widgetSelection[++i], navigator)}
                            </View>
                        );
                        ++i;
                    } else if (widgetSelection[i+1] >= lengthwiseThreshold  && widgetSelection[i+1] < squareThreshold) {  // upright widget on the right side
                        let besideWidgets = [widgetFactory(widgetSelection[i], navigator)];
                        if (widgetSelection[i+2] >= squareThreshold) {
                            besideWidgets.push(widgetFactory(widgetSelection[i+2], navigator));
                        } else {

                        }
                        views.push(
                            <View
                                style={style.singleWidget}
                                key={'uprightContainer' + i}
                            >
                                <View style={style.singleWidget2}>
                                    {besideWidgets}
                                </View>
                                {widgetFactory(widgetSelection[i+1], navigator)}
                            </View>
                        );
                        i += besideWidgets.length + 1;
                    } else {  // unable to fill the row; just adding the square widget
                        views.push(widgetFactory(widgetSelection[i], navigator));
                        ++i;
                    }
                } else {  // unknown case
                    views.push(widgetFactory(widgetSelection[i], navigator));
                    ++i;
                }
            }
        }

        return views;
    }

    _onRefresh = () => {
        this.props.actions.setRefreshing(true);  // start fetching new data
        this.props.actions.fetchInitialData();
    };

    render() {
        const content = (
            <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={this.props.isRefreshing || false}
                    onRefresh={this._onRefresh.bind(this)}
                />
            }
        >
            <View style={style.dashboardFrame}>
                {this._renderSelection()}
            </View>
        </ScrollView>
        );
        return getBackgroundView(content, 1);
    }
}

const mapStateToProps = (state) => ({
    isRefreshing    : state.dashboardReducer.isRefreshing,
    widgetSelection : state.dashboardReducer.widgetSelection
});


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
