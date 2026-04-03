export const featuredGigs = [
  {
    id: 1,
    title: "Wedding Photography Needed",
    description: "Looking for an experienced photographer for a wedding event in June. Must have portfolio of previous wedding work and own equipment.",
    budget: 1500,
    location: "Singapore",
    postedAt: "2 days ago",
    category: "Photography",
    clientName: "Sarah M.",
    saved: false,
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    description: "Need a designer to create modern UI/UX for our fitness tracking app. Should include wireframes and high-fidelity mockups.",
    budget: 2800,
    location: "Remote",
    postedAt: "5 hours ago",
    category: "Design",
    clientName: "TechCorp",
    saved: true,
  },
  {
    id: 3,
    title: "Content Writer for Tech Blog",
    description: "Seeking a skilled writer to produce 10 SEO-optimized articles about AI and machine learning. 1000-1500 words each.",
    budget: 800,
    location: "Remote",
    postedAt: "1 day ago",
    category: "Writing",
    clientName: "David L.",
    saved: false,
  },
  {
    id: 4,
    title: "Social Media Manager",
    description: "Looking for someone to manage Instagram and TikTok accounts for a fashion brand. Must create engaging content and grow followers.",
    budget: 1200,
    location: "Singapore",
    postedAt: "3 days ago",
    category: "Marketing",
    clientName: "StyleHub",
    saved: false,
  },
  {
    id: 5,
    title: "React Developer for Dashboard",
    description: "Need an experienced React developer to build an analytics dashboard with charts and real-time data visualization.",
    budget: 3500,
    location: "Remote",
    postedAt: "6 hours ago",
    category: "Development",
    clientName: "StartupXYZ",
    saved: true,
  },
  {
    id: 6,
    title: "Video Editor for YouTube Channel",
    description: "Seeking a video editor for weekly YouTube content. Must be proficient in Premiere Pro or Final Cut Pro. Long-term collaboration.",
    budget: 600,
    location: "Remote",
    postedAt: "4 days ago",
    category: "Video",
    clientName: "CreatorStudio",
    saved: false,
  },
];

export const topFreelancers = [
  {
    id: 1,
    name: "Alex Chen",
    title: "Full Stack Developer",
    rating: 4.9,
    completedGigs: 127,
    avatar: null,
    skills: ["React", "Node.js", "Python"],
  },
  {
    id: 2,
    name: "Maya Patel",
    title: "UI/UX Designer",
    rating: 5.0,
    completedGigs: 98,
    avatar: null,
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 3,
    name: "James Wilson",
    title: "Content Writer",
    rating: 4.8,
    completedGigs: 203,
    avatar: null,
    skills: ["SEO", "Copywriting", "Blogging"],
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    title: "Video Editor",
    rating: 4.9,
    completedGigs: 156,
    avatar: null,
    skills: ["Premiere Pro", "After Effects", "DaVinci"],
  },
];

// ============= APPLICANTS DATA =============

export const mockApplicants = {
  // Applications for "Wedding Photography Needed" gig (ID: 1)
  1: [
    {
      id: 'app-1',
      gigId: 1,
      freelancer: {
        id: 'user-101',
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 4.9,
        reviewCount: 87,
        completedGigs: 124,
        responseTime: '2 hours',
        skills: ['Wedding Photography', 'Portrait', 'Editing', 'Lightroom'],
        hourlyRate: 85,
        location: 'Singapore',
        memberSince: 'Jan 2022'
      },
      coverLetter: "I'm a seasoned wedding photographer with over 5 years of experience capturing love stories. I've shot 80+ weddings across Singapore and specialize in candid, emotional moments. My style blends documentary with artistic portraits. I use professional Sony A7IV cameras and would love to make your special day unforgettable. Available for the entire day including pre-ceremony preparations.",
      proposedTimeline: '1 day (full coverage from prep to reception)',
      portfolio: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400',
        'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400'
      ],
      matchScore: 95,
      appliedAt: '2024-03-25T10:30:00Z',
      status: 'pending'
    },
    {
      id: 'app-2',
      gigId: 1,
      freelancer: {
        id: 'user-102',
        name: 'Marcus Tan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        rating: 4.7,
        reviewCount: 52,
        completedGigs: 68,
        responseTime: '4 hours',
        skills: ['Photography', 'Videography', 'Drone', 'Editing'],
        hourlyRate: 95,
        location: 'Singapore',
        memberSince: 'Jun 2022'
      },
      coverLetter: "Hello! I offer both photography AND videography services for weddings. My package includes drone shots for stunning aerial venue coverage. I've covered 40+ weddings and provide edited photos within 2 weeks, highlight video within 4 weeks. I bring backup equipment and an assistant to ensure we capture every moment from multiple angles.",
      proposedTimeline: '1 day + 2 weeks for photo delivery',
      portfolio: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400'
      ],
      matchScore: 88,
      appliedAt: '2024-03-25T14:20:00Z',
      status: 'pending'
    },
    {
      id: 'app-3',
      gigId: 1,
      freelancer: {
        id: 'user-103',
        name: 'Emily Wong',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        rating: 4.8,
        reviewCount: 34,
        completedGigs: 45,
        responseTime: '1 hour',
        skills: ['Wedding Photography', 'Fine Art', 'Film Photography', 'Editing'],
        hourlyRate: 75,
        location: 'Singapore',
        memberSince: 'Mar 2023'
      },
      coverLetter: "I specialize in romantic, fine-art wedding photography with a focus on natural light and authentic emotions. My approach is unobtrusive - I capture moments as they unfold naturally. I also shoot on film for that timeless, elegant look (included in package). Quick turnaround: sneak peeks within 48 hours, full gallery in 10 days.",
      proposedTimeline: '1 day + 10 days for delivery',
      portfolio: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
        'https://images.unsplash.com/photo-1543764753-b1cf80e8f529?w=400',
        'https://images.unsplash.com/photo-1594552072238-891d8f9f9a55?w=400'
      ],
      matchScore: 92,
      appliedAt: '2024-03-24T09:15:00Z',
      status: 'pending'
    },
    {
      id: 'app-4',
      gigId: 1,
      freelancer: {
        id: 'user-104',
        name: 'David Lim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        rating: 4.5,
        reviewCount: 19,
        completedGigs: 28,
        responseTime: '6 hours',
        skills: ['Photography', 'Photojournalism', 'Events', 'Editing'],
        hourlyRate: 65,
        location: 'Singapore',
        memberSince: 'Sep 2023'
      },
      coverLetter: "I'm a photojournalist-style wedding photographer who captures raw, candid moments. No stiff poses - just real emotions and genuine laughter. I've covered 25+ weddings and pride myself on being invisible while getting the perfect shots. My editing style is clean and timeless. Competitive rates for new couples!",
      proposedTimeline: '1 day + 14 days for delivery',
      portfolio: [
        'https://images.unsplash.com/photo-1525258437537-5078369a9c2e?w=400',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400'
      ],
      matchScore: 78,
      appliedAt: '2024-03-26T16:45:00Z',
      status: 'pending'
    },
    {
      id: 'app-5',
      gigId: 1,
      freelancer: {
        id: 'user-105',
        name: 'Jessica Koh',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
        rating: 5.0,
        reviewCount: 12,
        completedGigs: 15,
        responseTime: '3 hours',
        skills: ['Wedding Photography', 'Luxury Events', 'Destination Weddings', 'Editing'],
        hourlyRate: 120,
        location: 'Singapore',
        memberSince: 'Nov 2023'
      },
      coverLetter: "Luxury wedding specialist with experience in high-end venues and destination weddings. I bring premium equipment (Canon R5, professional lenses), professional lighting, and a refined aesthetic. My photos have been featured in wedding magazines. I offer a complimentary engagement shoot and premium leather-bound album. Investment in timeless memories.",
      proposedTimeline: '1 day + 3 weeks for premium delivery',
      portfolio: [
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400',
        'https://images.unsplash.com/photo-1519167758481-83f29da8c679?w=400'
      ],
      matchScore: 85,
      appliedAt: '2024-03-23T11:00:00Z',
      status: 'pending'
    }
  ],
  
  // Applications for other gigs (empty for now, add as needed)
  2: [], // Mobile App UI/UX Design
  3: [], // Content Writer for Tech Blog
  4: [], // Social Media Manager
  5: [], // React Developer for Dashboard
  6: []  // Video Editor for YouTube Channel
};

