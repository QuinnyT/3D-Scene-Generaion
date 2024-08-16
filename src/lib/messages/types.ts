export interface UserContent {
  questionIndex: number;
  placeholder?: string;
  seletableChip?: string | Array<string>;
}

interface Character {
  name: string;
  description: string;
}  
export interface StoryContent {
  isFinal: boolean;
  seletableChip: string | Array<string>;
  characters: Array<Character>;
  outline: string;
}


export interface MessageType {
  index: number,
  content: string | UserContent | StoryContent | null;
  sender: string;
  timestamp: Date;
}

export interface StoryType {
  character: Character[];
  outline: string;
}