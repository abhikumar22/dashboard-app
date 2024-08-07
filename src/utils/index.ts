
export const capatiliseFirstLetter = (word: string) => {
    if (typeof word !== 'string' || word.length === 0) {
        return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
