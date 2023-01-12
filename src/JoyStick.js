import React, {useEffect, useState, useReducer} from 'react';
import AxisPad from './AxisPad';
import {handleSend, closeSocket} from './Connection'



function JoyStick() {
    
    const [location, setLocation] = useState({x:0,y:0});

    


    useEffect(() =>{ 
        if(location.x> -0.71 && location.x < 0.71 && location.y < -0.71 &&location.y > -1){
            handleSend('3') //tien
        }
        else if(location.x> -0.71 && location.x < 0.71 && location.y >0.71 && location.y <1){
            handleSend('4') //lui
        }
        else if(location.x > 0.71 && location.x <1 && location.y > -0.71 && location.y< 0.71){
            handleSend('1') //rephai
        }
        else if(location.x < -0.71 && location.x >-1 && location.y < 0.71 && location.y> -0.71){
            handleSend('2') //retrai
        }
        else{
            handleSend('0') //stop
        }

    
    },[location]);

    return ( <AxisPad
        size={200}
        handlerSize={70}
        resetOnRelease={true}
        autoCenter={true}
        onValue={({ x, y }) => {
            setLocation({x:x, y:y});
           
        }}>
    </AxisPad> );
}

export default JoyStick;