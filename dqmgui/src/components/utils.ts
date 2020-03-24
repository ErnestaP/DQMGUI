import { assoc, uniq } from "ramda"

export const format_search_field_string = (search_field_value: string) =>
  search_field_value.replace(' ', '.*')

export const format_header_path = (dataset = "", run = "", directories = []) =>
  [dataset, run].join('/')

export const formatDataForValidate = (data) => {
  const fieldsNames = Object.keys(data)
  const object: any = {}

  fieldsNames.map(name => {
    const splittedName = name.split('_')
    const id = splittedName[1]
    const propName = splittedName[0]
    object[id] = { run: '', dataset: '', selected: '' }
    object[id][`${propName}`] = data[name]
  }
  )
  console.log(object, data)
  return object

}

export const formInitialValues = (data) => {
  const ids = Object.keys(data)
  const object = {}

  ids.map(id => {
    const names = Object.keys(data[id])
    return names.map(name => {
      const fullname = ([name, id]).join('_')
      object[fullname] = data[id][name]
    })
  })

  return object
}