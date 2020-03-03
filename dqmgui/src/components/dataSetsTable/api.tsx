
import axios from "axios";

export const request = (searchFieldByDataset: string, searchFieldByRun: string) => axios({
  method: 'GET',
  url: `/data/json/samples?match=${searchFieldByDataset}&run=${searchFieldByRun}`,
  headers: []
});
