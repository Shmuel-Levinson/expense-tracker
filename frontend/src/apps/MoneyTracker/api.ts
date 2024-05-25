import { Expense } from "./models/models";
import axios from "axios";

export async function fetchExpenses(): Promise<Expense[]> {
	const response = await fetch("/expenses");
	return await response.json();
}

async function driver() {
	const r = await fetchExpenses();
	r[0];
}

export async function ping(): Promise<object> {
	const response = await axios.get("http://localhost:5000/ping");
	return response.data;
}

//create a function that would create an expense
export async function createExpense(expense: Expense): Promise<Expense> {
    const response = await axios.post("http://localhost:5000/expenses", expense);
	return response.data;
}
