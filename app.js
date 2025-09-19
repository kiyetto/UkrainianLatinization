const latinMatches = {
    'а': 'a', 'А': 'A',
    'б': 'b', 'Б': 'B',
    'в': 'v', 'В': 'V',
    'г': 'h', 'Г': 'H',
    'ґ': 'g', 'Ґ': 'G',
    'д': 'd', 'Д': 'D',
    'е': 'e', 'Е': 'E',
    'є': 'je', 'Є': 'Je',
    'ж': 'ž', 'Ж': 'Ž',
    'з': 'z', 'З': 'Z',
    'и': 'y', 'И': 'Y',
    'і': 'i', 'І': 'I',
    'ї': 'ji', 'Ї': 'Ji',
    'й': 'j', 'Й': 'J',
    'к': 'k', 'К': 'K',
    'л': 'l', 'Л': 'L',
    'м': 'm', 'М': 'M',
    'н': 'n', 'Н': 'N',
    'о': 'o', 'О': 'O',
    'п': 'p', 'П': 'P',
    'р': 'r', 'Р': 'R',
    'с': 's', 'С': 'S',
    'т': 't', 'Т': 'T',
    'у': 'u', 'У': 'U',
    'ф': 'f', 'Ф': 'F',
    'х': 'ch', 'Х': 'Ch',
    'ц': 'c', 'Ц': 'C',
    'ч': 'č', 'Ч': 'Č',
    'ш': 'š', 'Ш': 'Š',
    'щ': 'šč', 'Щ': 'Šč',
    'ю': 'ju', 'Ю': 'Ju',
    'я': 'ja', 'Я': 'Ja',
    'ь': '́', 'Ь': '́'
};

const cyrillicMatches = {
    'a': 'а', 'A': 'А',
    'b': 'б', 'B': 'Б',
    'v': 'в', 'V': 'В',
    'h': 'г', 'H': 'Г',
    'g': 'ґ', 'G': 'Ґ',
    'd': 'д', 'D': 'Д',
    'e': 'е', 'E': 'Е',
    'ž': 'ж', 'Ž': 'Ж',
    'z': 'з', 'Z': 'З',
    'y': 'и', 'Y': 'И',
    'i': 'і', 'I': 'І',
    'j': 'й', 'J': 'Й',
    'k': 'к', 'K': 'К',
    'l': 'л', 'L': 'Л',
    'm': 'м', 'M': 'М',
    'n': 'н', 'N': 'Н',
    'o': 'о', 'O': 'О',
    'p': 'п', 'P': 'П',
    'r': 'р', 'R': 'Р',
    's': 'с', 'S': 'С',
    't': 'т', 'T': 'Т',
    'u': 'у', 'U': 'У',
    'f': 'ф', 'F': 'Ф',
    'c': 'ц', 'C': 'Ц',
    'č': 'ч', 'Č': 'Ч',
    'š': 'ш', 'Š': 'Ш',
    '́': 'ь'
};

const digraphs = {
    'ja': 'я', 'Ja': 'Я',
    'je': 'є', 'Je': 'Є',
    'ju': 'ю', 'Ju': 'Ю',
    'ji': 'ї', 'Ji': 'Ї',
    'šč': 'щ', 'Šč': 'Щ',
    'ch': 'х', 'Ch': 'Х'
};

const latinSoftLetters = {
    'ц': 'ć', 'Ц': 'Ć',
    'д': 'ď', 'Д': 'Ď',
    'л': 'ľ', 'Л': 'Ľ',
    'н': 'ń', 'Н': 'Ń',
    'р': 'ŕ', 'Р': 'Ŕ',
    'с': 'ś', 'С': 'Ś',
    'т': 'ť', 'Т': 'Ť',
    'з': 'ź', 'З': 'Ź',
};

const cyrillicSoftLetters = {
    'ć': 'ць', 'Ć': 'Ць',
    'ď': 'дь', 'Ď': 'Дь',
    'ľ': 'ль', 'Ľ': 'Ль',
    'ń': 'нь', 'Ń': 'Нь',
    'ŕ': 'рь', 'Ŕ': 'Рь',
    'ś': 'сь', 'Ś': 'Сь',
    'ť': 'ть', 'Ť': 'Ть',
    'ź': 'зь', 'Ź': 'Зь',
};

consonants = "бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ";

function cyrillicToLatin(src) {
    let txt = src;  

    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])я/g, "ia");
    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])є/g, "ie");
    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])ю/g, "iu");
    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])ьо/g, "io");

    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])іа/g, "ïa");
    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])іе/g, "ïe");
    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])іу/g, "ïu");
    txt = txt.replace(/(?<=[бвгґджзклмнпрстфхцчшщБВГҐДЖЗКЛМНПРСТФХЦЧШЩ])іо/g, "ïo");


    txt = txt.replace(/([цдлнрстзЦДЛНРСТЗ])ь/g, (match, cons) => (latinSoftLetters[cons] || cons));

    txt = txt.replace(/(['`ʼ])/g, "");

    txt = txt.replace(/[а-яА-ЯґҐіІїЇєЄ]/g, match => latinMatches[match] || match);

    return txt;
}

function latinToCyrillic(src) {
    let txt = src;  

    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ia/g, "я");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ie/g, "є");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])iu/g, "ю");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])io/g, "ьо");

    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ïa/g, "іа");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ïe/g, "іе");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ïu/g, "іу");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ïo/g, "іо");

    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ja/g, "ʼя");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])je/g, "ʼє");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ju/g, "ʼю");
    txt = txt.replace(/(?<=[bvhgdžzklmnprstfxcčšBVHGDŽZKLMNPRSTFXCČŠ])ji/g, "ʼї");

    const pattern = new RegExp(Object.keys(digraphs).join('|'), 'g');

    txt = txt.replace(pattern, match => digraphs[match] || match);

    txt = txt.replace(/[ćďľńŕśťźĆĎĽŃŔŚŤŹ]/g, (cons) => (cyrillicSoftLetters[cons] || cons));

    txt = txt.replace(/\p{L}/gu, match => cyrillicMatches[match] || match);

    return txt;
}

const cyrrilicField = document.getElementById("cyrillic");
const latinField = document.getElementById("latin");

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
    });
})

function copy(field) {
    if(!field) return;

     let txt = field.value;
        // .replace(/<br\s*\/?>/gi, '\n')
        // .replace(/<\/div>/gi, '\n')           
        // .replace(/<[^>]+>/g, '') 

    if (!txt) return;

    navigator.clipboard.writeText(txt).catch((err) => {
        console.error('Error', err);
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

let lastFocusedTextarea = null;

document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('focus', () => {
        lastFocusedTextarea = textarea;
    });
});

function insertChar(char) {
    if (!lastFocusedTextarea) return;

    const start = lastFocusedTextarea.selectionStart;
    const end = lastFocusedTextarea.selectionEnd;
    const value = lastFocusedTextarea.value;

    lastFocusedTextarea.value = value.slice(0, start) + char + value.slice(end);
    lastFocusedTextarea.selectionStart = lastFocusedTextarea.selectionEnd = start + char.length;

    lastFocusedTextarea.focus();
}

document.querySelectorAll('.special-char-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const char = btn.textContent.trim();
        insertChar(char);
    });
});

const keyboardBtn = document.querySelector(".keyboard-btn");

keyboardBtn.addEventListener("click", () => {
    document.querySelectorAll(".char-button-row").forEach((row) => {
        if(row.style.display === "flex") {
            row.style.display = "none";
        }   
        else {
            row.style.display = "flex";
        }
    });
});
