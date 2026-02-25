const freq = {
    a: .08,
    b: .015,
    c: .03,
    d: .04,
    e: .13,
    f: .02,
    g: .015,
    h: .06,
    i: .065,
    j: .005,
    k: .005,
    l: .035,
    m: .03,
    n: .07,
    o: .08,
    p: .02,
    q: .002,
    r: .065,
    s: .06,
    t: .09,
    u: .03,
    v: .01,
    w: .015,
    x: .005,
    y: .02,
    z: .002
}

let sums = {};
let min = 65;
let max = 90;

const getAZ = (char, shift) => {
    let newChar = char.charCodeAt(0) - min - shift;
    if (newChar < 0) {
        newChar = max + newChar;
    } else if (newChar > 25) {
        newChar = min + newChar % 25;
    } else {
        newChar += min;
    }
    return String.fromCharCode(newChar);
}

const shiftFunc = str => {
    for (let i = 0; i <= 25; i++) {
        sums[i] = 0;
        for (let j = 0; j < str.length; j++) {
            if (str[j] === " ") continue;
            let currFreq = str.match(new RegExp(String.raw
                `${str[j]}`
                , "g")).length /
                str.length;
            let prob = freq[getAZ(str[j], i).toLowerCase()];
            sums[i] += currFreq * prob;
        }
    }
}

shiftFunc("TQODQADZTUFUQAQQEBNAXDWDYEYXTUEF");

let maxProb = 0;
let cipherNum = 0;

Object.keys(sums).forEach((elem) => {
    if (sums[elem] > maxProb) {
        maxProb = sums[elem];
        cipherNum = Number(elem);
    }
});

//Just looked at the max value from this
console.log(maxProb, cipherNum);
