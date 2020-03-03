export const format_search_field_string = (search_field_value: string) =>
    search_field_value.replace(' ', '.*')

export const format_header_path = (dataset: string, run: string, directories: string[]) =>
    [dataset, run].concat(directories).join('/')

