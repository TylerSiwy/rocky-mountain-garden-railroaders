import type { ContactFormPayload } from '@/types/contact'

const requiredEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const esc = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const createMessage = (payload: ContactFormPayload): string =>
  [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    '',
    payload.message,
  ].join('\n')

export const sendContactEmail = async (payload: ContactFormPayload): Promise<void> => {
  const mailgunDomain = requiredEnvVar('MAILGUN_DOMAIN')
  const mailgunBaseUrl = process.env.MAILGUN_BASE_URL ?? 'https://api.mailgun.net'
  const response = await fetch(`${mailgunBaseUrl}/v3/${mailgunDomain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${requiredEnvVar('MAILGUN_API_KEY')}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      from: `RMGR Website <${requiredEnvVar('CONTACT_FROM_EMAIL')}>`,
      to: requiredEnvVar('CONTACT_TO_EMAIL'),
      subject: `[RMGR Contact] ${payload.subject}`,
      text: createMessage(payload),
      'h:Reply-To': payload.email,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Mailgun request failed: ${response.status} ${body}`)
  }
}
