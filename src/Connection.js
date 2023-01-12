import React, {useEffect, useState} from 'react';
import WifiManager from "react-native-wifi-reborn";
import { Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native';




function Connection() {
    const host = "ws:\/\/192.168.4.1/ws";
    const [isConnectSoc, setIsConnectSoc] = useState(false);
    const [wifi, setWifi] = useState('');
    const [sockets, setSocket] = useState()
    const [color,  setColor] = useState('#696969')
    useEffect(() =>{
        async function ax(){
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
                setColor('green')
              }
              else{
                const a = await WifiManager.connectToProtectedSSID('Carr','12345678@',true)
                console.log(a)

                if(a == 'connected'){
                  const ws = new WebSocket(host)
                  setWifi('Carr')
                  setSocket(ws)
                  setIsConnectSoc(true)
                  setColor('green')
                }
                else{
                  //tbao
                  setIsConnectSoc(false)
                  setColor('#696969')
                }
              }
            } 
            catch (error) {
              console.log(error)
            }
          } 
          else {
            // Permission denied
            //thognbao
          }
        }
        ax()
        
        return(
          closeSocket
          )
    },[]);
    
    const closeSocket = () =>{
      try{
        if(isConnectSoc){
          sockets.close();
          setSocket()
          setIsConnectSoc(false)
          setColor('#696969')
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
      try{
        async function connect(){
          const b = await WifiManager.getCurrentWifiSSID()
          setWifi(b)
          if(wifi == 'Carr'){
            if(!isConnectSoc){
              const ws = new WebSocket(host)
              setSocket(ws)
              setIsConnectSoc(true)
              setColor('green')
            }
            else{
              //tb da ket noi
            }
          }
          else{
            const a = await WifiManager.connectToProtectedSSID('Carr','12345678@',true)
            if(a == 'connected'){
              const ws = new WebSocket(host)
              setWifi('Carr')
              setSocket(ws)
              setIsConnectSoc(true)
              setColor('green')
            }
            else{
              //tbao
              setIsConnectSoc(false)
              setColor('#696969')
            }
          
        }
        }
        connect()
      }
      catch(err){

      }
    }
    // const onConnect = ()=>{
        
    //     if(isConnectWf != 'Carr'){
    //       WifiManager.connectToProtectedSSID('Carr','12345678@',false)
    //       .then(()=>{
    //         setIsConnectWf('Carr')
    //         console.log('success')
    //       })
    //       .catch(()=>{
    //         console.log('error')
    //       })
    //     }
    //     if(isConnectSoc){
    //       setSocket(new WebSocket(host))
    //     }
        
    // }
    module.exports.handleSend = handleSend
    module.exports.closeSocket = closeSocket
    return ( <View style={{ justifyContent: 'center',alignItems: 'center'}} >
        <View style={{width:10 , height: 10, borderRadius:1000, backgroundColor: color, marginBottom: 10}}></View>
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