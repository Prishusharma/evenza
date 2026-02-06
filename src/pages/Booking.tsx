import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Event } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

export function Booking() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedEvent, setSelectedEvent } = useBooking();
  const [event, setEvent] = useState<Event | null>(selectedEvent);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!event && eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setEvent(data);
        setSelectedEvent(data);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const handleBooking = async () => {
    if (!user || !event) return;

    setLoading(true);
    try {
      const totalPrice = event.price * seats;

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          event_id: event.id,
          seats_booked: seats,
          total_price: totalPrice,
          status: 'confirmed',
        })
        .select()
        .single();

      if (error) throw error;

      const { error: updateError } = await supabase
        .from('events')
        .update({
          available_seats: event.available_seats - seats,
        })
        .eq('id', event.id);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your booking has been successfully confirmed.
          </p>
          <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  const totalPrice = event.price * seats;
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-teal-600 transition-colors duration-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-teal-600" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-teal-600" />
                    <span>{event.available_seats} seats available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h3>

              {/* Seat Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Seats
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors duration-300"
                    disabled={seats <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={seats}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setSeats(Math.min(event.available_seats, Math.max(1, value)));
                    }}
                    min="1"
                    max={event.available_seats}
                    className="flex-1 text-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-xl font-bold"
                  />
                  <button
                    onClick={() => setSeats(Math.min(event.available_seats, seats + 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors duration-300"
                    disabled={seats >= event.available_seats}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Maximum {event.available_seats} seats available
                </p>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per ticket</span>
                  <span className="font-semibold">
                    {event.price === 0 ? 'FREE' : `NPR ${event.price.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Number of seats</span>
                  <span className="font-semibold">{seats}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-teal-600 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>
                    {totalPrice === 0 ? 'FREE' : `NPR ${totalPrice.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Confirm Booking
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
