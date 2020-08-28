import React from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import Goal from './components/Goal';
import Player from './components/Player';
import {getFromLocalStorage,setLocalStorage} from './utils/storage';
import {generateRandomNumber} from './utils/randomNumber';
import {BOX_SIZE} from './utils/constants';
import './App.css';

export const GameContext = React.createContext();

export default function Board() {
  return <GameProvider>
            <GameBoard>
              <Player />
              <Goal />
            </GameBoard> 
            <ScoreBoard />
         </GameProvider>;
}
function updatedPosArray(posArr,x,y) {
  posArr.length === 5 && posArr.shift();
  posArr.push({x, y});
  return posArr;
}
function GameProvider({children}) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const [totalWin,setTotalWin] = React.useState(0);
  const [lastPos,setLastPos] = React.useState([]);
  const [playerPos, setPlayerPos] = React.useState({ 
    x : getFromLocalStorage('player_x') || 10,
    y : getFromLocalStorage('player_y') || 10
  });
  const [goalPos, setGoalPos] = React.useState({ 
    x : getFromLocalStorage('goal_x') || generateRandomNumber(0,windowWidth - BOX_SIZE),
    y : getFromLocalStorage('goal_y') || generateRandomNumber(0,windowHeight/2 - BOX_SIZE)
  });
  React.useEffect(() => {
    if(playerPos.x == goalPos.x && playerPos.y == goalPos.y) {
      setGoalPos({
        x : generateRandomNumber(0,windowWidth - BOX_SIZE),
        y : generateRandomNumber(0,windowHeight/2 - BOX_SIZE)
      });
      setLocalStorage('totalWin',totalWin+1);
      setTotalWin(totalWin+1);
    }
    setLocalStorage('player_x',playerPos.x);
    setLocalStorage('player_y',playerPos.y);
    setLocalStorage('goal_x',goalPos.x);
    setLocalStorage('goal_y',goalPos.y);
    setLastPos(updatedPosArray([...lastPos],playerPos.x,playerPos.y));
  },[playerPos,goalPos]);
  const value = {
    playerPos,
    setPlayerPos,
    goalPos,
    setGoalPos,
    totalWin,
    lastPos,
    setLastPos
  }
  return <GameContext.Provider value={value}>
    {children}
  </GameContext.Provider>
}
