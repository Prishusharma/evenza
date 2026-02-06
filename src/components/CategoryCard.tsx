import { Link } from 'react-router-dom';
import { Music, Laptop, Wrench, Trophy, GraduationCap, LucideIcon } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, LucideIcon> = {
  Music: Music,
  Laptop: Laptop,
  Wrench: Wrench,
  Trophy: Trophy,
  GraduationCap: GraduationCap,
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Music;

  return (
    <Link
      to={`/events?category=${category.id}`}
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

      {/* Icon */}
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {category.description || `Explore ${category.name.toLowerCase()} events`}
        </p>
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-teal-600 font-semibold text-sm">View Events →</span>
      </div>
    </Link>
  );
}
