'use client';

import { Button } from "@/components/ui/Button"
import Image from "next/image"

export function UserMenu({ user }: { user: any }) {
    async function handleSignOut() {
        await fetch('/api/auth/signout', { method: 'POST' });
        window.location.href = '/';
    }

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
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
            >
                Sign Out
            </Button>
        </div>
    )
}
