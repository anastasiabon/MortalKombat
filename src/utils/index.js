export const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex = null;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export const getRandom = (max) => {
    return Math.ceil(Math.random() * max);
};

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
};

export const getTime = () => {
    const date = new Date();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return`${hours}:${minutes}`;
}

export const getTextReplaced = (text, params) => {
    let replacedText = text;

    for (let item of params) {
        const key = Object.keys(item)[0];
        replacedText = replacedText.replace(key, item[key]);
    }

    return replacedText;
}