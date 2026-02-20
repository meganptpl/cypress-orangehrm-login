import LoginPage from '../../pages/LoginPageFinal'
import DirectoryPage from '../../pages/DirectoryPage'

const loginPage = new LoginPage()
const directoryPage = new DirectoryPage()

describe('Directory Feature', () => {

    beforeEach(() => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        loginPage.login('Admin', 'admin123')

        cy.url().should('include', 'dashboard')
        cy.contains('Dashboard', { timeout: 10000 }).should('be.visible')

        directoryPage.directoryMenu().click()

        cy.url().should('include', 'directory')
    })

    it('TC09 - Open directory page', () => {
        cy.url().should('include', 'directory')
    })

    it('TC10 - Search employee', () => {

        directoryPage.searchEmployee('a')

        cy.get('input[placeholder="Type for hints..."]')
            .should('have.value', 'a')

    })

    it('TC11 - Reset search', () => {

        directoryPage.searchEmployee('Linda')
        directoryPage.resetButton().click()

        cy.get('input[placeholder="Type for hints..."]')
            .should('have.value', '')

    })

    it('TC12 - Verify employee cards visible', () => {

        cy.get('.oxd-grid-item', { timeout: 10000 })
            .its('length')
            .should('be.gt', 0)

    })
})