
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface FamilyDependentsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function FamilyDependentsStep({ data, onDataChange }: FamilyDependentsStepProps) {
  const [dependents, setDependents] = useState(data.dependents || []);

  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
  };

  const addDependent = () => {
    const newDependent = {
      id: Date.now(),
      name: "",
      relationship: "",
      age: "",
      dependent_status: true
    };
    const newDependents = [...dependents, newDependent];
    setDependents(newDependents);
    handleChange("dependents", newDependents);
  };

  const updateDependent = (id: number, field: string, value: any) => {
    const updatedDependents = dependents.map((dep: any) => 
      dep.id === id ? { ...dep, [field]: value } : dep
    );
    setDependents(updatedDependents);
    handleChange("dependents", updatedDependents);
  };

  const removeDependent = (id: number) => {
    const filteredDependents = dependents.filter((dep: any) => dep.id !== id);
    setDependents(filteredDependents);
    handleChange("dependents", filteredDependents);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label>Family Structure</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Current family setup affects financial planning strategies</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={data.family_structure || ""} onValueChange={(value) => handleChange("family_structure", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select family structure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nuclear">Nuclear Family</SelectItem>
              <SelectItem value="joint">Joint Family</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="single_parent">Single Parent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-medium">Dependents</Label>
            <Button onClick={addDependent} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Dependent
            </Button>
          </div>

          {dependents.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No dependents added yet. Click "Add Dependent" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {dependents.map((dependent: any, index: number) => (
                <Card key={dependent.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Dependent {index + 1}</CardTitle>
                      <Button 
                        onClick={() => removeDependent(dependent.id)}
                        size="sm" 
                        variant="ghost"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input 
                          placeholder="Name"
                          value={dependent.name}
                          onChange={(e) => updateDependent(dependent.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Select 
                          value={dependent.relationship} 
                          onValueChange={(value) => updateDependent(dependent.id, "relationship", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input 
                          type="number"
                          placeholder="Age"
                          value={dependent.age}
                          onChange={(e) => updateDependent(dependent.id, "age", parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
