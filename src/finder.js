var iconv = require("iconv-lite");

// Hacky way to load in encodings
iconv.encodingExists("ascii");

finder = module.exports;

finder.encodings = {};

function traverseEncodings(enc) {
  if (typeof iconv.encodings[enc] === "string") {
    return traverseEncodings(iconv.encodings[enc]);
  } else {
    return enc;
  }
}

for (enc in iconv.encodings) {
  if (typeof iconv.encodings[enc] !== "string") {
    finder.encodings[enc] = [];
  }
}

for (enc in iconv.encodings) {
  finder.encodings[traverseEncodings(enc)].push(enc);
}

for (enc in finder.encodings) {
  finder.encodings[traverseEncodings(enc)].push(enc);
}

for (enc of Object.keys(finder.encodings)) {
  if (!iconv.encodingExists(enc)) {
    delete finder.encodings[enc];
  }
}

finder.identifyWrongEncoding = (stringPairs) => {
  possibleEncodings = [];

  for (enc0 in finder.encodings) {
    loop1: for (enc1 in finder.encodings) {
      for (pair of stringPairs) {
        if (
          iconv.decode(iconv.encode(pair.current, enc0), enc1) !== pair.correct
        ) {
          continue loop1;
        }
      }

      possibleEncodings.push({ current: enc0, correct: enc1 });
    }
  }

  return possibleEncodings;
};
