import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileView from "@/app/profile/views/ProfileView";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileView />
    </ProtectedRoute>
  );
}
