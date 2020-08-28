import React from 'react';
import {GameContext} from '../App';
import {BOX_SIZE, STEP_SIZE, KEY_DOWN, KEY_LEFT, KEY_UP, KEY_RIGHT} from '../utils/constants';

export default function Player() {
    const {playerPos,setPlayerPos} = React.useContext(GameContext);
    const handleUserKeyPress = React.useCallback((e) => {
        const {keyCode} = e;
        let change_x = 0;
        let change_y = 0;
        switch(keyCode) {
            case KEY_UP : {
                change_y = -1 * STEP_SIZE;
                break;
            }
            case KEY_DOWN : { 
                change_y = STEP_SIZE;
                break;
            }
            case KEY_LEFT : {
                change_x = -1 * STEP_SIZE;
                break;
            }
            case KEY_RIGHT : {
                change_x = STEP_SIZE;
                break;
            }
        }
        setPlayerPos(prevState => ({
            x : prevState.x + change_x,
            y : prevState.y + change_y
        }));
      }, []);
    React.useEffect(() => {
        window.addEventListener('keyup', handleUserKeyPress);
        return () => {
            window.removeEventListener(handleUserKeyPress);
        };
    },[handleUserKeyPress]);

    return <div style={{position : 'absolute', border : '1px solid black', top : playerPos.y, left : playerPos.x, width : BOX_SIZE, height : BOX_SIZE}} >Player</div>;
}