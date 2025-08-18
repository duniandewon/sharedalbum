import { useRef } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";

interface Props {
  eventLink: string;
}

export function EventLink({ eventLink }: Props) {
  const eventLinkRef = useRef<HTMLInputElement>(null);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(eventLinkRef.current?.value || "");
  };

  return (
    <div className="flex gap-4">
      <Input
        className="text-[.8rem]"
        ref={eventLinkRef}
        value={eventLink}
        readOnly
      />

      <Button size="icon" variant="ghost" onClick={handleCopyLink}>
        <Copy />
      </Button>
    </div>
  );
}
