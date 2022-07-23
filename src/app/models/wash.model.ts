export interface WashesResponse {
  status: boolean
  products: Wash []
}
export interface Wash {
  id: string
  title: string
  description: string
  price: string
}
