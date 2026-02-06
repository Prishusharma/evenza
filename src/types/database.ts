export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          icon: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          description?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          category_id: string | null
          date: string
          time: string
          location: string
          image_url: string
          available_seats: number
          total_seats: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category_id?: string | null
          date: string
          time: string
          location: string
          image_url: string
          available_seats?: number
          total_seats?: number
          price?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category_id?: string | null
          date?: string
          time?: string
          location?: string
          image_url?: string
          available_seats?: number
          total_seats?: number
          price?: number
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          event_id: string
          seats_booked: number
          booking_date: string
          status: string
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          seats_booked?: number
          booking_date?: string
          status?: string
          total_price?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          seats_booked?: number
          booking_date?: string
          status?: string
          total_price?: number
          created_at?: string
        }
      }
    }
  }
}
