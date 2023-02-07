import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import leftAr from './assets/left-arrow.png'
import rightAr from './assets/right-arrow.png'
import bottomAr from './assets/bottom-arrow.png'
import topAr from './assets/toparrow.png'
import JoyStick from './src/JoyStick';
import Connection, {handleSend} from './src/Connection';

function App() {

  useEffect(() => {
    SplashScreen.hide()
  },[])

    return ( 
    <View style={styles.container }>
      <View style={styles.gameContainer }>
          <View style={{marginLeft:20}}>
          <JoyStick></JoyStick>
          </View>
          <View style={{flex:1, justifyContent: 'center', marginBottom:100, alignItems: 'center',marginLeft:40}}>
            <Connection/>
            <Text style={{ marginTop:20, fontSize:24, textAlign:'center', color:'mistyrose'}}>Nhóm 54</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              title="Tiến"
              onPress={()=>{handleSend("3")}}
            >
              <Image source={topAr} style={{width:50, height:50, tintColor:'#fff'}}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                title="Rẽ Phải"
                onPress={()=>{handleSend("2")}}
              >
                <Image source={leftAr} style={{width:50, height:50, margin:30, marginRight:70, tintColor:'#fff'}}/>
              </TouchableOpacity>
              <TouchableOpacity
                title="Rẽ Trái"
                onPress={()=>{handleSend("1")}}
              >
                <Image source={rightAr} style={{width:50, height:50, margin:30, tintColor:'#fff'}}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              title="Lùi"
              onPress={()=>{handleSend("4")}}
            >
              <Image source={bottomAr} style={{width:50, height:50, tintColor:'#fff'}}/>
            </TouchableOpacity>
          </View>
        </View>
    </View> 
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#fff8dc',
    
    },
    gameContainer:{
      justifyContent: 'space-between',
      alignItems:'center',
      flexDirection: 'row',
      backgroundColor:'#002347',
      width:700,
      height:300,
      borderRadius: 10000,
    }
  });