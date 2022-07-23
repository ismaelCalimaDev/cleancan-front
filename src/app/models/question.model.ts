export interface QuestionResponse {
  status: boolean
  questions: Question []
}
export interface Question {
  id: string
  ask: string
  answer: string
}
