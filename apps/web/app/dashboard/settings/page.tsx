import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl select-none">Settings page</h1>
      </main>
    </ProtectedRoute>
  );
}
