import {pathOr} from 'ramda'

export const searchFieldValue = (state: any) => pathOr('', ['form', 'MAIN_FORM', 'values', 'searchField'], state)
export const searchFieldByRunValue = (state: any) => pathOr('', ['form', 'MAIN_FORM', 'values', 'searchFieldByRun'], state)