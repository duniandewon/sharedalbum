import type { Picture } from "@/domain/picture/models/Picture.ts";

import { formatDate } from "@/core/utils/formatDate.ts";
import { PirctureItem } from "./PictureItem";

interface Props {
  date: string;
  pictures: Picture[];
}

export function PicturesPerDate({ date, pictures }: Props) {
  return (
    <div className="space-y-2">
      <h2>{formatDate(new Date(date))}</h2>
      <div className="grid grid-cols-3 gap-2">
        {pictures.map((picture) => (
          <PirctureItem picture={picture} key={picture.id} />
        ))}
      </div>
    </div>
  );
}
