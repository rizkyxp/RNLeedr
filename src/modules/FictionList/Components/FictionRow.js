import React, { Component, PropTypes } from 'react';

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

const FictionRow = ({onPressFiction, item}) => {
  return (<TouchableHighlight underlayColor='gray' onPress={() => onPressFiction()}>
    <View style={{flexDirection:'row'}}>
      <View>
        {item.img == ''?
          <Image
            style={{height:90, width:100, resizeMode: 'contain'}}
            source={require('../../../res/placeholder.png')}
          />
        :
          <Image
            style={{height:90, width:100, resizeMode: 'contain'}}
            source={{uri:`data:image/gif;base64,${item.img}`}}
          />}
      </View>
      <View>
        <Text style={{fontWeight:'bold'}}>{item.title}</Text>
        <Text>{item.author}</Text>
      </View>
    </View>
  </TouchableHighlight>);
}

export default FictionRow
