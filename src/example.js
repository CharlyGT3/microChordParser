import {chordParser, textParse, htmlParse, sustainTransposer, bemolTransposer} from "./microChordParse.js"

// ? ejemplo de uso

var songs = 
`Bb
Who breaks the power of sin and darkness
Eb
Whose love is mighty and so much stronger
Gm                     F               Eb
The king of glory, the king above all kings`


// * test de la función sustainTransposer con textParser

console.log(textParse(sustainTransposer(chordParser(songs), 1)))

// * test de la función bemolTransposer con textParser

console.log(textParse(bemolTransposer(chordParser(songs), 1)))

// * test de la función sustainTransposer con htmlParser

console.log(htmlParse(sustainTransposer(chordParser(songs))))

// * test de la función bemolTransposer con htmlParser

console.log(htmlParse(bemolTransposer(chordParser(songs))))