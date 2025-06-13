export type TarefaInterface = {
	id: number;
	title: string;
	completed: boolean;
};

const dados: Array<TarefaInterface> = [
	{ id: 1, title: "delectus aut autem", completed: false },
	{
		id: 2,
		title: "quis ut nam facilis et officia qui",
		completed: false,
	},
	{
		id: 3,
		title: "fugiat veniam minus",
		completed: false,
	},
	{
		id: 4,
		title: "et porro tempora",
		completed: true,
	},
	{
		id: 5,
		title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
		completed: false,
	},
	{
		id: 6,
		title: "qui ullam ratione quibusdam voluptatem quia omnis",
		completed: false,
	},
	{
		id: 7,
		title: "illo expedita consequatur quia in",
		completed: false,
	},
];

const carregar = (): Promise<TarefaInterface[]> => {
	return new Promise((resolve, reject) => {
		const sucesso = true;

		if (sucesso) {
			resolve(dados);
		} else {
			reject(new Error("Erro 500: Falha ao carregar dados da API"));
		}
	});
};

export {carregar};
export default dados;