import React, { useState } from 'react';
import { Calendar, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigateToCalendar: () => void;
  onNavigateToAdmin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onNavigateToCalendar, 
  onNavigateToAdmin 
}) => {
  const [credentials, setCredentials] = useState({ usuario: '', senha: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(credentials.usuario, credentials.senha)) {
      onNavigateToAdmin();
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Calendar className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-white">Login Administrativo</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg p-8 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-orange-400">Login Administrativo</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Digite seu usuário"
                  value={credentials.usuario}
                  onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={credentials.senha}
                  onChange={(e) => setCredentials({ ...credentials, senha: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={onNavigateToCalendar}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              Voltar ao Calendário
            </button>
          </form>

          {/* Credentials Info */}
          <div className="mt-6 p-4 bg-slate-700 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 text-center">
              Credenciais de teste:
            </h3>
            <div className="text-center text-sm text-gray-400">
              <p>Usuário: ADM</p>
              <p>Senha: ADM123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};