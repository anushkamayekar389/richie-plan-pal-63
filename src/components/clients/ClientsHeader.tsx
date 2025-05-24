
import { AddClientDialog } from "./AddClientDialog";

interface ClientsHeaderProps {
  onClientAdded: () => void;
}

export const ClientsHeader = ({ onClientAdded }: ClientsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-gray-500">Manage your client relationships and information</p>
      </div>
      <AddClientDialog onClientAdded={onClientAdded} />
    </div>
  );
};
