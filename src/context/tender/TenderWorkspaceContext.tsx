import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type TenderStage =
  | 'discovered'
  | 'application'
  | 'approval'
  | 'approved'
  | 'submitted'
  | 'won'
  | 'declined';

export type Tender = {
  id: string;
  title: string;
  buyer: string;
  country: string;
  category: string;
  value: string;
  deadline: string;
  match: number;
  stage: TenderStage;
  missingDocuments: string[];
  owner: string;
  lastAction: string;
};

export type DocumentRecord = {
  id: string;
  name: string;
  type: string;
  status: 'Valid' | 'Expiring' | 'Missing';
  updatedAt: string;
};

export type CompanyProfile = {
  companyName: string;
  registrationNumber: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
  sectors: string;
  yearsExperience: string;
};

export type WorkspaceSettings = {
  emailAlerts: boolean;
  whatsappAlerts: boolean;
  autoPrepare: boolean;
  approvalRequired: boolean;
};

export type ActivityItem = {
  id: string;
  message: string;
  at: string;
};

type WorkspaceState = {
  tenders: Tender[];
  documents: DocumentRecord[];
  profile: CompanyProfile;
  settings: WorkspaceSettings;
  activity: ActivityItem[];
};

type WorkspaceStats = {
  discovered: number;
  applications: number;
  approvals: number;
  readyToSubmit: number;
  submitted: number;
  won: number;
  validDocuments: number;
  totalDocuments: number;
};

type TenderWorkspaceValue = WorkspaceState & {
  stats: WorkspaceStats;
  runScan: () => Tender;
  addToApplications: (id: string) => void;
  prepareApplication: (id: string) => void;
  approveTender: (id: string) => void;
  declineTender: (id: string) => void;
  submitTender: (id: string) => void;
  markWon: (id: string) => void;
  addDocument: (name: string) => void;
  updateProfile: (profile: CompanyProfile) => void;
  updateSettings: (settings: WorkspaceSettings) => void;
  resetDemo: () => void;
};

const STORAGE_KEY = 'tenderpilot-workspace-v2';

const initialTenders: Tender[] = [
  {
    id: 'GH-2026-0841',
    title: 'Supply and delivery of protective clothing and PPE',
    buyer: 'Tema Metropolitan Assembly',
    country: 'Ghana',
    category: 'PPE & Safety',
    value: 'GHS 2.4M',
    deadline: '12 Aug 2026',
    match: 94,
    stage: 'discovered',
    missingDocuments: [],
    owner: 'Ama Serwaa Mensah',
    lastAction: 'Matched against company profile',
  },
  {
    id: 'SA-2026-2197',
    title: 'Facilities maintenance and industrial cleaning services',
    buyer: 'Gauteng Department of Infrastructure',
    country: 'South Africa',
    category: 'Facilities',
    value: 'R 8.6M',
    deadline: '17 Aug 2026',
    match: 89,
    stage: 'application',
    missingDocuments: ['Updated insurance certificate'],
    owner: 'Thabo Mokoena',
    lastAction: 'Application workspace opened',
  },
  {
    id: 'KE-2026-1304',
    title: 'Provision of security guarding and access-control services',
    buyer: 'Kenya Medical Supplies Authority',
    country: 'Kenya',
    category: 'Security',
    value: 'KES 34M',
    deadline: '22 Aug 2026',
    match: 81,
    stage: 'approval',
    missingDocuments: [],
    owner: 'Amina Njoroge',
    lastAction: 'Bid package prepared for approval',
  },
  {
    id: 'UG-2026-6612',
    title: 'Supply of safety boots and reflective workwear',
    buyer: 'Uganda National Roads Authority',
    country: 'Uganda',
    category: 'PPE & Safety',
    value: 'UGX 740M',
    deadline: '8 Aug 2026',
    match: 87,
    stage: 'approved',
    missingDocuments: [],
    owner: 'Kato Ssemanda',
    lastAction: 'Management approval recorded',
  },
  {
    id: 'TZ-2026-4420',
    title: 'Supply of fire extinguishers and emergency safety equipment',
    buyer: 'Tanzania Ports Authority',
    country: 'Tanzania',
    category: 'Fire & Safety',
    value: 'TZS 1.1B',
    deadline: '9 Aug 2026',
    match: 76,
    stage: 'submitted',
    missingDocuments: [],
    owner: 'Neema Mushi',
    lastAction: 'Submission receipt saved',
  },
  {
    id: 'GH-2026-0178',
    title: 'Facilities maintenance contract',
    buyer: 'Ghana Health Service',
    country: 'Ghana',
    category: 'Facilities',
    value: 'GHS 1.6M',
    deadline: '18 Jul 2026',
    match: 91,
    stage: 'won',
    missingDocuments: [],
    owner: 'Kwame Asante',
    lastAction: 'Contract award recorded',
  },
];

