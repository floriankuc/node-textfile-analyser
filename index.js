const fs = require("fs").promises;

const analyzeFile = async () => {
  let dataChunks = await fs.readFile(process.argv[2]);
  const charsArray = Object.values(dataChunks).map(el =>
    String.fromCharCode(el)
  );

  const numberOfChars = getNumberOfChars(charsArray);
  const numberOfWords = getNumberOfWords(charsArray);
  const charMap = getCharMap(charsArray);

  writeFile(charMap, numberOfChars, numberOfWords);
};

const getNumberOfChars = arr => arr.length;

const getNumberOfWords = arr =>
  arr
    .join("")
    .replace(/\n/g, " ")
    .split(" ").length;

const getCharMap = str => {
  const filteredString = str.join("").replace(/\n/g, " ");
  const charMap = {};
  for (char of filteredString) {
    !charMap[char] ? (charMap[char] = 1) : charMap[char]++;
  }
  return charMap;
};

const writeFile = async (charMap, numberOfChars, numberOfWords) => {
  const charMapString = JSON.stringify(charMap);
  const charMapStringFormatted = charMapString.replace(/[,{}]/g, "\n");
  const results = `Characters: ${numberOfChars}\nWords: ${numberOfWords}\n\nUse of characters:${charMapStringFormatted}`;
  await fs.writeFile("results.txt", results);
};

analyzeFile();
