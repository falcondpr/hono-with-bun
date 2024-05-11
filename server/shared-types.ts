import { insertExpenserSchema } from "./db/schema/expenses";

export const createExpenseSchema = insertExpenserSchema.omit({
  userId: true,
  createdAt: true,
});
