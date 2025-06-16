import {Button} from "@/presentation/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";
import type {ReactNode} from "react";

interface Props {
    title?: ReactNode
    actions?: ReactNode,
    onClickBack: () => void
}

export function AppHeader({actions, title, onClickBack}: Props) {
    return <div className="flex items-center p-2">
        <Button onClick={() => onClickBack()} variant="ghost" size="icon">
            <ArrowLeft size={26}/>
        </Button>
        <div className="flex-1">
            {title}
        </div>
        {actions}
    </div>
}