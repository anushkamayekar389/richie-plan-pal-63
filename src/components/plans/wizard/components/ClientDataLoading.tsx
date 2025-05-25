
export function ClientDataLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Loading client data...</p>
        </div>
      </div>
    </div>
  );
}
