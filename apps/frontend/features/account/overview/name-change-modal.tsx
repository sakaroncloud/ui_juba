import CustomButton from "@/components/custom-button"
import { CustomFormField } from "@/components/forms/form-field"
import { useModal } from "@/hooks/useModal"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/components/dialog"
import { Form } from "@repo/ui/components/form"

import { Separator } from "@repo/ui/components/separator"
import { useQueryClient } from "@tanstack/react-query"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    fullName: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),


})

export const NameChangeModal = () => {
    const { isOpen, onClose, data } = useModal();
    const queryClient = useQueryClient()
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: data?.fullName || "",
        }
    })


    const onSubmit = (values: z.infer<typeof schema>) => {
        console.log(values)
        startTransition(async () => {
            // const response = await submitAddress(values, data?.addressId);
            // handleToast(response, () => {
            //     handleClose()
            // })
        })
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit Name</DialogTitle>
                    <DialogDescription>
                        Make changes to your name here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Separator />
                        <div className="space-y-3">
                            <CustomFormField
                                elementName='input'
                                fieldId='fullName'
                                label='First Name'
                                inputType='text'
                                placeholder=''
                                className='w-full'
                            />

                        </div>

                        <div className="text-right">
                            <CustomButton
                                className="rounded-full  text-white"
                                size={"lg"}
                                label={"Save Changes"}
                                pending={isPending}
                            />
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
