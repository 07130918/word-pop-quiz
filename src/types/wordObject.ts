interface WordObject {
    english: string;
    definition: string;
    url: string;
}

interface WordQuizObject {
    english: string;
    definition: string;
    url: string;
    choices: string[];
}

type WordObjects = WordObject[];
type WordQuizObjects = WordQuizObject[];

export type { WordObject, WordObjects, WordQuizObject, WordQuizObjects };
