import React from 'react';
import { Calendar, LogIn } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../contexts/EventContext';

interface PublicCalendarProps {
  onNavigateToLogin: () => void;
}

export const PublicCalendar: React.FC<PublicCalendarProps> = ({ onNavigateToLogin }) => {
  const { events } = useEvents();

  const handleViewMore = (eventId: string) => {
    // Implementar visualização detalhada do evento
    console.log('Ver mais detalhes do evento:', eventId);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-white">Calendário de Eventos</h1>
          </div>
          <button
            onClick={onNavigateToLogin}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            <LogIn className="w-4 h-4" />
            ENTRAR
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewMore={() => handleViewMore(event.id)}
            />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-gray-500">
              Não há eventos cadastrados no momento.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};