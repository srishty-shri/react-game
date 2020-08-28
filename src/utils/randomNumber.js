import {STEP_SIZE} from './constants';

export function generateRandomNumber(min, max) {  
    return Math.floor((Math.random() * (max - min) + min)/STEP_SIZE) * STEP_SIZE;
}  