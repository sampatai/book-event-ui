import { Link, createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

function IndexPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-2">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
          Welcome to Book Event UI
        </h1>
        <p className="text-lg text-muted-foreground w-full max-w-2xl">
          This is your smart dashboard. Navigate using the sidebar to explore
          different sections or dive right into your analytics below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Upcoming Events", desc: "Manage your events" },
          { title: "Bookings", desc: "View recent bookings" },
          { title: "Analytics", desc: "Track performance" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="font-semibold text-lg">{stat.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Quick Actions
        </h3>
        <Link
          to="/users"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Open Users DataTable Example
        </Link>
      </div>
    </div>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});