const initialDocuments: DocumentRecord[] = [
  {
    id: 'doc-1',
    name: 'Certificate of Incorporation.pdf',
    type: 'Corporate',
    status: 'Valid',
    updatedAt: '28 Jul 2026',
  },
  {
    id: 'doc-2',
    name: 'Tax Clearance Certificate.pdf',
    type: 'Compliance',
    status: 'Valid',
    updatedAt: '24 Jul 2026',
  },
  {
    id: 'doc-3',
    name: 'Public Liability Insurance.pdf',
    type: 'Insurance',
    status: 'Expiring',
    updatedAt: '10 Jul 2026',
  },
  {
    id: 'doc-4',
    name: 'Audited Financial Statements.pdf',
    type: 'Financial',
    status: 'Missing',
    updatedAt: 'Not uploaded',
  },
];

const initialProfile: CompanyProfile = {
  companyName: 'Ubuntu Build & Safety Ltd.',
  registrationNumber: '2021/084126/07',
  country: 'South Africa',
  contactName: 'Ama Serwaa Mensah',
  email: 'tenders@ubuntubuild.co.za',
  phone: '+27 11 555 0194',
  sectors: 'PPE, facilities management, industrial cleaning, fire safety',
  yearsExperience: '8',
};

const initialSettings: WorkspaceSettings = {
  emailAlerts: true,
  whatsappAlerts: true,
  autoPrepare: true,
  approvalRequired: true,
};

function createInitialState(): WorkspaceState {
  return {
    tenders: initialTenders.map((tender) => ({
      ...tender,
      missingDocuments: [...tender.missingDocuments],
    })),
    documents: initialDocuments.map((document) => ({ ...document })),
    profile: { ...initialProfile },
    settings: { ...initialSettings },
    activity: [
      {
        id: 'activity-1',
        message: 'Ama Serwaa Mensah approved the Kenya security bid package.',
        at: '10:42 AM',
      },
      {
        id: 'activity-2',
        message: 'Ama Serwaa Mensah reviewed the new Ghana PPE opportunity.',
        at: '9:18 AM',
      },
      {
        id: 'activity-3',
        message: 'Neema Mushi saved the Tanzania submission receipt.',
        at: 'Yesterday',
      },
    ],
  };
}

function isWorkspaceState(value: unknown): value is WorkspaceState {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<WorkspaceState>;

  return (
    Array.isArray(candidate.tenders) &&
    Array.isArray(candidate.documents) &&
    Array.isArray(candidate.activity) &&
    Boolean(candidate.profile && typeof candidate.profile === 'object') &&
    Boolean(candidate.settings && typeof candidate.settings === 'object')
  );
}

function loadState(): WorkspaceState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createInitialState();

    const parsed: unknown = JSON.parse(saved);
    return isWorkspaceState(parsed) ? parsed : createInitialState();
  } catch {
    return createInitialState();
  }
}

