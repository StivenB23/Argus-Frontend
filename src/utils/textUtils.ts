export const getWordOfText = (text: string, wordIndex: number = 0) => {
    return text?.split(' ')[wordIndex]
};
