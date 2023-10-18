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

const regNote = /^ *[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/g

// * Funciones publica -----------------------------------------------------------

/**
 * Esta función es para crear un objeto con las notas, acordes, intervalos y bajos a partir de un string que posea una canción con acordes
 * @param {String} song Inserta el texto de la canción con los acordes
 * @returns {object} Devuelve un objeto con las notas, acordes, intervalos y bajos
 */

export const chordParser = (song) => {

  const lines = song.split('\n')
  let result = []

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i]
    const isChords = regNote.test(line)

    if (isChords) {
      for (let j = 0; j < line.length; j++) {
        const char = line[j]
        const nextChar = line[j + 1]
        switch (true) {
          case notes.includes(char):
            if (accidentals.includes(nextChar)) {
              result.push({ note: char + nextChar });
            } else {
              result.push({ note: char });
            }
            break;
          case chords.includes(char):
            result.push({ chord: char });
            break;
          case intervals.includes(char):
            result.push({ interval: char });
            break;
          case bass.includes(char):
            result.push({ bass: char });
            break;
          case char === ' ':
            result.push({ space: char });
            break;  
          default:
            break;
        }
      }
    } else {
      result.push({ letter: line })
    }
  }
  return result
}

/**
 * Esta función es para crear un string de una canción con acordes a partir de un objeto que posea las notas, acordes, intervalos y bajos
 * @param {object} objet inserta el objeto de la función chordParser o chordTransposer
 * @returns {string} devuelve un string con de la canción y los acordes
 */

export const textParser = (objet) => parser(objet, '', '\n', '\n', '')

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

  for (let i = 0; i < result.length; i++) {
    if (result[i].note) {
      let index;
      switch (true) {
        case notesSustain.includes(result[i].note):
          index = notesSustain.indexOf(result[i].note);
          result[i].note = noteTypeSelect[rangeAdjust(index + semitone)];
          break;
        case notesBemol.includes(result[i].note):
          index = notesBemol.indexOf(result[i].note);
          result[i].note = noteTypeSelect[rangeAdjust(index + semitone)];
          break;
        default:
          break;
      }
    }
  }
  return result
}

function parser(objet, init, initBreack, finishBreack, finish) {

  let result = init

  for (let i = 0; i < objet.length; i++) {
    const chord = objet[i]
    switch (true) {
      case 'space' in chord:
        result += ' ';
        break;
      case 'letter' in chord:
        result += initBreack + chord.letter + finishBreack;
        break;
      case 'note' in chord:
        result += chord.note;
        break;
      case 'chord' in chord:
        result += chord.chord;
        break;
      case 'interval' in chord:
        result += chord.interval;
        break;
      case 'bass' in chord:
        result += chord.bass;
        break;
      default:
        break;
    }    
  }
  return result + finish
}

function rangeAdjust(number) {

  const max = 11;
  const min = 0;

  while (number < min) {
    number += max + 1;
  }
  while (number > max) {
    number -= max + 1;
  }

  return number;
}