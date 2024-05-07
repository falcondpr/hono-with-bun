import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return <div>loading..</div>;
  if (error)
    return (
      <div>
        <p>not logged in</p>
      </div>
    );

  return (
    <div className="py-3">
      <p>Hello {data.user.given_name}!</p>
      <a href="/api/logout">Logout!</a>
    </div>
  );
}
