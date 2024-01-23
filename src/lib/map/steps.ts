export type Position = { x: number; y: number; z: number };
export type Step = {
	position: Position;
	title: string;
	lines: Array<string>;
};

export const steps: Array<Step> = [
	{
		position: { x: 9, y: 0, z: -3 },
		title: 'Départ : Ukraine, Dnipro',
		lines: [
			'Trajet Dnipro - Vinnytsia : ',
			'600 km en voiture pour se rendre au 1ᵉʳ arrêt de ce long voyage : Vinnytsia.'
		]
	},
	{
		position: { x: 8, y: 0, z: -3 },
		title: '1ère étape : Vinnytsia',
		lines: [
			'Il a été difficile de trouver des chambres parce qu’il y avait beaucoup de personnes qui ont quitté leur maison en même temps. C’était une petite ville avec de grandes associations juives. Elle et sa famille arrivent à trouver refuge dans une ancienne maison ouverte aux populations juives.',
			"La route qu’elle empruntera par la suite lui a été conseillée par son ami. Il l’avait trouvée plus facile pour elle parce qu’il y avait beaucoup de travaux sur les routes allemandes. Réveil à 6h car l’objectif du 2ème jour est de se rendre à Oujhorod, à presque 700 km. Ce matin-là, son ami lui a dit qu’elle allait devoir passer la frontière seule, sans lui, puisqu'il était forcé de rester en Ukraine. Elle a donc continué la route avec sa voiture, ses deux enfants, la mère de son ami et son chien. En traversant les montagnes, à 40 km après Vinnytsia, une voiture de la voie inverse a quitté la route à cause du verglas. Ils se sont arrêtés pour l’aider et un homme avec un camion a pu tirer la voiture d’affaire grâce à son treuil. Il était dangereux de passer sur ces routes. Olena était stressée."
		]
	},
	{
		position: { x: 7, y: 0, z: -2 },
		title: '2ème étape : Oujhorod',
		lines: [
			"Arrivé à Oujhorod, Olena a appelé son ami de Bordeaux pour savoir s'il allait pouvoir les héberger. Il lui a aussi donné l’adresse de son cousin à Budapest pour pouvoir s’y arrêter un moment. Olena et sa famille sont quasiment restées une semaine à Oujhorod pour réparer la voiture avec laquelle ils allaient continuer le trajet. Il a également été nécessaire d’obtenir le passeport de son fils. Mais en arrivant à la frontière, ils ont découvert que de nombreuses personnes qui y travaillaient faisaient plus facilement passer les personnes à cause de la guerre qui avait récemment éclaté.",
			'Au deuxième jour de son voyage, le lundi matin à 7h, Olena a dû appeler son patron pour lui dire qu’elle ne pourrait pas se présenter au travail ce jour-là. Elle a dû quitter ses patients sans savoir si elle allait les retrouver un jour.'
		]
	},
	{
		position: { x: 6, y: 0, z: -2 },
		title: '3ème étape : Budapest',
		lines: [
			'Budapest a été la 3ᵉ ville où ils se sont arrêtés et la 1ʳᵉ à l’étranger. La personne qui les logeait leur a proposé de rester un peu plus pour se reposer, pour réfléchir. Mais elle a refusé, elle était très inquiète parce que le temps passait très vite et elle ne pouvait pas s’arrêter en si bon chemin. Son courage était au maximum. Elle voulait profiter de cette motivation tant qu’elle était présente.'
		]
	},
	{
		position: { x: 5, y: 0, z: -2 },
		title: '4ème étape : Vérone',
		lines: [
			'Son ami de Bordeaux a trouvé un hôtel en Italie pour Olena et sa famille. Mais quand ils se sont rendus sur place, l’administrateur les a refusés, car ils ne pouvaient pas prouver qu’ils n’avaient pas la covid. Elle a alors essayé un autre hôtel et a, sur les conseils de son ami, joué sur la pitié en appuyant sur la présence d’enfants et d’une personne âgée. Ça s’est passé plus facilement et ils ont pu avoir une chambre. Elle a compris qu’ils allaient devoir vite partir, car elle n’avait pas trouvé les gens très gentils et ne pouvaient pas risquer de ne pas trouver de logement sur place.',
			'Le passage par l’Italie était compliqué parce qu’il y avait de nombreux travaux sur les routes et certains tunnels étaient fermés. Elle a dû rouler très proche des camions. Ces enfants lui faisaient remarquer des ponts près desquels ils passaient, disant qu’ils étaient très beaux. Elle disait qu’ils étaient très hauts et ils lui répondaient que dans quelques minutes, elle allait devoir le traverser.'
		]
	},
	{
		position: { x: 4, y: 0, z: -2 },
		title: '5ème étape : Marseille',
		lines: [
			'Près de Marseille, sa voiture est tombée en panne parce que des câbles n’étaient pas bien branchés. La batterie était morte. Il fallait trouver des clés pour les refixer. Elle ne pouvait pas demander d’aide à cause de la langue. Elle a acheté les clés et elle a réparé la voiture. Il commençait à faire nuit, son fils l’éclairait avec son portable.'
		]
	},
	{
		position: { x: 3.5, y: 0, z: -2 },
		title: 'Arrivée : Bordeaux',
		lines: ['23h, 7 mars']
	}
];

export const isStepIndexValid = (stepIndex: number): boolean => {
	return stepIndex >= 0 && stepIndex < steps.length;
};

export const canPreviousWith = (stepIndex: number): boolean => {
	return isStepIndexValid(stepIndex - 1);
};

export const canNextWith = (stepIndex: number): boolean => {
	return isStepIndexValid(stepIndex + 1);
};
