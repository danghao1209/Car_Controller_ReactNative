import React, {useEffect, useState, useReducer,useCallback} from 'react';
import AxisPad from './AxisPad';
import {handleSend, closeSocket} from './Connection'



function JoyStick() {
    
    const [location, setLocation] = useState({x:0,y:0});

    const [isFoward,  setISFoward] = useState(false)
    const [isBack, setISBack] = useState(false)
    const [isLeft, setISLeft] = useState(false)
    const [isRight, setISRight] = useState(false)

    const handleSendData = useCallback(({x:x, y:y}) => {
        setLocation({x:x, y:y});
    }, []);


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

    useEffect(() =>{ 
        if(location.x > -0.7071 && location.x < 0.7071 && location.y < -0.71 &&location.y >= -1){
            setISFoward(true) //tien
        }
        else if(location.x > -0.7071 && location.x < 0.7071 && location.y >0.7071 && location.y <= 1){
            setISBack(true) //lui
        }
        else if(location.x > 0.7071 && location.x <= 1 && location.y > -0.7071 && location.y< 0.7071){
            setISRight(true) //rephai
        }
        else if(location.x < -0.7071 && location.x >= -1 && location.y < 0.7071 && location.y> -0.7071){
            setISLeft(true) //retrai
        }
        else{
            console.log(location.x, location.y)
            console.log('stop')
            setISFoward(false)
            setISLeft(false)
            setISBack(false)
            setISRight(false) 
            handleSend("0")
        }
    },[location]);

    return ( <AxisPad
        size={200}
        handlerSize={70}
        resetOnRelease={true}
        autoCenter={true}
        onValue={({ x, y }) => {
            handleSendData({x:x, y:y})
        }}>
    </AxisPad> );
}

export default JoyStick;