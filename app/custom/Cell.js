'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ListView,
	Image,
	Text,
	View
} from 'react-native';
import CommonComponents from '../common/CommonComponents';

const deviceSize = CommonComponents.deviceSize();

export default class Cell extends Component {

    render() {
		var row = this.props.row,
			tag = this.props.row.tag,
			_index = this.props.index,
			leftStyle = '';

		var itemContainer = function(){
			return {
				left:0,
				position:'relative',
				paddingBottom:9,
				backgroundColor:'#000'
			};
		};

		return (
		  <View style={itemContainer()}>
			<View style={[styles.thumbBox]}>
				<Image source={{uri:row.coverImg}} style={styles.thumbNail} />
			</View>
			<View style={styles.content}>
				<Text numberOfLines={1} style={[styles.flex,styles.center,styles.title]}>{row.appName}</Text>
				<Text numberOfLines={1} style={[styles.flex,styles.center,styles.description]}>{row.slogan}</Text>
			</View>
			  {
				  tag ?

				  <View style={[styles.newTag,styles.center]}>
				  	<Text style={[styles.tagText]}>{row.tag}</Text>
				  </View>
				  : null

			  }
		  </View>
		);
  	}
}

var styles = StyleSheet.create({
	flex:{
		flex:1
	},
	center:{
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemContainer:{
		paddingBottom:9
	},
	content:{
		paddingLeft:10,
		paddingRight:10,
		width:deviceSize.deviceWidth/3-10,
	},
	thumbBox:{
		width:deviceSize.deviceWidth/3,
		height:deviceSize.deviceWidth/3*1.4947
	},
	thumbNail:{
		width:deviceSize.deviceWidth/3,
		height:deviceSize.deviceWidth/3*1.4947,
		overflow:"hidden"
	},
	title:{
		marginTop:8,
		height:22,
		fontSize:15,
		color:'#fff'
	},
	description:{
		height:15,
		fontSize:10,
		color:'#51515C'
	},
	newTag:{
		position: 'absolute',
		top: 5,
		right: 0,
		flex:1,
		paddingLeft:8,
		paddingRight:5,
		height: 19,
		borderTopLeftRadius:19,
		borderBottomLeftRadius:19,
		backgroundColor: '#ec2727'
	},
	tagText:{
		color: '#fff',
		fontSize: 10,
	}
});

