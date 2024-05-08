import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";

async function getTotalSpents() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
}

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const {
    data: totalSpent,
    isPending,
    error,
  } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpents,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col">
        {/* <Button>Click me</Button> */}

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>
              The total amount you've spent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? "..." : totalSpent.result.total}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
