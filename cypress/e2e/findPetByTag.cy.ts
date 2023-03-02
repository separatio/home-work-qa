// GET /api/v3/pet/findByTags
const tagsUrl = 'api/v3/pet/findByTags?'

describe('GET /pet/findByTags', () => {
  it('lists pets tagged with tag1', () => {
    cy.request(`${tagsUrl}tags=tag1`).as('taggedPets')

    cy.fixture('findPetByTag/tag1.json').then((json) => {
      cy.get('@taggedPets').then((response: any) => {
        expect(response.body).to.deep.equal(json)
        expect(response.status).to.eq(200)
      })
    })
  })

  // it('lists pets tagged with tag1 and tag2', () => {
  //   cy.request(`${tagsUrl}tags=tag1&tags=tag2`).as('taggedPets')

  //   cy.get('@taggedPets').then((response: any) => {})
  // })

  // it('lists pets tagged with tag0', () => {
  //   cy.request(`${tagsUrl}tags=tag0`).as('taggedPets')

  //   cy.get('@taggedPets').then((response: any) => {})
  // })

  // it('lists pets tagged with tag5', () => {
  //   cy.request(`${tagsUrl}tags=tag5`).as('taggedPets')

  //   cy.get('@taggedPets').then((response: any) => {})
  // })

  // it('lists pets tagged with thiswillneverexist', () => {
  //   cy.request(`${tagsUrl}tags=thiswillneverexist`).as('taggedPets')

  //   cy.get('@taggedPets').then((response: any) => {})
  // })

  // it('lists pets tagged with tag1 and thiswillneverexist', () => {
  //   cy.request(`${tagsUrl}tags=tag1&tags=thiswillneverexist`).as('taggedPets')

  //   cy.get('@taggedPets').then((response: any) => {})
  // })
})
