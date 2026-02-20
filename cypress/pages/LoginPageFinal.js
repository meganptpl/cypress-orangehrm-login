class LoginPageFinal {

    usernameField() {
        return cy.get('input[name="username"]')
    }

    passwordField() {
        return cy.get('input[name="password"]')
    }

    loginButton() {
        return cy.get('button[type="submit"]')
    }

    forgotPasswordLink() {
        return cy.contains('Forgot your password?')
    }

    login(username, password) {
        this.usernameField().type(username)
        this.passwordField().type(password)
        this.loginButton().click()
    }
}

export default LoginPageFinal