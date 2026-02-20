class DirectoryPage {

    directoryMenu() {
        return cy.contains('span', 'Directory')
    }

    searchNameField() {
        return cy.get('input[placeholder="Type for hints..."]')
    }

    searchButton() {
        return cy.contains('button', 'Search')
    }

    resetButton() {
        return cy.contains('button', 'Reset')
    }

    searchEmployee(name) {
        this.searchNameField().clear().type(name)
        this.searchButton().click()
    }

}

export default DirectoryPage