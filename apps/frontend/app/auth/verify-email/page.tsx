"use client"
import { verifyEmail } from "@/lib/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { cn, handleToast } from "@repo/ui/lib/utils";
import { Slider } from "@repo/ui/components/slider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { SyncLoader } from "react-spinners";

const VerifyEmailPage = () => {
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition();
    const [submitted, setSubmitted] = React.useState(false);
    const router = useRouter()

    const onSubmit = () => {
        const token = searchParams.get("token")
        const email = searchParams.get("email")

        if (token && email) {
            console.log(token, email)
            startTransition(async () => {
                const response = await verifyEmail(token, email)
                handleToast(response, () => {
                    router.push("/")
                })
                setSubmitted(true)
                router.push("/")

            })
        }

    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Verifying your email</CardTitle>
                <CardDescription>Slide to verify</CardDescription>
            </CardHeader>
            <CardContent>
                {isPending && <SyncLoader color="#ffb19c" />}
                {!submitted && !isPending && (
                    <Slider
                        onValueChange={(e) => {
                            console.log(e)
                            if (e[0] == 100) {
                                onSubmit()
                            }
                        }}
                        defaultValue={[10]}
                        max={100}
                        step={1}
                        className={cn("w-full")}

                    />
                )}

            </CardContent>
        </Card>
    )
}

export default VerifyEmailPage