import type { Payload } from 'payload'
import payloadConfig from '@/payload.config'
import { getPayload as gPayload } from 'payload'

let payloadClient: Payload | null = null

export async function getPayload(): Promise<Payload> {
  if (!payloadClient) {
    payloadClient = await gPayload({ config: payloadConfig })
  }
  return payloadClient
}
