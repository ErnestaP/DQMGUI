
import axios from "axios";
import { pathOr, isEmpty, path } from "ramda";

interface API_params_pros {
  run: string,
  dataset: string,
  directories: string,
  name: string,
  plot_width: string,
  plot_height: string,
  overlay_plots?: string,
  overlay?: string,
  normalize?: string,
  label?: string,
  stats: string,
}

const api_for_plot_without_stats = (api_params: API_params_pros) =>
  `/plotfairy/archive/${api_params.run}${api_params.dataset}${api_params.directories}/${api_params.name}?showstats=0;w=${api_params.plot_width};h=${api_params.plot_height}`

const api_for_plot_with_stats = (api_params: API_params_pros) =>
  `/plotfairy/archive/${api_params.run}${api_params.dataset}${api_params.directories}/${api_params.name}?w=${api_params.plot_width};h=${api_params.plot_height}`

const api_for_one_overlay_plot = (api_params: API_params_pros) =>
  `;obj=archive/${api_params.run}${api_params.dataset}${api_params.directories}/${api_params.name};reflabel=${api_params.label}`

const api_for_overlayed_plots_with_stats = (api_params: API_params_pros) =>
  `/plotfairy/overlay?ref=${api_params.overlay};obj=archive/${api_params.run}${api_params.dataset}${api_params.directories}/${api_params.name}${api_params.overlay_plots};norm=${api_params.normalize};w=${api_params.plot_width};h=${api_params.plot_height}`

  const api_for_overlayed_plots_without_stats = (api_params: API_params_pros) =>
  `/plotfairy/overlay?ref=${api_params.overlay};obj=archive/${api_params.run}${api_params.dataset}${api_params.directories}/${api_params.name}${api_params.overlay_plots};norm=${api_params.normalize};showstats=0;w=${api_params.plot_width};h=${api_params.plot_height}`

export const requestForDirectories = (searchFieldByRun: string,
  searchFieldByDataset: string,
  selected_directories?: string[]) => {

  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  return (axios({
    method: 'GET',
    url: `/api/data/json/archive/${searchFieldByRun}${searchFieldByDataset}${joined_directories}`,
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

  const params_form_api: API_params_pros = {
    run: run,
    dataset: dataset,
    directories: joined_directories,
    name: name,
    plot_width: sizeArray[0],
    plot_height: sizeArray[1]
  }

  if (overlay && overlay !== 'onSide' && runsForOverlay) {
    const ids = Object.keys(runsForOverlay)
    const overlayPlots = ids.map(id => {
      const currentRunObject = runsForOverlay[id]
      const run = currentRunObject.run
      const selected = currentRunObject.selected
      const dataset_for_overlay_plot = isEmpty(currentRunObject.dataset) ? dataset : currentRunObject.dataset
      const label = isEmpty(currentRunObject.label) ? run : currentRunObject.label


      const params_for_api: API_params_pros = {
        run: run,
        dataset: dataset_for_overlay_plot,
        directories: joined_directories,
        name: name,
        label: label,
        plot_width: sizeArray[0],
        plot_height: sizeArray[1],
      }

      if (selected) {
        return api_for_one_overlay_plot(params_for_api)
      }
    })

    const joinedOverlaysImages = overlayPlots.join('')
    const api_params: API_params_pros = {
      overlay: overlay,
      run: run,
      name: name,
      dataset: dataset,
      directories: joined_directories,
      normalize: normalize,
      plot_width: sizeArray[0],
      plot_height: sizeArray[1],
      overlay_plots: joinedOverlaysImages,
    }
    if(stats){
      return api_for_overlayed_plots_with_stats(api_params)
    }
    return api_for_overlayed_plots_without_stats(api_params)
  }

  if (stats) {
    return api_for_plot_with_stats(params_form_api)
  }
  return api_for_plot_without_stats(params_form_api)
}

// http://localhost:8081/dqm/offline/plotfairy/overlay?ref=overlay;obj=archive/run/dataset/folders/plotoPavadinimas;reflabel=312553;w=266;h=200
// stacked zPointOfClosestApproachToPV_GenTk
//overlay zPointOfClosestApproachVsPhi_GenTk
