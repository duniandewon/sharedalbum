import { Download, EllipsisVertical, Trash } from "lucide-react";

import { type Picture } from "@/domain/picture/models/Picture";
import {
  DropDownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownTrigger,
} from "@/presentation/components/ui/dropdown-menu";

interface Props {
  picture: Picture;
}

interface PirctureItemDropdownMenu {
  onClickDownload: () => void;
  onClickDelete: () => void;
}

function PirctureItemDropdownMenu({
  onClickDownload,
  onClickDelete,
}: PirctureItemDropdownMenu) {
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

export function PirctureItem({ picture }: Props) {
  const handleDownload = () => {
    console.log("download picture with id:", picture.id);
  };

  const handleDelete = () => {
    console.log("delete picture with id:", picture.id);
  };

  return (
    <div className="relative min-w-7 min-h-36 bg-primary/60">
      <img
        src={picture.url}
        alt={picture.uploaderName}
        className="w-full h-full object-cover"
      />
      <p className="absolute bottom-1 left-1 text-xs">{picture.uploaderName}</p>
      <div className="absolute top-0 right-0">
        <PirctureItemDropdownMenu
          onClickDownload={handleDownload}
          onClickDelete={handleDelete}
        />
      </div>
    </div>
  );
}
