describe('Platzi Categories API - Stable Version', () => {

    const baseUrl = 'https://api.escuelajs.co/api/v1'

    // 1
    it('TC01 - GET all categories', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.status).to.eq(200)
            })
    })

    // 2
    it('TC02 - Validate categories is array', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.body).to.be.an('array')
            })
    })

    // 3
    it('TC03 - Validate array not empty', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.body.length).to.be.greaterThan(0)
            })
    })

    // 4
    it('TC04 - Validate first category has id', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.body[0]).to.have.property('id')
            })
    })

    // 5
    it('TC05 - Validate first category has name', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.body[0]).to.have.property('name')
            })
    })

    // 6
    it('TC06 - Validate first category has image', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.body[0]).to.have.property('image')
            })
    })

    // 7
    it('TC07 - GET single category dynamic id', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                const firstId = res.body[0].id

                cy.request(`${baseUrl}/categories/${firstId}`)
                    .then(singleRes => {
                        expect(singleRes.status).to.eq(200)
                    })
            })
    })

    // 8
    it('TC08 - Validate single category structure', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                const firstId = res.body[0].id

                cy.request(`${baseUrl}/categories/${firstId}`)
                    .then(singleRes => {
                        expect(singleRes.body).to.have.property('id')
                        expect(singleRes.body).to.have.property('name')
                        expect(singleRes.body).to.have.property('image')
                    })
            })
    })

    // 9
    it('TC09 - Validate header content-type', () => {
        cy.request(`${baseUrl}/categories`)
            .then(res => {
                expect(res.headers['content-type']).to.include('application/json')
            })
    })

    // 10
    it('TC10 - GET category not found dynamic', () => {
        cy.request({
            url: `${baseUrl}/categories/99999999`,
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.be.oneOf([404, 400])
        })
    })

})