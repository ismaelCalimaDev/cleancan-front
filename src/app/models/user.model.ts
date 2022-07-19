export interface UserResponse {
  status: boolean,
  user: User,
}
interface User {
  name: string,
  email: string,
  phone_number: string,
}
