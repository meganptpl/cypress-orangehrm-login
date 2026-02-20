import LoginPage from '../../pages/LoginPageFinal'

const loginPage = new LoginPage()

describe('Login Feature - OrangeHRM', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('TC01 - Login success', () => {

        cy.intercept('POST', '**/auth/validate').as('loginRequest')

        loginPage.login('Admin', 'admin123')

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 302)
        cy.url().should('include', 'dashboard')
    })

    it('TC02 - Login wrong password', () => {
        loginPage.login('Admin', 'wrong123')
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC03 - Login empty username', () => {

        loginPage.passwordField().type('admin123')
        loginPage.loginButton().click()

        cy.contains('Required').should('be.visible')
    })

    it('TC04 - Login empty password', () => {

        loginPage.usernameField().type('Admin')
        loginPage.loginButton().click()

        cy.contains('Required').should('be.visible')
    })

    it('TC05 - Login both empty', () => {

        loginPage.loginButton().click()

        cy.contains('Required').should('be.visible')
    })
})