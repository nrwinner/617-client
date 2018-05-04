export interface Action {
    type: string;
    id?: any;
    section?: any;
    data?: any;
    name?: string;
    question?: any;
    option?: any;
}

export const BYTE_CHANGE_SECTION = 'BYTE_CHANGE_SECTION';

export function byteChangeSection(id: string) {
    return {
        type: BYTE_CHANGE_SECTION,
        id: id
    }
}

export const INIT_CONSUMABLE_BYTE = 'INIT_CONSUMABLE_BYTE';

export function initConsumableByte(data: any) {
    return {
        type: INIT_CONSUMABLE_BYTE,
        data: data
    }
}

export const SELECT_QUESTION_OPTION = 'SELECT_QUESTION_OPTION';

export function selectQuestionOption(section: string, question: string, option: string) {
    return {
        type: SELECT_QUESTION_OPTION,
        section: section,
        question: question,
        option: option
    }
}

export const INIT_USER = 'INIT_USER';

export function initUser(userData: any) {
    return {
        type: INIT_USER,
        data: userData
    }
}

export const LOGOUT_USER = 'LOGOUT_USER';

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}