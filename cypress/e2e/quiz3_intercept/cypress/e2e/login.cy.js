describe('OrangeHRM Login Feature - With Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // =============================
  // TC01 - Positive Login
  // Intercept POST validate login
  // =============================
  it('TC01 - Login berhasil dengan data valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302)

    cy.url().should('include', '/dashboard')
  })


  // =============================
  // TC02 - Password Salah
  // Intercept + validate request body
  // =============================
  it('TC02 - Login gagal dengan password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('invalidLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidLogin')
      .its('request.body')
      .should('include', 'salah123')

    cy.contains('Invalid credentials').should('be.visible')
  })


  // =============================
  // TC03 - Username Salah
  // Intercept + validate response status
  // =============================
  it('TC03 - Login gagal dengan username salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongUser')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongUser')
      .its('response.statusCode')
      .should('eq', 302)

    cy.contains('Invalid credentials').should('be.visible')
  })


  // =============================
  // TC04 - Login Berhasil + Intercept Dashboard API
  // =============================
  it('TC04 - Login sukses dan dashboard API terpanggil', () => {

    cy.intercept('GET', '**/api/v2/dashboard/**').as('dashboardAPI')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@dashboardAPI')
      .its('response.statusCode')
      .should('eq', 200)

    cy.contains('Dashboard').should('be.visible')
  })


  // =============================
  // TC05 - Intercept dengan header validation
  // =============================
  it('TC05 - Validasi header request login', () => {

    cy.intercept('POST', '**/auth/validate').as('loginHeader')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginHeader')
      .its('request.headers')
      .should('have.property', 'content-type')
  })

})