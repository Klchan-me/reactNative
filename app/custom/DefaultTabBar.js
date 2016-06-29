'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    PixelRadio
} from 'react-native';
var Colors = require('../common/Colors');
var CommonComponent = require('../common/CommonComponents');


var styles = StyleSheet.create({
  tab: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:45,
    marginLeft:13,
    marginRight:13,
    borderBottomColor:'transparent',
    //borderBottomWidth:CommonComponent.pixel(1)
  },

  tabs: {
    height: 65,
    paddingTop:20,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    // borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  underLine: {
    //borderBottomColor:'#e4bc6a',
    borderBottomColor:'#9444ef',//紫色
    borderBottomWidth:CommonComponent.pixel(2)
  },

  tabText: {
    fontSize:15,
    marginTop:3

  }
});

var DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor : React.PropTypes.string,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    //var activeTextColor = this.props.activeTextColor || '#e4bc6a';
    var activeTextColor = this.props.activeTextColor || '#9444ef';
    var inactiveTextColor = this.props.inactiveTextColor || "rgba(255, 255, 255, 0.6)";
    var underLine = function () {
        if(isTabActive){
          return styles.underLine;
        }else{
          return null;
        }
    }
    return (
      <TouchableOpacity style={[styles.tab,underLine()]} key={name} onPress={() => this.props.goToPage(page)}>
        <View style={styles.tabTextWrap}>
          <Text style={[styles.tabText,{color: isTabActive ? activeTextColor : inactiveTextColor}]}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      // position: 'absolute',
      // width: containerWidth / numberOfTabs,
      // height: 3,
      // backgroundColor: this.props.underlineColor || Colors.white,
      // bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0,  containerWidth / numberOfTabs]
    });

    return (
      <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

module.exports = DefaultTabBar;
