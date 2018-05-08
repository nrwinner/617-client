import { Action, INIT_USER, LOGOUT_USER } from '@/redux-actions';
import { BYTE_CHANGE_SECTION, INIT_CONSUMABLE_BYTE, SELECT_QUESTION_OPTION } from '@/redux-actions'
import { UserType, ByteType, SectionType, QuestionType, QuestionOptionType } from '@/types'

type State = {
    consumingByte?: ByteType;
    currentUser?: UserType;
}

const initialState: State = {};

/**
 * Redux reducers
 * @param state 
 * @param action 
 */
export function appReducer(state: any = initialState, action: Action) {
    if (action.type === BYTE_CHANGE_SECTION) {
        let s = assign(state);
            s.consumingByte.activeSection = action.id;
            return s;

    } else if (action.type === INIT_CONSUMABLE_BYTE) {
        let s = assign(state);
            s.consumingByte = smash(buildByte(action.data), { activeSection: action.data.sections[0].id });
            return assign(s);

    } else if (action.type === SELECT_QUESTION_OPTION) {
        let s = assign(state); // dup state

        let questions: Map<string, QuestionType> = new Map(s.consumingByte.sections.get(action.section).questions);
        let q = questions.get(action.question);

        if (typeof q !== 'undefined') {
            q = smash(q, {activeOption: action.option});
            questions.set(action.question, q as QuestionType); // new question with change
        }

        s.consumingByte.sections.get(action.section).questions = questions;
        
        let complete = true;
        for (let i of Array.from(questions.values())) {
            if (typeof i.activeOption === 'undefined') {
                complete = false;
                break;
            }
        }

        let sections = new Map(s.consumingByte.sections)
        let section = s.consumingByte.sections.get(action.section);
        sections.set(action.section, smash(section, {complete: complete}));
        s.consumingByte.sections = sections;

        console.log(s);
        
        return s;

    } else if (action.type === INIT_USER) {
        return smash(state, {currentUser: action.data});

    } else if (action.type === LOGOUT_USER) {
        let s = assign(state);
        s.currentUser = undefined;
        return s;   

    } else {
        return state;
    }
}

/**
 * Takes n objects and combines them using Object.assign, returning the new object
 * @param states 
 */
function smash(...states: (any)[]) {
    return Object.assign({}, ...states);
}

/**
 * Wrapper function for Object.assign (I got tired of typing it)
 * @param state 
 */
function assign(state: any) {
    return Object.assign({}, state);
}

/**
 * Takes an object and returns a ByteType instance
 * @param object 
 */
function buildByte(object: any): ByteType {
    let b: ByteType;

    console.log(object);

    let sections: Map<string, SectionType> = new Map(object.sections.map((s: any) => {
        let b = Object.assign({}, s);
        b.questions = new Map(s.questions.map((v: any, i: number) => {
            let c = Object.assign({}, v);
            c.options = new Map(v.options.map((o: any) => {
                return [o.id, o.text]
            }));
            c.id = i.toString();
            return [c.id, c];
        }));
        return [s.id, b];
    }));

    b = {
        id: object.id,
        image: object.image,
        name: object.name,
        description: object.description,
        creator: object.creator,
        materials: object.materials,
        sections: sections
    };

    return b;
}