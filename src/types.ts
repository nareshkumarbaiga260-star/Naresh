export type PostCategory = 
  | 'job' 
  | 'yojana' 
  | 'admit-card' 
  | 'result' 
  | 'answer-key' 
  | 'syllabus' 
  | 'scholarship' 
  | 'exam-update';

export type PostStatus = 'Open' | 'Upcoming' | 'Closed';

export type IndianState = 
  | 'सभी राज्य / All India'
  | 'केंद्र सरकार (All India)'
  | 'उत्तर प्रदेश'
  | 'बिहार'
  | 'राजस्थान'
  | 'मध्य प्रदेश'
  | 'हरियाणा'
  | 'दिल्ली'
  | 'झारखंड'
  | 'उत्तराखंड';

export type QualificationLevel = 
  | '8वीं / 10वीं पास'
  | '12वीं पास'
  | 'स्नातक (Graduate)'
  | 'स्नातकोत्तर (Post Graduate)'
  | 'ITI / डिप्लोमा'
  | 'इंजीनियरिंग / बी.टेक'
  | 'बी.एड / डी.एल.एड';

export interface BasePost {
  id: string;
  slug: string;
  category: PostCategory;
  title: string;
  department: string;
  summary: string;
  state: IndianState;
  qualification: QualificationLevel;
  startDate: string;
  lastDate: string;
  status: PostStatus;
  officialNotificationUrl: string;
  officialApplyUrl: string;
  sourceName: string;
  publishedAt: string;
  updatedAt: string;
  isDraft: boolean;
  isDemo: boolean;
  seoTitle?: string;
  seoDescription?: string;
  viewsCount?: number;
}

export interface JobPostDetails extends BasePost {
  totalVacancies: string;
  postNames: string[];
  ageLimit: string;
  payScale: string;
  applicationFee: string;
  selectionProcess: string[];
  examDate?: string;
  requiredDocuments: string[];
  applicationSteps: string[];
}

export interface YojanaPostDetails extends BasePost {
  schemeName: string;
  schemeScope: 'केंद्र सरकार (Central)' | 'राज्य सरकार (State)';
  objective: string;
  eligibility: string[];
  benefits: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
}

export type AnyPost = JobPostDetails | YojanaPostDetails;

export interface CorrectionRequest {
  id: string;
  name: string;
  email: string;
  postTitle: string;
  postUrl: string;
  errorDetail: string;
  verifiedSourceUrl: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  createdAt: string;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  preferredStates: string[];
  preferredCategories: string[];
  subscribedAt: string;
  active: boolean;
}
