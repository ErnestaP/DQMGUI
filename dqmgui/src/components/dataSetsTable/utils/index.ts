export const make_a_path = (dataset: string, run: string) => {
    const dataset_without_slash = dataset.substring(1, dataset.length)
    return `/samples:/dataset${dataset_without_slash}&run=${run}`
  }
  