import {
  Bot,
  Brain,
  Workflow,
  Phone,
  Network,
  Cpu,
  ShieldCheck,
  Headphones,
  Target,
  Wallet,
  Settings2,
  LineChart,
  BookOpen,
  Users,
  Landmark,
  Building2,
  HeartPulse,
  ShoppingCart,
  Truck,
  Home,
  Radio,
  Banknote,
  CircleDollarSign,
  Coins,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Platform", to: "/platform" },
  { label: "Solutions", to: "/solutions" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export interface MaturityLevel {
  level: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: 1,
    title: "AI Assistants",
    description:
      "Enterprise knowledge assistants, chatbots, FAQ systems, and internal copilots.",
    icon: Bot,
  },
  {
    level: 2,
    title: "AI Agents",
    description:
      "Task-driven AI agents capable of executing workflows and interacting with enterprise systems.",
    icon: Brain,
  },
  {
    level: 3,
    title: "Voice AI Systems",
    description:
      "AI callers, customer service agents, appointment scheduling, collections, and recovery agents.",
    icon: Phone,
  },
  {
    level: 4,
    title: "Multi-Agent Operations",
    description:
      "Multiple AI agents collaborating across departments and business functions.",
    icon: Network,
  },
  {
    level: 5,
    title: "Enterprise AI Orchestration",
    description:
      "Central orchestration layer connecting AI systems, APIs, workflows, compliance, and analytics.",
    icon: Workflow,
  },
  {
    level: 6,
    title: "Digital Workforce Infrastructure",
    description:
      "Fully autonomous enterprise operations powered by orchestrated AI workforces.",
    icon: Cpu,
  },
];

export interface SolutionItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SOLUTIONS: SolutionItem[] = [
  { title: "AI Recovery Systems", description: "Intelligent recovery agents that engage, negotiate, and resolve at scale.", icon: Wallet },
  { title: "AI Voice Automation", description: "Conversational voice agents for secure, natural customer interactions across channels.", icon: Phone },
  { title: "AI Contact Center Automation", description: "Fully automated inbound and outbound contact center operations.", icon: Headphones },
  { title: "AI Compliance Monitoring", description: "Continuous compliance intelligence across every workflow and call.", icon: ShieldCheck },
  { title: "AI Customer Support", description: "Always-on support agents that resolve issues across channels.", icon: Bot },
  { title: "AI Lead Qualification", description: "Qualify, score, and route leads automatically in real time.", icon: Target },
  { title: "AI Collections Automation", description: "Automated collections journeys with empathy and precision.", icon: Banknote },
  { title: "AI Operations Automation", description: "Automate repetitive operational processes end to end.", icon: Settings2 },
  { title: "AI Workflow Intelligence", description: "Orchestrate complex multi-step workflows across systems.", icon: Workflow },
  { title: "AI Reporting & Analytics", description: "Generate reports and surface insights without human effort.", icon: LineChart },
  { title: "AI Knowledge Systems", description: "Enterprise knowledge engines that answer with context.", icon: BookOpen },
  { title: "AI Employee Assistants", description: "Internal copilots that supercharge every team member.", icon: Users },
];

export interface IndustryItem {
  title: string;
  icon: LucideIcon;
}

export const INDUSTRIES: IndustryItem[] = [
  { title: "Financial Services", icon: Landmark },
  { title: "FinTech & Banking", icon: CircleDollarSign },
  { title: "Insurance", icon: ShieldCheck },
  { title: "NBFCs", icon: Coins },
  { title: "FinTech", icon: Cpu },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Retail", icon: ShoppingCart },
  { title: "E-Commerce", icon: ShoppingCart },
  { title: "Logistics", icon: Truck },
  { title: "Real Estate", icon: Home },
  { title: "Telecom", icon: Radio },
  { title: "Government", icon: Building2 },
];

export const OXYBFSAI_FEATURES = [
  "AI Orchestration Engine",
  "AI Compliance Agent",
  "AI Contact Center",
  "AI Collections Automation",
  "Regulatory Intelligence",
  "Reporting Automation",
  "Workflow Orchestration",
  "Multi-Agent Operations",
];

export const WHY_POINTS = [
  "Enterprise-grade architecture",
  "AI orchestration expertise",
  "Multi-agent systems",
  "Voice AI integration",
  "Compliance-first design",
  "Scalable infrastructure",
  "Custom enterprise solutions",
  "Future-ready architecture",
];
