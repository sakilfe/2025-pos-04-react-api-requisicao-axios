"use client";

import type React from "react";
import { useEffect, useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";

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

interface ModalTarefaProps {
	onAdicionar: (titulo: string) => void;
	onFechar: () => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ onAdicionar, onFechar }) => {
	const [novoTitulo, setNovoTitulo] = useState("");

	const adicionarTarefa = () => {
		if (novoTitulo.trim() !== "") {
			onAdicionar(novoTitulo);
			onFechar(); 
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>
				<input
					type="text"
					className="border p-2 w-full mb-4"
					placeholder="Digite o título da tarefa"
					value={novoTitulo}
					onChange={(e) => setNovoTitulo(e.target.value)}
				/>
				<div className="flex justify-between">
					<button
						onClick={adicionarTarefa}
						className="bg-green-600 text-white px-4 py-2 rounded"
					>
						Adicionar
					</button>
					<button
						onClick={onFechar}
						className="bg-gray-400 text-white px-4 py-2 rounded"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

const Home = () => {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);
	const [mostrarModal, setMostrarModal] = useState(false);

	const adicionarTarefa = (titulo: string) => {
		const novaTarefa: TarefaInterface = {
			id: Date.now(),
			title: titulo,
			completed: false,
		};
		setTarefas((prev) => [...prev, novaTarefa]);
	};

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />
			<button
				onClick={() => setMostrarModal(true)}
				className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
			>
				Nova Tarefa
			</button>
			<Tarefas dados={tarefas} />
			{mostrarModal && (
				<ModalTarefa
					onAdicionar={adicionarTarefa}
					onFechar={() => setMostrarModal(false)}
				/>
			)}
		</div>
	);
};

export default Home;