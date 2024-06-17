
import fs from 'fs'
import path from 'path'

export function getJsonFile(filename: string) {
  const prefix = path.join(process.cwd(), '')
  const fileContents = fs.readFileSync(path.join(prefix, `${filename}.json`), 'utf8')

  try {
    return JSON.parse(fileContents)
  } catch {
    return null
  }
}
