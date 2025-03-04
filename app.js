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
    'Ь': '\0', 'ь': '\0',
    'Ю': 'Ju', 'ю': 'ju',
    'Я': 'Ja', 'я': 'ja',
    '\'': '\0', 'ʼ': '\0', 
    '`': '\0', '´': '\0'
}

softLetters = {
    'ц': 'ć',
    'с': 'ś',
    'з': 'ź',
    'н': 'ń',
    'л': 'ĺ',
    'т': 'ť',
    'д': 'ď',
    'Ц': 'Ć',
    'С': 'Ś',
    'З': 'Ź',
    'Н': 'Ń',
    'Л': 'Ĺ',
    'Т': 'Ť',
    'Д': 'Ď'
}    

function softening(input) {
    let output = '';

    for(let i = 0; i < input.length; i++) {
        if(softLetters[input[i]] && 'Ьь'.includes(input[i + 1])) {
            output += softLetters[input[i]]; i++;
        }
        else {
            output += input[i];
        }     
    }    
  
    return output;
}    

function jotation(input) {
    let output = '';

    const consonants = "бвгґджзйклмнпрстфхцчшщьБВГҐДЙКЛМНПРСТФХЦЧШЩЬ";
    const jottedVowels = {
        "я": "ia",
        "є": "ie",
        "ю": "iu"
    };

    vowels = "аеіоу";

    for(let i = 0; i < input.length; i++) {  
        if(input[i] == "і" && vowels.includes(input[i + 1])) { //Separate already existing combination of i + another vowel using trema 
            output += "ī";
        }
        else if(input[i] == 'ь' && input[i + 1] == 'о') { //If there's a ь before an o
            output += 'i';
        }
        else if(jottedVowels[input[i]] && consonants.includes(input[i - 1])) { //If current letter is a jotted vowel after a consonant
            output += jottedVowels[input[i]]
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
        alert('Nemaje teksu !');
    }
}

clearBtn.onclick = () => {
    inputField.value = "";
    outputField.textContent = "Output";
}