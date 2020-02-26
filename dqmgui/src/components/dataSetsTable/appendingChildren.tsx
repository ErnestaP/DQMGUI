export const appendChildren = (name, runs, dataSet) => {
  let cell = document.getElementById(name)
  const runDiv = document.createElement("a")
  runDiv.setAttribute('href',`${name}${runs}`);
  runDiv.style.padding = "4px"
  runDiv.style.width = "fit-content"

  runs.map(run => {
    runDiv.innerHTML = run
    cell?.appendChild(runDiv.cloneNode(true))
  })
}

export const removeChildren = (dataSet) => {
  let cell = document.getElementById(dataSet)

  while (cell?.firstChild) {
    cell.removeChild(cell.firstChild)
  }
}