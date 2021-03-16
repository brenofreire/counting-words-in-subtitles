const fs = require('fs')
const path = require('path')

function readDir(pathFile) {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(pathFile)
            const completeFileDir = files.map(file => `${pathFile}/${file}`)

            resolve(completeFileDir)
        } catch (error) {
            reject(error)
        }
    })
}

function filterOnlyOneTypeOfFile(typeSelected) {
    return function (arrayOfFiles) {
        try {
            const onlyTypeSelected = fileName => fileName.endsWith(typeSelected)
            const filteredFiles = arrayOfFiles.filter(onlyTypeSelected)

            return filteredFiles
        } catch (error) {
            throw error
        }
    }
}

function myReadFile(path) {
    return new Promise((resolve, reject) => {
        try {
            const file = fs.readFileSync(path, { encoding: 'utf-8' })

            resolve(file.toString())
        } catch (error) {
            reject(error)
        }
    })
}

function readPaths(paths) {
    return Promise.all(paths.map(path => myReadFile(path)))
}

function removeUnecessaryLines(lines) {
    const symboslsToRemoveRegex = /\.|\?|\-|\,|\"|\♪|\_|<i>|<\/i>|\!|\r|\[|\]|\(|\)|[0-9]|\<|\>|\:/g
    const htmlRegex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g

    const removeSymbols = line => line.replace(symboslsToRemoveRegex, '')
    const removeHtml = line => line.replace(htmlRegex, '')
    const replaceBreakrowToSpace = line => line.split('\n').join(' ')

    return lines.map(line => {
        let newText = line

        newText = removeHtml(newText)
        newText = removeSymbols(newText)
        newText = replaceBreakrowToSpace(newText)

        return newText
    })
}

function mergeLines (lines) {
    return lines.join(' ').replace(/\s{1,}/g, ' ').split(' ').filter(Boolean)
}

module.exports = {
    readDir,
    filterOnlyOneTypeOfFile,
    myReadFile,
    readPaths,
    removeUnecessaryLines,
    mergeLines,
}