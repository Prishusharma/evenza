import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Ticket } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Event, Category } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSelectedEvent } = useBooking();
  const [event, setEvent] = useState<Event | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (eventError) throw eventError;

      if (eventData) {
        setEvent(eventData);

        if (eventData.category_id) {
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('id', eventData.category_id)
            .maybeSingle();

          if (categoryError) throw categoryError;
          setCategory(categoryData);
        }
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }

    if (event) {
      setSelectedEvent(event);
      navigate(`/book/${event.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <Link
            to="/events"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isSoldOut = event.available_seats === 0;
  const availabilityPercentage = (event.available_seats / event.total_seats) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-teal-600 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Event Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-[500px] object-cover"
              />
            </div>
            {category && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-teal-600 font-semibold">{category.name}</span>
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                <Calendar className="w-6 h-6 text-teal-600 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="font-semibold text-gray-900">{formattedDate}</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                <Clock className="w-6 h-6 text-teal-600 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <p className="font-semibold text-gray-900">{event.time}</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 sm:col-span-2">
                <MapPin className="w-6 h-6 text-teal-600 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-semibold text-gray-900">{event.location}</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 sm:col-span-2">
                <Users className="w-6 h-6 text-teal-600 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Seat Availability</p>
                <div className="flex items-end justify-between mb-2">
                  <p className="font-semibold text-gray-900 text-lg">
                    {event.available_seats} / {event.total_seats} seats available
                  </p>
                  <span className="text-sm font-medium text-gray-600">
                    {availabilityPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      availabilityPercentage > 50
                        ? 'bg-green-500'
                        : availabilityPercentage > 20
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${availabilityPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Price and Booking */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ticket Price</p>
                  <p className="text-4xl font-bold text-teal-600">
                    {event.price === 0 ? 'FREE' : `NPR ${event.price.toLocaleString()}`}
                  </p>
                </div>
                <Ticket className="w-12 h-12 text-teal-600" />
              </div>

              {isSoldOut ? (
                <div className="w-full py-4 bg-gray-300 text-gray-600 rounded-xl font-bold text-center text-lg">
                  SOLD OUT
                </div>
              ) : user ? (
                <button
                  onClick={handleBookNow}
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Now
                </button>
              ) : (
                <Link
                  to="/login"
                  state={{ from: `/events/${id}` }}
                  className="block w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
