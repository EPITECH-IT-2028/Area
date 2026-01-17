import ServicesView from "@/app/services/views/ServicesView";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <ServicesView />
    </ProtectedRoute>
  );
}
