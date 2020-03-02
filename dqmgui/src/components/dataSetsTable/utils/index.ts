export const make_a_path = (dataset: string, run: string) => {
    const dataset_without_slash = dataset.substring(1, dataset.length)
    return `/data:/dataset${dataset_without_slash}&run=${run}`
  }
  