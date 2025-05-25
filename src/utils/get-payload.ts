import type { Payload } from 'payload'
import { getPayload as gPayload } from 'payload'
import payloadConfig from '@/payload.config'

let payloadClient: Payload | null = null

export async function getPayload(): Promise<Payload> {
  if (!payloadClient) {
    payloadClient = await gPayload({ config: payloadConfig })
  }
  return payloadClient
}
