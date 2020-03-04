
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
  size: any) => {
  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  const sizeArray = Object.values(size)
  return `/plotfairy/archive/${searchFieldByRun}${searchFieldByDataset}${joined_directories}/${name_of_image}?w=${sizeArray[0]};h=${sizeArray[1]}`
}