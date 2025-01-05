map = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'H', 'г': 'h',
    'Ґ': 'G', 'ґ': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Є': 'Ye', 'є': 'ye',
    'Ж': 'J', 'ж': 'j',
    'З': 'Z', 'з': 'z',
    'И': 'Ĭ', 'и': 'ĭ',
    'І': 'I', 'і': 'i',
    'Ї': 'Yi', 'ї': 'yi',
    'Й': 'Y', 'й': 'y',
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
    'Ч': 'Ç', 'ч': 'ç',
    'Ш': 'Ş', 'ш': 'ş',
    'Щ': 'Şç', 'щ': 'şç',
    'Ь': 'ʼ', 'ь': 'ʼ',
    'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya',
    '\'': '`', 'ʼ': '`', '´': '`',
}

function jottedVowelsConvert(input) {
    let output = '';

    const exceptionChars = "АЕІОУЯЄЇЮИаеіоуяєїюьи'ʼ\0\n\"«»=×^£¢€¥%\(\)\{\}\[\]&-—–·:;?!*\\/@#№|§∆+1234567890´` ";
    const jottedChars = "яєїю";

    for(let i = 0; i < input.length; i++) { 
        else if(input[i] == 'ь' && input[i + 1] == 'о') {
            output += 'y';
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
