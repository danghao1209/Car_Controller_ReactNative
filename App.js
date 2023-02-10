import React, { useEffect, useState  } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import leftAr from './assets/left-arrow.png'
import rightAr from './assets/right-arrow.png'
import bottomAr from './assets/bottom-arrow.png'
import topAr from './assets/toparrow.png'
import JoyStick from './src/JoyStick';
import Connection, {handleSend} from './src/Connection';

function App() {
  const [isFoward,  setISFoward] = useState(false)
  const [isBack, setISBack] = useState(false)
  const [isLeft, setISLeft] = useState(false)
  const [isRight, setISRight] = useState(false)

  useEffect(() => {
    SplashScreen.hide()
  },[])

  useEffect(() => {
    let intervalId;
    if (isFoward) {
      intervalId = setInterval(() => {
        handleSend("3")
        console.log('tiến 1')
      }, 50);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isFoward]);

  useEffect(() => {
    let intervalId;
    if (isBack) {
      intervalId = setInterval(() => {
        handleSend("4")
        console.log('Lui')
      }, 50);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isBack]);

  useEffect(() => {
    let intervalId;
    if (isLeft) {
      intervalId = setInterval(() => {
        handleSend("1")
        console.log('reTrai')
      }, 50);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isLeft]);


  useEffect(() => {
    let intervalId;
    if (isRight) {
      intervalId = setInterval(() => {
        handleSend("2")
        console.log('rePhai')
      }, 10);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRight]);




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
              //onPressIn={()=>{handleSend("3")}}
              onPressIn={()=>{setISFoward(true)}}
              onPressOut={()=>{
                setISFoward(false)
                handleSend("0")
              }}
            >
              <Image source={topAr} style={{width:50, height:50, tintColor:'#fff'}}/>
            </TouchableOpacity>

            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                title="Rẽ Phải"
                //onPressIn={()=>{handleSend("2")}}
                onPressIn={()=>{setISRight(true)}}
                onPressOut={()=>{
                  setISRight(false)
                  handleSend("0")
                }}
              >
                <Image source={leftAr} style={{width:50, height:50, margin:30, marginRight:70, tintColor:'#fff'}}/>
              </TouchableOpacity>

              <TouchableOpacity
                title="Rẽ Trái"
                //onPressIn={()=>{handleSend("1")}}
                onPressIn={()=>{setISLeft(true)}}
                onPressOut={()=>{
                  setISLeft(false)
                  handleSend("0")
                }}
              >
                <Image source={rightAr} style={{width:50, height:50, margin:30, tintColor:'#fff'}}/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              title="Lùi"
              //onPressIn={()=>{handleSend("4")}}
              onPressIn={()=>{setISBack(true)}}
              onPressOut={()=>{
                setISBack(false)
                handleSend("0")
              }}
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