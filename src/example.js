import {chordParser, textParce, htmlParce, sustainTransposer, bemolTransposer, weirdTransposer} from "./microChordParce.js"

// ? ejemplo de uso

var songs = `Bb
Who breaks the power of sin and darkness
Eb
Whose love is mighty and so much stronger
Gm                     F               Eb
The king of glory, the king above all kings`


// * test de la función sustainTransposer con textParser

console.log(textParce(sustainTransposer(chordParser(songs), 1)))

// * test de la función bemolTransposer con textParser

console.log(textParce(bemolTransposer(chordParser(songs), 1)))

// * test de la función weirdTransposer con textParser

console.log(textParce(weirdTransposer(chordParser(songs), 12)))

// * test de la función sustainTransposer con htmlParser

console.log(htmlParce(sustainTransposer(chordParser(songs))))

// * test de la función bemolTransposer con htmlParser

console.log(htmlParce(bemolTransposer(chordParser(songs))))

// * test de la función weirdTransposer con htmlParser

console.log(htmlParce(weirdTransposer(chordParser(songs))))