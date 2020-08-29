import React from 'react';
import {GameContext} from '../App';
import styled from 'styled-components';

const Div = styled.div`
    margin : 10px;
`;
export default function ScoreBoard() {
    const {win} = React.useContext(GameContext);
    return <Div><b>Wins : {win}</b></Div>;
}