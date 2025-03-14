map = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'H', 'г': 'h',
    'Ґ': 'G', 'ґ': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Є': 'Je', 'є': 'je',
    'Ж': 'Ž', 'ж': 'ž',
    'З': 'Z', 'з': 'z',
    'И': 'Y', 'и': 'y',
    'І': 'I', 'і': 'i',
    'Ї': 'Ji', 'ї': 'ji',
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
    'Х': 'Ħ', 'х': 'ħ',
    'Ц': 'C', 'ц': 'c',
    'Ч': 'Č', 'ч': 'č',
    'Ш': 'Š', 'ш': 'š',
    'Щ': 'Šč', 'щ': 'šč',
    'Ь': 'ʼ', 'ь': 'ʼ',
    'Ю': 'Ju', 'ю': 'ju',
    'Я': 'Ja', 'я': 'ja',
    '\'': '\0', 'ʼ': '\0', 
    '`': '\0', '´': '\0'
}

function jotation(input) {
    let output = '';

    const consonants = "бвгґджзйклмнпрстфхцчшщьБВГҐДЖЗЙКЛМНПРСТФХЦЧШЩЬ";
    const jottedVowels = {
        "я": "ia",
        "є": "ie",
        "ю": "iu"
    };

    const vowels = "АЕІОУИаеіоуи";

    for(let i = 0; i < input.length; i++) {  
        if (input[i] == 'і' && vowels.includes(input[i + 1])) {
            input = 'ï';
        }
        else if(jottedVowels[input[i]] && consonants.includes(input[i - 1])) { //If current letter is a jotted vowel after a consonant
            output += jottedVowels[input[i]]
        }
        else if(input[i] == 'ь' && input[i + 1] == 'о') {
            output += 'i';
        }
        else {
            output += input[i]
        }
    }

    return output;
}

function softening(input) {
    let output = '';

    const softConsonants = {
        'с': 'ś',
        'з': 'ź',
        'ц': 'ć',
        'н': 'ń',
        'л': 'ľ',
        'т': 'ť',
        'д': 'ď',
        'С': 'Ś',
        'З': 'Ź',
        'Ц': 'Ć',
        'Н': 'Ń',
        'Л': 'Ľ',
        'Т': 'Ť',
        'Д': 'Ď'
    }

    for(let i = 0; i < input.length; i++) {  
        if(softConsonants[input[i]] && input[i + 1] == 'ь') {
            output += softConsonants[input[i]]; i++;
        }
        else {
            output += input[i]
        }
    }

    return output;
}

function convert(input) {
    let output = '';

    input = jotation(input);
    input = softening(input);

    input.split('').forEach((element) => {
        if (map[element]) {
            output += map[element]; 
        } 
        else if (element == '\n') {
            output += '<br>';
        }
        else {
            output += element;  
        }
    });

    return output;
}

const inputField = document.getElementById('input');
const outputField = document.getElementById('output');
const convertBtn = document.getElementById('convert');
const copyBtn = document.getElementById('copy');
const clearBtn = document.getElementById('clear');

function convertInput() {
    outputField.innerHTML = '';
    convertedText = convert(input.value);
    outputField.innerHTML = convert(input.value);
}

convertBtn.onclick = () => {
    convertInput();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        convertInput();
    }
});

copyBtn.onclick = () => {
    if (outputField.innerText) {
        navigator.clipboard.writeText(textToCopy)
    }

}

copyBtn.onclick = () => {
    const textToCopy = outputField.innerText;

    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).catch((err) => {
            console.error('Joj! Ne vdalosia skopijuvaty tekst: ', err);
        });
    } 
    else {
        alert('Nemaje teksu!');
    }
}