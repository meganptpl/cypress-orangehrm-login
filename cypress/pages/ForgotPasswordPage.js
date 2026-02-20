class ForgotPasswordPage {

    usernameField() {
        return cy.get('input[name="username"]')
    }

    resetButton() {
        return cy.get('button[type="submit"]')
    }

    cancelButton() {
        return cy.contains('Cancel')
    }

    resetPassword(username) {
        this.usernameField().type(username)
        this.resetButton().click()
    }
}

export default ForgotPasswordPage