
import { signOut } from "@/auth"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

export function UserMenu({ user }: { user: any }) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                {user.image && (
                    <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                )}
                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                    {user.name}
                </span>
            </div>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <Button type="submit" variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">Sign Out</Button>
            </form>
        </div>
    )
}
