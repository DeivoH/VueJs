import Table from '@/pages/Components/Table.vue';
import { usePostsStore } from '@/stores/UsePostsStore'; // importa tu store real para poder usarlo en el test
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify()

describe('Table.vue - Test de integración', () => {
  it('renderiza título y tabla, y carga posts desde el store real', async () => {
    const wrapper = mount(Table, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    })

    const postsStore = usePostsStore()


    await postsStore.fetchPosts()


    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Listado de Post')
    expect(wrapper.find('table').exists()).toBe(true)

    // Asegurarte que al menos hay 1 post renderizado en la tabla
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBeGreaterThan(0)
  })

  it('simula click en botón "ver detalles" y muestra detalle', async () => {
    const wrapper = mount(Table, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    })

    const postsStore = usePostsStore()

    await postsStore.fetchPosts()
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('[data-test="btn-view-details"]')
    expect(buttons.length).toBeGreaterThan(0)

    await buttons[0].trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Título:')
    expect(wrapper.text()).toContain(postsStore.posts[0].title)
  })
})
