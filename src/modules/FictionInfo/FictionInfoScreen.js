import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import * as actions from '../fictionInfoActions.js';

import ChapterRow from './Components/ChapterRow';

var debounce = require('lodash.debounce');

class FictionInfoScreen extends Component {
  //Default state?
  state = {
    offset: 0,
    isRefreshing: false,
  }

  oldChapters = this.props.details.chapters;
  
  //For flatlist, keys are the titles of the chapter
  _keyExtractor = (item, index) => item.url;

  componentWillMount() { 
    this._retrieveDetails();
  }

  _retrieveDetails() {
    this.props.actions.retrieveFictionDetails(this.props.fictionKey);
	}

  _viewChapter(chapter) {
		this.props.navigator.push({
			screen: 'Leedr.ChapterReaderScreen',
      title: chapter.title,
			passProps: {
        chapterKey:chapter.url,
        fictionKey:this.props.fictionKey
			}
		});
	}

  _onPressChapter(item) {
    this._viewChapter(item);
  }

  render() {
    const { details } = this.props;
    const { chapters} = details;

    return (
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
          <Text>{details.title}</Text>
          <Text>{details.author}</Text>
          <View style={{flex:0.4, flexDirection: 'row'}}>
            <Image
              style={{flex:0.4, height:'100%', resizeMode: 'contain'}}
              source={{uri: details.img}}
            />
            <View style={{flex:0.6}}>
              <Text>Description:</Text>
                <ScrollView style={{flex:0.5}}>
                  <Text>{details.desc}</Text>
                </ScrollView>
            </View>
          </View>
          <FlatList
            style={{flex:0.6}}
            data={chapters}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: "86%",
                  backgroundColor: "#CED0CE",
                  marginLeft: "14%"
                }}
              />)}
            keyExtractor={this._keyExtractor}
            containerStyle={{ borderBottomWidth: 0 }}
            renderItem={({item}) => (
              <ChapterRow 
                onPressChapter={debounce(() => this._onPressChapter(item), 1000, {
                  leading: true,
                  trailing: false
                })}
                item={item}
              />
            )}
          />
        </View>
    );
  }
}

FictionInfoScreen.propTypes = {
	actions: PropTypes.object.isRequired,
	details: PropTypes.object.isRequired,
  fictionKey: PropTypes.string.isRequired,
	navigator: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	return {
		details: state.FictionInfo.details
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionInfoScreen);