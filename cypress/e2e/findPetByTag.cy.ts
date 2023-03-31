import tag1 from '../fixtures/findPetByTag/tag1.json'
import tag1tag2 from '../fixtures/findPetByTag/tag1_tag2.json'

// GET /api/v3/pet/findByTags
const tagsUrl = 'api/v3/pet/findByTags?'

describe('GET /pet/findByTags', () => {
  it('supports one existing tag', () => {
    cy.request(`${tagsUrl}tags=tag1`).as('taggedPets')

    cy.get('@taggedPets').then((response: any) => {
      expect(response.status).to.equal(200)

      expect(response.body).to.deep.equal(tag1)
    })
  })

  it('supports more existing tags', () => {
    cy.request(`${tagsUrl}tags=tag1&tags=tag2`).as('taggedPets')

    cy.get('@taggedPets').then((response: any) => {
      expect(response.status).to.equal(200)

      expect(response.body).to.deep.equal(tag1tag2)
    })
  })

  it('returns an empty array for inexisting tags', () => {
    cy.request(`${tagsUrl}tags=tag0`).as('taggedPets0')
    cy.request(`${tagsUrl}tags=tag5`).as('taggedPets5')
    cy.request(`${tagsUrl}tags=thiswillneverexist`).as('thiswillneverexist')

    const requests = ['@taggedPets0', '@taggedPets5', '@thiswillneverexist']

    requests.forEach((alias) => {
      cy.get(alias).then((response: any) => {
        expect(response.status).to.equal(200)

        expect(response.body).to.deep.equal([])
      })
    })
  })

  it('returns existing tags and ignores inexsting ones', () => {
    cy.request(`${tagsUrl}tags=tag1&tags=thiswillneverexist`).as('taggedPets')

    // I left this only to exemplify it can be used like this too
    cy.fixture('findPetByTag/tag1.json').then((json) => {
      cy.get('@taggedPets').then((response: any) => {
        expect(response.status).to.equal(200)

        expect(response.body).to.deep.equal(json)
      })
    })
  })

  context('without the tags parameter', () => {
    it('returns an error message', () => {
      cy.request({ url: 'api/v3/pet/findByTags', failOnStatusCode: false }).as(
        'missingTagsParameter'
      )
      cy.request({
        url: 'api/v3/pet/findByTags?incorrectParameter="tag1"',
        failOnStatusCode: false,
      }).as('otherParameters')

      cy.get('@missingTagsParameter').then((response: any) => {
        expect(response.status).to.equal(400)

        expect(response.body).to.equal('No tags provided. Try again?')
      })

      cy.get('@otherParameters').then((response: any) => {
        expect(response.status).to.equal(400)

        expect(response.body).to.equal('No tags provided. Try again?')
      })
    })
  })
})
