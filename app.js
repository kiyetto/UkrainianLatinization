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
    '`': '\0', '´': '\0', 
    '’': '\0'
}

function handleSpecialCases(input) {
    let output = '';

    const exceptionChars = "АЕІОУЯЄЇЮИаеіоуяєїюьи'ʼ\0\n\"«»=×^£¢€¥%\(\)\{\}\[\]&-—–·:;?!*\\/@#№|§∆+1234567890´`’ ";
    const jottedChars = "яєїю";

    for(let i = 0; i < input.length; i++) {  
        // Handle i + vowel to avoid it being read as a softened consonants
        if(input[i] == 'і' && "аеіоуи".includes(input[i + 1])) {
            output += 'ji';
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
        else if(input[i] == 'ь' && input[i + 1] == 'о') {
            output += 'i';
        }    
        // Handle soft signs
        else if(input[i] == 'Ц' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ć'; i++;
        }
        else if(input[i] == 'Д' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ď';i++;
        }
        else if(input[i] == 'Л' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ľ';i++;
        }
        else if(input[i] == 'Н' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ń'; i++;
        }
        else if(input[i] == 'Р' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ŕ'; i++;
        }
        else if(input[i] == 'С' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ś'; i++;
        }
        else if(input[i] == 'Т' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ť'; i++;
        }
        else if(input[i] == 'З' && (input[i + 1] == 'ь' || input[i + 1] == 'Ь')) {
            output += 'ź'; i++;
        }
        else if(input[i] == 'ц' && input[i + 1] == 'ь') {
            output += 'ć'; i++;
        }
        else if(input[i] == 'д' && input[i + 1] == 'ь') {
            output += 'ď'; i++;
        }
        else if(input[i] == 'л' && input[i + 1] == 'ь') {
            output += 'ľ'; i++;
        }
        else if(input[i] == 'н' && input[i + 1] == 'ь') {
            output += 'ń'; i++;
        }
        else if(input[i] == 'р' && input[i + 1] == 'ь') {
            output += 'ŕ'; i++;
        }
        else if(input[i] == 'с' && input[i + 1] == 'ь') {
            output += 'ś'; i++;
        }
        else if(input[i] == 'т' && input[i + 1] == 'ь') {
            output += 'ť'; i++;
        }
        else if(input[i] == 'з' && input[i + 1] == 'ь') {
            output += 'ź'; i++;
        }
        else {
            output += input[i]
        }
    }

    return output;
}

function convert(input) {
    let output = '';

    input = handleSpecialCases(input);

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
