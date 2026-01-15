import ContentView from "@/app/dashboard/views/ContentView";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <ContentView />
    </ProtectedRoute>
  );
}
