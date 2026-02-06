import { Target, Users, Award, Heart } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To make event discovery and booking seamless for everyone across Nepal, connecting people with experiences that matter.',
    },
    {
      icon: Users,
      title: 'Community First',
      description:
        'We believe in building a strong community of event organizers and attendees, fostering connections and shared experiences.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'We strive for excellence in every aspect of our platform, from user experience to customer support.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description:
        'Our team is passionate about events and bringing people together to create memorable moments.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Events Hosted' },
    { value: '50,000+', label: 'Happy Users' },
    { value: '100+', label: 'Cities Covered' },
    { value: '4.8/5', label: 'User Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Evenza</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Nepal's leading event discovery and booking platform, connecting people with
            unforgettable experiences since 2024.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Evenza was born out of a simple idea: to make discovering and booking events in
                Nepal as easy as possible. We noticed that many amazing events were happening
                across the country, but people often missed out because they didn't know about
                them or found the booking process too complicated.
              </p>
              <p>
                Our team of passionate event enthusiasts and tech innovators came together to
                create a platform that bridges this gap. Today, Evenza has become the go-to
                platform for thousands of event organizers and attendees across Nepal.
              </p>
              <p>
                From music concerts and tech conferences to traditional festivals and sports
                events, we're committed to showcasing the diverse and vibrant event landscape
                of Nepal.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
              alt="Events"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience Amazing Events?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others discovering and booking incredible events across Nepal.
          </p>
          <a
            href="/events"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Events Now
          </a>
        </div>
      </div>
    </div>
  );
}
