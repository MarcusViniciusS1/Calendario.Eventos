import React from 'react';
import { Calendar, Clock, MapPin, User, Eye } from 'lucide-react';
import { Event } from '../types/Event';

interface EventCardProps {
  event: Event;
  onViewMore?: () => void;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onViewMore, 
  showActions = false,
  onEdit,
  onDelete 
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700">
      <h3 className="text-xl font-bold text-orange-400 mb-3">{event.titulo}</h3>
      <p className="text-gray-300 mb-4 leading-relaxed">{event.descricao}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{event.data}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span>{event.hora}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.local}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <User className="w-4 h-4 mr-2" />
          <span>{event.organizador}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {onViewMore && (
          <button
            onClick={onViewMore}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            Ver Mais
          </button>
        )}
        
        {showActions && (
          <>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Apagar
            </button>
          </>
        )}
      </div>
    </div>
  );
};