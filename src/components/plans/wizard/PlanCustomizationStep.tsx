
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from "@hello-pangea/dnd";
import { 
  GripVertical, 
  Edit3, 
  Trash2, 
  Plus, 
  FileText,
  Upload,
  MessageSquare
} from "lucide-react";
import { GeneratedFinancialPlan } from "@/services/financialPlanGenerator";

interface PlanCustomizationStepProps {
  plan: GeneratedFinancialPlan;
  customizations: any;
  onCustomizationChange: (customizations: any) => void;
}

export function PlanCustomizationStep({ 
  plan, 
  customizations, 
  onCustomizationChange 
}: PlanCustomizationStepProps) {
  const [sections, setSections] = useState(plan.sections);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [notes, setNotes] = useState(customizations.notes || "");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
    onCustomizationChange({ 
      ...customizations, 
      sections: items,
      reordered: true 
    });
  };

  const updateSection = (index: number, field: string, value: string) => {
    const updatedSections = sections.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
    onCustomizationChange({ 
      ...customizations, 
      sections: updatedSections 
    });
  };

  const removeSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    onCustomizationChange({ 
      ...customizations, 
      sections: updatedSections 
    });
  };

  const addCustomSection = () => {
    const newSection = {
      title: "Custom Section",
      content: "Add your custom content here...",
      recommendations: []
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    onCustomizationChange({ 
      ...customizations, 
      sections: updatedSections 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Customize Your Financial Plan</h3>
          <p className="text-gray-600">Reorder sections, edit content, and add your insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={addCustomSection}>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Docs
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {sections.map((section, index) => (
                <Draggable key={index} draggableId={`section-${index}`} index={index}>
                  {(provided) => (
                    <Card 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="relative"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                            </div>
                            {editingSection === index ? (
                              <Input
                                value={section.title}
                                onChange={(e) => updateSection(index, "title", e.target.value)}
                                onBlur={() => setEditingSection(null)}
                                onKeyDown={(e) => e.key === "Enter" && setEditingSection(null)}
                                className="font-semibold"
                                autoFocus
                              />
                            ) : (
                              <CardTitle 
                                className="cursor-pointer hover:text-primary"
                                onClick={() => setEditingSection(index)}
                              >
                                {section.title}
                              </CardTitle>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingSection(index)}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Content</Label>
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateSection(index, "content", e.target.value)}
                            rows={4}
                            className="resize-none"
                          />
                        </div>
                        
                        {section.recommendations.length > 0 && (
                          <div className="space-y-2">
                            <Label>Recommendations</Label>
                            <div className="space-y-1">
                              {section.recommendations.map((rec, recIndex) => (
                                <div key={recIndex} className="flex items-start space-x-2">
                                  <Badge variant="outline" className="mt-0.5">•</Badge>
                                  <span className="text-sm">{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Internal Notes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add internal notes, follow-up reminders, or additional insights..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              onCustomizationChange({ ...customizations, notes: e.target.value });
            }}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
