import { assoc } from 'ramda';

import { combineReducers } from 'redux';

export const Reducer = (state: any, { type, payload }: any): any => {
    switch (type) {
        case '':
            return '';
        default:
            return state;
    }
};
