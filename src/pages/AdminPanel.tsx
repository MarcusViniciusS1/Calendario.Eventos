import React, { useState } from 'react';
import { Calendar, LogOut, Plus } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { EventModal } from '../components/EventModal';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { Event } from '../types/Event';

interface AdminPanelProps {
  onNavigateToCalendar: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigateToCalendar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const { logout } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  const handleLogout = () => {
    logout();
    onNavigateToCalendar();
  };

  const handleNewEvent = () => {
    setEditingEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Tem certeza que deseja apagar este evento?')) {
      deleteEvent(eventId);
    }
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setIsModalOpen(false);
    setEditingEvent(undefined);
  };

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
            <h1 className="text-2xl font-bold text-white">Gerenciar Eventos</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Painel Administrativo</h2>
          <button
            onClick={handleNewEvent}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Evento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewMore={() => handleViewMore(event.id)}
              showActions={true}
              onEdit={() => handleEditEvent(event)}
              onDelete={() => handleDeleteEvent(event.id)}
            />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Não há eventos cadastrados no momento.
            </p>
            <button
              onClick={handleNewEvent}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium mx-auto"
            >
              <Plus className="w-5 h-5" />
              Criar Primeiro Evento
            </button>
          </div>
        )}
      </main>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(undefined);
        }}
        onSave={handleSaveEvent}
        event={editingEvent}
        title={editingEvent ? 'Editar Evento' : 'Novo Evento'}
      />
    </div>
  );
};