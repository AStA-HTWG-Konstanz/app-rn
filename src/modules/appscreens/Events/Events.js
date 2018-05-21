
import React, { Component } from 'react';
import {Image, FlatList, ScrollView, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as eventActions from 'src/actions/eventActions';
import { strings } from 'src/i18n';
import { ic_add, ic_remove } from 'src/images';
import Panel from 'src/modules/Panel';
import { style } from './styles';

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
            // TODO: Busy indicator or just a prettier screen that says no data yet?
            content = <View/>
        }

        return content;

    }

    _renderView() {
        return (
            <View style={style.contentContainer}>
                <ScrollView>
                    <View style={style.EventFrame}>
                        <FlatList
                            data={this.props.events.events}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => 'event' + index}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    _renderItem = (event) => {
        const header = ({isOpen}) => {
            return (
                <View>
                    <View style={style.eventPanelHeader}>
                        <Text style={style.eventPanelHeaderText}>{event.item['header']}</Text>
                        <View style={style.iconContainer}>
                            <Image style={style.accordionIcon} source={isOpen ? ic_remove : ic_add}/>
                        </View>
                    </View>
                    <View style = {style.lineStyle}/>
                </View>
            );
        };

        const panelContent = (
            <View>
                <FlatList
                    data={this.props.events.events}
                    renderItem={this._renderEvent}
                    listKey={'Event_' + event.index}
                    keyExtractor={(item, index) => 'event_' + index}
                />
                <View style = {style.lineStyle}/>
            </View>
        );

        return (
            <View
                style={style.eventPanelContainer}
            >
                <Panel
                    header={header}
                    content={panelContent}
                />
            </View>
        )
    };

    _renderEvent = (event) => {
        return (
            <View style={style.eventContent}>
                <Text style={style.title}>{event.item['title1']}</Text>
                <Text style={style.content}>{event.item['content1']}</Text>
                <Text style={style.title}>{event.item['title2']}</Text>
                <Text style={style.content}>{event.item['content2']}</Text>
            </View>
        );
    };
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
