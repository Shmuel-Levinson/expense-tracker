export type User = {
	id: string;
	name: string;
	email: string;
}

export type Expense = {
	id?: string;
	amount: number;
	description?: string;
	category?: string;
	date?: Date;
	user_id: number;
}

export type Category = {
    name: string;
}


