const intervals = {
    m2: {
        semitone: 1,
        degrees: 2
    },
    M2: {
        semitone: 2,
        degrees: 2
    },
    m3: {
        semitone: 3,
        degrees: 3
    },
    M3: {
        semitone: 4,
        degrees: 3
    },
    P4: {
        semitone: 5,
        degrees: 4
    },
    P5: {
        semitone: 7,
        degrees: 5
    },
    m6: {
        semitone: 8,
        degrees: 6
    },
    M6: {
        semitone: 9,
        degrees: 6
    },
    m7: {
        semitone: 10,
        degrees: 7
    },
    M7: {
        semitone: 11,
        degrees: 7
    },
    P8: {
        semitone: 12,
        degrees: 8
    },
}

const scale_degrees = ["C", "D", "E", "F", "G", "A", "B"];
const scale_semitones = ["C", "-", "-", "D", "-", "-", "E", "-", "F", "-", "-", "G", "-", "-", "A", "-", "-", "B", "-"];
const scale_notes = ["Cbb", "Cb", "C", "C#", "C##", "Dbb", "Db", "D", "D#", "D##", "Ebb", "Eb", "E", "E#", "E##", "Fbb", "Fb", "F", "F#", "F##", "Gbb", "Gb", "G", "G#", "G##", "Abb", "Ab", "A", "A#", "A##", "Bbb", "Bb", "B", "B#", "B##"]

function intervalConstruction(arr) {
    if (arr.length < 2 || arr.length > 3 ) {
        throw "Error, illegal number of elements in input array";
    }

    let interval = arr[0];
    let note = arr[1];
    let route = arr[2];

    let _semitone; // сколько полутонов
    let _degrees; //сколько градусов


    let new_note; //буквенное обозначение новой ноты
    let name_new_note; //новая нота/ возвращаемое значение

    if (intervals.hasOwnProperty(interval)) {
        _semitone = intervals[interval]["semitone"];
        _degrees = intervals[interval]["degrees"];

    } else {
        throw "Error, there isn't interval or interval is wrong";
    }

    if (scale_notes.includes(note)) {
        let _note = note.split('')[0];
        let index_note = scale_semitones.findIndex(elem => elem === _note); // индекс ноты без примеси
       

        if (note.includes("bb")) {
            index_note = index_note - 2; 
        } else if (note.includes("b")) {
            index_note = index_note - 1;
        } else if (note.includes("##")) {
            index_note = index_note + 2;
        } else if (note.includes("#")) {
            index_note = index_note + 1;
        }

        
        if (index_note < 0) {
            index_note = scale_semitones.length + index_note;
        }       


        let index_new_note;  // индекс новой ноты в массиве scale_semitones
        let index_note_in_scale_degrees // индекс начальнй ноты в массиве scale_degrees
        let index_new_note_in_scale_degrees // индекс новой ноты в массиве scale_degrees
        if (route === 'asc' || route === '' || route == null) {
            index_new_note = index_note + _semitone + _degrees - 1;
            if (index_new_note > scale_semitones.length) {
                index_new_note = index_new_note - scale_semitones.length
            }

            index_note_in_scale_degrees = scale_degrees.indexOf(_note);
            index_new_note_in_scale_degrees = index_note_in_scale_degrees + _degrees - 1;
            if (index_new_note_in_scale_degrees > scale_degrees.length) {
                index_new_note_in_scale_degrees = index_new_note_in_scale_degrees - scale_degrees.length  //узнали индекс буквенного обозначения новой ноты
            }

        } else if (route === 'dsc') {
            index_new_note = index_note - _semitone - _degrees + 1;

            index_note_in_scale_degrees = scale_degrees.indexOf(_note);
            index_new_note_in_scale_degrees = index_note_in_scale_degrees - _degrees + 1;
            

            if (index_new_note_in_scale_degrees < 0) {
                index_new_note_in_scale_degrees = index_new_note_in_scale_degrees + scale_degrees.length; //узнали индекс буквенного обозначения новой ноты
            }

        } else {
            throw "Error, route is wrong";
        }



        new_note = scale_degrees[index_new_note_in_scale_degrees]; //узнали буквенное обозначение новой ноты       


        let _index_new_note = scale_semitones.indexOf(new_note); //узнали индекс ноты без примеси
        
        if (_index_new_note - index_new_note == 2) {
            name_new_note = new_note + "bb";
        } else if (_index_new_note - index_new_note == 1) {
            name_new_note = new_note + "b";
        } else if (_index_new_note - index_new_note == -1) {
            name_new_note = new_note + "#";
        } else if (_index_new_note - index_new_note == -2) {
            name_new_note = new_note + "##";
        } else {
            name_new_note = new_note;
        }
        

    } else {
        throw "Error, there isn't note or note is wrong";
    }

    return name_new_note;

}


