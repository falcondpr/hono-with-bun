import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

async function getTotalSpents() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
}

async function getAllSpents() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
}

function Expenses() {
  const {
    data: allExpenses,
    isPending,
    error,
  } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllSpents,
  });

  const {
    data: totalSpent,
    isPending: isPendingTotalSpent,
    error: errorTotalSpent,
  } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpents,
  });

  if (error) return "An error has occurred: " + error?.message;
  if (errorTotalSpent)
    return "An error has occurred: " + errorTotalSpent.message;

  return (
    <div className="py-5 max-w-2xl mx-auto">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))
            : allExpenses.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {expense.id}
                  </TableCell>
                  <TableCell className="text-center">
                    {expense.title}
                  </TableCell>
                  <TableCell className="text-right">
                    {expense.amount}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              {isPendingTotalSpent ? "..." : totalSpent.result.total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
