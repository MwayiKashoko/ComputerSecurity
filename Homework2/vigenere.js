let string = "TTEUM GQNDV EOIOL EDIRE MQTGS DAFDR CDYOX IZGZP PTAAI TUCSI XFBXY SUNFE SQRHI SAFHR TQRVS VQNBE EEAQG IBHDV SNARI DANSL EXESX EDSNJ AWEXA ODDHX EYPKS YEAES RYOET OXYZP PTAAI TUCRY BETHX UFINR";
string = string.replaceAll(" ", "");
let phrase = "";
let phrases = [];
let realPhrases = [];

const makePhrase = (repeat, shift) => {
    phrase = "";
    for (let i = 0; i < string.length; i++) {
        if ((i + (5 - shift)) % repeat == 0) {
            phrase += string[i];
        }
    }

    phrases.push(phrase);

    //console.log(phrase);
}

let count = 0;

const ioc = () => {
    let chars = phrase.split("");
    chars = Array.from(new Set(chars));

    const denom = ((phrase.length - 1) * phrase.length);
    let num = 0;

    for (let i = 0; i < chars.length; i++) {
        let n = (phrase.match(new RegExp(String.raw`${chars[i]}`, "g")) || []).length;
        num += n * (n - 1);
    }

    console.log(`IOC ${count + 1}: ${num / denom}`);
}

const findLetterFrequencies = () => {
    let freqString = "";

    for (let i = 0; i < 26; i++) {
        let char = String.fromCharCode("A".charCodeAt(0) + i);
        freqString += (phrase.match(new RegExp(String.raw`${char}`, "g")) || []).length.toString();
    }

    console.log(`LetterFreq: ${count + 1}: ${freqString}`)
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

const combinePhrases = () => {
    for (let i = 0; i < phrases.length; i++) {
        for (let j = 0; j < phrases[i].length; j++) {
            let shift = 0;

            if (i === 0) {
                shift = 0; //A
            } else if (i === 1) {
                shift = 12; //M
            } else if (i == 2) {
                shift = 0; //A
            } else if (i === 3) {
                shift = -1; //Z
            } else if (i === 4) {
                shift = 4; //E
            }

            let charCode = phrases[i].charCodeAt(j) - 65;
            let newCharCode = (charCode - shift + 26) % 26 + 65;

            phrases[i] = phrases[i].replaceAt(j, String.fromCharCode(newCharCode));

            if (!realPhrases[i]) {
                realPhrases[i] = String.fromCharCode(newCharCode)
            } else {
                realPhrases[i] += String.fromCharCode(newCharCode);
            }
        }
    }

    let newStr = "";

    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < realPhrases.length; j++) {
            if (i < realPhrases[j].length) {
                newStr += realPhrases[j][i];
            }
        }
    }

    console.log(newStr);
}

let repeatAmount = 5;

console.log("               ABCDEFGHIJKLMNOPQRSTUVWXYZ");

for (let i = 0; i < repeatAmount; i++) {
    count = i;
    makePhrase(repeatAmount, i);
    findLetterFrequencies();
    ioc();
    //1. 1-2
    //2. 1-2
    //3. 5-10
    //4. 1-2
    //5. 1-2
}

combinePhrases();

//Expected IC = 2

const decrypt = () => {
    let newString = "";
    let j = 0;

    for (let i = 0; i < string.length; i++) {
        let actualCharNum = (string[i].charCodeAt(0) + key[j].charCodeAt(0)) % 26;
        actualCharNum += "A".charCodeAt(0);

        newString += String.fromCharCode(actualCharNum);

        j++;

        if (j >= key.length) {
            j = 0;
        }
    }

    console.log(newString);
}

//decrypt();