
import axios from "axios";

export const request = (searchFieldByDataset: string, searchFieldByRun: string) => axios({
  method: 'GET',
  url: `/data/json/samples?match=${searchFieldByDataset}&run=${searchFieldByRun}`,
  headers: []
});

// http://localhost:8081/dqm/offline/plotfairy/overlay?obj=archive/run/dataset/folders/NumberOfLayersPerTrackVsEta_ImpactPoint_GenTk;reflabel=312553;w=266;h=200