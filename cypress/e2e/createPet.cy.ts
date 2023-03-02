import { faker } from '@faker-js/faker'
import createNewPet from '../support/factories/petFactory'

const createPetUrl = 'api/v3/pet'

describe('POST /pet', () => {
  const statusValues: PetStatus[] = ['available', 'pending', 'sold']

  it('creates a random pet with all fields', () => {
    const randomPet = createNewPet()

    cy.request({
      method: 'POST',
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

  // This errors out with 500 Internal Server Error
  it('creates a random pet with minimum mandatory fields', () => {
    const minimumValuesRandomPet = {
      name: faker.name.firstName(),
      photoUrls: [faker.image.imageUrl()],
    }

    cy.request({
      method: 'POST',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: minimumValuesRandomPet,
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(minimumValuesRandomPet)
    })
  })

  // This errors out with 500 Internal Server Error too
  it('attempts creating a pet without mandatory fields', () => {
    cy.request({
      method: 'POST',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      // I am not sure what to expect here, so I added a Bad Request status and a nice error message in the body
      expect(response.status).to.equal('400')
      expect(response.body).to.deep.equal(
        'Please provide mandatory fields name and photoUrls'
      )
    })
  })

  it('returns an error when content type is not set', () => {
    const randomPet = createNewPet()

    cy.request({
      method: 'POST',
      url: createPetUrl,
      body: randomPet,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(405)
      expect(response.body).to.deep.equal('Invalid input')
    })
  })

  statusValues.forEach((status) => {
    it(`supports ${status} value`, () => {
      let randomPet = createNewPet()
      randomPet.status = status

      cy.request({
        method: 'POST',
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
  })

  it('returns an error with an invalid status value', () => {
    const randomPet = {
      id: 'this is a bad id',
      name: 'Jadon',
      category: { id: 49101, name: 'snake' },
      photoUrls: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      tags: [{ id: 81916, name: 'bird' }],
      status: 'incorrectStatus',
    }

    cy.request({
      method: 'POST',
      url: createPetUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: randomPet,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('Invalid input')
    })
  })
})
