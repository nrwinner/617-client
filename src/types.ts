export interface ByteType {
    id: string;
    image: string;
    name: string;
    description: string;
    creator: UserType;
    materials: { youtubeVideo: string };
    sections: Map<string, SectionType>;
    [propName: string]: any;
}

export interface UserType {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface VideoType {
    url: string;
    start: string;
    stop?: string;
}

export interface SectionType {
    id: string;
    name: string;
    description: string;
    videoIn: string;
    videoOut: string;
    questions: Map<string, QuestionType>;
    complete?: boolean;
    answered?: boolean;
}

export interface SectionItemType {
    id: string,
    name: string;
    complete?: boolean;
}

export interface QuestionType {
    id: string;
    text: string;
    answerId: string;
    options: Map<string, QuestionOptionType>;
    activeOption?: string;
    [propName: string]: any;
}

export interface QuestionOptionType {
    id: number;
    text: string;
}