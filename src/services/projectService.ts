import { supabase } from './supabaseService';
import type { Project } from '../types/project'
import type { Service } from '../types/service'

type ApiPayload<T> = { data?: T } | null

const cacheDurationMs = 60_000
const requestCache = new Map<string, { expiresAt: number; promise: Promise<unknown> }>()

function invokeCached<T>(functionName: string): Promise<T> {
  const cached = requestCache.get(functionName)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise as Promise<T>
  }

  const entry: { expiresAt: number; promise: Promise<unknown> } = {
    expiresAt: Number.POSITIVE_INFINITY,
    promise: Promise.resolve(),
  }
  const promise = supabase.functions.invoke<T>(functionName).then(({ data, error }) => {
    if (error) {
      requestCache.delete(functionName)
      throw error
    }

    entry.expiresAt = Date.now() + cacheDurationMs
    return data
  }, (error: unknown) => {
    requestCache.delete(functionName)
    throw error
  })

  entry.promise = promise
  requestCache.set(functionName, entry)
  return promise
}

export const getProjects = () => {
  return invokeCached<ApiPayload<Project[]>>('get-projects')
}

export const getServices = () => {
  return invokeCached<ApiPayload<Service[]>>('get-services')
}

export const getSiteContent = () => {
  return invokeCached<ApiPayload<unknown[]>>('get-site-content')
}