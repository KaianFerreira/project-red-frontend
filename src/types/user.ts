export interface User {
  id: string
  name: string
  email: string
  dateOfBirth: string
  bio: string
  profileImage: string
  location?: string
  interests?: string[]
  createdAt: string
  userType?: 'regular' | 'contractor'
  // Contractor specific fields
  fantasyName?: string
  city?: string
  suburb?: string
  state?: string
  hourlyRate?: string
  services?: string
  availability?: string
  additionalPhotos?: string[]
}