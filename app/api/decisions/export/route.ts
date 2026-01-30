import { NextResponse } from 'next/server';
import { getDecisions } from '@/lib/actions';

export async function GET() {
  try {
    const decisions = await getDecisions();

    // Prepare CSV data
    const csvData = decisions.map((decision) => ({
      Title: decision.title,
      Status: decision.status,
      Date: decision.date.toISOString().split('T')[0],
      Confidence: decision.confidence,
      Reversible: decision.reversible ? 'Yes' : 'No',
      ReviewDate: decision.reviewDate
        ? decision.reviewDate.toISOString().split('T')[0]
        : '',
      Tags: decision.tags.join(', '),
      Context: (decision.context || '').replace(/\n/g, ' '),
      OptionsConsidered: (decision.optionsConsidered || '').replace(/\n/g, ' '),
      Decision: (decision.decision || '').replace(/\n/g, ' '),
      ExpectedImpact: (decision.expectedImpact || '').replace(/\n/g, ' '),
      OutcomeStatus: decision.outcomeStatus,
      ActualImpact: (decision.actualImpact || '').replace(/\n/g, ' '),
      Learnings: (decision.learnings || '').replace(/\n/g, ' '),
      WhatIdDoDifferently: (decision.whatIdDoDifferently || '').replace(
        /\n/g,
        ' '
      ),
      ReviewedOn: decision.reviewedOn
        ? decision.reviewedOn.toISOString().split('T')[0]
        : '',
      CreatedAt: decision.createdAt.toISOString().split('T')[0],
    }));

    // Generate CSV
    const headers = Object.keys(csvData[0] || {});
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(','));

    // Add data rows
    for (const row of csvData) {
      const values = headers.map((header) => {
        const value = row[header as keyof typeof row];
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (value === null || value === undefined || value === '') return '';
        const stringValue = String(value);
        if (
          stringValue.includes(',') ||
          stringValue.includes('"') ||
          stringValue.includes('\n')
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      });
      csvRows.push(values.join(','));
    }

    const csv = csvRows.join('\n');

    // Return CSV as downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="decisions-${
          new Date().toISOString().split('T')[0]
        }.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting decisions:', error);
    return NextResponse.json(
      { error: 'Failed to export decisions' },
      { status: 500 }
    );
  }
}
