import React, { Component } from 'react';
import {Text, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as endlichtActions from 'src/actions/endlichtActions';
import { strings } from 'src/i18n';
import { style } from './styles';
import { getBackgroundView } from 'src/config/styles';

class Endlicht extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        let content;
        if (this.props.endlichtData) {  // data already retrieved
            content =   <View>
                            {this._renderView()}
                        </View>
        } else {  // loading in progress
            content = <View>
                        <View style={style.loadingView}>
                            <Text style={style.loadingText}>{strings('general.noDataTxt')}</Text>
                        </View>
                    </View>
        }
        return getBackgroundView(content, 1);
    }

    _renderView() {
        let special, specialPrice, specialContent, title;
        special = this.props.endlichtData.endlicht.special.name;
        specialPrice = this.props.endlichtData.endlicht.special.price;

        if (typeof this.props.endlichtData.endlicht.special.price !== "undefined") {
            specialContent = <View style={style.special}>
                                <Text style={style.header}>
                                    {strings('endlicht.specialTitle')}
                                </Text>
                                <View style={style.rowContent}>
                                    <Text>
                                        {special}
                                    </Text>
                                    <Text>
                                        {specialPrice} €
                                    </Text>
                                </View>
                            </View>
        } else {
            specialContent =    <View>
                                </View>
        }

        return (
            <ScrollView style={style.contentContainer}>
                <View style={style.endlichtFrame}>
                    <View style={style.page}>
                        <View style={style.content}>
                            {specialContent}
                            <View style={style.menu}>
                                <Text style={style.header}>
                                    {strings('endlicht.menuTitle')}
                                </Text>
                                <View>
                                    {
                                        this.props.endlichtData.endlicht.beverages.map((item, index) => (
                                            <View style={style.rowContent}>
                                                <Text>
                                                    {item.name}
                                                </Text>
                                                <Text>
                                                    {item.price} €
                                                </Text>
                                            </View>
                                            )
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={style.addContent}>
                            <Text>
                                *{'\n'}
                                **
                            </Text>
                            <Text>
                                auch Laktosefrei{'\n'}
                                1 € Pfand
                            </Text>
                        </View>
                        <View style={style.locationHeader}>
                            <Text style={style.header}>{strings('endlicht.locationTitle')}</Text>
                        </View>
                        <View style={style.map}>
                            <Image source={require('src/images/Campusplan_Endlicht.png')} style={style.endlichtImage}
                            resizeMode={'cover'}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    endlichtData: state.endlichtReducer.endlichtData
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(endlichtActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Endlicht);
