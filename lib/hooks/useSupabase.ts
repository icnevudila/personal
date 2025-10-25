import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'

export function useSupabaseData<T>(
  table: string,
  options?: {
    select?: string
    filter?: { column: string; value: any }
    orderBy?: { column: string; ascending?: boolean }
  }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    async function fetchData() {
      try {
        setLoading(true)
        let query = supabase.from(table).select(options?.select || '*')

        if (options?.filter) {
          query = query.eq(options.filter.column, options.filter.value)
        }

        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          })
        }

        const { data, error } = await query

        if (error) throw error
        setData((data as T[]) || [])
      } catch (err) {
        setError(err as Error)
        console.error('Supabase fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, options?.filter?.value])

  return { data, loading, error }
}

export function useSupabaseInsert<T>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const insert = async (data: Partial<T>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured')
    }

    try {
      setLoading(true)
      const { data: insertedData, error } = await supabase
        .from(table)
        .insert(data)
        .select()

      if (error) throw error
      return insertedData
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { insert, loading, error }
}

export function useSupabaseUpdate<T>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const update = async (id: string | number, data: Partial<T>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured')
    }

    try {
      setLoading(true)
      const { data: updatedData, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()

      if (error) throw error
      return updatedData
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { update, loading, error }
}

export function useSupabaseDelete(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteRecord = async (id: string | number) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured')
    }

    try {
      setLoading(true)
      const { error } = await supabase.from(table).delete().eq('id', id)

      if (error) throw error
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { deleteRecord, loading, error }
}

