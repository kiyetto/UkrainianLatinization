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
    'І': 'İ', 'і': 'i',
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
    'Ь': 'I', 'ь': 'ı',
    'Ю': 'Ju', 'ю': 'ju',
    'Я': 'Ja', 'я': 'ja',
    '\'': '\0', 'ʼ': '\0', 
    '`': '\0', '´': '\0', 
    '’': '\0'
}

softLetters = {
    'ц': 'ć',
    'с': 'ś',
    'з': 'ź',
    'н': 'ń',
    'л': 'ľ',
    'т': 'ť',
    'д': 'ď',
    'Ц': 'Ć',
    'С': 'Ś',
    'З': 'Ź',
    'Н': 'Ń',
    'Л': 'Ľ',
    'Т': 'Ť',
    'Д': 'Ď'
}    

function softening(input) {
    let output = '';

    for(let i = 0; i < input.length; i++) {
        if(softLetters[input[i]] && 'Ьь'.includes(input[i + 1])) {
            output += softLetters(input[i]); i++;
        }
        else {
            output += input[i];
        }     
    }    
    
    return output;
}    

function jotation(input) {
    let output = '';

    const exceptionChars = "АЕІОУЯЄЇЮИаеіоуяєїюьи'ʼ\0\n\"«»=×^£¢€¥%\(\)\{\}\[\]&-—–·:;?!*\\/@#№|§∆+1234567890´`’ ";
    const jottedChars = "яєїю";

    for(let i = 0; i < input.length; i++) {  
        // Handle i + vowel to avoid it being read as a softened consonants
        if(input[i] == 'і' && "аеіоуи".includes(input[i + 1])) {
            output += 'ij';
        }   
        // Turn jotted vowels (я, є, ю ...) to their soft version
        else if(input[i] == 'я' && !exceptionChars.includes(input[i - 1]) && i != 0) {
            output += 'ia';
        }   
        else if(input[i] == 'є' && !exceptionChars.includes(input[i - 1]) && i != 0) {
            output += 'ie';
        }    
        else if(input[i] == 'ю' && !exceptionChars.includes(input[i - 1]) && i != 0) {
            output += 'iu';
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
