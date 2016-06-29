/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';


import FileDownload from 'react-native-file-download';
import RNFS from 'react-native-fs';
import ZipArchive from'react-native-zip-archive';
import DeviceInfo from 'react-native-device-info';

import Handle from './nativeModules/RNHandle';
import CommonComponents from './app/common/CommonComponents';
import Config from './app/config';
import ListView from  './app/custom/ListView';
import DefaultTabBar from './app/custom/DefaultTabBar';
import ScrollableTabView  from 'react-native-scrollable-tab-view';

class hotUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false,
            fadeAnim: new Animated.Value(0)
        }
    }

    componentDidMount() {
        // console.log("App Version", DeviceInfo.getVersion());
        Handle.updateVersion(Config.appVersion,Config.pachVersion,Config.url)
            .catch((error) => {
                console.log(error)
            });

        Handle.addListener((response) =>{
            console.log(response);
        });
        this._versionCompare();
        this._onPressButton();
        console.log(RNFS.MainBundlePath);
    }

    _onPressButton() {

        const fileName = "main.json";
        const URL = Config.url+Config.pachVersion+"/"+fileName+"?time="+Math.random();
         const DEST = RNFS.DocumentDirectoryPath+'/JSBundle';
        // console.log(DEST);
        const headers = {
            "Accept-Language": "en-US"
        };
        FileDownload.download(URL, DEST, fileName, headers)
            .then((response) => {
                console.log("downloaded! file saved to: ${response}");
                //delete jsboundle assets
                RNFS.unlink(DEST+"/main.jsbundle")
                    .then(()=>{
                        console.log("delete sucess!");
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                //rename
                RNFS.moveFile(DEST+"/main.json",DEST+"/main.jsbundle")
                    .then(()=>{
                        console.log("moveFile sucess!");
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    _get(url,sucessCallback ,failCallback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                sucessCallback(JSON.parse(responseText));
            })
            .catch(function(err){
                failCallback(err);
            })
    }

    _versionCompare() {
        this._get(
            "http://113.106.16.229/vipstyle/mobile/client/gamecenter/version.json",
            function (data) {
                console.log(data['version']);
            },function (err) {
                console.log(err);
            }
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar  backgroundColor='#1c1c24' />}
                    onChangeTab={this.onChangeTab}>
                    {Config.cate.map((tab)=>
                        <ListView tabLabel={tab} baseData={Config.serverData.gameList.data.list}></ListView>
                    )}
                </ScrollableTabView>
                {this.state.show && <Animated.View style={[styles.tipsContainer,{opacity: this.state.fadeAnim}]}>
                    <Text style={styles.tipsText}>有新版本,重启App体验</Text>
                </Animated.View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    tipsContainer:{
        position:"absolute",
        left: Dimensions.get('window').width/2-75,
        bottom:30,
        backgroundColor:'gray',
        width:150,
        height:30,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    tipsText:{
        color:'#fff',
        fontSize:12
    }
});

AppRegistry.registerComponent('hotUpdate', () => hotUpdate);
