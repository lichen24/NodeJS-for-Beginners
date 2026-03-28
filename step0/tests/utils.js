import { writeFileSync} from 'fs'
import { join} from 'path'

const dbpath = join(process.cwd(), 'db.json')
const restoreDb = () => writeFileSync(dbpath, JSON.stringify([]))
const populateDb = (data) => writeFileSync(dbpath, JSON.stringify(data))

export { restoreDb, populateDb }