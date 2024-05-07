import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import expensesRoute from "./routes/expenses";
import { authRoute } from "./auth";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "test" });
});

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoute)
  .route("/", authRoute);

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
