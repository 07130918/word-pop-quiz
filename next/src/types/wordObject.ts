interface WordObject {
    English: string;
    Japanese: string;
    url: string;
}

interface WordQuizObject {
    id: string;
    English: string;
    Japanese: string;
    url: string;
    choices: string[];
}

type WordObjects = WordObject[];
type WordQuizObjects = WordQuizObject[];

export type { WordObject, WordObjects, WordQuizObject, WordQuizObjects };
