
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    callbacks: {
        async session({ session, user }) {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    events: {
        async signIn({ user }) {
            if (user.id) {
                // Find existing users
                const userCount = await prisma.user.count();

                // Only run migration if this is the first/only user, or if explicitly needed.
                // For safety, let's just claim ALL orphaned decisions for THIS user.
                // This assumes the first person to log in is the owner.
                const orphanedDecisions = await prisma.decision.count({
                    where: { userId: null }
                });

                if (orphanedDecisions > 0) {
                    console.log(`[Auth] User ${user.id} claiming ${orphanedDecisions} orphaned decisions.`);
                    await prisma.decision.updateMany({
                        where: { userId: null },
                        data: { userId: user.id },
                    });
                }
            }
        },
    },
})
