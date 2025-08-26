import { Download, EllipsisVertical, Trash } from "lucide-react";

import {
  DropDownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownTrigger,
} from "@/presentation/components/ui/dropdown-menu";

interface Props {
  onClickDownload: () => void;
  onClickDelete: () => void;
}

export function PirctureItemDropdownMenu({ onClickDownload, onClickDelete }: Props) {
  return (
    <DropDownMenu>
      <DropdownTrigger variant="ghost" size="icon">
        <EllipsisVertical />
      </DropdownTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex gap-4 justify-between items-center"
          onClick={onClickDownload}
        >
          Download <Download size={18} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-4 justify-between items-center text-destructive"
          onClick={onClickDelete}
        >
          Delete <Trash size={18} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropDownMenu>
  );
}
