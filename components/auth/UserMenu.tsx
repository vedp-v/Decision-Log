import { signOut } from "@/auth"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

export function UserMenu({ user }: { user: any }) {
    return (
        <div className="flex items-center gap-3">
            {user.image && (
                <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={28}
                    height={28}
                    className="rounded-full ring-1 ring-border"
                />
            )}
            <form
                action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                }}
            >
                <Button type="submit" variant="ghost" size="sm">
                    Sign Out
                </Button>
            </form>
        </div>
    )
}
