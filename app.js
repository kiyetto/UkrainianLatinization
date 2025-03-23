const characters = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'H', 'г': 'h',
    'Ґ': 'G', 'ґ': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Ж': 'Ž', 'ж': 'ž',
    'З': 'Z', 'з': 'z',
    'И': 'Y', 'и': 'y',
    'І': 'I', 'і': 'i',
    'Й': 'J', 'й': 'j',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Ц': 'C', 'ц': 'c',
    'Ч': 'Č', 'ч': 'č',
    'Ш': 'Š', 'ш': 'š',
    'Ь': 'Ĭ', 'ь': 'ĭ',
}

const digraphs = {
    'Х': 'Ch', 'х': 'ch',
    'Щ': 'Šč', 'щ': 'šč',
}

const jotatedFull = {
    'Є': 'Je', 'є': 'je', 
    'Ю': 'Ju', 'ю': 'ju', 
    'Я': 'Ja', 'я': 'ja',
    'Ї': 'Ji', 'ї': 'ji',
}

const jotatedFullCaps = {
    'JE': 'Є', 'JU': 'Ю', 'JA': 'Я', 'JI': 'Ї'
}

const jotatedSoft = {
    'Є': 'Ĭe', 'є': 'ĭe', 
    'Ю': 'Ĭu', 'ю': 'ĭu',
    'Я': 'Ĭa', 'я': 'ĭa',
}

const jotatedSoftCaps = {
    'ĬE': 'Є', 'ĬU': 'Ю', 'ĬA': 'Я'
}

const consonants = "бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ";
const consonantsLatin = 'bvhgdžzklmnprstfcčšBVHGDŽZKLMNPRSTFCČŠ'; 
const apostrophes = "'`́ʼʼ"

function haveToCapitalize(curr, prev, next) {
    return ((prev && (prev.toLowerCase() !== prev.toUpperCase()) && prev === prev.toUpperCase() && curr === curr.toUpperCase()) || 
           (next && (next.toLowerCase() !== next.toUpperCase()) && next === next.toUpperCase() && curr === curr.toUpperCase()));
}

function cyrillicToLatin(input) {
    output = "";

    for(let i = 0; i < input.length; i++) {
        const curr = input[i];
        const prev = input[i - 1];
        const next = input[i + 1];

        if(characters[curr]) {
            output += characters[curr];
        }
        else if(digraphs[curr]) {
            if (haveToCapitalize(curr, prev, next)) {
                output += digraphs[curr].toUpperCase();
            } 
            else {
                output += digraphs[curr];
            }
        }
        else if(jotatedFull[curr]) {
            if(prev && consonants.includes(prev)) {
                if(haveToCapitalize(curr, prev, next)) {
                    output += jotatedSoft[curr].toUpperCase();
                } 
                else {
                    output += jotatedSoft[curr];
                }
            }
            else {
                if(haveToCapitalize(curr, prev, next)) {
                    output += jotatedFull[curr].toUpperCase();
                } 
                else {
                    output += jotatedFull[curr];
                }
            }
        }
        else if(apostrophes.includes(curr)) {}
        else {
            output += curr;
        }
    }

    return output;
}

function key(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function latinToCyrillic(input) {
    output = "";

    for(let i = 0; i < input.length; i++) {
        const curr = input[i];
        const next = input[i + 1];
        const prev = input[i - 1];
        
        if(next && key(jotatedFull, curr + next)) {
            if(prev && consonantsLatin.includes(prev)) {
                output += 'ʼ' + key(jotatedFull, curr + next);
            } 
            else {
                output += key(jotatedFull, curr + next);
            }
            i++;
        }
        else if(next && jotatedFullCaps[curr + next]) {
            if(prev && consonantsLatin.includes(prev)) {
                output += 'ʼ' + jotatedFullCaps[curr + next]; 
            } 
            else {
                output += jotatedFullCaps[curr + next]; 
            }
            i++;
        }
        else if(next && key(jotatedSoft, curr + next)) {
            output += key(jotatedSoft, curr + next); i++;
        }
        else if(next && jotatedSoftCaps[curr + next]) {
            output += jotatedSoftCaps[curr + next]; i++;
        }
        else if(next && key(digraphs, curr + next)) {
            output += key(digraphs, curr + next); i++;
        }
        else if(key(characters, curr)) {
            output += key(characters, curr);
        }
        else {
            output += curr;
        }

    }

    return output;
}

const cyrrilicField = document.querySelector("#cyrillic");
const latinField = document.querySelector("#latin");

cyrrilicField.addEventListener("keyup", () => {
    latinField.value = cyrillicToLatin(cyrrilicField.value);
});

latinField.addEventListener("keyup", () => {
    cyrrilicField.value = latinToCyrillic(latinField.value);
});

const clearBtns = document.querySelectorAll(".clear-btn");

clearBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        cyrrilicField.value = '';
        latinField.value = '';
    })
})

function copy(field) {
    if(!field) return;

    const txt = field.value;

    console.log(txt);

    if (!txt) return;

    navigator.clipboard.writeText(txt).catch((err) => {
        console.error('Joj! Ne vdalosĭa skopijuvaty tekst: ', err);
    });
}

const latinCopyBtn = document.querySelector(".latin-copy-btn");
const cyrillicCopyBtn = document.querySelector(".cyrillic-copy-btn");

latinCopyBtn.addEventListener("click", () => {
    copy(latinField);
});

cyrillicCopyBtn.addEventListener("click", () => {
    copy(cyrrilicField);
});