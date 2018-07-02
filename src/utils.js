export function genBoard(xIn, yIn, m) {
    let area = xIn * yIn;
    let arr = new Array(area).fill(0)
    let mines = m || area/10;
    for (let i = 0; i < Math.ceil(mines); i++){
        let n;
        do {
            n = (~~(Math.random() * area) )
        } while (arr[n] === 9);
        arr[n] = 9;
    }

    for (let a = 0; a < arr.length; a++){
        let {x, y} = indexToCoord(a, xIn);
        let sum = 0
        // console.log(arr[a])
        if (arr[a] !== 9){
            for (let i = -1; i < 2; i++){
                for (let j = -1; j < 2; j++){
                    let c = arr[coordToIndex(x + i, y + j, xIn)]
                    // console.log(c)
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
    // console.log(ind, w)
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
            // console.log(c)
            if ( c !== a && c >= 0){
                out.push(c)
            }
        }
    }
    return out;
}

export function chainReact(i, game, previous) {
    if (!previous){
        previous = [i]
    } else {
        previous.push(i)
    }
    let t = [i]
    t = t.concat(getSurrounding(i, 9, 9));
    let zeros = t.filter(c=>game[c]===0 && !previous.includes(c))
    for (let j = 0; j < zeros.length; j++){
        let res = chainReact(zeros[j], game, previous)
        t = t.concat(res)
    }
    let out = t.filter((c,i)=>!t.slice(i+1).includes(c))
    return out
}


// TODO: make this into a class