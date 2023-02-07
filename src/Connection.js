import React, {useEffect, useState} from 'react';
import WifiManager from "react-native-wifi-reborn";
import { Text, View, TouchableOpacity, PermissionsAndroid, Alert, ToastAndroid } from 'react-native';

function Connection() {
    const host = "ws:\/\/192.168.4.1/ws";
    const [isConnectSoc, setIsConnectSoc] = useState(false);
    const [wifi, setWifi] = useState('');
    const [sockets, setSocket] = useState()
    const [color,  setColor] = useState('#696969')
    const showAlert = (alert) =>
      Alert.alert(
        'Error',
        alert,
        [
          {
            text: 'Close',
            onPress: () => handleConnect(),
            style: 'cancel',
          },
        ],
        
      );
      const showToast = (mess) => {
        ToastAndroid.show(mess, ToastAndroid.SHORT);
      };
    
    
    const handleConnect = async () =>{
      try {
        const a = await WifiManager.connectToProtectedSSID('Carr','12345678@',true)
            if(a == 'connected'){
              const ws = new WebSocket(host)
              setWifi('Carr')
              setSocket(ws)
              setIsConnectSoc(true)
              setColor('lime')
              showToast('Connect success')
            }
            else{
              //tbao
              showToast('Connect fail!')
              setIsConnectSoc(false)
              setColor('#696969')
            }
      }catch{

      }
    }

    const closeSocket = () =>{
      try{
        if(isConnectSoc){
          sockets.close();
          setSocket()
          setIsConnectSoc(false)
          setColor('#696969')
          showToast('Disconnected!')
        }
      }catch(err){
        console.log(err)
      }
    }
    
    function handleSend(data){
    
      try {
        sockets.send(data);
        sockets.send('0');
      } catch (error) {
        
      }
       
    };
    const onConnect = () =>{
      async function connect(){
        try{
          const b = await WifiManager.getCurrentWifiSSID()
          setWifi(b)
          if(wifi == 'Carr'){
            if(!isConnectSoc){
              const ws = new WebSocket(host)
              setSocket(ws)
              setIsConnectSoc(true)
              setColor('lime')
              showToast('Connect success')
            }
            else{
              //tb da ket noi
              showToast('Connected!')
            }
          }
          else{
            handleConnect()
          }
        }catch(err){
          console.log(err)
          showAlert('Please Turn On The Car')
        }
      }
      connect()
    }
    
    module.exports.handleSend = handleSend
    module.exports.closeSocket = closeSocket



    useEffect(() =>{
      async function ax(){
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Allow to use Wifi',
              message:
                'Ứng dụng này cần quyền vị trí vì điều này là cần thiết  ' +
                'để quét các mạng wifi.',
              buttonNegative: 'Cho Phép',
              buttonPositive: 'Từ Chối',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
              const b = await WifiManager.getCurrentWifiSSID()
              setWifi(b)
              if(wifi == 'Carr'){
                //thong bao
                const ws = new WebSocket(host)
                setSocket(ws)
                setIsConnectSoc(true)
                setColor('lime')
                showToast('Connect success')
              }
              else{
                handleConnect()
              }
            } 
            catch (error) {
              showToast('Connect fail!')
            }
          } 
          else {
            showAlert('Permission denied')
            // Permission denied
            //thognbao
          }
        }
        catch(err){
          
        }
      }
      ax()
      
    },[]);


    return ( <View style={{ justifyContent: 'center',alignItems: 'center'}} >
        <View style={{width:12 , height: 12, borderRadius:1000, backgroundColor: color, marginBottom: 12}}></View>
        <TouchableOpacity
          style={{backgroundColor: '#F18805',padding:10, borderRadius:10,marginBottom:10, padding:10 }}
          onPress={onConnect}
        >
          <Text style={{color: '#fff', textAlign:'center'}}>Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{backgroundColor: '#8b0000',padding:10, borderRadius:10 }}
          onPress={closeSocket}
        >
          <Text style={{color: '#fff', textAlign:'center', }}>Disconnect</Text>
        </TouchableOpacity>
        
      </View> );
}

export default Connection;