import { Post } from '@/interfaces/Post';
import { defineStore } from 'pinia';
const { toast } = useToast();
export const usePostsStore = defineStore('usePostsStore', {
  state: () => ({
    posts: [] as Post[],
    selectedPost: null as Post | null,
    users: [
      "Alejandro", "Laura", "Esteban", "Karen", "Santiago",
      "Raul", "Felipe", "Camila", "Davis", "Maria",
    ],
    loading: false as Boolean,
    severQuery: false as Boolean,
  }),

  actions: {
    mapUserNames(data: Post[]): Post[] {
      return data.map(post => ({
        ...post,
        userName: this.users[post.userId] ?? 'Sin usuario',
      }))
    },

    async fetchPosts(id?: number) {

      try {
        const url = id
          ? `https://jsonplaceholder.typicode.com/posts/${id}`
          : `https://jsonplaceholder.typicode.com/posts`

        this.loading = true
        const { data, response } = await useApi(url).get()
        this.loading = false

        if (response.value?.status === 200 && data.value) {
          if (Array.isArray(data.value)) {
            this.posts = this.mapUserNames(data.value)
          } else {
            this.selectedPost = {
              ...data.value,
              userName: this.users[data.value.userId] ?? 'Sin usuario',
            }
          }
        } else {
          this.posts = []
        }
      } catch (error) {
        toast("Error", "Ocurrió un problema al cargar las publicaciones. Por favor, intenta nuevamente más tarde.", "danger");
        this.posts = []
      }
    },

    async setDetails(item: Post) {
      if (this.severQuery) {
        await this.fetchPosts(item.id)
      } else {
        this.selectedPost = item
      }
    },
  },
})
