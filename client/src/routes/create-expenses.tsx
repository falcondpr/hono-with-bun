import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-expenses")({
  component: CreateExpenses,
});

function CreateExpenses() {
  return <div>Create expenses</div>;
}
