import { SampleDataInerface } from "../ducks/header/interfaces"

export const make_a_path = (dataset: string, run: string) => {
  const dataset_without_slash = dataset.substring(1, dataset.length)
  return `/:data?dataset=${dataset_without_slash}&run=${run}`
}

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