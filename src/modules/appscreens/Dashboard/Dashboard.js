import React, { Component } from 'react';
import { Platform, RefreshControl, ScrollView, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';

import { style } from './styles'
import { lengthwiseThreshold, settingsWidgetIndex, squareThreshold } from 'src/config/settings';
import { widgetFactory } from 'src/modules/Widgets';
import { ActionCreators } from 'src/actions';
import { getBackgroundView } from 'src/config/styles';
import { ic_burger_android } from 'src/images';


class Dashboard extends Component{
    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);

        let leftBurgerButton = {
            id: 'sideMenu'
        };

        if (Platform.OS === 'ios') {
            leftBurgerButton.component = {
                id: 'idSideMenuBtn',
                name: 'BurgerButton',
                passProps: {screenId: props.componentId}
            }
        } else {
            leftBurgerButton.icon = ic_burger_android;
        }

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title : {
                    alignment: 'center'
                },
                leftButtons: [
                    leftBurgerButton
                ]
            }
        });
    }

    navigationButtonPressed = ({ buttonId }) => {
        if (Platform.OS === 'android' && buttonId ===  'idSideMenu') {
            Navigation.mergeOptions('idDashboard', {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }
    }

    _renderSelection() {
        const {componentId} = this.props;

        let views = [];
        if (this.props.widgetSelection) {
            let widgetSelection = Object.assign([], this.props.widgetSelection);
            // HACK: push settings widget at the end of the list
            //widgetSelection.push(settingsWidgetIndex);

            let i = 0;
            while (i < widgetSelection.length) {  // don't forget to increment i after adding a widget
                if (widgetSelection[i] < lengthwiseThreshold) {  // most simple case. Just add widget because it takes the full width
                    views.push(widgetFactory(widgetSelection[i], componentId));
                    ++i;
                } else if (widgetSelection[i] >= lengthwiseThreshold  && widgetSelection[i] < squareThreshold) {  // upright widget on the left side
                    const leftUpright = widgetFactory(widgetSelection[i], componentId);
                    ++i;

                    // Check if next widgets fit beside the upright widget
                    let besideWidgets = [];
                    for (let k = 0; k < 2; k++) {  // maximally two widgets fit beside an upright widget
                        if (i + 1 > widgetSelection.length) {  // index out of bounds
                            break;
                        }
                        if (widgetSelection[i] >= squareThreshold) {
                            besideWidgets.push(widgetFactory(widgetSelection[i], componentId));
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
                                {widgetFactory(widgetSelection[i], componentId)}
                                {widgetFactory(widgetSelection[++i], componentId)}
                            </View>
                        );
                        ++i;
                    } else if (widgetSelection[i+1] >= lengthwiseThreshold  && widgetSelection[i+1] < squareThreshold) {  // upright widget on the right side
                        let besideWidgets = [widgetFactory(widgetSelection[i], componentId)];
                        if (widgetSelection[i+2] >= squareThreshold) {
                            besideWidgets.push(widgetFactory(widgetSelection[i+2], componentId));
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

export default connect(mapStateToProps, mapDispatchToProps, null, {"withRef" : true})(Dashboard);
