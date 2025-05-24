
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ClientsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ClientsSearch = ({ searchQuery, onSearchChange }: ClientsSearchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Search className="w-4 h-4 text-gray-400" />
      <Input 
        placeholder="Search clients..." 
        className="max-w-sm"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
