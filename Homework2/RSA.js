//number with n after is big int which allows us to do calculations larger than Number.MAX_SAFE_INTEGER (9007199254740991).
const e1 = 17n;
const d1 = 53n;
const e2 = 37n;
const d2 = 13n;
const n = 77n;
const m = [1n, 17n, 8n, 6n, 7n, 19n];
const encryptedMessage = [1n, 19n, 57n, 41n, 28n, 24n];

const encrypt = () => {
    console.log(m.map(elem => Number(elem ** e1 % n)));
}

const decrypt = () => {
    console.log(encryptedMessage.map(elem => Number(elem ** d1 % n)));
}

encrypt();
decrypt();
