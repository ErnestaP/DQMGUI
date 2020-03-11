
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
  const run = pathOr('', ['run'], imagePropsObject)
  const name = pathOr('', ['name'], imagePropsObject)
  const dataset = pathOr('', ['dataset'], imagePropsObject)
  const secondDataset = pathOr([], ['secondDataset'], imagePropsObject)
  const removestats = pathOr(false, ['removestats'], imagePropsObject)
  const overlay = pathOr(undefined, ['overlay'], imagePropsObject)
  const secondRun = pathOr([], ['secondRun'], imagePropsObject)
  const label = pathOr(secondRun, ['label'], imagePropsObject)

  if (overlay && secondRun) {
    const secondRuns = secondRun.map(runForOner, index => {
      const labelForRun =  label[index]
      const datasetForRun =  secondDataset[index]

      return `obj=archive/${runForOner}${datasetForRun}${joined_directories}/${name};reflabel=${labelForRun}`
    }
      )
    return (`/plotfairy/overlay?ref=${overlay};obj=archive/${run}${dataset}${joined_directories}/${name};${secondRuns};w=${sizeArray[0]};h=${sizeArray[1]}`)
  }
  else if (removestats) {
    return `/plotfairy/archive/${run}${dataset}${joined_directories}/${name}?showstats=0;w=${sizeArray[0]};h=${sizeArray[1]}`
  }
  return `/plotfairy/archive/${run}${dataset}${joined_directories}/${name}?w=${sizeArray[0]};h=${sizeArray[1]}`
}

// http://localhost:8081/dqm/offline/plotfairy/overlay?ref=overlay;obj=archive/run/dataset/folders/plotoPavadinimas;reflabel=312553;w=266;h=200
// stacked zPointOfClosestApproachToPV_GenTk
//overlay zPointOfClosestApproachVsPhi_GenTk
