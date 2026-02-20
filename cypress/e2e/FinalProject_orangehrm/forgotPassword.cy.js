import LoginPage from '../../pages/LoginPageFinal'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage'

const loginPage = new LoginPage()
const forgotPage = new ForgotPasswordPage()

describe('Forgot Password Feature', () => {

    beforeEach(() => {
        cy.visit('/web/index.php/auth/login')
        loginPage.forgotPasswordLink().click()
    })

    it('TC06 - Reset password success', () => {

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.contains('Reset Password link sent successfully', { timeout: 10000 })
            .should('be.visible')

    })

    it('TC07 - Reset with empty username', () => {
        forgotPage.resetButton().click()
        cy.contains('Required').should('be.visible')
    })

    it('TC08 - Cancel reset', () => {
        forgotPage.cancelButton().click()
        cy.url().should('include', 'login')
    })
})