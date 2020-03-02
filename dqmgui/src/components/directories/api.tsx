
import axios from "axios";

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

export const request_for_images = (searchFieldByRun: string,
  searchFieldByDataset: string,
  selected_directories: string[],
  name_of_image: string,
  image_width = '244',
  image_height = '222') => {
  // https://cmsweb.cern.ch/dqm/offline/plotfairy/archive/331621/Global/Online/ALL/L1T/L1TStage2CaloLayer1/MismatchDetail/maxEvtMismatchByLumiHCAL?w=1906;h=932
  // https://cmsweb.cern.ch/dqm/online/plotfairy/archive/331621/dataset/L1T/L1TStage2CaloLayer1/MismatchDetail/maxEvtMismatchByLumiHCAL?w=1906;h=932
  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  // return names_of_images.map((name_of_image: string) =>
   return axios({
      method: 'GET',
      // url: `http://localhost:8081/dqm/offline/plotfairy/archive/${searchFieldByRun}/dataset${searchFieldByDataset}${joined_directories}/${name_of_image}?w=${image_width};h=${image_height}`,
      url: `plotfairy/archive/${searchFieldByRun}/dataset${searchFieldByDataset}${joined_directories}/${name_of_image}?w=${image_width};h=${image_height}`,
      headers: []
    })
  // )
}