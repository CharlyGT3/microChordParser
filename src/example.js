import {
  chordParser,
  textParser,
  htmlParser,
  sustainTransposer,
  bemolTransposer
} from "./microChordParser.js"

// ? ejemplo de uso

var songs =
`Bb
Who breaks the power of sin and darkness
Eb
Whose love is mighty and so much stronger
Gm                     F               Eb
The king of glory, the king above all kings`


// * test de la función sustainTransposer con textParser

console.log(textParser(sustainTransposer(chordParser(songs), 1)))

// * test de la función bemolTransposer con textParser

console.log(textParser(bemolTransposer(chordParser(songs), 1)))

// * test de la función sustainTransposer con htmlParser

console.log(htmlParser(sustainTransposer(chordParser(songs))))

// * test de la función bemolTransposer con htmlParser

console.log(htmlParser(bemolTransposer(chordParser(songs))))