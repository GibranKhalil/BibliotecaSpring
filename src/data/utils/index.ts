export function limitText (string: string, maxLength: number){
    return `${string.slice(0, maxLength)}...`
}