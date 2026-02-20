import LoginPage from '../../pages/LoginPage'

describe('OrangeHRM Login Feature - POM', () => {

    const loginPage = new LoginPage()

    beforeEach(() => {
        loginPage.visit()
    })

    it('TC01 - Login berhasil dengan data valid', () => {
        cy.fixture('loginData').then((data) => {
            loginPage.inputUsername(data.validUser.username)
            loginPage.inputPassword(data.validUser.password)
            loginPage.clickLogin()
            loginPage.verifyDashboard()
        })
    })

    it('TC02 - Login gagal dengan password salah', () => {
        cy.fixture('loginData').then((data) => {
            loginPage.inputUsername(data.invalidPassword.username)
            loginPage.inputPassword(data.invalidPassword.password)
            loginPage.clickLogin()
            loginPage.verifyInvalidCredentials()
        })
    })

    it('TC03 - Login gagal dengan username salah', () => {
        cy.fixture('loginData').then((data) => {
            loginPage.inputUsername(data.invalidUsername.username)
            loginPage.inputPassword(data.invalidUsername.password)
            loginPage.clickLogin()
            loginPage.verifyInvalidCredentials()
        })
    })

    it('TC04 - Login gagal jika semua field kosong', () => {
        loginPage.clickLogin()
        loginPage.verifyRequiredField()
    })

    it('TC05 - Login gagal jika username kosong', () => {
        cy.fixture('loginData').then((data) => {
            loginPage.inputPassword(data.validUser.password)
            loginPage.clickLogin()
            loginPage.verifyRequiredField()
        })
    })

})
