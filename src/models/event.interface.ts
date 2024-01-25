export interface Event {
	id?: number;
	idUser: number;
	dateStart: Date | '' | null;
	dateEnd: Date | '' | null;
	nameEvent: string;
	description: string;
}
