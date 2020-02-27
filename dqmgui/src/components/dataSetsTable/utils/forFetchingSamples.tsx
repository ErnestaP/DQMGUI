
import axios from "axios";

import { SampleDataInerface } from './interfaces';

export const formatDataset = (sampleList: any[]) => {
  const results: any = []

  sampleList.map((sample: SampleDataInerface, index: number) => {
    results.push({ items: {}, type: sample.type })
    sample.items.map((item: any) => {
      if (results[index].items[item.dataset] === undefined) {
        results[index].items[item.dataset] = { runs: {} }
      }
      results[index].items[item.dataset].runs[item.run] = { importversion: item.importversion }
    })
  })

  return (results)
}

export const request = (searchFieldByDataset: string, searchFieldByRun: string) => axios({
  method: 'GET',
  url: `/samples?match=${searchFieldByDataset}&run=${searchFieldByRun}`,
  headers: []
});
