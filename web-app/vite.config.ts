import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)

const cliPlugin = () => ({
  name: 'cli-plugin',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/generate-report' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk: any) => body += chunk.toString())
        req.on('end', async () => {
          try {
            const inputPath = path.resolve(process.cwd(), 'temp-input.json')
            const outputPath = path.resolve(process.cwd(), 'temp-output.html')
            fs.writeFileSync(inputPath, body)
            
            const cliPath = path.resolve(process.cwd(), '../dist/cli/index.js')
            await execAsync(`node "${cliPath}" service-report generate -i "${inputPath}" -o "${outputPath}"`, { cwd: path.resolve(process.cwd(), '..') })
            
            const html = fs.readFileSync(outputPath, 'utf-8')
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } catch (e: any) {
            res.statusCode = 500
            res.end(e.message)
          }
        })
      } else {
        next()
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cliPlugin()],
})
