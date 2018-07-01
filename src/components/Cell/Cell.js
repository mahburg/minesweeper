import React, {Component} from 'react';

import './Cell.css';

import tile from '../../imgs/tile.svg';
import flag from '../../imgs/flag.svg';
import mine from '../../imgs/mine.svg';

class Cell extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }

    flipSel(){
        console.log('flipping')
        this.setState({ selected: !this.state.selected });
    }

    render(){
        let { selected } = this.state;
        let { val, sel } = this.props;
        let dispImg = tile;
        switch (val){
            case 'flag':
                dispImg = flag;
                break;
            case 'mine':
                dispImg = mine;
                break;
        }
        return(
            <div className={selected ? "sel-cell cell":'cell'} onClick={e=>this.flipSel()}>
                {
                    val
                    ?
                    <img src={dispImg} alt=""/>
                    :
                    null
                }
            </div>
        )
    }
}

export default Cell;