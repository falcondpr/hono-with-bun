import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "./lib/api";

async function getTotalSpents() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
}

const App: React.FC = () => {
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
    <div className="max-w-xl mx-auto">
      <h3 className="text-foreground">hello world</h3>

      <div className="flex flex-col">
        <Button>Click me</Button>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>
              The total amount you've spent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? "..." : totalSpent.total}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
