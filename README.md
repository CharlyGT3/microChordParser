## Install

```bash
npm i micro-chord-parse
```

## Demonstrations

```javascript
import {chordParser, textParse, htmlParse, sustainTransposer, bemolTransposer, weirdTransposer} from "microChordParse.js"

var songs = `Bb
Who breaks the power of sin and darkness
Eb
Whose love is mighty and so much stronger
Gm                     F               Eb
The king of glory, the king above all kings`
```

### Testing the sustainTransposer function with textParser

```javascript

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

### Testing the bemolTransposer function with textParser

```javascript

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

### Testing the weirdTransposer function with textParser

```javascript

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

### Testing the sustainTransposer function with htmlParser

```javascript

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

### Testing the bemolTransposer function with htmlParser

```javascript

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

### Testing the weirdTransposer function with htmlParser

```javascript

console.log(htmlParse(weirdTransposer(chordParser(songs))))
```

```bash
<div class="chord">
B&
<div class="letter">Who breaks the power of sin and darkness</div>
Eb
<div class="letter">Whose love is mighty and so much stronger</div>
Gm                     F               E&
<div class="letter">The king of glory, the king above all kings</div>
</div>
```
