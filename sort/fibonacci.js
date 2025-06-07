const fibs = (n) => {
    let n1= 0;
    let n2 = 1;
    let sum;
    let seq = [0, 1];
    if (n1 === 1){
        return n1;
    }else if (n2 === 2) {
        return n2;
    } else {
        for(let i = 2; i < n; i++){
            sum = n1 + n2;
            seq.push(sum);
            n1 = n2;
            n2 = sum;
        }
        return seq;
    }
}

console.log(fibs(5));
console.log(fibs(10));

const fibsRec = (m, arr) => {
    let ssum;
    if (m <= 1 ) {
        return m;
    }

    if (arr[m] !== undefined) {
        return arr[m];
    }

    ssum = fibsRec(m - 1, arr) + fibsRec(m - 2, arr)
    arr[m] = ssum;

    return arr[m];
}

const fibResc = (m) => {
    let arr = [0, 1]
    for (let i = 2; i <= m; i++) {
        fibsRec(i ,arr);
    }
    return arr.slice(0, m)
}

console.log(fibResc(5));
console.log(fibResc(10));