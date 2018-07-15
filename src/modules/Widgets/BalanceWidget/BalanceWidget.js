import React, { Component } from 'react';
import { connect } from 'react-redux';
import { style } from './styles'
import { strings } from 'src/i18n';
import {
    View,
    Text
} from 'react-native';

class BalanceWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let printValue, zackValue;
        if (this.props.balance) {  // data available
            printValue = this.props.balance["print"];
            zackValue = this.props.balance["zack"] ? this.props.balance["zack"] : 'n/a';
        } else {  // fetching in progress
            printValue = 'n/a'
        }

        return  (
            <View style={style.widgetContainer}>
                <View style={style.titleView}>
                    <Text style={style.titleText}>
                        {strings('dashboard.titleBalance')}
                    </Text>
                </View>
                <View style={style.contentView}>
                    <Text style={style.contentText}>
                        {printValue}€
                    </Text>
                </View>
                <View style={style.titleView}>
                    <Text style={style.titleText}>
                        {strings('dashboard.titlePrinter')}
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    balance: state.balanceReducer.balance
});


export default connect(mapStateToProps, null, null, {"withRef" : true})(BalanceWidget);

/*<View style={style.contentView}>
                    <Text style={style.contentText}>
                        {zackValue}
                    </Text>
                </View>
                <View style={style.specifierView}>
                    <Text style={style.specifierText}>
                        {strings('dashboard.titleCanteen')}
                    </Text>
                </View>*/