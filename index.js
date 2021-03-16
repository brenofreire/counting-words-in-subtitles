const fn = require('./functions')
const pathFile = __dirname + '/the-office-s05-subtitles'

function groupByWords(arrayWords) {
    return Object.values(arrayWords.reduce((counter, word) => {
        const wordLower = word.toLowerCase()

        counter[wordLower] = {
            word: wordLower,
            qty: counter[wordLower] ? counter[wordLower].qty + 1 : 1
        }

        return counter
    }, {}))
}

function orderByOftenUsed(arrayWords) {
    return arrayWords.sort((prev, act) => act.qty - prev.qty)
        .map((obj, i) => ({ ...obj, position: i + 1 }))
}

fn.readDir(pathFile)
    .then(fn.filterOnlyOneTypeOfFile('.srt'))
    .then(fn.readPaths)
    .then(fn.removeUnecessaryLines)
    .then(fn.mergeLines)
    .then(groupByWords)
    .then(orderByOftenUsed)
    .then(console.log)
    .catch(console.log)
