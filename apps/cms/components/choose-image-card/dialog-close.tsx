import { Button } from "@repo/ui/components/button";
import { DialogClose } from "@repo/ui/components/dialog"

type Props = {
    label: string;
    value: any;
}
export const ChooseImageDialogClose = ({ label, value }: Props) => {

    if (value && value.length > 0) {
        return (

            <DialogClose asChild>
                <Button className="space-x-3" type="button">
                    Set {label}
                </Button>
            </DialogClose>
        )
    }
    return null
}