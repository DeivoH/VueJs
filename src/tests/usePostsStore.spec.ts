import { usePostsStore } from '@/stores/UsePostsStore'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock para useApi (ajusta la ruta según tu proyecto)
vi.mock('@/services/useApi', () => ({
  useApi: () => ({
    get: async () => ({
      data: { value: [{ userId: 0, id: 1, title: 'test', body: 'body' }] },
      response: { value: { status: 200 } },
    }),
  }),
}))

describe('usePostsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mapUserNames asigna nombres correctamente', () => {
    const store = usePostsStore()
    const posts = [
      { userId: 0, id: 1, title: 'test', body: 'body' },
      { userId: 99, id: 2, title: 'test2', body: 'body2' },
    ]
    const mapped = store.mapUserNames(posts)
    expect(mapped[0].userName).toBe('Alejandro')
    expect(mapped[1].userName).toBe('Sin usuario')
  })

  it('fetchPosts obtiene posts y cambia loading', async () => {
    const store = usePostsStore()

    expect(store.loading).toBe(false)

    const promise = store.fetchPosts()
    expect(store.loading).toBe(true)

    await promise

    expect(store.loading).toBe(false)
    expect(store.posts.length).toBeGreaterThan(0)
  })

  it('setDetails asigna selectedPost sin fetch cuando severQuery es false', async () => {
    const store = usePostsStore()
    store.severQuery = false

    const post = { userId: 0, id: 1, title: 'test', body: 'body' }
    await store.setDetails(post)

    expect(store.selectedPost).toEqual(post)
  })

  it('setDetails llama fetchPosts cuando severQuery es true', async () => {
    const store = usePostsStore()
    store.severQuery = true

    const spy = vi.spyOn(store, 'fetchPosts').mockResolvedValue(undefined)
    const post = { userId: 0, id: 1, title: 'test', body: 'body' }

    await store.setDetails(post)

    expect(spy).toHaveBeenCalledWith(post.id)
    spy.mockRestore()
  })
})
