import '../.neemata/types'

declare module '@neemata/core/types' {
  // Custom Auth types
  export interface Auth {
    id: number
    group: string
  }
}
