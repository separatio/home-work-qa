// PUT /pet
import createNewPet from '../support/factories/petFactory'

const createPetUrl = 'api/v3/pet'

describe('PUT /pet', () => {
  it('modifies an existing pet', () => {
    const randomPetId = 12345
    let randomPet = createNewPet()
    randomPet.id = randomPetId

    // I would have seeded the existing pet, but this will have to do for now
    cy.request({
      method: 'POST',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: randomPet,
    })

    randomPet = createNewPet()
    randomPet.id = randomPetId

    cy.request({
      method: 'PUT',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: randomPet,
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(randomPet)
    })
  })

  it('returns an error when the id is not found', () => {
    const randomPet = createNewPet()

    cy.request({
      method: 'PUT',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: randomPet,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404)
      expect(response.body).to.deep.equal('Pet not found')
    })
  })

  it('returns an error when content type is not set', () => {
    const randomPetId = 12345
    let randomPet = createNewPet()
    randomPet.id = randomPetId

    // I would have seeded the existing pet, but this will have to do for now
    cy.request({
      method: 'POST',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: randomPet,
    })

    randomPet = createNewPet()
    randomPet.id = randomPetId

    cy.request({
      method: 'PUT',
      url: createPetUrl,
      body: randomPet,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(405)
      expect(response.body).to.deep.equal('Validation exception')
    })
  })

  // Normally, with GraphQL and schema checks this should never ever happen
  // We should guard against this only for external REST APIs, if we use any
  // and then test that we handle the incorrect input
  it('returns an error when the id is not an integer', () => {
    const randomPet = {
      id: 'this is a bad id',
      name: 'Jadon',
      category: { id: 49101, name: 'snake' },
      photoUrls: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      tags: [{ id: 81916, name: 'bird' }],
      status: 'available',
    }

    cy.request({
      method: 'PUT',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: randomPet,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('Invalid ID supplied')
    })
  })
})
