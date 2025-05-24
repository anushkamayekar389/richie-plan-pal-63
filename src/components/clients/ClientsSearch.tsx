
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ClientsSearch = ({ searchQuery, onSearchChange }: ClientsSearchProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex items-center ${isMobile ? 'flex-col space-y-3' : 'space-x-4'} w-full`}>
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Search clients by name, email, or phone..." 
          className={`pl-10 ${isMobile ? 'text-base' : ''}`}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {!isMobile && (
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </Button>
      )}
    </div>
  );
};
