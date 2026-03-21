import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

function IndexPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Book Event UI</h1>
      <p className="text-gray-600">
        This is your dashboard. Navigate using the sidebar to explore different
        sections.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Upcoming Events</h2>
          <p className="text-sm text-gray-500">Manage your events</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Bookings</h2>
          <p className="text-sm text-gray-500">View recent bookings</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Analytics</h2>
          <p className="text-sm text-gray-500">Track performance</p>
        </div>
      </div>
    </div>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});
