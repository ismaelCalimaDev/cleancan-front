export interface CarsResponse {
  status: boolean
  cars: Car []
}
export interface Car {
  id: string
  brand: string
  model: string
  plate: string
  color: string
}
