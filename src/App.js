import React from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import ActionBoard from './components/ActionBoard';
import {getFromLocalStorage,setLocalStorage} from './utils/storage';
import {generateRandomNumber} from './utils/randomNumber';
import {BOX_SIZE, INIT_POS, BOARD_WIDTH, BOARD_HEIGHT} from './utils/constants';
import './App.css';

 export const GameContext = React.createContext();

export default function Game() {
  /**
   * GameBoard : The board area eith player and goal
   * ActionBoard : The action buttons such as undo
   * ScoreBoard : Displays the Score
   */
  return <GameProvider>
            <GameBoard />
            <ActionBoard />
            <ScoreBoard />
         </GameProvider>;
}

function GameProvider({children}) {
  const initPosition = JSON.parse(getFromLocalStorage('position'));
  /**
   * Setting the initial state of player, 
   * if the init position exists in local storage we take it from there
   */
  const [playerPos, setPlayerPos] = React.useState({ 
    x : initPosition?.playerPos.x || INIT_POS,
    y : initPosition?.playerPos.y || INIT_POS
  });
   /**
   * Setting the initial state of goal as some random value which is 
   * in between player init pos and Board dimension, 
   * + BOX_SIZE is done to not ever make player and goal position equal for the first time
   * if the init position existes in local storage we take it from there
   */
  const [goalPos, setGoalPos] = React.useState({ 
    x : initPosition?.goalPos.x || generateRandomNumber(INIT_POS + BOX_SIZE, BOARD_WIDTH - BOX_SIZE),
    y : initPosition?.goalPos.y || generateRandomNumber(INIT_POS + BOX_SIZE, BOARD_HEIGHT - BOX_SIZE)
  });
  /**
   * total win set as 0 or taken from local storage initially
   */
  const [win,setWin] = React.useState(Number(getFromLocalStorage('win')) || 0);
  /**
   * We need to store last five position state of player,
   * 
   * We are not storing the last state in local storage as I think it doesn't make much sense
   * to let users undo in case they are loading the game after very long time, they would already have
   * forgotten thier last move
   */
  const [prevState,setPrevState] = React.useState([{...playerPos}]);
  /**
   * We need to set new local storage values, everytime player postion or goal position changes
   * Also, need to generate a new random value for goal if player wins and increase win count
   */
  React.useEffect(() => {
    if(playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
      setGoalPos({
        x : generateRandomNumber(0,BOARD_WIDTH - BOX_SIZE),
        y : generateRandomNumber(0,BOARD_HEIGHT - BOX_SIZE)
      });
      setWin(win+1);
    }
    setLocalStorage('position', JSON.stringify({playerPos,goalPos}));
    setLocalStorage('win',win);
  },[playerPos,goalPos,win]);

  //Values to be passed to consumers
  const value = {
    playerPos,
    setPlayerPos,
    goalPos,
    setGoalPos,
    win,
    prevState,
    setPrevState
  }
  return <GameContext.Provider value={value}>
    {children}
  </GameContext.Provider>
}

