import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import { getTopBarOptions}  from 'src/config/navigation';
import { Navigation } from 'react-native-navigation';

class NewsWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let numberNews;
        if(this.props.numberNews) {
            numberNews = this.props.numberNews;
        }

        const {componentId} = this.props;
        return  (
            <TouchableOpacity onPress={() => {
                Navigation.push(componentId, {
                    component: {
                        id: 'idNews',
                        name: 'app.News',
                        options: getTopBarOptions(strings('news.screenTitle'), false, true, 'idNews')
                    }
                });
            }}>
                <View style={style.widgetContainer}>
                        <View style={style.titleView}>
                            <Text style={style.titleText}>
                                {strings('news.widgetTitle') (numberNews)}
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


export default connect(mapStateToProps, null, null, {"withRef" : true})(NewsWidget);