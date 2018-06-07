import React, { Component } from 'react';
import {Image, Text, View, FlatList, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as gradesActions from 'src/actions/gradesActions';
import Panel from 'src/modules/Panel';
import { strings } from 'src/i18n';
import { style } from './styles';
import { panelIcon } from 'src/config/styles';
import {getBackgroundView} from "../../../config/styles";

class Grades extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let content;
        if (this.props.grades) {  // data already retrieved
            content = this._renderView();
        } else {  // loading in progress
            content =
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24}}>{strings("grades.noData")}</Text>
                </View>
        }
        return getBackgroundView(content, 3);
    }

    _renderView() {
        const semester  = this.props.grades.gradesReport;
        const content = (
            <ScrollView>
                <View style={style.gradeFrame}>
                    <FlatList
                              data={Object.keys(semester)}
                              renderItem={this._renderSemester}
                    />
                </View>
            </ScrollView>
        );
        return getBackgroundView(content, 4);
    }

    _renderSemester = (element) => {
        const currentSemester = this.props.grades.gradesReport[element.item];
        const grades = currentSemester.map((lecture) => {
            return this._renderLecture(lecture);
        });
        const panelHeader = ({isOpen}) => {
            let panelHeaderContent = [
                    <View style={style.gradesPanelHeader}>
                        <Text style={style.gradesPanelHeaderText}>
                            {element.item}
                        </Text>
                        <View style={style.iconContainer}>
                            <Icon
                                name={isOpen ? 'remove' : 'add'}
                                size={panelIcon.size}
                                color={panelIcon.color}
                            />
                        </View>
                    </View>
            ];

                if (element.index < Object.keys(this.props.grades.gradesReport).length-1) {
                    panelHeaderContent.push(<View style = {style.lineStyle}/>);
                } else {  // last element in list
                    if (isOpen) {
                        panelHeaderContent.push(<View style = {style.lineStyle}/>);
                    }
                }
            return (
                <View style={style.headerView}>
                    {panelHeaderContent}
                </View>
            );
        };

        const contentHeader = (
            <View style={style.contentView}>
                <View style={style.rowContent}>
                    <View style={style.leftContent}>
                        <Text style={style.contentHeaderText}>
                            Fach
                        </Text>
                    </View>
                    <View style={style.rightContent}>
                        <Text style={style.contentHeaderText}>
                            Note
                        </Text>
                        <Text style={style.contentHeaderText}>
                            ECTS
                        </Text>
                    </View>
                </View>
            </View>
        );

        const panelContent = [
            <View>
                {contentHeader}
                {grades}
            </View>
        ];

        if (element.index < Object.keys(this.props.grades.gradesReport).length-1) {
            panelContent.push(<View style = {style.lineStyle}/>);
        }

        const lectureContent = (
            <Panel expanded={false}
                   content={panelContent}
                   header={panelHeader}
            />
        )

        return (
            <View style={style.gradesPanelContainer}>
                <View style={{overflow: 'scroll'}}>
                    {lectureContent}
                </View>
            </View>
        );
    };

    _renderLecture = (lecture) => {
        return (
            <View style={style.contentView}>
                <View style={style.rowContent}>
                    <View style={style.leftContent}>
                        <Text style={style.contentText}>
                            {lecture.name.length > 24 ? lecture.name.substring(0, 24) + '...' : lecture.name}
                        </Text>
                    </View>
                    <View style={style.rightContent}>
                        <Text style={style.contentText}>
                            {lecture.grade}
                        </Text>
                        <Text style={style.contentText}>
                            {lecture.ects}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }


}

const mapStateToProps = (state) => ({
    grades: state.gradesReducer.grades
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gradesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grades);