const argsToOptsKey = (arg) => {
    let key = '';
    const argArr = arg.split('');
    argArr.forEach((letter, index) => {
        let prevLetter = argArr[index - 1];
        if (letter === '-') {
            return;
        }
        if (prevLetter === '-') {
            key += letter.toUpperCase();
        } else {
            key += letter;
        }

    });
    return key;
}

module.exports = argsToOptsKey;