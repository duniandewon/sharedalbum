import type { Picture } from "@/domain/picture/models/Picture.ts";

import { formatDate } from "@/core/utils/formatDate.ts";

import { PirctureItemDropdownMenu } from "./PirctureItemDropdownMenu";

interface Props {
  date: string;
  pictures: Picture[];
  onDownloadPicture: (url: string) => void;
  onDeletePicture: () => void;
}

export function PicturesPerDate({
  date,
  pictures,
  onDeletePicture,
  onDownloadPicture,
}: Props) {
  return (
    <div className="space-y-2">
      <h2>{formatDate(new Date(date))}</h2>
      <div className="grid grid-cols-3 gap-2">
        {pictures.map((picture) => (
          <div
            className="relative min-w-7 min-h-36 bg-primary/60"
            key={picture.id}
          >
            <img
              src={picture.url}
              alt={picture.uploaderName}
              className="w-full h-full object-cover"
            />
            <p className="absolute bottom-1 left-1 text-xs">
              {picture.uploaderName}
            </p>
            <div className="absolute top-0 right-0">
              <PirctureItemDropdownMenu
                onClickDownload={() => {
                  onDownloadPicture(picture.url);
                }}
                onClickDelete={() => {
                  console.log("delete picture with id:", picture.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
