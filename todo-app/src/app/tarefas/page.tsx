"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido
			? "bg-gray-800 hover:border-gray-800"
			: "bg-gray-400 hover:border-gray-400"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={escutarClique}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TarefasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TarefasProps> = ({ dados }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{dados.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

const Home = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const resposta = await axios.get("https://dummyjson.com/todos");
        const tarefasFormatadas = resposta.data.todos.map((todo: any) => ({
          id: todo.id,
          title: todo.todo,
          completed: todo.completed,
        }));
        setTarefas(tarefasFormatadas);
      } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
        setTarefas(dados);
      } finally {
        setCarregando(false);
      }
    };

    carregarTarefas();
  }, []);

  const adicionarTarefa = (titulo: string) => {
    const novaTarefa: TarefaInterface = {
      id: Date.now(),
      title: titulo,
      completed: false,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  if (carregando) {
    return (
      <div className="container mx-auto p-4">
        <Cabecalho />
        <p className="text-amber-50">Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-50">Minhas Tarefas</h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="px-4 py-2 bg-amber-500 text-gray-900 rounded-md hover:bg-amber-400 font-medium"
        >
          Adicionar Tarefa
        </button>
      </div>

      <Tarefas dados={tarefas} />

      {mostrarModal && (
        <ModalTarefa
          onClose={() => setMostrarModal(false)}
          onAdicionarTarefa={adicionarTarefa}
        />
      )}
    </div>
  );
};

export default Home;