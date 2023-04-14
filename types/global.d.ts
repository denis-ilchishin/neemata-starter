import '../.neemata/index'

declare module '@neemata/core/types/external' {
  // Custom Auth types
  export interface Auth {
    user: {
      id: number
      group: string
    }
  }
}
