import type { ContactFormPayload } from '@/types/contact'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clean = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

export const validateContactPayload = (body: unknown): ContactFormPayload => {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid payload')
  }

  const source = body as Record<string, unknown>
  const name = clean(source.name)
  const email = clean(source.email)
  const subject = clean(source.subject)
  const message = clean(source.message)

  if (!name) throw new Error('Name is required')
  if (!email) throw new Error('Email is required')
  if (!EMAIL_REGEX.test(email)) throw new Error('Email is invalid')
  if (!subject) throw new Error('Subject is required')
  if (!message) throw new Error('Message is required')
  if (message.length < 10) throw new Error('Message must be at least 10 characters')

  return { name, email, subject, message }
}
