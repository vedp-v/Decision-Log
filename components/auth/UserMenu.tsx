'use client';

import { Button } from "@/components/ui/Button"
import Image from "next/image"

export function UserMenu({ user }: { user: any }) {
    async function handleSignOut() {
        await fetch('/api/auth/signout', { method: 'POST' });
        window.location.href = '/';
    }

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
            <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleSignOut}
            >
                Sign Out
            </Button>
        </div>
    )
}
