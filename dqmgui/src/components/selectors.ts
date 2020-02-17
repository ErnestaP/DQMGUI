import { pathOr, path } from 'ramda'
import { createSelector } from 'reselect'

export const getSamplesByDataSet = (state: any) => path(['SAMPLES', 'SAMPLES_BY_DATASET', 'samplesList'], state);
export const getSamplesByRuns = (state: any) => path(['SAMPLES', 'SAMPLES_BY_RUN', 'samplesList'], state);

export const getAllSamples = createSelector(
    getSamplesByDataSet,
    getSamplesByRuns,
    (samplesByDataSet, samplesByRuns: any) => {
        const ob = []

        const dataSetsNamesFromSearchByDataSet = samplesByDataSet.map(sampleByDataSet => {
            return Object.keys(pathOr([], ['items'], sampleByDataSet))
        })

        const dataSetsNamesFromSearchByRun = (dataSetName: string) => samplesByRuns.map(sampleByRun => {
            const p = {}
            const itemObjectByDataSet = pathOr([], ['items', dataSetName], sampleByRun);
            console.log(sampleByRun)
            const object = {
                items: { [dataSetName]: '' },
                type: pathOr('', ['type'], sampleByRun)
            }

            object.items[dataSetName] = itemObjectByDataSet
            return object
        })
        const filtered = dataSetsNamesFromSearchByDataSet.map(array =>
            array.map(name => {
               console.log( dataSetsNamesFromSearchByRun(name))
                if (name) {
                    return dataSetsNamesFromSearchByRun(name)
                }
            }

            ))
        console.log(filtered)
    })