// ============= CONTRACT SIGNING DATA =============

export const mockContractSignings = {
  1: {
    id: 1,
    gigId: 1,
    gigTitle: "Wedding Photography Needed",
    applicationId: "app-3", // Emily Wong's application
    createdAt: "2024-03-19T15:00:00Z",
    
    client: {
      id: "client-1",
      name: "Sarah M.",
      email: "sarah.m@email.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM"
    },
    freelancer: {
      id: "user-103",
      name: "Emily Wong",
      email: "emily.wong@email.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4.8
    },
    
    projectDetails: {
      description: "Looking for an experienced photographer for a wedding event in June. Must have portfolio of previous wedding work and own equipment.",
      location: "Singapore",
      startDate: "2024-06-15",
      expectedDuration: "3 months"
    },
    
    financials: {
      totalBudget: 1500,
      currency: "SGD",
      paymentStructure: "Full payment held in escrow, released upon project completion"
    },
    
    milestones: [
      {
        id: "m1",
        number: 1,
        title: "Pre-Wedding Consultation",
        description: "Initial meeting to discuss shot list, timeline, and venue details",
        deliverables: [
          "Shot list document",
          "Timeline agreement",
          "Venue visit notes"
        ],
        deadline: "7 days from project start",
        estimatedDays: 7
      },
      {
        id: "m2",
        number: 2,
        title: "Wedding Day Coverage",
        description: "Full day photography coverage from pre-ceremony preparations through reception",
        deliverables: [
          "Full day coverage (8+ hours)",
          "Candid and posed shots",
          "Detail shots of venue/decor"
        ],
        deadline: "Event date: June 15, 2024",
        estimatedDays: 1
      },
      {
        id: "m3",
        number: 3,
        title: "Photo Editing & Delivery",
        description: "Professional editing of 200-300 best shots with online gallery delivery",
        deliverables: [
          "200-300 edited high-resolution photos",
          "Online gallery with download access",
          "Print-ready files"
        ],
        deadline: "10 days after event",
        estimatedDays: 10
      }
    ],
    
    terms: [
      {
        title: "Payment Terms",
        content: "Client agrees to pay the full project amount (SGD 1,500) to FreelanceHub's secure escrow account before work begins. Payment will be held by FreelanceHub and released to Freelancer only upon successful project completion and client approval."
      },
      {
        title: "Escrow Protection",
        content: "All payments are held in FreelanceHub's secure escrow account. Client funds are protected and will only be released when work is approved. Freelancer is protected by auto-approval system if client becomes unresponsive."
      },
      {
        title: "Auto-Approval Policy",
        content: "For each milestone submission, Client has 5 calendar days (120 hours) to review and either approve or request revisions. If Client does not respond within 5 days, the work will be automatically approved and payment will be released. This protects Freelancers from indefinite delays."
      },
      {
        title: "Revision Policy",
        content: "Client may request reasonable revisions if deliverables do not meet the agreed specifications. Freelancer agrees to complete requested revisions within 3 business days. If Client requests revisions beyond the original scope, additional fees may be negotiated."
      },
      {
        title: "Project Completion",
        content: "Project is considered complete when all milestones have been delivered and approved (either manually by Client or automatically after 5-day review period). Upon project completion, the full escrow amount will be released to Freelancer."
      },
      {
        title: "Cancellation & Refunds",
        content: "Either party may cancel this contract before work begins and receive a full refund minus FreelanceHub's processing fee (2.5%). Once work has started, cancellation terms depend on work completed. Disputes will be mediated by FreelanceHub."
      },
      {
        title: "Intellectual Property",
        content: "Upon full payment, Client receives all rights to the final deliverables. Freelancer retains the right to use the work in their portfolio unless otherwise agreed. Any third-party assets used must be properly licensed."
      },
      {
        title: "Confidentiality",
        content: "Both parties agree to keep confidential any proprietary information shared during the project. This includes business strategies, personal information, and any materials marked as confidential."
      },
      {
        title: "Communication",
        content: "Both parties agree to maintain professional communication through FreelanceHub's messaging system. Response time should be within 24-48 hours for non-urgent matters. Urgent issues should be flagged appropriately."
      },
      {
        title: "Dispute Resolution",
        content: "In case of disputes, both parties agree to first attempt resolution through FreelanceHub's mediation service. If mediation fails, disputes will be resolved through binding arbitration in accordance with Singapore law."
      }
    ],
    
    platformFees: {
      clientFee: "2.5% processing fee",
      freelancerFee: "10% service fee (deducted from payment)",
      note: "Fees are automatically calculated and displayed in final amounts"
    },
    
    signatures: {
      client: {
        signed: true,
        signedAt: "2024-03-19T16:30:00Z",
        ipAddress: "192.168.1.1",
        signature: "Sarah M."
      },
      freelancer: {
        signed: false,
        signedAt: null,
        ipAddress: null,
        signature: null
      }
    },
    
    status: "awaiting_freelancer_signature" // awaiting_both, awaiting_client_signature, awaiting_freelancer_signature, fully_signed
  },
  
  // Another example - both signed
  2: {
    id: 2,
    gigId: 2,
    gigTitle: "Mobile App UI/UX Design",
    applicationId: "app-10",
    createdAt: "2024-03-25T10:00:00Z",
    
    client: {
      id: "client-2",
      name: "TechCorp",
      email: "contact@techcorp.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp"
    },
    freelancer: {
      id: "user-201",
      name: "Maya Patel",
      email: "maya.patel@email.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      rating: 5.0
    },
    
    projectDetails: {
      description: "Need a designer to create modern UI/UX for our fitness tracking app. Should include wireframes and high-fidelity mockups.",
      location: "Remote",
      startDate: "2024-03-26",
      expectedDuration: "5 weeks"
    },
    
    financials: {
      totalBudget: 2800,
      currency: "SGD",
      paymentStructure: "Full payment held in escrow, released upon project completion"
    },
    
    milestones: [
      {
        id: "m1",
        number: 1,
        title: "Research & Wireframes",
        description: "User research, competitor analysis, and low-fidelity wireframes",
        deliverables: [
          "User research findings",
          "Competitor analysis report",
          "Wireframes for 15+ screens"
        ],
        deadline: "7 days from start",
        estimatedDays: 7
      },
      {
        id: "m2",
        number: 2,
        title: "High-Fidelity Design",
        description: "Complete UI design with color scheme, typography, and components",
        deliverables: [
          "High-fidelity mockups for all screens",
          "Design system documentation",
          "Component library"
        ],
        deadline: "21 days from start",
        estimatedDays: 14
      },
      {
        id: "m3",
        number: 3,
        title: "Prototype & Handoff",
        description: "Interactive prototype and developer handoff documentation",
        deliverables: [
          "Interactive Figma prototype",
          "Design specifications",
          "Exported assets for development"
        ],
        deadline: "35 days from start",
        estimatedDays: 14
      }
    ],
    
    terms: [
      {
        title: "Payment Terms",
        content: "Client agrees to pay the full project amount (SGD 2,800) to FreelanceHub's secure escrow account before work begins. Payment will be held by FreelanceHub and released to Freelancer only upon successful project completion and client approval."
      },
      {
        title: "Escrow Protection",
        content: "All payments are held in FreelanceHub's secure escrow account. Client funds are protected and will only be released when work is approved. Freelancer is protected by auto-approval system if client becomes unresponsive."
      },
      {
        title: "Auto-Approval Policy",
        content: "For each milestone submission, Client has 5 calendar days (120 hours) to review and either approve or request revisions. If Client does not respond within 5 days, the work will be automatically approved and payment will be released. This protects Freelancers from indefinite delays."
      },
      {
        title: "Revision Policy",
        content: "Client may request reasonable revisions if deliverables do not meet the agreed specifications. Freelancer agrees to complete requested revisions within 3 business days. If Client requests revisions beyond the original scope, additional fees may be negotiated."
      },
      {
        title: "Project Completion",
        content: "Project is considered complete when all milestones have been delivered and approved (either manually by Client or automatically after 5-day review period). Upon project completion, the full escrow amount will be released to Freelancer."
      },
      {
        title: "Cancellation & Refunds",
        content: "Either party may cancel this contract before work begins and receive a full refund minus FreelanceHub's processing fee (2.5%). Once work has started, cancellation terms depend on work completed. Disputes will be mediated by FreelanceHub."
      },
      {
        title: "Intellectual Property",
        content: "Upon full payment, Client receives all rights to the final deliverables. Freelancer retains the right to use the work in their portfolio unless otherwise agreed. Any third-party assets used must be properly licensed."
      },
      {
        title: "Confidentiality",
        content: "Both parties agree to keep confidential any proprietary information shared during the project. This includes business strategies, personal information, and any materials marked as confidential."
      },
      {
        title: "Communication",
        content: "Both parties agree to maintain professional communication through FreelanceHub's messaging system. Response time should be within 24-48 hours for non-urgent matters. Urgent issues should be flagged appropriately."
      },
      {
        title: "Dispute Resolution",
        content: "In case of disputes, both parties agree to first attempt resolution through FreelanceHub's mediation service. If mediation fails, disputes will be resolved through binding arbitration in accordance with Singapore law."
      }
    ],
    
    platformFees: {
      clientFee: "2.5% processing fee",
      freelancerFee: "10% service fee (deducted from payment)",
      note: "Fees are automatically calculated and displayed in final amounts"
    },
    
    signatures: {
      client: {
        signed: true,
        signedAt: "2024-03-25T14:00:00Z",
        ipAddress: "192.168.1.5",
        signature: "TechCorp Representative"
      },
      freelancer: {
        signed: true,
        signedAt: "2024-03-25T18:30:00Z",
        ipAddress: "192.168.1.10",
        signature: "Maya Patel"
      }
    },
    
    status: "fully_signed"
  }
};

