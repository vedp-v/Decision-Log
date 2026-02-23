import { signOut } from "@/auth"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"

export function UserMenu({ user }: { user: any }) {
    return (
        <div className="flex items-center gap-3">
            {user.image && (
                <Link href="/profile" title="Profile">
                    <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full ring-1 ring-border hover:ring-2 hover:ring-foreground/20 transition-all"
                    />
                </Link>
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
