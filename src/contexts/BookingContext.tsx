import { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types';

interface BookingContextType {
  selectedEvent: Event | null;
  seatsSelected: number;
  bookingDate: string;
  setSelectedEvent: (event: Event | null) => void;
  setSeatsSelected: (seats: number) => void;
  setBookingDate: (date: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [seatsSelected, setSeatsSelected] = useState(1);
  const [bookingDate, setBookingDate] = useState('');

  const resetBooking = () => {
    setSelectedEvent(null);
    setSeatsSelected(1);
    setBookingDate('');
  };

  return (
    <BookingContext.Provider
      value={{
        selectedEvent,
        seatsSelected,
        bookingDate,
        setSelectedEvent,
        setSeatsSelected,
        setBookingDate,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
