import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const App: React.FC = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    };

    fetchTotal();
  }, []);

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
          <CardContent>{totalSpent}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
