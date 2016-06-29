'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
	ListView,
	TouchableHighlight,
	StyleSheet,
	Text,
	View
} from 'react-native';

import CommonComponents from '../common/CommonComponents';
//import Cell from './Cell';
import Cell from './CellPie';
const deviceSize = CommonComponents.deviceSize();

export default class Grid extends Component {
    constructor(props) {
	  super(props);
	  this.state = {
		baseUrl : this.props.baseUrl,
		dataSource: new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,
		}),
		show:false
	  };
	}

	componentDidMount() {
		this.appInit();
	}

	appInit(){
		var that = this;
		this.setState({
			show: false
		});
		that.setState({
			dataSource: that.state.dataSource.cloneWithRows(that.props.baseData),
			show: true
		});
	}

	fetchData(){
		var that = this;
		this.setState({
			show: false
		});
		CommonComponents.get(this.state.baseUrl,function(data){
			that.setState({
				dataSource: that.state.dataSource.cloneWithRows(data.info),
				show: true
			});
		},function(err){
			alert(err);
		});
	}



	render() {
	  return (
		<View>
			{this.state.show ?
			<ListView
			  contentContainerStyle={styles.list}
			  dataSource={this.state.dataSource}
			  style={styles.listView}
			  renderRow = {(rowData,sec,index)=>
				<Cell row={rowData} index={index}></Cell>
			  }
			/>
			: CommonComponents.renderLoadingView
			}
		</View>
	  );
	}

}
var styles = StyleSheet.create({
	listView:{
		flex:1,
		paddingTop:1,
		height:deviceSize.deviceHeight-45-20-49,
		backgroundColor:'#000'
	},
	list: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

