export interface LocationResponse {
  status: boolean
  locations: Location []
}
export interface Location {
  id: string
  type: string
  province: string
  postal_code: string
  street: string
}
