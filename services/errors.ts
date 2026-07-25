export class ApiNotAvailableError extends Error {
  constructor(endpoint: string) {
    super(`Backend API not available: ${endpoint}`)
    this.name = 'ApiNotAvailableError'
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}
