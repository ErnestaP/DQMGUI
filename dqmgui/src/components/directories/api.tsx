
import axios from "axios";

export const requestForDirectories = (searchFieldByRun: string,
  searchFieldByDataset: string,
  selected_directories?: string[]) => {

  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  return (axios({
    method: 'GET',
    url: `/archive/${searchFieldByRun}${searchFieldByDataset}${joined_directories}`,
    headers: []
  })
  )
}

export const request_for_images = (searchFieldByRun: string,
  searchFieldByDataset: string,
  selected_directories: string[],
  image_width = '244',
  image_height = '222') => {

  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  return (axios({
    method: 'GET',
    url: `/archive/${searchFieldByRun}${searchFieldByDataset}${joined_directories}?w=${image_width};h=${image_height}`,
    headers: []
  })
  )
}