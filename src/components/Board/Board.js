import React, { Component } from 'react';

import Cell from '../Cell/Cell';

import './Board.css';

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            cells: []
        }
    }
    render(){
        let boardCells = Array(81).fill(0).map((c,i)=><Cell val={(~~(Math.random() * 2))?'flag':null} />)
        return(
            <div className="board" >
                {boardCells}
            </div>
        )
    }
}

export default Board;