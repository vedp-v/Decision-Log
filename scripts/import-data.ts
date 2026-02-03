
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting data import to Cloud...');

    const backupPath = path.join(process.cwd(), 'data-backup.json');
    if (!fs.existsSync(backupPath)) {
        console.error('Backup file not found at:', backupPath);
        process.exit(1);
    }

    const rawData = fs.readFileSync(backupPath, 'utf-8');
    const decisions = JSON.parse(rawData);

    console.log(`Found ${decisions.length} decisions to import.`);

    for (const decision of decisions) {
        try {
            const { notes, ...decisionData } = decision;

            // Upsert Decision
            await prisma.decision.upsert({
                where: { id: decisionData.id },
                update: decisionData,
                create: decisionData,
            });

            // Upsert Notes associated with the decision
            if (notes && notes.length > 0) {
                for (const note of notes) {
                    await prisma.decisionNote.upsert({
                        where: { id: note.id },
                        update: { ...note, decisionId: decisionData.id },
                        create: { ...note, decisionId: decisionData.id },
                    });
                }
            }

            console.log(`Imported decision: ${decisionData.title}`);
        } catch (e) {
            console.error(`Failed to import decision ${decision.id}:`, e);
        }
    }

    console.log('Import completed!');
}

main();
