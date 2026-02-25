const cipherText = "1100101011101101101000100110010101011111101101110011100001110011";
const key = "0100110001001111010101100100010101000011010100110100111001000100";

//const k = "0001001100110100010101110111100110011011101111001101111111110001";
//const m = "0000000100100011010001010110011110001001101010111100110111101111";

const pc1 = [
    [57, 49, 41, 33, 25, 17, 9],
    [1, 58, 50, 42, 34, 26, 18],
    [10, 2, 59, 51, 43, 35, 27],
    [19, 11, 3, 60, 52, 44, 36],
    [63, 55, 47, 39, 31, 23, 15],
    [7, 62, 54, 46, 38, 30, 22],
    [14, 6, 61, 53, 45, 37, 29],
    [21, 13, 5, 28, 20, 12, 4]
];

const pc2 = [
    [14, 17, 11, 24, 1, 5],
    [3, 28, 15, 6, 21, 10],
    [23, 19, 12, 4, 26, 8],
    [16, 7, 27, 20, 13, 2],
    [41, 52, 31, 37, 47, 55],
    [30, 40, 51, 45, 33, 48],
    [44, 49, 39, 56, 34, 53],
    [46, 42, 50, 36, 29, 32]
];

const IP = [
    [58, 50, 42, 34, 26, 18, 10, 2],
    [60, 52, 44, 36, 28, 20, 12, 4],
    [62, 54, 46, 38, 30, 22, 14, 6],
    [64, 56, 48, 40, 32, 24, 16, 8],
    [57, 49, 41, 33, 25, 17, 9, 1],
    [59, 51, 43, 35, 27, 19, 11, 3],
    [61, 53, 45, 37, 29, 21, 13, 5],
    [63, 55, 47, 39, 31, 23, 15, 7]
];

const IPInverse = [
    [40, 8, 48, 16, 56, 24, 64, 32],
    [39, 7, 47, 15, 55, 23, 63, 31],
    [38, 6, 46, 14, 54, 22, 62, 30],
    [37, 5, 45, 13, 53, 21, 61, 29],
    [36, 4, 44, 12, 52, 20, 60, 28],
    [35, 3, 43, 11, 51, 19, 59, 27],
    [34, 2, 42, 10, 50, 18, 58, 26],
    [33, 1, 41, 9, 49, 17, 57, 25]
];

const SBoxes = [
    [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],

    [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],

    [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],

    [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ],

    [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],

    [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],

    [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],

    [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
];

const E = [
    [32, 1, 2, 3, 4, 5],
    [4, 5, 6, 7, 8, 9],
    [8, 9, 10, 11, 12, 13],
    [12, 13, 14, 15, 16, 17],
    [16, 17, 18, 19, 20, 21],
    [20, 21, 22, 23, 24, 25],
    [24, 25, 26, 27, 28, 29],
    [28, 29, 30, 31, 32, 1]
];

const P = [
    [16, 7, 20, 21, 29, 12, 28, 17],
    [1, 15, 23, 26, 5, 18, 31, 10],
    [2, 8, 24, 14, 32, 27, 3, 9],
    [19, 13, 30, 6, 22, 11, 4, 25]
]

const leftShiftStep1 = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 1,
    10: 2,
    11: 2,
    12: 2,
    13: 2,
    14: 2,
    15: 2,
    16: 1
};

const rotateStringLeft = (str) => {
    let lastCharacter = str[0];
    let firstPart = str.substring(1);
    return firstPart + lastCharacter;
}

const step1 = (string) => {
    let newString = "";

    pc1.forEach(row => row.forEach(val => newString += string[val - 1]));

    let middle = newString.length / 2
    let leftHalves = [newString.substring(0, middle)];
    let rightHalves = [newString.substring(middle)];

    for (let i = 1; i < 17; i++) {
        leftHalves.push(leftShiftStep1[i] === 1 ? rotateStringLeft(leftHalves[i - 1]) : rotateStringLeft(rotateStringLeft(leftHalves[i - 1])));
        rightHalves.push(leftShiftStep1[i] === 1 ? rotateStringLeft(rightHalves[i - 1]) : rotateStringLeft(rotateStringLeft(rightHalves[i - 1])));
    }

    let concatenations = [];

    for (let i = 1; i < leftHalves.length; i++) {
        concatenations.push(leftHalves[i] + rightHalves[i]);
    }

    let keys = [];

    for (let i = 0; i < concatenations.length; i++) {
        keys.push("");
        pc2.forEach(row => row.forEach(val => keys[i] += concatenations[i][val - 1]));
    }

    return keys;
}

const step2 = (string, keys, decrypt = false) => {
    if (decrypt) {
        keys.reverse();
    }

    let ipString = "";

    IP.forEach(row => row.forEach(val => ipString += string[val - 1]));

    let middle = ipString.length / 2
    let leftHalves = [ipString.substring(0, middle)];
    let rightHalves = [ipString.substring(middle)];

    for (let i = 0; i < 16; i++) {
        leftHalves.push(rightHalves[i]);

        let newR = "";
        E.forEach(row => row.forEach(val => newR += rightHalves[i][val - 1]));

        //^ only works on 32 bit ints in js so need to convert to BigInt
        //let f = (parseInt(newR, 2) ^ parseInt(keys[i], 2)).toString(2);
        let f = (BigInt(parseInt(newR, 2)) ^ BigInt(parseInt(keys[i], 2))).toString(2).padStart(48, "0");
        let s = "";

        for (let j = 0; j < SBoxes.length; j++) {
            let startIndex = 6 * j;

            let row = f[startIndex] + f[startIndex + 5];
            let col = f.substring(startIndex + 1, startIndex + 5);
            s += SBoxes[j][parseInt(row, 2)][parseInt(col, 2)].toString(2).padStart(4, "0");
        }

        let finalF = "";

        P.forEach(row => row.forEach(val => finalF += s[val - 1]));

        rightHalves.push((BigInt(parseInt(leftHalves[i], 2)) ^ BigInt(parseInt(finalF, 2))).toString(2).padStart(32, "0"));
    }

    let reverse16 = rightHalves[16] + leftHalves[16];
    let permutateReverse16 = "";

    IPInverse.forEach(row => row.forEach(val => permutateReverse16 += reverse16[val - 1]));

    return permutateReverse16;
}

const convertBinaryToAscii = (str) => {
    let text = "";

    for (let i = 0; i < str.length / 8; i++) {
        text += String.fromCharCode(parseInt(str.substring(i * 8, i * 8 + 8), 2));
    }

    return text;
}

const DES = (string, decrypt = false) => {
    let text = step2(cipherText, step1(string), decrypt);

    return convertBinaryToAscii(text);
}

let encrypted = DES(key, true);

console.log(encrypted);