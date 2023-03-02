type PetStatus = 'available' | 'pending' | 'sold'

type Pet = {
  id: number
  name: string
  category: {
    id: number
    name: string
  }
  photoUrls: string[]
  tags: {
    id: number
    name: string
  }[]
  status: PetStatus
}
