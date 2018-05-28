import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as mensaActions from 'src/actions/canteenActions';  // if you want to import ALL actions: import ActionCreators from 'src/actions';
import { strings } from 'src/i18n';
import Panel from 'src/modules/Panel';
import { style } from './styles';
import { panelIcon } from 'src/config/styles';
import { getBackgroundView } from 'src/config/styles';

class Canteen extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let content;
        if (this.props.menu) {  // data already retrieved
            content = this._renderView();
        } else {  // loading in progress
            content = <View style={style.NewsFrame}>
                        <View style={style.loadingView}>
                            <Text style={style.loadingText}>{strings('general.noDataTxt')}</Text>
                        </View>
                    </View>
        }
        return content;
    }

    _renderView() {
        const content = (
            <ScrollView>
                <View style={style.canteenFrame}>
                    <FlatList
                        data={this.props.menu.menu}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => 'accordion' + index}
                    />
                </View>
            </ScrollView>
        );
        return getBackgroundView(content, 5);
    }

    _renderItem = (dailyMenu) => {
        const day = moment(dailyMenu.item['date'], 'YYYY-MM-DD');
        if(day.isBefore(moment().subtract(1, 'days'))){
            return <View/>
        }
        const header = ({isOpen}) => {
            return (
                <View style={style.headerView}>
                    <View style={style.menuPanelHeader}>
                        <Text style={style.menuPanelHeaderText}>
                            {day.format('dddd, DD.MM')}
                         </Text>
                        <View style={style.iconContainer}>
                            <Icon
                                name={isOpen ? 'remove' : 'add'}
                                size={panelIcon.size}
                                color={panelIcon.color}
                            />
                        </View>
                    </View>
                    <View style={style.lineStyle}/>
                </View>
            );
        };

        const panelContent = (
            <View>
                <FlatList
                    data={dailyMenu.item['meals']}
                    renderItem={this._renderMeal}
                    listKey={'Menu_' + dailyMenu.index}
                    keyExtractor={(item, index) => 'meal_' + index}
                />
                <View style = {style.lineStyle}/>
            </View>
        );


        return (
            <View style={style.menuPanelContainer}>
                <Panel
                    header={header}
                    content={panelContent}
                    expanded={day.isSame(moment(), 'day')}
                />
            </View>
        )
    };

    _renderMeal = (meal) => {
        return (
            <View style={style.menuContent}>
                <Text style={style.title}>{meal.item['ctgry']}</Text>
                <Text style={style.content}>{meal.item['title']}</Text>
                <Text style={style.content}>{meal.item['priceStud']} € {strings('canteen.student')} | {meal.item['priceEmpl']} € {strings('canteen.employee')} </Text>
            </View>
        );
    };
}


const mapStateToProps = (state) => ({
    menu: state.canteenReducer.menu  // src/reducers/rootReducer: combineReducers -> canteenReducer
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(mensaActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canteen);
