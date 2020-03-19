
import axios from "axios";
import { pathOr, isEmpty, path, find, propEq } from "ramda";

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
  const selected_direcotories = pathOr([], ['plot', 'directories'], imagePropsObject)
  const joined_directories = selected_direcotories ? '/' + selected_direcotories.join('/') : ''
  const sizeArray = Object.values(pathOr('', ['size'], imagePropsObject))

  const run = pathOr('', ['plot', 'run'], imagePropsObject)
  const name = pathOr('', ['plot', 'name'], imagePropsObject)
  const dataset = pathOr('', ['plot', 'dataset'], imagePropsObject)
  const stats = pathOr(false, ['plot', 'stats'], imagePropsObject)

  const overlay = pathOr(undefined, ['overlay'], imagePropsObject)
  const runsForOverlay = pathOr(undefined, ['runsForOverlay'], imagePropsObject)
  const normalize = path(['plot', 'normalize'], imagePropsObject) ? 'True' : 'False'

  if (overlay && overlay !== 'onSide' && runsForOverlay) {
    const ids = runsForOverlay.map(run => run.id)

    const overlayPlots = ids.map(id => {
      const currentRunObject = runsForOverlay.find(obj => obj.id === id)
      const run = currentRunObject.run
      const selected = currentRunObject.selected
      const datasetO = isEmpty(currentRunObject.dataset) ? dataset : currentRunObject.dataset
      const label = isEmpty(currentRunObject.label) ? run : currentRunObject.label

      if (selected) {
        return `;obj=archive/${run}${datasetO}${joined_directories}/${name};reflabel=${label}`
      }
    })

    const joinedOverlaysImages = overlayPlots.join('')
    return `/plotfairy/overlay?ref=${overlay};obj=archive/${run}${dataset}${joined_directories}/${name}${joinedOverlaysImages};norm=${normalize};w=${sizeArray[0]};h=${sizeArray[1]}`
  }
  if (stats) {

    return `/plotfairy/archive/${run}${dataset}${joined_directories}/${name}?w=${sizeArray[0]};h=${sizeArray[1]}`
  }
  return `/plotfairy/archive/${run}${dataset}${joined_directories}/${name}?showstats=0;w=${sizeArray[0]};h=${sizeArray[1]}`
}

// http://localhost:8081/dqm/offline/plotfairy/overlay?ref=overlay;obj=archive/run/dataset/folders/plotoPavadinimas;reflabel=312553;w=266;h=200
// stacked zPointOfClosestApproachToPV_GenTk
//overlay zPointOfClosestApproachVsPhi_GenTk
