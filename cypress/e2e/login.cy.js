describe('OrangeHRM Login Feature', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    // =============================
    // POSITIVE TEST CASE
    // =============================

    it('TC01 - Login berhasil dengan data valid', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    // =============================
    // NEGATIVE TEST CASE
    // =============================

    it('TC02 - Login gagal dengan password salah', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('salah123')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC03 - Login gagal dengan username salah', () => {
        cy.get('input[name="username"]').type('WrongUser')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC04 - Login gagal jika semua field kosong', () => {
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message')
            .should('contain.text', 'Required')
    })

    it('TC05 - Login gagal jika username kosong', () => {
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message')
            .should('contain.text', 'Required')
    })

    it('TC06 - Login gagal jika password kosong', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message')
            .should('contain.text', 'Required')
    })

    // =============================
    // UI VALIDATION TEST CASE
    // =============================

    it('TC07 - Field username terlihat', () => {
        cy.get('input[name="username"]').should('be.visible')
    })

    it('TC08 - Field password terlihat', () => {
        cy.get('input[name="password"]').should('be.visible')
    })

    it('TC09 - Tombol login terlihat', () => {
        cy.get('button[type="submit"]').should('be.visible')
    })

    it('TC10 - Logo perusahaan tampil', () => {
        cy.get('img[alt="company-branding"]').should('be.visible')
    })

})