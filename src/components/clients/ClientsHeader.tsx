
import { AddClientDialog } from "./AddClientDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientsHeaderProps {
  onClientAdded: () => void;
}

export const ClientsHeader = ({ onClientAdded }: ClientsHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
        <p className="text-gray-500 mt-1">Manage your client relationships and information</p>
      </div>
      <AddClientDialog onClientAdded={onClientAdded} />
    </div>
  );
};
