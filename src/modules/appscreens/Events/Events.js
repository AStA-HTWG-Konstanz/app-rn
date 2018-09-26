import React, { Component } from 'react';
import {Image, FlatList, ScrollView, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as eventActions from 'src/actions/eventActions';
import { strings } from 'src/i18n';
import { ic_add, ic_remove } from 'src/images';
import Panel from 'src/modules/Panel';
import { style } from './styles';
import { getBackgroundView } from 'src/config/styles';

class Events extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let content;
        if (this.props.events) {  // data already retrieved
            console.log(this.props.events);
            content = this._renderView();
        } else {  // loading in progress
            content =   <View style={style.eventFrame}>
                            <View style={style.loadingView}>
                                <Text style={style.loadingText}>{strings('general.noDataTxt')}</Text>
                            </View>
                        </View>
        }
        return getBackgroundView(content, 4);
    }

    _renderView() {
        const content = (
            <ScrollView>
                <View style={style.eventFrame}>
                    <View style={style.eventPanelContainer}>
                        <View style={style.headerView}>
                            <Text style={style.headerText}>WiSe18/19</Text>
                        </View>
                        <View style = {style.lineStyle}/>
                        <View style={style.eventContent}>
                            {
                                this.props.events.events.map((item, index) => (
                                        <View>
                                            <Text style={style.title}>
                                                {item.title}
                                            </Text>
                                            <Text style={style.content}>
                                                {item.eventDate}{'\n'}
                                            </Text>
                                        </View>
                                    )
                                )
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
        return getBackgroundView(content, 4);
    }
}


const mapStateToProps = (state) => ({
    events: state.eventReducer.events
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
