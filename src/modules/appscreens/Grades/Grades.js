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
            console.log(this.props.grades);
            content = this._renderView();
        } else {  // loading in progress
            content =   <View style={style.GradeFrame}>
                <View style={style.loadingView}>
                    <Text style={style.loadingText}>{strings('general.noDataTxt')}</Text>
                </View>
            </View>
        }
        return getBackgroundView(content, 1);
    }

    _renderView() {
        const semester  = this.props.grades.gradesReport;
        const content = (
            <ScrollView>
                <View style={style.gradeFrame}>
                    <FlatList style={style.listView}
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
            return (
                <View style={style.headerView}>
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
                    <View style={style.lineStyle}/>
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
        )

        const panelContent = (
            <View>
                {contentHeader}
                {grades}
            </View>
        )

        const lectureContent = (
            <Panel expanded={false}
                   content={panelContent}
                   header={panelHeader}
            />
        )

        return (
            <View style={style.page}>
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
                            {lecture.lecture.length > 24 ? lecture.lecture.substring(0, 24) + '...' : lecture.lecture}
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