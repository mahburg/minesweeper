Array.prototype.shuffle = function(){
    let i = 0, j = 0, temp = null;
    for (i = this.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

export function genBoard(xIn, yIn, m, start) {
    let area = xIn * yIn;
    let arr = new Array(area).fill(0)
    let mines = m || Math.ceil(area/10);
    let mineList = []
    let indexes = arr.map((c,i)=>i).shuffle();
    for (let i = 0; i < mines; i++){
        mineList.push(indexes.pop())
    }

    mineList.forEach(m => arr[m] = 9);

    if (arr[start] === 9){
        let safe = [];
        arr.forEach((c,i)=>{
            if (c !== 9){
                safe.push(i)
            }
        })
        let rand = (~~(Math.random() * safe.length) + 0)
        let newIndex = safe[rand]
        arr[newIndex] = 9
        arr[start] = 0
    }

    for (let a = 0; a < arr.length; a++){
        let {x, y} = indexToCoord(a, xIn);
        let sum = 0
        if (arr[a] !== 9){
            for (let i = -1; i < 2; i++){
                for (let j = -1; j < 2; j++){
                    let c = arr[coordToIndex(x + i, y + j, xIn)]
                    if ( c === 9){
                        sum++;
                    }
                }
            }
            arr[a] = sum;
        }
    }
    return arr;
}

export function indexToCoord(ind, w) {
    let i = ind + 1;
    let col = i % w || w;
    let row = Math.ceil(i / w);
    return {
        x: col,
        y: row
    };
}

export function coordToIndex(col, row, w, h) {
    if (col < 1 || col > w || row < 1 || row > h) {
        return -1;
    }
    return ((row - 1) * w) + col - 1;
}

export function getSurrounding(a, w, h) {
    let {x, y} = indexToCoord(a, w);
    let out = [];
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            let c = coordToIndex(x + i, y + j, w, h)
            if ( c !== a && c >= 0){
                out.push(c)
            }
        }
    }
    return out;
}

// recursive chain reaction for selecting all zero adjacent cells
export function chainReact(i, game, rows, cols, previous) {
    // console.log(typeof previous, previous)
    if (!previous){
        previous = []
    }
    previous.push(i)
    let t = [i]
    t = t.concat(getSurrounding(i, cols, rows));
    let zeros = t.filter(c=>game[c]===0 && !previous.includes(c))
    for (let j = 0; j < zeros.length; j++){
        let res = chainReact(zeros[j], game, rows, cols, previous)
        t = t.concat(res)
    }
    let out = t.filter((c,i)=>!t.slice(i+1).includes(c))
    return out
}

// TODO: make this into a class