import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { style } from './styles';
import { colorScheme, pRatio } from 'src/config/styles';
import { strings } from 'src/i18n';
import { genericNavBarStyle, getBackButton }  from 'src/config/navigation';
import moment from 'moment';

class EndlichtWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let open, close;
        let content;
        if (this.props.endlichtData) {
            const day = moment().format('YYYY-MM-DD');
            if (typeof this.props.endlichtData.endlicht.openingHours[day] !== "undefined"){
                open = this.props.endlichtData.endlicht.openingHours[day].startTime;
                close = this.props.endlichtData.endlicht.openingHours[day].endTime;

                content = (
                    <View style={style.contentView}>

                        <Text style={style.contentText}>
                            {open}
                        </Text>
                        <MaterialIcon
                            name='remove'
                            color='white'
                            size={Platform.OS === 'ios' ? pRatio * 10 : pRatio * 10}
                        />
                        <Text style={style.contentText}>
                            {close}
                        </Text>
                    </View>
                )
            } else {
                if(strings('endlicht.closed') === 'Geschlossen') {
                    content =   <View style={style.noDataView}>
                                    <Text style={style.noDataGerman}>
                                        {strings('endlicht.closed')}
                                    </Text>
                                </View>
                } else {
                    content =   <View style={style.noDataView}>
                                    <Text style={style.noData}>
                                        {strings('endlicht.closed')}
                                    </Text>
                                </View>
                }

            }


        } else {
            content = (
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Icon
                        name='coffee'
                        color='white'
                        size={Platform.OS === 'ios' ? pRatio * 30 : pRatio * 25}
                    />
                </View>
            )
        }

        const {navigator} = this.props;
        return  (
            <View style={style.widgetContainer}>
                <TouchableOpacity onPress={() => {
                    navigator.push({
                        screen: 'app.Endlicht',
                        title: 'Endlicht',
                        backButtonTitle: '',
                        navigatorButtons: getBackButton(navigator),
                        navigatorStyle: Object.assign({}, genericNavBarStyle, {
                            navBarBackgroundColor: colorScheme.botticelli,
                            navBarTextColor: 'black'
                        })
                    })
                }}>
                    <View style={style.titleView}>
                        <Text style={style.titleText}>
                            Endlicht
                        </Text>
                    </View>
                    {content}
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    endlichtData: state.endlichtReducer.endlichtData
});


export default connect(mapStateToProps)(EndlichtWidget);