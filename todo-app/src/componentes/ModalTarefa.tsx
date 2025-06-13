"use client";

import { useState } from "react";

interface ModalTarefaProps {
  onClose: () => void;
  onAdicionarTarefa: (titulo: string) => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ onClose, onAdicionarTarefa }) => {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novaTarefa.trim()) {
      setErro("Por favor, insira um título para a tarefa");
      return;
    }
    
    onAdicionarTarefa(novaTarefa);
    setNovaTarefa("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-700 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-amber-50">Nova Tarefa</h2>
            <button
              onClick={onClose}
              className="text-amber-50 hover:text-amber-200 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="tarefa"
                value={novaTarefa}
                onChange={(e) => {
                  setNovaTarefa(e.target.value);
                  setErro("");
                }}
                className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-600 text-amber-50"
                placeholder="Digite o título da tarefa"
                autoFocus
              />
              {erro && <p className="mt-1 text-sm text-red-400">{erro}</p>}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-amber-50 bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-amber-500 rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTarefa;