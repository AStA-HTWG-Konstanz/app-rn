import React, { Component } from 'react';
import { Image, FlatList, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Panel from 'src/modules/Panel';
import SelectList from 'src/modules/SelectList';
import { ActionCreators } from 'src/actions';
import { iconStyle, styles } from './styles';
import { panelIcon } from 'src/config/styles';
import { getLanguages, strings } from 'src/i18n';
import impressum from 'src/config/impressum';
import { widgetEnum } from 'src/config/settings';


class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /***** Dismiss Button *****/
        const dismissDrawer = (
            <TouchableOpacity style={styles.dismissBtn}>
                <Icon
                    name='clear'
                    size={iconStyle.size}
                    color={iconStyle.color}
                    onPress={() => {
                        Navigation.mergeOptions(this.props.componentId, {
                            sideMenu: {
                                left: {
                                    visible: false
                                }
                            }
                        });
                    }}
                />
            </TouchableOpacity>
        );


        /***** News *****/
        /*
        const newsHeader = this._getPanelHeader(strings('settings.news'));
        let newsContent;
        if (this.props.news_ctgry) {  // data available
            newsContent = (
                <FlatList
                    data={this.props.news_ctgry['categories']}
                    renderItem={this._renderNews}
                    keyExtractor={(item, index) => 'news_ctgry_' + index}
                />
            );
        } else {
            newsContent = <View/>
        }

        const news = (
            <Panel
                header={newsHeader}
                content={newsContent}
            />
        );
        */
        /***** Dashboard widgets *****/
        const widgetHeader = this._getPanelHeader('Widgets');
        let widgetContent;
        if (this.props.selectedWidgets) {
            widgetContent = (
                <SelectList
                    selectedKeys={this.props.selectedWidgets}
                    allKeys={Object.values(widgetEnum)}
                    onChangeOrder={(newSelection) => {
                        this.props.actions.setSelectedWidgets(newSelection, true)  // true -> update database
                    }}
                />
            );
        } else {
            widgetContent = <View/>;
        }
        const widgetSelection = (
            <Panel
                header={widgetHeader}
                expanded={false}
                content={widgetContent}
            />
        );



        /***** Language *****/
        const languageHeader = this._getPanelHeader(strings('settings.language'));
        let languageContent = (
            <FlatList
                data={getLanguages()}
                renderItem={this._renderLanguages}
                keyExtractor={(item, index) => 'language_' + item}
            />
        );

        const language = (
            <Panel
                header={languageHeader}
                content={languageContent}
            />
        );

        /***** About *****/
        const aboutHeader = this._getPanelHeader(strings('settings.about'));
        const aboutContent = (
            <View style={styles.panelContentContainer}>
                <Text style={styles.creatorsTitle}>
                    {strings('settings.impressumDev')}
                </Text>
                <Text>{impressum['developers']}</Text>
                <Text style={styles.designersTitle}>
                    {strings('settings.impressumDesign')}
                </Text>
                <Text>{impressum['designers']}</Text>
                <Text style={styles.designersTitle}>
                    {strings('settings.impressumProf')}
                </Text>
                <Text>{impressum['profs']}</Text>
            </View>
        );
        const about = (
            <Panel
                header={aboutHeader}
                content={aboutContent}
            />
        );

        /***** Logout *****/
        const logout = (
            <TouchableOpacity
                onPress={() => this.props.actions.changeAppRoot('login')}
                style={styles.logout}
            >
                <Text style={styles.logoutText}>{strings('login.signout')}</Text>
            </TouchableOpacity>
        );

        /***** Plugging everything together *****/
        /*
            {news}
            <View style={styles.separator}/>
        */
        return (
            <ScrollView style={styles.page}>
                {dismissDrawer}
                <View style={styles.container}>
                    {widgetSelection}
                    <View style={styles.separator}/>
                    {language}
                    <View style={styles.separator}/>
                    {about}
                    <View style={styles.separator}/>
                    {logout}
                </View>
                <View style={styles.poweredByView}>
                    <Text style={styles.poweredByText}>
                        Powered by AStA
                    </Text>
                </View>
            </ScrollView>
        );
    }



    /***** Helper functions *****/
    _getPanelHeader(title) {
        return ({isOpen}) => {
            return (
                <View style={styles.panelHeader}>
                    <Text style={styles.panelHeaderText}>
                        {title}
                    </Text>
                    <View>
                        <Icon
                            name={isOpen ? 'remove' : 'add'}
                            size={panelIcon.size}
                            color={panelIcon.color}
                        />
                    </View>
                </View>
            );
        };
    };

    _renderLanguages = (language) => {
        return (
            <View style={styles.selectRow}>
                <CheckBox
                    checked={this.props.language === language.item}
                    onChange={() => this.props.actions.setLanguage(language.item)}
                />
                <Text style={styles.selectRowText}>
                    {strings('language.' + language.item)}
                </Text>
            </View>
        );
    };

    _renderNews = (ctgry) => {
        return (
            <View style={styles.selectRow}>
                <CheckBox
                    checked={ctgry.item['selected']}
                    onChange={(value) => this.props.actions.changeNewsCtgrySelected(ctgry.item['name'], !value)}
                />
                <Text style={styles.selectRowText}>
                    {ctgry.item['name']}
                </Text>
            </View>
        );
    };
}

function mapStateToProps(state, ownProps) {
    return {
        selectedWidgets : state.dashboardReducer.widgetSelection,
        language        : state.languageReducer.language,
        news_ctgry      : state.newsReducer.news_ctgry
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {"withRef" : true})(Settings);
