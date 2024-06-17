import path from "path";
import {promises as fs} from "fs";

export default async function getJsonFile(){
  const jsonDirectory = path.join(process.cwd(), 'public');
  const fileContents = await fs.readFile(jsonDirectory + '/data/home.json', 'utf8'); 
  try {
    return JSON.parse(fileContents)
  } catch {
    return null
  }
}