import React from 'react';
import {GameContext} from '../App';

export default function ScoreBoard({children}) {
    const {totalWin,lastPos,setLastPos,setPlayerPos} = React.useContext(GameContext);
    const handleUndo = () => {
        let newArr = [...lastPos];
        let lastPlayerPosition = newArr[newArr.length-2];
        setPlayerPos({
            x : lastPlayerPosition.x,
            y : lastPlayerPosition.y
        });
        newArr.pop();
        setLastPos(newArr);
    }
    return <div style={{position : "absolute"}}>
        <b>Total Win : {totalWin}</b>
        <input type="button" onClick={handleUndo} value="Undo"></input>
        </div>;
}