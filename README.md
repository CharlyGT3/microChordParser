## Install

```bash
npm i micro-chord-parser
```

## Demonstrations

```javascript
import {chordParser,
  textParser,
  htmlParser,
  sustainTransposer,
  bemolTransposer,
  weirdTransposer
} from "microChordParser.js"

var songs =
`Bb
Who breaks the power of sin and darkness
Eb
Whose love is mighty and so much stronger
Gm                     F               Eb
The king of glory, the king above all kings`
```

### Testing the sustainTransposer function with textParser

```javascript

console.log(textParser(sustainTransposer(chordParser(songs), 1)))
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

console.log(textParser(bemolTransposer(chordParser(songs), 1)))
```

```bash
B
Who breaks the power of sin and darkness
E
Whose love is mighty and so much stronger
Abm                     Gb               E
The king of glory, the king above all kings
```

### Testing the sustainTransposer function with htmlParser

```javascript

console.log(htmlParser(sustainTransposer(chordParser(songs))))
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

console.log(htmlParser(bemolTransposer(chordParser(songs))))
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

As you can see, I always transpose when parsing, as it is a way to correct the type of notation to be used. However, it is not necessary if no transposition is needed; it's more of a best practice.