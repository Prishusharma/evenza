import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Booking, Event } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface BookingWithEvent extends Booking {
  event: Event;
}

export function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      if (bookingsData && bookingsData.length > 0) {
        const eventIds = bookingsData.map((b) => b.event_id);
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .in('id', eventIds);

        if (eventsError) throw eventsError;

        const bookingsWithEvents = bookingsData.map((booking) => ({
          ...booking,
          event: eventsData?.find((e) => e.id === booking.event_id)!,
        }));

        setBookings(bookingsWithEvents);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          styles[status as keyof typeof styles] || styles.pending
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-lg text-gray-600">
            View and manage all your event bookings
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-8">
              Start exploring events and book your first ticket!
            </p>
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => {
              const formattedDate = new Date(booking.event.date).toLocaleDateString(
                'en-US',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              );

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    {/* Event Image */}
                    <div className="md:w-1/3">
                      <img
                        src={booking.event.image_url}
                        alt={booking.event.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="md:w-2/3 p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {booking.event.title}
                        </h2>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-3 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Event Date</p>
                            <p className="font-semibold">{formattedDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-3 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-semibold">{booking.event.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-3 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Seats Booked</p>
                            <p className="font-semibold">{booking.seats_booked} seats</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Ticket className="w-5 h-5 mr-3 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Total Price</p>
                            <p className="font-semibold text-teal-600">
                              {booking.total_price === 0
                                ? 'FREE'
                                : `NPR ${booking.total_price.toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/events/${booking.event.id}`}
                          className="flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        >
                          View Event Details
                        </Link>
                        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg">
                          Download Ticket
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
