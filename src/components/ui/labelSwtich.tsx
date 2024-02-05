"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Props extends React.ComponentProps<typeof Switch> {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const LabelSwitch = ({ label, checked, onCheckedChange, ...props }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch checked={checked} onCheckedChange={onCheckedChange} {...props} />
      <Label htmlFor={props.id}>{label}</Label>
    </div>
  );
};

export { LabelSwitch };
