export type DecisionStatus = 'Proposed' | 'Decided' | 'Reversed';
export type OutcomeStatus = 'Unknown' | 'Success' | 'Partial' | 'Fail';

export interface Link {
  label: string;
  url: string;
}

export interface DecisionFormData {
  title: string;
  date: Date;
  status: DecisionStatus;
  context?: string;
  optionsConsidered?: string;
  decision?: string;
  expectedImpact?: string;
  confidence: number;
  reversible: boolean;
  reviewDate?: Date | null;
  links?: Link[];
  tags: string[];
}

export interface OutcomeFormData {
  outcomeStatus: OutcomeStatus;
  actualImpact?: string;
  learnings?: string;
  whatIdDoDifferently?: string;
  reviewedOn?: Date | null;
}

export interface DecisionWithNotes {
  id: string;
  title: string;
  date: Date;
  status: DecisionStatus;
  context?: string | null;
  optionsConsidered?: string | null;
  decision?: string | null;
  expectedImpact?: string | null;
  confidence: number;
  reversible: boolean;
  reviewDate?: Date | null;
  links?: Link[] | null;
  tags: string[];
  outcomeStatus: OutcomeStatus;
  actualImpact?: string | null;
  learnings?: string | null;
  whatIdDoDifferently?: string | null;
  reviewedOn?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  notes: DecisionNote[];
}

export interface DecisionNote {
  id: string;
  decisionId: string;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface FilterOptions {
  search?: string;
  status?: DecisionStatus | 'all';
  tag?: string;
  dateFrom?: Date;
  dateTo?: Date;
  reviewDue?: '7' | '14' | '30' | 'all';
}
