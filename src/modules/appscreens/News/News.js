import React, { Component } from 'react';
import { Text, View, FlatList, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from 'src/actions';
import { strings } from 'src/i18n';
import { style } from './styles';
import { panelIcon } from 'src/config/styles';
import Panel from 'src/modules/Panel';
import { getBackgroundView } from 'src/config/styles';


class News extends Component {

    constructor(props) {
        super(props)  ;
        this.page = 0;
    }

    componentDidMount() { }

    _onRefresh = () => {
        this.props.actions.setRefreshing(true);  // start fetching new data
        this.page = 0;
        this.props.actions.getNews(this.page);
    };

    _loadMore = () => {
        this.props.actions.getNews(++this.page)
    }

    render() {
        let content;
        if (this.props.news) {
            content = this._renderView();
        } else {
            content = <View>
                        <Text>{strings('general.noDataTxt')}</Text>
                      </View>
        }
        return content;
    }

    _renderView() {
        const content = (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                <View style={style.NewsFrame}>
                    <FlatList style={style.listView}
                        data={this.props.news.news}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => 'accordion' + index}
                        onThresholdEnd={0}
                        onEndReached={this._loadMore}
                    />
                </View>
            </ScrollView>
        );
        return getBackgroundView(content, 2);
    }

    _renderItem = (singleNews) => {
        const panelHeader = ({isOpen}) => {
            return (
                <View style={style.headerView}>
                    <View style={style.newsPanelHeader}>
                        <Text style={style.newsPanelHeaderText}>
                            {singleNews.item['title']}
                        </Text>
                        <View style={style.iconContainer}>
                            <Icon
                                name={isOpen ? 'remove' : 'add'}
                                size={panelIcon.size}
                                color={panelIcon.color}
                            />
                        </View>
                    </View>
                    <View style={style.shortDesc}>
                        <Text>
                            {singleNews.item['short_desc']}
                        </Text>
                    </View>
                    <View style={style.lineStyle}/>
                </View>
            );
        };

        const panelContent = (
            <View style={style.contentView}>
                <Text style={style.contentText}>
                {singleNews.item['content']}
                </Text>
            </View>
        );

        const newsContent = (
            <Panel
                expanded={false}  // TODO: formatter that only the first element is expanded
                header={panelHeader}
                content={panelContent}
            />
        );

        return (
                <View style={{overflow: 'scroll'}}>
                    {newsContent}
                </View>
        )
    };
}

const mapStateToProps = (state) => ({
    news: state.newsReducer.news,
    isRefreshing: state.dashboardReducer.isRefreshing
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {"withRef" : true})(News);
