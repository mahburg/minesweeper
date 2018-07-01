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
        if (arr[a] !== 9){
            for (let i = -1; i < 2; i++){
                for (let j = -1; j < 2; j++){
                    let c = arr[coordToIndex(x + i, y + j, xIn)]
                    console.log(c)
                    if ( c === 9){
                        sum++;
                    }
                }
            }
        }
        arr[a] = sum;
    }
    return arr;
}

let x = genBoard(9,9,10)

console.log(x.slice( 0, 9))
console.log(x.slice( 9,18))
console.log(x.slice(18,27))
console.log(x.slice(27,36))
console.log(x.slice(36,45))
console.log(x.slice(45,54))
console.log(x.slice(54,63))
console.log(x.slice(63,72))
console.log(x.slice(72,81))

export function indexToCoord(ind, w) {
    console.log(ind, w)
    let i = ind + 1;
    let col = i % w || w;
    let row = Math.ceil(i / w);
    return {
        x: col,
        y: row
    };
}

export function coordToIndex(col, row, w) {
    if (col < 1 || col > w || row < 1 || row > w) {
        return -1;
    }
    return ((row - 1) * w) + col - 1;
}