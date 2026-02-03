
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting data export...');

    try {
        const decisions = await prisma.decision.findMany({
            include: {
                notes: true,
            },
        });

        const backupPath = path.join(process.cwd(), 'data-backup.json');
        fs.writeFileSync(backupPath, JSON.stringify(decisions, null, 2));

        console.log(`Successfully exported ${decisions.length} decisions to ${backupPath}`);
    } catch (e) {
        console.error('Error during data export:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
