import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import { colorScheme } from 'src/config/styles';
import { genericNavBarStyle, getBackButton }  from 'src/config/navigation';

class NewsWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let numberNews;
        if(this.props.numberNews) {
            numberNews = this.props.numberNews;
        }

        const {navigator} = this.props;
        return  (
            <TouchableOpacity onPress={() => {
                navigator.push({
                    screen: 'app.News',
                    title: strings('news.screenTitle'),
                    backButtonTitle: '',
                    navigatorButtons: getBackButton(navigator),
                    navigatorStyle: Object.assign({}, genericNavBarStyle, {
                        navBarBackgroundColor: colorScheme.botticelli,
                        navBarTextColor: 'black'
                    })
                })
            }}>
                <View style={style.widgetContainer}>
                        <View style={style.titleView}>
                            <Text style={style.titleText}>
                                News&nbsp;({numberNews})
                            </Text>
                        </View>
                        <View style={style.contentView}>
                            <Text style={style.contentText}>
                                Sci-Feierei
                            </Text>
                        </View>
                        <View style={style.contentView}>
                            <Text style={style.titleText}>
                                Party
                            </Text>
                        </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => ({
    numberNews: state.newsReducer.numberNews
});


export default connect(mapStateToProps)(NewsWidget);