function  intervalIdentification ( arr )  {

    if (arr.length < 2 || arr.length > 3 ) {
        throw "Error, illegal number of elements in input array";
    }

    let start_note = arr[0];
    let end_note = arr[1];
    let route = arr[2];
    

    let counter_steps; //сумма градусов и полутонов
    let counter_semitones; //количество полутонов
    let counter_degrees; //количество градусов

    let interval;
    
    if (scale_notes.includes(start_note) && scale_notes.includes(end_note)){

        let _start_note = start_note.split('')[0];

        let index_start_note= scale_semitones.findIndex(elem => elem === _start_note); // индекс начальной ноты без примеси
        let _index_start_note=scale_degrees.findIndex(elem => elem === _start_note); //индекс буквенного обозначения начальной ноты       


        if (start_note.includes("bb")) {
            index_start_note = index_start_note - 2; 
        } else if (start_note.includes("b")) {
            index_start_note = index_start_note - 1;
        } else if (start_note.includes("##")) {
            index_start_note = index_start_note + 2;
        } else if (start_note.includes("#")) {
            index_start_note = index_start_note + 1;
        }

       
        if (index_start_note < 0) {
            index_start_note = scale_semitones.length + index_start_note;
        }
      
       

        ///////////////////////////////////////////////////////////

        let _end_note = end_note.split('')[0];

        let index_end_note= scale_semitones.findIndex(elem => elem === _end_note); // индекс конечной ноты без примеси
        let _index_end_note=scale_degrees.findIndex(elem => elem === _end_note); //индекс буквенного обозначения конечной ноты 
      

        if (end_note.includes("bb")) {
            index_end_note = index_end_note - 2; 
        } else if (end_note.includes("b")) {
            index_end_note = index_end_note - 1;
        } else if (end_note.includes("##")) {
            index_end_note = index_end_note + 2;
        } else if (end_note.includes("#")) {
            index_end_note = index_end_note + 1;
        }

        
        if (index_end_note < 0) {
            index_end_note = scale_semitones.length + index_end_note;
        }       

      
        //-----------------------------находим сумму градусов и полутонов, количество градусов------------------------------//

       

        if (route === 'asc' || route === '' || route == null) {

            if(index_end_note > index_start_note) {
                counter_steps = index_end_note - index_start_note + 1;
                counter_degrees = _index_end_note - _index_start_note + 1;

            } else if (index_end_note <= index_start_note) {
                counter_steps = scale_semitones.length + index_end_note - index_start_note + 1;
                counter_degrees =scale_degrees.length + _index_end_note - _index_start_note + 1;
            }  


        } else if (route === 'dsc') {
           
            if(index_end_note >= index_start_note) {
                counter_steps = scale_semitones.length - index_end_note + index_start_note + 1;
                counter_degrees =scale_degrees.length - _index_end_note + _index_start_note + 1;
               
            } else if (index_end_note < index_start_note) {
                counter_steps = index_start_note - index_end_note + 1;

                if(_index_start_note > _index_end_note ) {
                    counter_degrees =_index_start_note - _index_end_note + 1;
                } else {
                    counter_degrees =scale_degrees.length - _index_end_note + _index_start_note + 1;
                }
               
            }



        } else {
            throw "Error, route is incorrect";
        }

        counter_semitones = counter_steps - counter_degrees;        


    } else {
        throw "Error, the note passed in the array is incorrect"
    }

    interval = Object.keys(intervals).find(key => intervals[key]['semitone'] === counter_semitones && intervals[key]['degrees'] === counter_degrees);

    if (interval){
        return interval;
    } else {
        throw "Error, cannot identify the interval"
    }
   
}



