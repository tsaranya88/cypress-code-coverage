
describe('Payments Feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })

  it('Add Payments', () => {
    cy.get('example-comp').shadow().find('#cc-name').type('Saranya')
    cy.get('example-comp').shadow().find('#cc-number').type('123456789')
    cy.get('example-comp').shadow().find('#cc-expiration').type('05/10')
    cy.get('example-comp').shadow().find('#cc-cvv').type('171')
    cy.get('example-comp').shadow().find('.btn-primary').click()

    cy.get('example-comp').shadow().find('#json').should(
      'have.text',
      'Succesfully saved {"name":"Saranya","number":"123456789","expiration":"05/10","cvv":"171"}'
    )
  })

  it('Cancel Payments', () => {
    cy.get('example-comp').shadow().find('.btn-sec').click()
    cy.get('example-comp').shadow().find('#json').should(
      'have.text',
      ''
    )
  })
})