import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { sendContactEmail } from './sendContactEmail'
import { validateContactPayload } from './contactValidation'

const readBody = async (req: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf-8')
}

const json = (res: ServerResponse, code: number, payload: Record<string, unknown>) => {
  res.statusCode = code
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export const contactApiPlugin = (): Plugin => ({
  name: 'contact-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (req, res, next) => {
      if (req.method !== 'POST') {
        json(res, 405, { error: 'Method not allowed' })
        return
      }

      try {
        const bodyText = await readBody(req)
        const parsedBody = JSON.parse(bodyText) as unknown
        const payload = validateContactPayload(parsedBody)
        await sendContactEmail(payload)
        json(res, 200, { success: true })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        json(res, 400, { error: message })
      }
      return
    })
  },
})
