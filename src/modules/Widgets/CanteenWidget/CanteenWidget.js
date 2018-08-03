import React, { Component } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { style } from './styles'
import { strings } from 'src/i18n';
import { getTopBarOptions } from 'src/config/navigation';
import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native';

class CanteenWidget extends Component {
    constructor(props) {
        super(props);
    }

    getTodaysMeal() {
        const today = moment().format('YYYY-M-D');
        for (let i = 0; i < this.props.menu.menu.length; i++) {
            let day = this.props.menu.menu[i].date;
            if (day === today) {
                return i;
            }
        }
        return 0;  // should not be reached
    }

    render() {
        const {componentId} = this.props;
        let widgetContent;
        const currentDay = moment().format('d');

        if (currentDay > 5 || currentDay < 1) {  // weekend -> canteen closed
            widgetContent = (
                <View style={style.contentView}>
                    <Text style={style.contentText}>{strings('dashboard.weekend')}</Text>
                </View>
            )
        } else if (this.props.menu) {  // data retrieved
            const mealIndex = this.getTodaysMeal();
            const {title, ctgry, priceStud} = this.props.menu.menu[mealIndex]['meals'][0];
            let student = strings('canteen.student');
            let androidStudent = student.length > 8 ? student.substring(0, 5) + '...' : student;
            let iosStudent = student.length > 8 ? student.substring(0, 7) + '...' : student;
            let content;
            if(Platform.OS === 'android'){
                content = ctgry + ' | ' + priceStud + ' € ' + androidStudent
            } else {
                content = ctgry + ' | ' + priceStud + ' € ' + iosStudent
            }

            widgetContent = (
                <View>
                    <View style={style.contentView}>
                        <Text style={style.contentText}>
                            {title.length > 12 ? title.substring(0, 12) + '...' : title}
                        </Text>
                    </View>
                    <View style={style.contentView}>
                        <Text style={style.titleText}>
                            {content}
                        </Text>
                    </View>
                </View>
            );
        } else {
            widgetContent = (
                <View style={style.contentView}>
                    <Text style={style.contentText}>{strings('dashboard.loading')}</Text>
                </View>
            );
        }

        return  (
            <TouchableOpacity onPress={() => {
                Navigation.push(componentId, {
                    component: {
                        id: 'idCanteen',
                        name: 'app.Canteen',
                        options: getTopBarOptions(strings('canteen.screenTitle'), false, true, 'idCanteen')
                    }
                });
            }}>
                <View style={style.widgetContainer}>
                        <View style={style.titleView}>
                            <Text style={style.titleText}>
                                {strings('dashboard.titleCanteen')} {'|'} {strings('dashboard.menu')}
                            </Text>
                        </View>
                        {widgetContent}
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.canteenReducer.menu
});

export default connect(mapStateToProps, null, null, {"withRef" : true})(CanteenWidget);