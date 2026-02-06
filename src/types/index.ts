export interface Event {
  id: string;
  title: string;
  description: string;
  category_id: string | null;
  date: string;
  time: string;
  location: string;
  image_url: string;
  available_seats: number;
  total_seats: number;
  price: number;
  created_at: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  event_id: string;
  seats_booked: number;
  booking_date: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  total_price: number;
  created_at: string;
  event?: Event;
}

export interface User {
  id: string;
  email: string;
}
