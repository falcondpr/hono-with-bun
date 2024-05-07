import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: Index,
});

function Index() {
  return (
    <div className="py-5">
      <h3>Welcome About!</h3>
    </div>
  );
}
