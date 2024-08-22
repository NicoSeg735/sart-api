import { exec } from 'child_process'

const migrationName = process.argv[2]

if (!migrationName) {
  console.error('Por favor, proporciona un nombre para la migración.')
  process.exit(1)
}

const formattedName = migrationName.toLowerCase().replace(/\s+/g, '-')

const command = `pnpx typeorm-ts-node-esm migration:generate ./src/migrations/${formattedName} -d ./src/db.ts`

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`)
    return
  }
  console.log(`Stdout: ${stdout}`)
})
