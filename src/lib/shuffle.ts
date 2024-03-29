/**
 * @description Fisher-Yatesのアルゴリズムで配列の要素をシャッフルする。
 */
const fisherYatesShuffle = <T>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default fisherYatesShuffle;
