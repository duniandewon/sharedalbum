import {cn} from "@/core/utils/cn.ts";
import {type ComponentPropsWithoutRef, useEffect, useRef} from "react";

type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
    onClose: () => void;
};

export function Modal({className, open, onClose, children, ...props}: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialogNode = ref.current!;

        if (open) {
            dialogNode.showModal();
        } else {
            dialogNode.close();
        }
    }, [open, onClose]);

    return <dialog ref={ref} className={cn("group", className)} onCancel={onClose} {...props}>
        <div className="fixed inset-0 grid place-content-center bg-black/70 px-4" onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    </dialog>
}