
import { auth } from "@/auth"

export default auth((req) => {
    // custom logic if needed
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
