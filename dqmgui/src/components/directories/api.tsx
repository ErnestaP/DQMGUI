
import axios from "axios";
import { pathOr } from "ramda";

export const requestForDirectories = (searchFieldByRun: string,
  searchFieldByDataset: string,
  selected_directories?: string[]) => {

  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  return (axios({
    method: 'GET',
    url: `/data/json/archive/${searchFieldByRun}${searchFieldByDataset}${joined_directories}`,
    headers: []
  })
  )
}

export const request_for_images = (imagePropsObject: any) => {
  const selected_direcotories = pathOr([], ['selected_directory'], imagePropsObject)
  const joined_directories = selected_direcotories ? '/' + selected_direcotories.join('/') : ''
  const sizeArray = Object.values(pathOr('', ['size'], imagePropsObject))

  if (pathOr(false, ['removestats'], imagePropsObject) === true) {
    return `/plotfairy/archive/${pathOr('', ['run'], imagePropsObject)}${pathOr('', ['dataset'], imagePropsObject)}${joined_directories}/${pathOr('', ['name'], imagePropsObject)}?showstats=0;w=${sizeArray[0]};h=${sizeArray[1]}`
  }
  return `/plotfairy/archive/${pathOr('', ['run'], imagePropsObject)}${pathOr('', ['dataset'], imagePropsObject)}${joined_directories}/${pathOr('', ['name'], imagePropsObject)}?w=${sizeArray[0]};h=${sizeArray[1]}`
}