## Install

```bash
npm i micro-chord-parse
```

## Demostraciones

```javascript
import {chordParser, textParse, htmlParse, sustainTransposer, bemolTransposer, weirdTransposer} from "microChordParse.js"

// ? ejemplo de uso

var songs = `Bb
Who breaks the power of sin and darkness
Eb
Whose love is mighty and so much stronger
Gm                     F               Eb
The king of glory, the king above all kings`
```

```javascript

// * test de la función sustainTransposer con textParser

console.log(textParse(sustainTransposer(chordParser(songs), 1)))
```

```bash
B
Who breaks the power of sin and darkness
E
Whose love is mighty and so much stronger
G#m                     F#               E
The king of glory, the king above all kings
```

```javascript
// * test de la función bemolTransposer con textParser

console.log(textParse(bemolTransposer(chordParser(songs), 1)))
```

```bash
B
Who breaks the power of sin and darkness
E
Whose love is mighty and so much stronger
Abm                     Gb               E
The king of glory, the king above all kings
```

```javascript
// * test de la función weirdTransposer con textParser

console.log(textParse(weirdTransposer(chordParser(songs), 12)))
```

```bash
B&
Who breaks the power of sin and darkness
E&
Whose love is mighty and so much stronger
Gm                     F               E&
The king of glory, the king above all kings
```

```javascript
// * test de la función sustainTransposer con htmlParser

console.log(htmlParse(sustainTransposer(chordParser(songs))))
```

```bash
<div class="chord">
A#
<div class="letter">Who breaks the power of sin and darkness</div>
D#
<div class="letter">Whose love is mighty and so much stronger</div>
Gm                     F               D#
<div class="letter">The king of glory, the king above all kings</div>
</div>
```

```javascript
// * test de la función bemolTransposer con htmlParser

console.log(htmlParse(bemolTransposer(chordParser(songs))))
```

```bash
<div class="chord">
Bb
<div class="letter">Who breaks the power of sin and darkness</div>
Eb
<div class="letter">Whose love is mighty and so much stronger</div>
Gm                     F               Eb
<div class="letter">The king of glory, the king above all kings</div>
</div>
```

```javascript
// * test de la función weirdTransposer con htmlParser

console.log(htmlParse(weirdTransposer(chordParser(songs))))
```

```bash
<div class="chord">
Bb
<div class="letter">Who breaks the power of sin and darkness</div>
Eb
<div class="letter">Whose love is mighty and so much stronger</div>
Gm                     F               Eb
<div class="letter">The king of glory, the king above all kings</div>
</div>
```
