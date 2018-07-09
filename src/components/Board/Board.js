import React, { Component } from 'react';

import Cell from '../Cell/Cell';

import { genBoard, chainReact } from '../../utils';

import './Board.css';

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameStarted: false,
            selected: [],
            flagged: [],
            game: [],
            mines: [],
            booms: 0,
            cols: 9,
            rows: 9,
            bombs: 10
        }
        this.selectCell = this.selectCell.bind(this);
        this.flagCell = this.flagCell.bind(this);
    }

    startGame(i, cb) {
        let { rows, cols, bombs} = this.state;
        let board = genBoard(cols, rows, bombs ,i);
        let mines = []
        board.forEach((c,i)=>{
            if(c===9){
                mines.push(i)
            }
        })
        this.setState({ game: board, gameStarted: true, mines }, ()=>cb());
    }

    selectCell(i){
        let {gameStarted} = this.state;
        if (!gameStarted){
            this.startGame(i, ()=>this.processSelected(i))
        } else {
            this.processSelected(i)
        }
    }

    processSelected(i){
        let {flagged, game, selected} = this.state;
        if (!flagged.includes(i)){
            if (game[i] === 9){
                this.setState({ booms: this.state.booms + 1 });
                alert('you lose')
            } else if (game[i] === 0 ){
                this.processZero(i);
            } else {
                let temp = selected.slice();
                if (!temp.includes(i)){
                    temp.push(i)
                }
                this.setState({ selected: temp }, ()=>{
                    this.checkGameStatus()
                });
            }
        }
    }

    processZero(i){
        let { game, selected, rows, cols } = this.state;
        let x = chainReact(i, game, rows, cols);
        let out = x.concat(selected).filter((c,i,a)=>!a.slice(i+1).includes(c))
        this.setState({ selected: out });
    }

    flagCell(e,i){
        e.preventDefault();
        let { flagged, selected } = this.state;
        let temp = []
        if(!selected.includes(i)){
            if (flagged.includes(i)){
                temp = flagged.filter(c=>c!==i)
            } else {
                temp = flagged.slice()
                temp.push(i);
            }
            this.setState({ flagged: temp  });
        }
    }

    checkGameStatus(){
        console.log('checking for win')
        let { game, mines, selected} = this.state;
        let b = game.length;
        let m = mines.length;
        let s = selected.length;
        if ( b === (m + s) ){
            alert('you win')
            console.log(mines)
            this.setState({ flagged: mines });
        }
    }

    reset(){
        let reset = {
            gameStarted: false,
            selected: [],
            flagged: [],
            game: [],
            mines: [],
            booms: 0,
        }
        this.setState( reset );
    }
    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        let {selected, flagged, game, mines, booms, rows, cols} = this.state;
        let boardCells = new Array(rows * cols).fill(0).map((c,i)=>
        <Cell
            key={i}
            index={i}
            value={game[i]}
            select={this.selectCell}
            flagCell={this.flagCell}
            sel={selected.includes(i)}
            // sel={true}
            flagged={flagged.includes(i)}
        />)
        return(
            <div className="game-all" >
                <div className="game-info">
                    <p>Mines: {mines.length-flagged.length}/{mines.length}</p>
                    <p>Booms: {booms}</p>
                    <button onClick={()=>this.reset()} >Reset</button>
                </div>
                <div className="game-setup">
                    <div className="input-group" >
                        <label>Rows</label>
                        <input type="number" name="rows" value={this.state.rows} onChange={e=>this.handleInput(e)}/>
                    </div>
                    <div className="input-group" >
                        <label>Columns</label>
                        <input type="number" name="cols" value={this.state.cols} onChange={e=>this.handleInput(e)}/>
                    </div>
                    <div className="input-group" >
                        <label>Mines</label>
                        <input type="number" name="bombs" value={this.state.bombs} onChange={e=>this.handleInput(e)}/>
                    </div>
                </div>
                <div className="board" style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
                    {boardCells}
                </div>
            </div>
        )
    }
}

export default Board;