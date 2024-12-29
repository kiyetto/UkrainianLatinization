map = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g',
    'Ґ': 'Ĝ', 'ґ': 'ĝ',
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
    'Х': 'H', 'х': 'h',
    'Ц': 'C', 'ц': 'c',
    'Ч': 'Č', 'ч': 'č',
    'Ш': 'Š', 'ш': 'š',
    'Щ': 'Šč', 'щ': 'šč',
    'Ь': '\'', 'ь': '\'',
    'Ю': 'Ju', 'ю': 'ju',
    'Я': 'Ja', 'я': 'ja',
    '\'': '\0', 'ʼ': '\0'
}

function separateIWithVowels(input) {
    let output = '';

    for(let i = 0; i < input.length; i++) {
        if (input[i] == 'і' && input[i + 1] == 'а') {
            output += 'ія';
            i++;
        } 
        else if (input[i] == 'і' && input[i + 1] == 'о') {
            output += 'ійо';
            i++;
        } 
        else if (input[i] == 'і' && input[i + 1] == 'е') {
            output += 'іє';
            i++;
        } 
        else if (input[i] == 'і' && input[i + 1] == 'у') {
            output += 'ію';
            i++;
        } 
        else {
            output += input[i];
        }
    }

    return output;
}

function jottedVowelsConvert(input) {
    let output = '';

    input = separateIWithVowels(input)

    const exceptionChars = "АЕІОУЯЄЇЮаеіоуяєїюь'ʼ\0 ";
    const jottedChars = "яєїю";

    for(let i = 0; i < input.length; i++) {
        if(input[i] == 'я' && !exceptionChars.includes(input[i - 1]) && i != 0) {
            output += 'іа';
        } 
        else if(input[i] == 'є' && !exceptionChars.includes(input[i - 1]) && i != 0) {
            output += 'іe';
        } 
        else if(input[i] == 'ю' && !exceptionChars.includes(input[i - 1]) && i != 0) {
            output += 'іu';
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

function convert(input) {
    let output = '';

    input = jottedVowelsConvert(input);

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
    // Get the text content of the output field
    const textToCopy = outputField.innerText;

    // Check if there's any text to copy
    if (textToCopy) {
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Provide feedback that the text was copied
                alert('Text copied to clipboard!');
            })
            .catch((err) => {
                // Handle any errors
                console.error('Failed to copy text: ', err);
            });
    } else {
        // If there's no text to copy, alert the user
        alert('No text to copy!');
    }
}

// Clear button functionality
clearBtn.onclick = () => {
    inputField.value = '';
    outputField.innerHTML = '';
}
