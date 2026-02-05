
import { signOut } from "@/auth"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

export function UserMenu({ user }: { user: any }) {
    return (
        <div className="flex items-center gap-2">
            {user.image && (
                <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-slate-200"
                />
            )}
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                >
                    Sign Out
                </Button>
            </form>
        </div>
    )
}
