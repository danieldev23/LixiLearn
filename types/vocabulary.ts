// Filter options
export const letterOptions: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  ];
  
export  const posOptions: string[] = [
    "indefinite article",
    "verb",
    "noun",
    "adjective",
    "adverb",
    "preposition",
  ];
  
export interface Example {
    cf: string;
    x: string;
}

export interface Sense {
    definition: string;
    examples: Example[];
}

export interface FilterState {
    letter: string;
    pos: string[];
    status: string[];
}
export type NavigationProp = any;

export interface VocabularyWord {
    id: string;
    word: string;
    pos: string;
    phonetic: string;
    phonetic_text: string;
    phonetic_am: string;
    phonetic_am_text: string;
    senses: Sense[];
    status?: string;
    starred?: boolean;
}