function activity(message: string): ActivityItem {
  return {
    id: `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    message,
    at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

const TenderWorkspaceContext = createContext<TenderWorkspaceValue | null>(null);

export function TenderWorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const transitionTender = (
    id: string,
    allowedStages: TenderStage[],
    nextStage: TenderStage,
    lastAction: string,
    message: (tender: Tender, current: WorkspaceState) => string,
  ) => {
    setState((current) => {
      const tender = current.tenders.find((item) => item.id === id);
      if (!tender || !allowedStages.includes(tender.stage)) return current;

      return {
        ...current,
        tenders: current.tenders.map((item) =>
          item.id === id ? { ...item, stage: nextStage, lastAction } : item,
        ),
        activity: [activity(message(tender, current)), ...current.activity].slice(0, 12),
      };
    });
  };

  const runScan = () => {
    const discovered: Tender = {
      id: 'RW-2026-7711',
      title: 'Supply of medical protective equipment and safety consumables',
      buyer: 'Rwanda Biomedical Centre',
      country: 'Rwanda',
      category: 'PPE & Safety',
      value: 'RWF 620M',
      deadline: '29 Aug 2026',
      match: 92,
      stage: 'discovered',
      missingDocuments: [],
      owner: 'Aline Uwimana',
      lastAction: 'Discovered during a live portal scan',
    };

    setState((current) => {
      const alreadyExists = current.tenders.some((tender) => tender.id === discovered.id);
      return {
        ...current,
        tenders: alreadyExists ? current.tenders : [discovered, ...current.tenders],
        activity: [
          activity(
            alreadyExists
              ? 'Aline Uwimana rechecked the Rwanda opportunity and confirmed the match.'
              : 'Aline Uwimana discovered a 92% Rwanda PPE opportunity.',
          ),
          ...current.activity,
        ].slice(0, 12),
      };
    });

    return discovered;
  };

  const addToApplications = (id: string) => {
    transitionTender(
      id,
      ['discovered'],
      'application',
      'Application workspace opened',
      (tender) => `${tender.owner} moved ${id} into applications.`,
    );
  };

  const prepareApplication = (id: string) => {
    transitionTender(
      id,
      ['application'],
      'approval',
      'AI prepared the technical and compliance package',
      (tender) => `${tender.owner} prepared ${id} for management approval.`,
    );
  };

  const approveTender = (id: string) => {
    transitionTender(
      id,
      ['approval'],
      'approved',
      'Management approval recorded',
      (_tender, current) =>
        `${current.profile.contactName || 'Ama Serwaa Mensah'} approved ${id} for submission.`,
    );
  };

  const declineTender = (id: string) => {
    transitionTender(
      id,
      ['approval'],
      'declined',
      'Bid declined after management review',
      () => `Thabo Mokoena declined ${id} after bid/no-bid review.`,
    );
  };

  const submitTender = (id: string) => {
    transitionTender(
      id,
      ['approved'],
      'submitted',
      'Submission receipt and timestamp saved',
      (tender) => `${tender.owner} submitted ${id} and saved the receipt.`,
    );
  };

  const markWon = (id: string) => {
    transitionTender(
      id,
      ['submitted'],
      'won',
      'Contract award recorded',
      () => `Kwame Asante marked ${id} as won.`,
    );
  };

  const addDocument = (name: string) => {
    const normalizedName = name.trim();
    if (!normalizedName) return;

    const extension = normalizedName.split('.').pop()?.toUpperCase() ?? 'FILE';
    const updatedAt = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    setState((current) => {
      const existing = current.documents.find(
        (document) => document.name.toLowerCase() === normalizedName.toLowerCase(),
      );

      const documents = existing
        ? current.documents.map((document) =>
            document.id === existing.id
              ? { ...document, status: 'Valid' as const, updatedAt }
              : document,
          )
        : [
            {
              id: `doc-${Date.now()}`,
              name: normalizedName,
              type: extension,
              status: 'Valid' as const,
              updatedAt,
            },
            ...current.documents,
          ];

      return {
        ...current,
        documents,
        activity: [
          activity(`Efua Boateng uploaded ${normalizedName} to the document vault.`),
          ...current.activity,
        ].slice(0, 12),
      };
    });
  };

  const updateProfile = (profile: CompanyProfile) => {
    const contactName = profile.contactName.trim() || 'Ama Serwaa Mensah';

    setState((current) => ({
      ...current,
      profile: { ...profile, contactName },
      activity: [
        activity(`${contactName} updated the company profile.`),
        ...current.activity,
      ].slice(0, 12),
    }));
  };

  const updateSettings = (settings: WorkspaceSettings) => {
    setState((current) => ({
      ...current,
      settings,
      activity: [
        activity('Zanele Dlamini updated the workflow settings.'),
        ...current.activity,
      ].slice(0, 12),
    }));
  };

  const resetDemo = () => setState(createInitialState());

  const stats = useMemo<WorkspaceStats>(() => {
    const count = (stages: TenderStage[]) =>
      state.tenders.filter((tender) => stages.includes(tender.stage)).length;

    return {
      discovered: count(['discovered']),
      applications: count(['application']),
      approvals: count(['approval']),
      readyToSubmit: count(['approved']),
      submitted: count(['submitted']),
      won: count(['won']),
      validDocuments: state.documents.filter((document) => document.status === 'Valid').length,
      totalDocuments: state.documents.length,
    };
  }, [state.documents, state.tenders]);

  const value = useMemo<TenderWorkspaceValue>(
    () => ({
      ...state,
      stats,
      runScan,
      addToApplications,
      prepareApplication,
      approveTender,
      declineTender,
      submitTender,
      markWon,
      addDocument,
      updateProfile,
      updateSettings,
      resetDemo,
    }),
    [state, stats],
  );

  return (
    <TenderWorkspaceContext.Provider value={value}>
      {children}
    </TenderWorkspaceContext.Provider>
  );
}

export function useTenderWorkspace() {
  const context = useContext(TenderWorkspaceContext);
  if (!context) {
    throw new Error('useTenderWorkspace must be used inside TenderWorkspaceProvider');
  }
  return context;
}
