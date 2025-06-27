import {Modal} from "@/presentation/components/ui/modal.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";

interface Props {
    isOpen: boolean
    onGetPermission: () => void
}

export function GetMediaPermissionModal({onGetPermission, isOpen}: Props) {
    return (
        <Modal open={isOpen} onClose={() => ({})}>
            <Button onClick={() => onGetPermission()}>Allow camera</Button>
        </Modal>
    )
}