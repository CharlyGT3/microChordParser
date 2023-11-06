// * Variables -------------------------------------------------------------------

// ? Array de notas, acidentales, acordes, intervalos y bajos

const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
accidentals = ['#', 'b'],
notesSustain = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
notesBemol = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
chords = ['m', '+', 'sus', 'add', 'maj', 'dim', 'aug'],
intervals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
bass = ['/', '-']

// ? regNote es una expresión regular para validar que un string sea un acorde

const regNote = /^ *[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/;

// * Funciones publica -----------------------------------------------------------

/**
 * Esta función es para crear un objeto con las notas, acordes, intervalos y bajos a partir de un string que posea una canción con acordes
 * @param {String} song Inserta el texto de la canción con los acordes
 * @returns {object} Devuelve un objeto con las notas, acordes, intervalos y bajos
 */

export const chordParser = (song) => {
  let result = [];
  const lines = song.split('\n');
  const charLists = {
    note: notes,
    chord: chords,
    interval: intervals,
    bass: bass,
    space: [' ']
  };

  for (const line of lines) {
    if (regNote.test(line)) {
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        const nextChar = j + 1 < line.length ? line[j + 1] : '0';

        for (const [key, value] of Object.entries(charLists)) {
          if (value.includes(char)) {
            const noteValue = accidentals.includes(nextChar) ? char + nextChar : char;
            result.push({ [key]: noteValue });
            break;
          }
        }
      }
    } else {
      result.push({ letter: line });
    }
    result.push({ letter: '\n' });
  }

  return result;
}

/**
 * Esta función es para crear un string de una canción con acordes a partir de un objeto que posea las notas, acordes, intervalos y bajos
 * @param {object} objet inserta el objeto de la función chordParser o chordTransposer
 * @returns {string} devuelve un string con de la canción y los acordes
 */

export const textParser = (objet) => parser(objet, '', '', '', '')

/**
 * Esta función es para crear un string especial para html de una canción con acordes a partir de un objeto que posea las notas, acordes, intervalos y bajos
 * @param {object} objet inserta el objeto de la función chordParser o chordTransposer
 * @returns {string} devuelve un string especial para html con de la canción y los acordes
 */

export const htmlParser = (objet) => parser(objet, '<div class="chord">', '<div class="letter">', '</div>', '</div>')

/**
 * Esta función recibiendo un objeto de la función chordParser y la tranpone a la cantidad de semitonos que se le indique en formato sostenido
 * @param {object} objet inserta el objeto de la función chordParser
 * @param {number} semitone inserta el número de semitonos que se quiere transponer
 * @returns {object} devuelve un objeto con las notas, acordes, intervalos y bajos transpuestos
 */

export const sustainTransposer = (objet, semitone = 0) => chordTransposer(objet, semitone, notesSustain)

/**
 * Esta función recibiendo un objeto de la función chordParser y la tranpone a la cantidad de semitonos que se le indique en formato bemol
 * @param {object} objet inserta el objeto de la función chordParser
 * @param {number} semitone inserta el número de semitonos que se quiere transponer
 * @returns {object} devuelve un objeto con las notas, acordes, intervalos y bajos transpuestos
 */

export const bemolTransposer = (objet, semitone = 0) => chordTransposer(objet, semitone, notesBemol)

// * Funciones internas ----------------------------------------------------------

function chordTransposer(objet, semitone, noteTypeSelect) {

  let result = structuredClone(objet)

  for (const item of result) {
    if (item.note) {
      let noteTypes = [notesSustain, notesBemol];
      for (const noteType of noteTypes) {
        if (noteType.includes(item.note)) {
          let index = noteType.indexOf(item.note);
          item.note = noteTypeSelect[rangeAdjust(index + semitone)];
          break;
        }
      }
    }
  }
  return result
}

function parser(objet, init, initBreack, finishBreack, finish) {
  let result = init

  const handlers = {
    'space': () => ' ',
    'letter': (chord) => chord.letter == '\n' ? chord.letter : initBreack + chord.letter + finishBreack,
    'note': (chord) => chord.note,
    'chord': (chord) => chord.chord,
    'interval': (chord) => chord.interval,
    'bass': (chord) => chord.bass
  }

  for (const chord of objet) {
    for (const key in handlers) {
      if (key in chord) {
        result += handlers[key](chord);
        break;
      }
    }
  }
  return result + finish
}

function rangeAdjust(number) {
  const rangeSize = 12;
  return ((number % rangeSize) + rangeSize) % rangeSize;
}