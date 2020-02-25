
export const appendChildren = (name, runs, dataSet) => {
    let cell = document.getElementById(name)
    const runDiv = document.createElement("DIV")
    runDiv.style.padding = "4px"
    runDiv.style.width = "fit-content"
    // if (dataSet === name) {
    //     while (cell?.firstChild) {
    //         cell.removeChild(cell.firstChild)
    //     }
    // } else {
        runs.map(run => {
            runDiv.innerHTML = run
            cell?.appendChild(runDiv.cloneNode(true))
        })
    // }
}

export const removeChildren = (dataSet) => {
    let cell = document.getElementById(dataSet)
    const runDiv = document.createElement("DIV")
    runDiv.style.padding = "4px"
    runDiv.style.width = "fit-content"

    while (cell?.firstChild) {
        cell.removeChild(cell.firstChild)
    }
}