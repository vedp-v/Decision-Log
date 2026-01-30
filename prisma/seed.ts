import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.decisionNote.deleteMany({});
  await prisma.decision.deleteMany({});

  const today = new Date();
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(today.getDate() + 7);

  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);

  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const twoMonthsAgo = new Date(today);
  twoMonthsAgo.setMonth(today.getMonth() - 2);

  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Decision 1: Productivity tool switch
  const decision1 = await prisma.decision.create({
    data: {
      title: 'Switch from Notion to Obsidian for personal knowledge management',
      date: twoMonthsAgo,
      status: 'Decided',
      context:
        'Feeling limited by Notion\'s lack of local-first approach and vendor lock-in. Want more control over my notes and better linking capabilities.',
      optionsConsidered:
        '1. Stay with Notion\n2. Switch to Obsidian\n3. Try Roam Research\n4. Use plain Markdown files',
      decision:
        'Moving to Obsidian for its local-first approach, excellent linking, and plugin ecosystem. Will keep Notion for team collaboration.',
      expectedImpact:
        'Better note organization, faster search, and peace of mind knowing my data is local. Should improve my thinking and writing workflow.',
      confidence: 75,
      reversible: true,
      reviewDate: oneWeekFromNow,
      links: [
        { label: 'Obsidian website', url: 'https://obsidian.md' },
        { label: 'Migration guide', url: 'https://help.obsidian.md/import' },
      ],
      tags: ['Productivity', 'Tools', 'Personal'],
      outcomeStatus: 'Success',
      actualImpact:
        'Migration took 2 days but was worth it. My note-taking speed improved and I feel more in control of my data.',
      learnings:
        'Local-first tools require more initial setup but pay off in the long run. The plugin ecosystem is powerful.',
      whatIdDoDifferently:
        'Would have started with a smaller subset of notes to test the workflow before migrating everything.',
      reviewedOn: new Date(),
      notes: {
        create: [
          {
            content: 'Started migration process. Exported all Notion pages.',
            createdAt: new Date(twoMonthsAgo.getTime() + 24 * 60 * 60 * 1000),
          },
          {
            content: 'Completed migration. Setting up plugins and templates.',
            createdAt: new Date(twoMonthsAgo.getTime() + 3 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  // Decision 2: Career move
  const decision2 = await prisma.decision.create({
    data: {
      title: 'Accept senior engineering role at early-stage startup',
      date: threeMonthsAgo,
      status: 'Decided',
      context:
        'Received offer from a 15-person startup working on developer tools. Currently at a stable mid-size company. Startup offers more ownership but higher risk.',
      optionsConsidered:
        '1. Accept startup offer\n2. Stay at current company and aim for promotion\n3. Look for senior role at larger tech company\n4. Negotiate better offer at current company',
      decision:
        'Accepting the startup role. The product aligns with my interests, and I want more ownership and impact. The equity could be valuable.',
      expectedImpact:
        'More learning opportunities, broader responsibilities, and potential upside from equity. Risk of failure or company not working out.',
      confidence: 65,
      reversible: false,
      reviewDate: twoWeeksFromNow,
      links: [
        { label: 'Startup website', url: 'https://example-startup.com' },
      ],
      tags: ['Career', 'Risk', 'Growth'],
      outcomeStatus: 'Partial',
      actualImpact:
        'Learning a ton and have significant impact on product direction. Work-life balance is challenging at times.',
      learnings:
        'Startup life is intense but rewarding. The broader scope has accelerated my growth as an engineer.',
      whatIdDoDifferently:
        'Would have negotiated for more equity given the early stage. Should have asked more questions about runway.',
      reviewedOn: new Date(),
    },
  });

  // Decision 3: Health habit
  const decision3 = await prisma.decision.create({
    data: {
      title: 'Start waking up at 6 AM daily for morning routine',
      date: oneMonthAgo,
      status: 'Decided',
      context:
        'Feeling rushed in the mornings and starting work without proper preparation. Want to add exercise and reading time before work.',
      optionsConsidered:
        '1. Wake up at 6 AM\n2. Wake up at 5:30 AM (more aggressive)\n3. Keep current 7:30 AM wake time\n4. Exercise in the evening instead',
      decision:
        'Committing to 6 AM wake-up time. Will include 30 min exercise, 20 min reading, and proper breakfast.',
      expectedImpact:
        'Better energy throughout the day, consistent exercise habit, and more focused mornings. May need to adjust sleep time.',
      confidence: 55,
      reversible: true,
      reviewDate: oneWeekFromNow,
      links: [],
      tags: ['Health', 'Habits', 'Personal'],
      outcomeStatus: 'Partial',
      actualImpact:
        'Successfully waking up at 6 AM 5 days per week. Mornings feel much better. Struggling on weekends.',
      learnings:
        'Need a gradual adjustment period. Going to bed earlier is just as important as waking up earlier.',
      whatIdDoDifferently:
        'Would have started with 6:30 AM first, then moved to 6 AM after a few weeks.',
    },
  });

  // Decision 4: Investment decision
  const decision4 = await prisma.decision.create({
    data: {
      title: 'Allocate 20% of portfolio to index funds instead of individual stocks',
      date: twoMonthsAgo,
      status: 'Decided',
      context:
        'Currently picking individual stocks but spending too much time on research and emotional energy on market fluctuations. Considering a more passive approach.',
      optionsConsidered:
        '1. Move 20% to index funds\n2. Move 100% to index funds\n3. Keep picking individual stocks\n4. Use a robo-advisor',
      decision:
        'Moving 20% to low-cost index funds (VTI, VXUS) as a test. Will keep 80% in individual stocks for now.',
      expectedImpact:
        'Less stress from market watching, more time for other activities, and likely better long-term returns.',
      confidence: 80,
      reversible: true,
      reviewDate: twoWeeksFromNow,
      links: [
        { label: 'Bogleheads wiki', url: 'https://www.bogleheads.org/wiki' },
      ],
      tags: ['Finances', 'Investing', 'Personal'],
    },
  });

  // Decision 5: Side project
  const decision5 = await prisma.decision.create({
    data: {
      title: 'Build and launch a SaaS product for developer productivity',
      date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
      status: 'Proposed',
      context:
        'Have an idea for a developer tool that scratches my own itch. Considering whether to pursue it as a side project.',
      optionsConsidered:
        '1. Build and launch the product\n2. Validate idea first without building\n3. Focus on other priorities\n4. Find a co-founder first',
      decision:
        'Will spend 3 months validating the idea by talking to 20 potential users before building. If validation succeeds, commit to building.',
      expectedImpact:
        'Potential to create additional income stream and help other developers. Risk of time investment with no return.',
      confidence: 60,
      reversible: true,
      reviewDate: oneWeekFromNow,
      links: [],
      tags: ['Product', 'Side Project', 'Career'],
    },
  });

  // Decision 6: Learning goal
  const decision6 = await prisma.decision.create({
    data: {
      title: 'Learn Rust by building a CLI tool',
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
      status: 'Proposed',
      context:
        'Want to learn a systems programming language. Rust seems like a good choice for its safety and modern tooling.',
      optionsConsidered:
        '1. Learn Rust with a project\n2. Learn Go instead\n3. Take an online course\n4. Read "The Rust Programming Language" book only',
      decision:
        'Will learn Rust by building a CLI tool for personal file management. Will use the book as reference and do exercises.',
      expectedImpact:
        'New programming paradigm will make me a better engineer overall. Might be useful for performance-critical projects.',
      confidence: 70,
      reversible: true,
      reviewDate: twoWeeksFromNow,
      links: [
        { label: 'The Rust Book', url: 'https://doc.rust-lang.org/book/' },
      ],
      tags: ['Learning', 'Programming', 'Personal'],
    },
  });

  // Decision 7: Social media
  const decision7 = await prisma.decision.create({
    data: {
      title: 'Quit Twitter and focus on long-form writing',
      date: oneMonthAgo,
      status: 'Reversed',
      context:
        'Spending too much time scrolling Twitter. Feel like it\'s affecting my focus and mental health. Want to be more intentional with time.',
      optionsConsidered:
        '1. Delete Twitter completely\n2. Use Twitter for 15 min/day only\n3. Replace with other social media\n4. Take a 30-day break',
      decision:
        'Deleted Twitter app and will focus on writing blog posts instead. Want to create more than I consume.',
      expectedImpact:
        'More time for deep work and meaningful content creation. Risk of missing important updates from community.',
      confidence: 50,
      reversible: true,
      reviewDate: new Date(),
      links: [],
      tags: ['Personal', 'Productivity', 'Health'],
      outcomeStatus: 'Fail',
      actualImpact:
        'Missed too many important discussions and opportunities in my field. Felt disconnected from the community.',
      learnings:
        'Complete elimination is harder than moderation. The problem was lack of intentional usage, not the platform itself.',
      whatIdDoDifferently:
        'Would set specific time blocks for Twitter usage (e.g., 15 minutes after lunch) instead of quitting completely.',
      reviewedOn: new Date(),
      notes: {
        create: [
          {
            content: 'Deleted Twitter app. Feeling good about the decision.',
            createdAt: new Date(oneMonthAgo.getTime() + 1 * 24 * 60 * 60 * 1000),
          },
          {
            content: 'Miss some aspects of Twitter. Feeling FOMO.',
            createdAt: new Date(oneMonthAgo.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
          {
            content: 'Decided to reverse this. Will reinstall but use more intentionally.',
            createdAt: new Date(oneMonthAgo.getTime() + 20 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  // Decision 8: Living situation
  const decision8 = await prisma.decision.create({
    data: {
      title: 'Move to a smaller apartment to save money',
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      status: 'Proposed',
      context:
        'Current rent is 35% of income. Could save $800/month by moving to a smaller place. Lease is up in 2 months.',
      optionsConsidered:
        '1. Move to smaller apartment\n2. Find a roommate\n3. Stay in current apartment\n4. Move to a different neighborhood',
      decision:
        'Will move to a smaller 1-bedroom to save money. Extra savings will go to emergency fund and investments.',
      expectedImpact:
        'Save $9,600/year. Less space might feel cramped. Closer to work could save commute time.',
      confidence: 65,
      reversible: false,
      reviewDate: oneWeekFromNow,
      links: [],
      tags: ['Finances', 'Personal', 'Living'],
    },
  });

  console.log('Seeding completed successfully!');
  console.log(`Created ${8} decisions with notes.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
