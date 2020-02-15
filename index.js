const fs = require("fs").promises;

analyzeFile();

async function analyzeFile() {
  let dataChunks = await fs.readFile(process.argv[2]);
  const charsArray = Object.values(dataChunks).map(el =>
    String.fromCharCode(el)
  );

  const numberOfChars = getNumberOfChars(charsArray);
  const numberOfWords = getNumberOfWords(charsArray);
  const filteredString = charsArray.join("").replace(/\n/g, " ");

  const charMap = getCharMap(filteredString);

  writeFile(charMap, numberOfChars, numberOfWords);
}

function getNumberOfChars(arr) {
  return arr.length;
}

function getNumberOfWords(arr) {
  return arr
    .join("")
    .replace(/\n/g, " ")
    .split(" ").length;
}

function getCharMap(str) {
  const charMap = {};

  for (char of str) {
    if (!charMap[char]) {
      charMap[char] = 1;
    } else {
      charMap[char]++;
    }
  }
  return charMap;
}

async function writeFile(charMap, numberOfChars, numberOfWords) {
  const charMapString = JSON.stringify(charMap);
  const charMapStringFormatted = charMapString.replace(/[,{}]/g, "\n");
  const results = `Characters: ${numberOfChars}\nWords: ${numberOfWords}\n\nUse of characters:\n${charMapStringFormatted}`;
  await fs.writeFile("results.txt", results);
}
