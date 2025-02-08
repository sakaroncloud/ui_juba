import FallbackImage from '@/components/fallback-image'
import { getSession } from '@/lib/actions/session'

export const AccountProfileCard = async () => {
    const session = await getSession()
    return (
        <div className="flex items-center  flex-col justify-center gap-y-2 p-3">
            <FallbackImage
                src={"/assets/icons/user.png"}
                type="square"
                width={80}
                height={80}
                alt={"user"}
                errorClassName="size-20 border-slate-100 border rounded-full uppercase text-sm text-slate-200"
                errorMessage="Image"
            />
            <div className="text-center">
                <div className="font-medium text-lg">{session?.user.fullName}</div>
                <div className="capitalize text-sm">({session?.user.email})</div>
            </div>
        </div>
    )
}
