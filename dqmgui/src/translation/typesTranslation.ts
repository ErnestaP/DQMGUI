export const typesTranlsation = (type: string) => {
    const splittedType: string[] = type.split('_')
    if (typeof (splittedType) !== 'string') {
        const uppercased = splittedType.map((typeOne: string) =>
            typeOne.charAt(0).toUpperCase() + typeOne.slice(1))
        const joundedStrings = uppercased.join(" ")
        return joundedStrings
    }
    return type.charAt(0).toUpperCase() + type.slice(1)
}