// ============= CONTRACTS DATA =============

export const mockContracts = {
  1: {
    id: 1,
    gigId: 1,
    gigTitle: "Wedding Photography Needed",
    status: "in_progress", // in_progress, completed, cancelled
    client: {
      id: "client-1",
      name: "Sarah M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM"
    },
    freelancer: {
      id: "user-103",
      name: "Emily Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4.8
    },
    totalBudget: 1500,
    escrowBalance: 1500, // Full amount in escrow
    releasedAmount: 0,
    startDate: "2024-03-20T10:00:00Z",
    expectedCompletionDate: "2024-06-15",
    
    // Phases for progress tracking (NOT for payment release)
    phases: [
      {
        id: "phase-1",
        number: 1,
        title: "Pre-Wedding Consultation",
        description: "Initial meeting to discuss shot list, timeline, and venue details. Review contract terms and expectations.",
        status: "completed", // pending, in_progress, submitted, under_review, revision_requested, completed
        startDate: "2024-03-20T10:00:00Z",
        completedDate: "2024-03-22T15:30:00Z",
        deliverables: [
          "Shot list document",
          "Timeline agreement",
          "Venue visit notes"
        ],
        submittedWork: {
          files: [
            { name: "Shot_List_Final.pdf", url: "#", uploadedAt: "2024-03-22T14:00:00Z" },
            { name: "Timeline_Schedule.pdf", url: "#", uploadedAt: "2024-03-22T14:00:00Z" }
          ],
          notes: "Completed venue walkthrough and finalized shot list with couple. All preferences documented.",
          submittedAt: "2024-03-22T14:00:00Z"
        },
        review: {
          status: "approved",
          reviewedAt: "2024-03-22T15:30:00Z",
          feedback: "Perfect! Very thorough planning. Looking forward to the big day!"
        }
      },
      {
        id: "phase-2",
        number: 2,
        title: "Wedding Day Coverage",
        description: "Full day photography coverage from pre-ceremony preparations through reception. Capture all key moments and candid shots.",
        status: "completed",
        startDate: "2024-03-23T08:00:00Z",
        completedDate: "2024-06-15T23:00:00Z",
        deliverables: [
          "Full day coverage (8+ hours)",
          "Candid and posed shots",
          "Detail shots of venue/decor"
        ],
        submittedWork: {
          files: [
            { name: "Wedding_Day_Summary.pdf", url: "#", uploadedAt: "2024-06-15T23:00:00Z" }
          ],
          notes: "Shot 1,200+ photos throughout the day. Captured all key moments from getting ready to last dance. Beautiful lighting during golden hour!",
          submittedAt: "2024-06-15T23:00:00Z"
        },
        review: {
          status: "approved",
          reviewedAt: "2024-06-16T10:00:00Z",
          feedback: "The day was perfect! Can't wait to see the edited photos!"
        }
      },
      {
        id: "phase-3",
        number: 3,
        title: "Photo Editing & Delivery",
        description: "Professional editing of 200-300 best shots. Color correction, retouching, and final delivery via online gallery.",
        status: "under_review", // Currently waiting for client review
        startDate: "2024-06-16T09:00:00Z",
        deadline: "2024-06-26",
        deliverables: [
          "200-300 edited high-resolution photos",
          "Online gallery with download access",
          "Print-ready files"
        ],
        submittedWork: {
          files: [
            { name: "Wedding_Photos_Gallery_Link.txt", url: "#", uploadedAt: "2024-06-25T18:00:00Z" },
            { name: "Download_Instructions.pdf", url: "#", uploadedAt: "2024-06-25T18:00:00Z" }
          ],
          notes: "Edited 285 photos total. Gallery is live at the link provided. All photos are color-corrected, retouched, and ready for print or digital use. Download instructions included.",
          submittedAt: "2024-06-25T18:00:00Z"
        },
        autoApprovalDate: "2024-06-30T18:00:00Z", // 5 days after submission
        timeUntilAutoApproval: calculateTimeRemaining("2024-06-30T18:00:00Z")
      }
    ],
    
    // Activity timeline
    timeline: [
      {
        date: "2024-03-20T10:00:00Z",
        actor: "System",
        action: "Contract signed by both parties"
      },
      {
        date: "2024-03-20T10:05:00Z",
        actor: "Sarah M.",
        action: "Paid SGD 1,500 to escrow"
      },
      {
        date: "2024-03-20T10:10:00Z",
        actor: "Emily Wong",
        action: "Started Phase 1: Pre-Wedding Consultation"
      },
      {
        date: "2024-03-22T14:00:00Z",
        actor: "Emily Wong",
        action: "Submitted Phase 1 deliverables"
      },
      {
        date: "2024-03-22T15:30:00Z",
        actor: "Sarah M.",
        action: "Approved Phase 1"
      },
      {
        date: "2024-06-15T23:00:00Z",
        actor: "Emily Wong",
        action: "Submitted Phase 2 deliverables"
      },
      {
        date: "2024-06-16T10:00:00Z",
        actor: "Sarah M.",
        action: "Approved Phase 2"
      },
      {
        date: "2024-06-25T18:00:00Z",
        actor: "Emily Wong",
        action: "Submitted Phase 3 deliverables (Final Phase)"
      }
    ]
  },
  
  // Additional contract example - earlier in progress
  2: {
    id: 2,
    gigId: 2,
    gigTitle: "Mobile App UI/UX Design",
    status: "in_progress",
    client: {
      id: "client-2",
      name: "TechCorp",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp"
    },
    freelancer: {
      id: "user-201",
      name: "Maya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      rating: 5.0
    },
    totalBudget: 2800,
    escrowBalance: 2800,
    releasedAmount: 0,
    startDate: "2024-03-26T09:00:00Z",
    expectedCompletionDate: "2024-04-30",
    
    phases: [
      {
        id: "phase-1",
        number: 1,
        title: "Research & Wireframes",
        description: "User research, competitor analysis, and low-fidelity wireframes for all key screens.",
        status: "in_progress",
        startDate: "2024-03-26T09:00:00Z",
        deadline: "2024-04-02",
        deliverables: [
          "User research findings",
          "Competitor analysis",
          "Wireframes for 15+ screens"
        ]
      },
      {
        id: "phase-2",
        number: 2,
        title: "High-Fidelity Design",
        description: "Complete UI design with color scheme, typography, and component library.",
        status: "pending",
        deliverables: [
          "High-fidelity mockups",
          "Design system",
          "Component library"
        ]
      },
      {
        id: "phase-3",
        number: 3,
        title: "Prototype & Handoff",
        description: "Interactive prototype and developer handoff with assets and specifications.",
        status: "pending",
        deliverables: [
          "Interactive prototype",
          "Design specifications",
          "Asset export"
        ]
      }
    ],
    
    timeline: [
      {
        date: "2024-03-26T09:00:00Z",
        actor: "System",
        action: "Contract signed by both parties"
      },
      {
        date: "2024-03-26T09:05:00Z",
        actor: "TechCorp",
        action: "Paid SGD 2,800 to escrow"
      },
      {
        date: "2024-03-26T09:10:00Z",
        actor: "Maya Patel",
        action: "Started Phase 1: Research & Wireframes"
      }
    ]
  }
};

