export function getEnvVar(paramName: string): string {
  const value = process.env[paramName]
  if (value) {
    return value
  } else {
    throw new Error(`Environment variable ${paramName} not found`)
  }
}

export function shuffleArray<T>(array: T[]) {
  const newArray = array.slice(0)

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}
