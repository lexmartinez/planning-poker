const format = (input: string, format: any, sep: string) => {
  let output = ''
  let idx = 0
  for (let i = 0; i < format.length && idx < input.length; i++) {
    output += input.substr(idx, format[i])
    if (idx + format[i] < input.length) output += sep
    idx += format[i]
  }
  output += input.substr(idx)
  return output
}

export default {
  sessionId: (input: string) => {
    return format(input, [4,4,4,4], '-').substring(0,19)
  }
}
