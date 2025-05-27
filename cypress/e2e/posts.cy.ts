/// <reference types="cypress" />

describe('Listado de Posts flujo ', () => {

    beforeEach(() => {
        //interceptar la consulta de la api
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts').as('getPosts')

        //renderizado
        cy.visit('/posts')

        //obtencion de respuesta de API 
        cy.wait('@getPosts').its('response.statusCode').should('eq', 200)
    })

    it('Mostrar tabla y renderizado de componente', () => {

        //Que no esté en pantalla de carga
        cy.get('.loading', { timeout: 10000 }).should('not.exist')
        cy.get('.loading-logo', { timeout: 10000 }).should('not.exist')

        // renderizado de tabla
        cy.get('table').should('exist')
        // que contenga datos de API
        cy.get('tbody tr').should('have.length.greaterThan', 0)
    })

    it('debería mostrar los detalles del post al hacer clic en el botón de ver detalles', () => {

        cy.get('[data-test="btn-view-details"]').first().click()

        cy.get('h3').should('contain.text', 'Post de:')

        cy.get('p').should('contain.text', 'Título:')
        cy.get('p').should('contain.text', 'Contenido:')
    })

    it('Mostrar mensaje de "Seleccione un ítem" si no hay selección', () => {
        cy.get('p.text-grey').should('contain.text', 'Seleccione un ítem para ver los detalles.')
    })

    it('debería alternar el switch de petición al servidor', () => {
        cy.get('input[type="checkbox"]').as('switch')

        cy.get('@switch').click({ force: true })

        cy.get('@switch').should('be.checked')
    })

    it('debería alternar el switch de petición al servidor', () => {
        cy.visit('/posts')

        cy.get('input[type="checkbox"]').as('switch')

        cy.get('@switch').click({ force: true })

        // Verifica que el switch quedó activo
        cy.get('@switch').should('be.checked')
    })
})
