
import { signIn } from "@/auth"
import { Button } from "@/components/ui/Button"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <Button type="submit" variant="outline" size="sm">Sign in with Google</Button>
        </form>
    )
}
