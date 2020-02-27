
import axios from "axios";

export const request = (searchFieldByRun: string, searchFieldByDataset: string, selected_directories?: string[]) => {
  const joined_directories = selected_directories ? '/' + selected_directories.join('/') : ''
  return( axios({
    method: 'GET',
    url: `/archive/${searchFieldByRun}${searchFieldByDataset}${joined_directories}`,
    headers: []
  })
  )
}