// Helper function to calculate time remaining until auto-approval
function calculateTimeRemaining(autoApprovalDate) {
  const now = new Date();
  const approvalDate = new Date(autoApprovalDate);
  const diffMs = approvalDate - now;
  
  if (diffMs <= 0) return "Auto-approved";
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;
  
  if (diffDays > 0) {
    return `${diffDays}d ${remainingHours}h`;
  }
  return `${diffHours}h`;
}

// ============= HELPER FUNCTIONS =============

// Get gig by ID
export const getGigById = (id) => {
  return featuredGigs.find(gig => gig.id === parseInt(id));
};

// Get applicants for a specific gig
export const getApplicantsByGigId = (gigId) => {
  return mockApplicants[gigId] || [];
};

// Get applicant by ID
export const getApplicantById = (applicantId) => {
  for (const gigId in mockApplicants) {
    const applicant = mockApplicants[gigId].find(app => app.id === applicantId);
    if (applicant) return applicant;
  }
  return null;
};

// Get contract by ID
export const getContractById = (id) => {
  return mockContracts[id];
};

// Get contract signing by ID
export const getContractSigningById = (id) => {
  return mockContractSignings[id];
};

// ============= NOTIFICATIONS DATA =============

export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'application_accepted',
    title: 'Application Accepted',
    message: 'Sarah M. accepted your application for "Wedding Photography Needed"',
    relatedUser: {
      name: 'Sarah M.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM'
    },
    relatedItem: {
      type: 'gig',
      id: 1,
      title: 'Wedding Photography Needed'
    },
    timestamp: '2024-03-20T10:00:00Z',
    read: false,
    actionUrl: '/contract/1'
  },
  {
    id: 'notif-2',
    type: 'work_submitted',
    title: 'Work Submitted',
    message: 'Emily Wong submitted deliverables for Phase 3: Photo Editing & Delivery',
    relatedUser: {
      name: 'Emily Wong',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    relatedItem: {
      type: 'contract',
      id: 1,
      title: 'Wedding Photography - Phase 3'
    },
    timestamp: '2024-03-25T18:00:00Z',
    read: false,
    actionUrl: '/review/1/phase-3'
  },
  {
    id: 'notif-3',
    type: 'auto_approval_warning',
    title: 'Auto-Approval Reminder',
    message: 'Phase 3 deliverables will be auto-approved in 2 days. Please review.',
    relatedUser: {
      name: 'Emily Wong',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    relatedItem: {
      type: 'contract',
      id: 1,
      title: 'Wedding Photography - Phase 3'
    },
    timestamp: '2024-03-28T10:00:00Z',
    read: false,
    actionUrl: '/review/1/phase-3'
  },
  {
    id: 'notif-4',
    type: 'payment_released',
    title: 'Payment Released',
    message: 'SGD 1,500 has been released from escrow to Emily Wong',
    relatedUser: {
      name: 'Emily Wong',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    relatedItem: {
      type: 'contract',
      id: 1,
      title: 'Wedding Photography'
    },
    timestamp: '2024-03-15T14:30:00Z',
    read: true,
    actionUrl: '/payments'
  },
  {
    id: 'notif-5',
    type: 'new_application',
    title: 'New Application',
    message: 'Marcus Tan applied for your gig "Corporate Event Coverage"',
    relatedUser: {
      name: 'Marcus Tan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    relatedItem: {
      type: 'gig',
      id: 2,
      title: 'Corporate Event Coverage'
    },
    timestamp: '2024-03-26T09:15:00Z',
    read: true,
    actionUrl: '/applications/2'
  },
  {
    id: 'notif-6',
    type: 'contract_signed',
    title: 'Contract Signed',
    message: 'TechCorp signed the contract for "Mobile App UI/UX Design"',
    relatedUser: {
      name: 'TechCorp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp'
    },
    relatedItem: {
      type: 'contract',
      id: 2,
      title: 'Mobile App UI/UX Design'
    },
    timestamp: '2024-03-25T14:00:00Z',
    read: true,
    actionUrl: '/contracts/2'
  },
  {
    id: 'notif-7',
    type: 'phase_approved',
    title: 'Phase Approved',
    message: 'Sarah M. approved Phase 2: Wedding Day Coverage',
    relatedUser: {
      name: 'Sarah M.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM'
    },
    relatedItem: {
      type: 'contract',
      id: 1,
      title: 'Wedding Photography - Phase 2'
    },
    timestamp: '2024-03-16T10:00:00Z',
    read: true,
    actionUrl: '/contracts/1'
  },
  {
    id: 'notif-8',
    type: 'revision_requested',
    title: 'Revision Requested',
    message: 'Client requested revisions for Phase 1: Research & Wireframes',
    relatedUser: {
      name: 'TechCorp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp'
    },
    relatedItem: {
      type: 'contract',
      id: 2,
      title: 'Mobile App UI/UX Design - Phase 1'
    },
    timestamp: '2024-03-10T11:20:00Z',
    read: true,
    actionUrl: '/contracts/2'
  },
  {
    id: 'notif-9',
    type: 'message_received',
    title: 'New Message',
    message: 'Maya Patel: "I have a question about the design requirements..."',
    relatedUser: {
      name: 'Maya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya'
    },
    relatedItem: {
      type: 'message',
      id: 'msg-1',
      title: 'Message from Maya Patel'
    },
    timestamp: '2024-03-27T16:45:00Z',
    read: false,
    actionUrl: '/messages'
  },
  {
    id: 'notif-10',
    type: 'escrow_payment',
    title: 'Payment Received in Escrow',
    message: 'TechCorp paid SGD 2,800 to escrow for "Mobile App UI/UX Design"',
    relatedUser: {
      name: 'TechCorp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp'
    },
    relatedItem: {
      type: 'contract',
      id: 2,
      title: 'Mobile App UI/UX Design'
    },
    timestamp: '2024-03-25T09:05:00Z',
    read: true,
    actionUrl: '/contracts/2'
  }
];

// Get all notifications for a user
export const getNotifications = () => {
  return mockNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Get unread count
export const getUnreadNotificationCount = () => {
  return mockNotifications.filter(n => !n.read).length;
};

// Get notifications by type
export const getNotificationsByType = (type) => {
  if (type === 'all') return getNotifications();
  return mockNotifications
    .filter(n => n.type.includes(type))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// ============= MESSAGES / CHAT DATA =============

export const mockConversations = [
  {
    id: 'conv-1',
    type: '1-on-1', // or 'group'
    title: 'Sarah M.', // For 1-on-1, use other person's name
    participants: [
      {
        id: 'user-101',
        name: 'Sarah M.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM',
        role: 'client'
      },
      {
        id: 'user-current',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        role: 'freelancer'
      }
    ],
    relatedContract: {
      id: 1,
      title: 'Wedding Photography Needed'
    },
    lastMessage: {
      text: 'Great! Looking forward to the final photos.',
      sender: 'user-101',
      timestamp: '2024-03-27T18:30:00Z'
    },
    unreadCount: 0,
    messages: [
      {
        id: 'msg-1',
        sender: 'user-current',
        text: 'Hi Sarah! I wanted to confirm the delivery date for the edited photos.',
        timestamp: '2024-03-27T10:00:00Z',
        read: true
      },
      {
        id: 'msg-2',
        sender: 'user-101',
        text: 'Hi! Yes, we discussed March 30th. Will that still work?',
        timestamp: '2024-03-27T10:15:00Z',
        read: true
      },
      {
        id: 'msg-3',
        sender: 'user-current',
        text: 'Perfect! I\'ll have everything ready by then. The photos turned out amazing!',
        timestamp: '2024-03-27T10:20:00Z',
        read: true
      },
      {
        id: 'msg-4',
        sender: 'user-101',
        text: 'Great! Looking forward to the final photos.',
        timestamp: '2024-03-27T18:30:00Z',
        read: true
      }
    ]
  },
  {
    id: 'conv-2',
    type: '1-on-1',
    title: 'Maya Patel',
    participants: [
      {
        id: 'user-103',
        name: 'Maya Patel',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        role: 'freelancer'
      },
      {
        id: 'user-current',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        role: 'client'
      }
    ],
    relatedContract: {
      id: 2,
      title: 'Mobile App UI/UX Design'
    },
    lastMessage: {
      text: 'I have a question about the design requirements...',
      sender: 'user-103',
      timestamp: '2024-03-27T16:45:00Z'
    },
    unreadCount: 2,
    messages: [
      {
        id: 'msg-5',
        sender: 'user-103',
        text: 'Hi! I\'ve started working on the wireframes.',
        timestamp: '2024-03-27T14:00:00Z',
        read: true
      },
      {
        id: 'msg-6',
        sender: 'user-103',
        text: 'I have a question about the design requirements...',
        timestamp: '2024-03-27T16:45:00Z',
        read: false
      },
      {
        id: 'msg-7',
        sender: 'user-103',
        text: 'Should the dashboard include analytics for the admin panel?',
        timestamp: '2024-03-27T16:46:00Z',
        read: false
      }
    ]
  },
  {
    id: 'conv-3',
    type: 'group',
    title: 'E-commerce Website Project',
    participants: [
      {
        id: 'user-104',
        name: 'Alex Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        role: 'client'
      },
      {
        id: 'user-105',
        name: 'Lisa Kumar',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        role: 'freelancer'
      },
      {
        id: 'user-106',
        name: 'James Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        role: 'freelancer'
      },
      {
        id: 'user-current',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        role: 'freelancer'
      }
    ],
    relatedContract: {
      id: 3,
      title: 'E-commerce Website Development'
    },
    lastMessage: {
      text: 'I can handle the payment gateway integration.',
      sender: 'user-106',
      timestamp: '2024-03-27T12:00:00Z'
    },
    unreadCount: 1,
    messages: [
      {
        id: 'msg-8',
        sender: 'user-104',
        text: 'Hey team! Thanks for accepting the project. Let\'s discuss the timeline.',
        timestamp: '2024-03-26T09:00:00Z',
        read: true
      },
      {
        id: 'msg-9',
        sender: 'user-105',
        text: 'Happy to be part of this! I\'ll focus on the frontend design.',
        timestamp: '2024-03-26T09:15:00Z',
        read: true
      },
      {
        id: 'msg-10',
        sender: 'user-current',
        text: 'Great! I\'ll handle the backend API development.',
        timestamp: '2024-03-26T09:20:00Z',
        read: true
      },
      {
        id: 'msg-11',
        sender: 'user-106',
        text: 'I can handle the payment gateway integration.',
        timestamp: '2024-03-27T12:00:00Z',
        read: false
      }
    ]
  },
  {
    id: 'conv-4',
    type: '1-on-1',
    title: 'TechCorp',
    participants: [
      {
        id: 'user-107',
        name: 'TechCorp',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp',
        role: 'client'
      },
      {
        id: 'user-current',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        role: 'freelancer'
      }
    ],
    relatedContract: {
      id: 2,
      title: 'Mobile App UI/UX Design'
    },
    lastMessage: {
      text: 'The contract has been signed. You can start working!',
      sender: 'user-107',
      timestamp: '2024-03-25T14:30:00Z'
    },
    unreadCount: 0,
    messages: [
      {
        id: 'msg-12',
        sender: 'user-107',
        text: 'Welcome aboard! We\'re excited to work with you.',
        timestamp: '2024-03-25T10:00:00Z',
        read: true
      },
      {
        id: 'msg-13',
        sender: 'user-current',
        text: 'Thank you! I\'m looking forward to creating an amazing design for you.',
        timestamp: '2024-03-25T10:30:00Z',
        read: true
      },
      {
        id: 'msg-14',
        sender: 'user-107',
        text: 'The contract has been signed. You can start working!',
        timestamp: '2024-03-25T14:30:00Z',
        read: true
      }
    ]
  },
  {
    id: 'conv-5',
    type: 'group',
    title: 'Marketing Campaign Team',
    participants: [
      {
        id: 'user-108',
        name: 'Rachel Green',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
        role: 'client'
      },
      {
        id: 'user-109',
        name: 'David Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        role: 'freelancer'
      },
      {
        id: 'user-current',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        role: 'freelancer'
      }
    ],
    relatedContract: {
      id: 4,
      title: 'Social Media Marketing Campaign'
    },
    lastMessage: {
      text: 'Let\'s schedule a kickoff call for tomorrow?',
      sender: 'user-108',
      timestamp: '2024-03-26T17:00:00Z'
    },
    unreadCount: 0,
    messages: [
      {
        id: 'msg-15',
        sender: 'user-108',
        text: 'Hi everyone! Excited to launch this campaign together.',
        timestamp: '2024-03-26T16:00:00Z',
        read: true
      },
      {
        id: 'msg-16',
        sender: 'user-109',
        text: 'Same here! I\'ve prepared some initial content ideas.',
        timestamp: '2024-03-26T16:30:00Z',
        read: true
      },
      {
        id: 'msg-17',
        sender: 'user-108',
        text: 'Let\'s schedule a kickoff call for tomorrow?',
        timestamp: '2024-03-26T17:00:00Z',
        read: true
      }
    ]
  }
];

// Get all conversations for current user
export const getConversations = () => {
  return mockConversations.sort((a, b) => 
    new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
  );
};

// Get conversation by ID
export const getConversationById = (id) => {
  return mockConversations.find(conv => conv.id === id);
};

// Get unread messages count across all conversations
export const getUnreadMessagesCount = () => {
  return mockConversations.reduce((total, conv) => total + conv.unreadCount, 0);
};

// ============= PAYMENTS / TRANSACTIONS DATA =============

export const mockTransactions = [
  {
    id: 'txn-1',
    type: 'earning', // or 'spending'
    status: 'completed', // completed, pending, processing, failed
    amount: 1500,
    currency: 'SGD',
    title: 'Wedding Photography Needed',
    description: 'Final payment - All phases completed',
    relatedContract: {
      id: 1,
      title: 'Wedding Photography Needed',
      client: 'Sarah M.'
    },
    date: '2024-03-28T14:30:00Z',
    paymentMethod: 'Escrow Release',
    category: 'milestone_payment'
  },
  {
    id: 'txn-2',
    type: 'spending',
    status: 'processing',
    amount: 2800,
    currency: 'SGD',
    title: 'Mobile App UI/UX Design',
    description: 'Escrow payment - Held until project completion',
    relatedContract: {
      id: 2,
      title: 'Mobile App UI/UX Design',
      freelancer: 'Maya Patel'
    },
    date: '2024-03-25T09:05:00Z',
    paymentMethod: 'Stripe',
    category: 'escrow_deposit'
  },
  {
    id: 'txn-3',
    type: 'earning',
    status: 'completed',
    amount: 800,
    currency: 'SGD',
    title: 'Corporate Event Coverage',
    description: 'Phase 1 payment - Event Photography',
    relatedContract: {
      id: 3,
      title: 'Corporate Event Coverage',
      client: 'TechCorp'
    },
    date: '2024-03-20T16:45:00Z',
    paymentMethod: 'Escrow Release',
    category: 'milestone_payment'
  },
  {
    id: 'txn-4',
    type: 'spending',
    status: 'completed',
    amount: 1200,
    currency: 'SGD',
    title: 'Social Media Marketing Campaign',
    description: 'Full payment released to freelancer',
    relatedContract: {
      id: 4,
      title: 'Social Media Marketing Campaign',
      freelancer: 'David Brown'
    },
    date: '2024-03-18T11:20:00Z',
    paymentMethod: 'PayPal',
    category: 'project_completion'
  },
  {
    id: 'txn-5',
    type: 'earning',
    status: 'pending',
    amount: 950,
    currency: 'SGD',
    title: 'Product Photography',
    description: 'Phase 2 - Under review by client',
    relatedContract: {
      id: 5,
      title: 'Product Photography',
      client: 'Alex Chen'
    },
    date: '2024-03-26T10:00:00Z',
    paymentMethod: 'Escrow Release',
    category: 'milestone_payment'
  },
  {
    id: 'txn-6',
    type: 'spending',
    status: 'completed',
    amount: 3500,
    currency: 'SGD',
    title: 'E-commerce Website Development',
    description: 'Escrow payment released - Project completed',
    relatedContract: {
      id: 6,
      title: 'E-commerce Website Development',
      freelancer: 'Lisa Kumar'
    },
    date: '2024-03-15T14:00:00Z',
    paymentMethod: 'Bank Transfer',
    category: 'project_completion'
  },
  {
    id: 'txn-7',
    type: 'earning',
    status: 'completed',
    amount: 600,
    currency: 'SGD',
    title: 'Logo Design',
    description: 'Final delivery approved',
    relatedContract: {
      id: 7,
      title: 'Logo Design',
      client: 'Rachel Green'
    },
    date: '2024-03-12T09:30:00Z',
    paymentMethod: 'Escrow Release',
    category: 'project_completion'
  },
  {
    id: 'txn-8',
    type: 'spending',
    status: 'pending',
    amount: 1800,
    currency: 'SGD',
    title: 'SEO Optimization',
    description: 'Escrow payment - Awaiting work start',
    relatedContract: {
      id: 8,
      title: 'SEO Optimization',
      freelancer: 'James Wilson'
    },
    date: '2024-03-27T15:00:00Z',
    paymentMethod: 'Stripe',
    category: 'escrow_deposit'
  },
  {
    id: 'txn-9',
    type: 'earning',
    status: 'completed',
    amount: 2100,
    currency: 'SGD',
    title: 'Brand Identity Package',
    description: 'All deliverables approved',
    relatedContract: {
      id: 9,
      title: 'Brand Identity Package',
      client: 'Isabella Martinez'
    },
    date: '2024-03-10T12:00:00Z',
    paymentMethod: 'Escrow Release',
    category: 'project_completion'
  },
  {
    id: 'txn-10',
    type: 'spending',
    status: 'failed',
    amount: 500,
    currency: 'SGD',
    title: 'Video Editing',
    description: 'Payment failed - Insufficient funds',
    relatedContract: {
      id: 10,
      title: 'Video Editing',
      freelancer: 'Michael Chen'
    },
    date: '2024-03-08T16:30:00Z',
    paymentMethod: 'Credit Card',
    category: 'escrow_deposit'
  }
];

// Get all transactions
export const getTransactions = () => {
  return mockTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get transactions by type (earning or spending)
export const getTransactionsByType = (type) => {
  return mockTransactions
    .filter(t => t.type === type)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get earnings summary
export const getEarningsSummary = () => {
  const earnings = mockTransactions.filter(t => t.type === 'earning');
  
  return {
    total: earnings.reduce((sum, t) => sum + (t.status === 'completed' ? t.amount : 0), 0),
    pending: earnings.reduce((sum, t) => sum + (t.status === 'pending' ? t.amount : 0), 0),
    thisMonth: earnings
      .filter(t => {
        const txnDate = new Date(t.date);
        const now = new Date();
        return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, t) => sum + (t.status === 'completed' ? t.amount : 0), 0),
    count: earnings.filter(t => t.status === 'completed').length
  };
};

// Get spending summary
export const getSpendingSummary = () => {
  const spending = mockTransactions.filter(t => t.type === 'spending');
  
  return {
    total: spending.reduce((sum, t) => sum + (t.status === 'completed' ? t.amount : 0), 0),
    inEscrow: spending.reduce((sum, t) => sum + (t.status === 'processing' || t.status === 'pending' ? t.amount : 0), 0),
    thisMonth: spending
      .filter(t => {
        const txnDate = new Date(t.date);
        const now = new Date();
        return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, t) => sum + (t.status === 'completed' ? t.amount : 0), 0),
    count: spending.filter(t => t.status === 'completed').length
  };
};

// Get all contracts for a user (client or freelancer)
export const getContractsByUser = (userId, role) => {
  return Object.values(mockContracts).filter(contract => {
    if (role === 'client') return contract.client.id === userId;
    if (role === 'freelancer') return contract.freelancer.id === userId;
    return false;
  });
};