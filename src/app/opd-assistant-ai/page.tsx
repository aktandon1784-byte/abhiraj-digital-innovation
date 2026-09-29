import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Stethoscope,
  MessageSquare,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Play,
  ArrowRight,
  ArrowDown,
  Layers,
  FileText,
  Search,
  BookOpen,
  Activity,
  HeartPulse,
  Syringe,
  Baby,
  Sparkles,
  ClipboardList,
  Pill,
  Microscope,
  Building2,
  UserCheck,
  Server,
  Lock,
  Info,
} from "lucide-react";
import { OPDAssistantLogo } from "@/components/brand/OPDAssistantLogo";
import { PlansAndDownloadSection } from "@/components/opd/PlansAndDownloadSection";

export const metadata: Metadata = {
  title: "OPD Assistant AI Medical Chat Box | Product of Abhiraj Digital Innovation",
  description:
    "OPD Assistant AI is an AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application designed to assist qualified healthcare professionals with structured clinical information.",
};

export default function OPDAssistantAIPage() {
  // 25 Reference Modules as strictly specified
  const clinicalModules = [
    { id: 1, name: "General Medicine", icon: Stethoscope, tag: "Clinical Primary" },
    { id: 2, name: "Emergency", icon: AlertTriangle, tag: "Red Flags & Urgent" },
    { id: 3, name: "Laboratory", icon: Microscope, tag: "Test Reference" },
    { id: 4, name: "Medicines", icon: Pill, tag: "Pharmacotherapy Ref" },
    { id: 5, name: "Pediatrics", icon: Baby, tag: "Child Health" },
    { id: 6, name: "Immunization", icon: Syringe, tag: "Schedules & Vaccines" },
    { id: 7, name: "Gynecology", icon: Activity, tag: "Women's Health" },
    { id: 8, name: "Obstetrics", icon: HeartPulse, tag: "Maternal Care" },
    { id: 9, name: "ANC", icon: ClipboardList, tag: "Antenatal Care" },
    { id: 10, name: "PNC", icon: ClipboardList, tag: "Postnatal Care" },
    { id: 11, name: "Dermatology", icon: Layers, tag: "Skin Conditions" },
    { id: 12, name: "Leprosy", icon: Search, tag: "Programs & Diagnosis" },
    { id: 13, name: "Respiratory", icon: Activity, tag: "Pulmonary Ref" },
    { id: 14, name: "Cardiology", icon: HeartPulse, tag: "Cardiovascular Ref" },
    { id: 15, name: "Neurology", icon: Sparkles, tag: "Neurological Ref" },
    { id: 16, name: "Endocrinology", icon: Activity, tag: "Metabolic Reference" },
    { id: 17, name: "Nephrology", icon: Activity, tag: "Renal Reference" },
    { id: 18, name: "Hepatology", icon: Activity, tag: "Liver Reference" },
    { id: 19, name: "Hematology", icon: Microscope, tag: "Blood Disorders" },
    { id: 20, name: "Infectious Diseases", icon: ShieldCheck, tag: "Infection Reference" },
    { id: 21, name: "X-ray / Imaging", icon: Layers, tag: "Observations Support" },
    { id: 22, name: "Clinical Calculators", icon: BookOpen, tag: "Formulas & Scoring" },
    { id: 23, name: "History Taking", icon: FileText, tag: "Structured Assessment" },
    { id: 24, name: "Referral", icon: ArrowRight, tag: "Criteria & Escalation" },
    { id: 25, name: "Vital Signs", icon: HeartPulse, tag: "Normal Ranges & Triage" },
  ];

  // 18 Assistance Capabilities
  const assistCapabilities = [
    "Clinical reference information",
    "Common OPD presentations",
    "Disease and condition reference",
    "Differential-diagnosis considerations",
    "Investigation and laboratory reference",
    "Investigation interpretation frameworks",
    "Medicine reference",
    "Pediatric reference",
    "Obstetric and gynecological reference",
    "ANC reference",
    "PNC reference",
    "Emergency assessment and red-flag reference",
    "Referral reference",
    "Vital-sign reference",
    "History-taking reference",
    "Clinical calculations",
    "X-ray / medical-image reference assistance where supported",
    "Structured clinical information and AI-assisted clinical Q&A",
  ];

  // Intended Users
  const intendedUsers = [
    { title: "Medical Officers / RMPs", role: "Registered Medical Practitioners in primary care" },
    { title: "Doctors & Specialists", role: "Clinicians seeking fast structured reference lookup" },
    { title: "Rural Medical Assistants (RMA)", role: "Practitioners in rural healthcare clinics and centers" },
    { title: "Community Health Officers (CHO)", role: "Frontline health and wellness center practitioners" },
    { title: "Staff Nurses", role: "Qualified nursing personnel verifying protocols & reference" },
    { title: "Pharmacists", role: "Pharmacy professionals referencing dosage and drug details" },
    { title: "Laboratory Personnel / Lab Technicians", role: "Technicians referencing test normal values & frameworks" },
    { title: "Other Appropriately Qualified Professionals", role: "Authorized clinical staff within primary care" },
  ];

  // Negative Boundaries (What it does NOT do)
  const whatItDoesNotDo = [
    "Does not provide a final diagnosis.",
    "Does not independently prescribe treatment.",
    "Does not replace a doctor or qualified healthcare professional.",
    "Does not replace specialist consultation.",
    "Does not provide a definitive radiology report.",
    "Does not replace laboratory or medical professional interpretation where required.",
    "Does not independently make final referral decisions.",
    "Does not replace institutional clinical protocols or professional guidelines.",
    "Does not replace physical examination or necessary clinical investigations.",
  ];

  // AI Safety Principles
  const safetyPrinciples = [
    { title: "No Invention of Data", desc: "The system should not invent patient information." },
    { title: "No Speculation on Missing Data", desc: "It should not assume missing clinical information." },
    { title: "Uncertainty Transparency", desc: "Uncertain information should not be presented as certain." },
    { title: "Clinical Context Preservation", desc: "Clinical context provided in the query is preserved." },
    { title: "Red-Flag Highlighting", desc: "Relevant red flags should be highlighted where appropriate." },
    { title: "Emergency Escalation", desc: "Emergency situations should be appropriately escalated for immediate care." },
    { title: "Truthful Imaging Scope", desc: "The system should not claim image/X-ray analysis when an actual image has not been provided." },
    { title: "Investigation vs Management Separation", desc: "Investigation information and management information should be clearly distinguished." },
    { title: "Antimicrobial Stewardship", desc: "The system should not automatically recommend antibiotics simply because a clinical query is entered." },
    { title: "Decision-Support Role", desc: "The application should support, not replace, professional clinical judgment." },
  ];

  return (
    <div className="relative space-y-20 sm:space-y-28 py-10 lg:py-16 bg-grid-pattern">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb Hierarchy */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            ABHIRAJ DIGITAL INNOVATION
          </Link>
          <span>/</span>
          <span className="text-slate-400">CURRENT PRODUCT</span>
          <span>/</span>
          <span className="text-blue-400 font-semibold">OPD ASSISTANT AI</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-5">
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300 badge-glow">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>A PRODUCT OF ABHIRAJ DIGITAL INNOVATION</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                OPD ASSISTANT AI
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                Medical Chat Box
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-300">
                AI-Assisted Clinical Reference & Decision-Support Application
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              The <strong className="text-white">OPD Assistant AI Medical Chat Box</strong> is designed to assist appropriately qualified healthcare professionals access, organize and understand relevant clinical reference and medical information at the point of care.
            </p>

            {/* Platform & Status Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Current Platform: <strong>Android Mobile Application</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                <span>Google Play Store — Coming Soon</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#disclaimer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all"
              >
                <span>Read Clinical Disclaimer</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Inquire About Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Summary Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <OPDAssistantLogo size={36} />
                  <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                    Product Overview
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">
                  ACTIVE
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                OPD Assistant AI Medical Chat Box
              </div>
              <div className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-3">
                <p>
                  <strong>Parent Organization:</strong> Abhiraj Digital Innovation
                </p>
                <p>
                  <strong>Role:</strong> Clinical Reference & Decision Support
                </p>
                <p>
                  <strong>Target Audience:</strong> Qualified Healthcare Professionals
                </p>
                <p>
                  <strong>Core Modality:</strong> Medical Chat Box Interface
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/40 text-[11px] text-blue-300 leading-relaxed">
                Notice: Designed strictly as an assistance tool for qualified clinicians. Final medical decisions remain exclusively with the healthcare professional.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS OPD ASSISTANT AI */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Overview
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              What is OPD Assistant AI?
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              <strong>OPD Assistant AI</strong> is an AI-assisted <strong className="text-white">Medical Chat Box</strong> and Clinical Reference & Decision-Support Application designed to help appropriately qualified healthcare professionals access, organize and understand relevant clinical information.
            </p>
            <p>
              The application combines structured clinical-reference resources with an AI-assisted information processing layer to provide structured clinical information for professional review.
            </p>
            <p>
              The purpose of OPD Assistant AI is to <strong className="text-blue-400">ASSIST</strong> healthcare professionals with relevant medical and clinical information. It is not intended to replace professional clinical judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Reference Assistance</span>
              </div>
              <p className="text-xs text-slate-400">
                Helps organize and present structured clinical reference materials for outpatient consultations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Information Processing</span>
              </div>
              <p className="text-xs text-slate-400">
                Processes clinical queries entered by clinicians to surface relevant differential considerations and protocols.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Professional Review Required</span>
              </div>
              <p className="text-xs text-slate-400">
                All generated information is intended exclusively for clinical review by qualified personnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW OPD ASSISTANT AI WORKS (Workflow) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Workflow Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            How the Medical Chat Box Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            OPD Assistant AI helps organize and present relevant clinical information for professional review. The final clinical decision remains strictly with the qualified healthcare professional.
          </p>
        </div>

        {/* Conceptual Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center text-xs font-mono font-bold mx-auto">
              01
            </div>
            <div className="text-xs font-bold text-white">Healthcare Professional</div>
            <p className="text-[11px] text-slate-400">Clinician initiates consultation reference workflow</p>
          </div>

          <div className="hidden md:flex justify-center text-blue-500">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center text-xs font-mono font-bold mx-auto">
              02
            </div>
            <div className="text-xs font-bold text-white">Clinical Query</div>
            <p className="text-[11px] text-slate-400">Clinical question or relevant non-identifying patient data entered</p>
          </div>

          <div className="hidden md:flex justify-center text-blue-500">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-500/50 text-center space-y-2 shadow-lg shadow-blue-950/40">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold mx-auto">
              03
            </div>
            <div className="text-xs font-bold text-white">Medical Chat Box</div>
            <p className="text-[11px] text-blue-300 font-medium">Clinical Reference Layer + AI-Assisted Processing</p>
          </div>

          <div className="hidden md:flex justify-center text-blue-500">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center text-xs font-mono font-bold mx-auto">
              04
            </div>
            <div className="text-xs font-bold text-white">Structured Output</div>
            <p className="text-[11px] text-slate-400">Structured reference information presented for review</p>
          </div>
        </div>

        {/* Step 5 and 6: Professional Review & Decision */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Healthcare Professional Review</div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                The qualified clinician evaluates the structured reference points, differentials, and guidelines against physical examination and clinical context.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-blue-900/60 flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Final Clinical Decision by Qualified Professional</div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                All final decisions regarding diagnosis, medication selection, dosing, investigations, and referral remain exclusively with the qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT THE MEDICAL CHAT BOX CAN ASSIST WITH */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Clinical Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            What OPD Assistant AI Can Assist With
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            OPD Assistant AI is designed to assist healthcare professionals with reference lookup and information structuring. It does not independently make clinical determinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {assistCapabilities.map((capability, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-3 group"
            >
              <div className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                  Can assist with:
                </span>
                <p className="text-xs text-slate-300 font-medium leading-snug">
                  {capability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CLINICAL REFERENCE MODULES (25 Exactly) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-5 border-b border-slate-800">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Structured Knowledge Areas
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Clinical Reference Modules
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Visually organized into 25 core primary care and clinical reference domains.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {clinicalModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    #{String(mod.id).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {mod.name}
                  </h3>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {mod.tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. STRUCTURED CLINICAL REFERENCE ARCHITECTURE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Data Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Structured Clinical Reference Schema
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The application includes structured clinical-reference resources organized into systematic categories for professional consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disease Reference */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>DISEASE REFERENCE</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                SCHEMA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Structured clinical reference fields designed for systematic review:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">• Disease name</li>
              <li className="flex items-center gap-1.5">• Category</li>
              <li className="flex items-center gap-1.5">• Symptoms</li>
              <li className="flex items-center gap-1.5">• Diagnosis-related reference</li>
              <li className="flex items-center gap-1.5">• Treatment-related reference</li>
              <li className="flex items-center gap-1.5 text-amber-300">• Red flags</li>
              <li className="flex items-center gap-1.5">• Referral reference</li>
            </ul>
            <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">
              For reference assistance only • Not automatic diagnosis
            </div>
          </div>

          {/* Medicine Reference */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-400" />
                <span>MEDICINE REFERENCE</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                SCHEMA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pharmacotherapy reference points for healthcare professionals:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">• Generic name</li>
              <li className="flex items-center gap-1.5">• Brand name</li>
              <li className="flex items-center gap-1.5">• Drug category / class</li>
              <li className="flex items-center gap-1.5">• Indications</li>
              <li className="flex items-center gap-1.5">• Adult dose reference</li>
              <li className="flex items-center gap-1.5">• Pediatric dose reference</li>
              <li className="flex items-center gap-1.5 text-rose-300">• Contraindications</li>
              <li className="flex items-center gap-1.5">• Side effects</li>
              <li className="flex items-center gap-1.5">• Pregnancy reference</li>
              <li className="flex items-center gap-1.5">• Lactation reference</li>
              <li className="flex items-center gap-1.5">• Administration route</li>
            </ul>
            <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">
              Reference information only • Not an automatic prescription
            </div>
          </div>

          {/* Investigation / Lab Reference */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Microscope className="w-4 h-4 text-blue-400" />
                <span>INVESTIGATION / LAB REFERENCE</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                SCHEMA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Structured diagnostic testing and interpretation frameworks:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">• Test name and clinical purpose</li>
              <li className="flex items-center gap-1.5">• Reference / normal range frameworks</li>
              <li className="flex items-center gap-1.5">• Interpretation frameworks for variations</li>
              <li className="flex items-center gap-1.5">• Next-step clinical reference considerations</li>
            </ul>
            <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">
              Does not replace formal laboratory technologist or pathologist review
            </div>
          </div>

          {/* Emergency Reference */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>EMERGENCY REFERENCE</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300">
                CRITICAL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Structured stabilization and urgent presentation reference:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">• Critical symptoms and warning signs</li>
              <li className="flex items-center gap-1.5">• Immediate-action reference and stabilization points</li>
              <li className="flex items-center gap-1.5">• Emergency drug and reference information</li>
              <li className="flex items-center gap-1.5 text-amber-300">• Urgent referral and transport considerations</li>
            </ul>
            <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">
              Must not be used to delay immediate emergency care or physical assessment
            </div>
          </div>
        </div>
      </section>

      {/* 7. DESIGNED FOR HEALTHCARE PROFESSIONALS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/50 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Intended Audience
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Designed for Healthcare Professionals
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              OPD Assistant AI is intended for appropriately qualified healthcare professionals and authorized users working in primary-care and related healthcare settings, including PHC/CHC environments where applicable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {intendedUsers.map((user, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-white">{user.title}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{user.role}</div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>
              <strong>Professional Scope Notice:</strong> OPD Assistant AI is not marketed as a general public medical advice chatbot. It is built strictly for qualified healthcare professionals and authorized users.
            </span>
          </div>
        </div>
      </section>

      {/* 8. X-RAY / MEDICAL IMAGE ASSISTANCE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950 text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                Imaging Reference
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                X-ray / Medical-Image Reference Assistance
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Where an actual image is provided and the functionality is supported, the system may assist with structured observations and reference-oriented information.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Crucial Imaging Scope Boundaries</span>
            </div>
            <ul className="space-y-1 text-slate-400 list-disc pl-5">
              <li>It must NOT be described or treated as a formal radiology report.</li>
              <li>It does not provide definitive radiological diagnosis.</li>
              <li>It is NOT a replacement for a qualified Radiologist or medical imaging specialist.</li>
              <li>The system should not claim image/X-ray analysis when an actual image has not been provided.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. AI SAFETY PRINCIPLES */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Responsible AI
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Clinical Safety & Responsible Use
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Core safety guardrails engineered to preserve clinical accuracy, transparency, and professional oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {safetyPrinciples.map((principle, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold mt-0.5">
                {index + 1}
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">{principle.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{principle.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. WHAT OPD ASSISTANT AI DOES NOT DO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-rose-900/30 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Clinical Boundaries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              What OPD Assistant AI Does NOT Do
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              To prevent misapplication and protect patient safety, the following clinical boundaries are explicit and absolute:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            {whatItDoesNotDo.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5"
              >
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. GET OPD ASSISTANT AI / PLANS & DOWNLOAD */}
      <PlansAndDownloadSection />

      {/* 12. MOST IMPORTANT DISCLAIMER */}
      <section id="disclaimer" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-b from-amber-950/30 via-slate-950 to-slate-950 border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                Critical Legal & Clinical Notice
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Important Clinical Disclaimer
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
            <p>
              <strong>OPD Assistant AI</strong> is intended only to provide AI-assisted clinical reference, medical information and decision-support assistance to appropriately qualified healthcare professionals.
            </p>
            <p className="font-semibold text-amber-200">
              It does NOT provide final diagnosis, final treatment decisions, prescriptions, or definitive specialist opinions.
            </p>
            <p>
              The information provided by OPD Assistant AI must not be treated as a substitute for patient history, physical examination, appropriate investigations, applicable clinical guidelines, local/institutional protocols, or professional clinical judgment.
            </p>
            <p>
              Final decisions regarding diagnosis, treatment, medication selection, dosage, referral and emergency management remain the responsibility of the appropriately qualified healthcare professional.
            </p>
            <p>
              Clinical information, diagnostic findings, imaging observations and laboratory-related information should be appropriately reviewed and clinically verified by the relevant qualified professional before being used in actual patient care.
            </p>
            <p>
              For diagnosis and treatment decisions, healthcare professionals should rely on appropriate qualified medical professionals and specialists, including Registered Medical Officers/qualified doctors and, where applicable, relevant specialists such as Radiologists or qualified laboratory/medical specialists.
            </p>
            <p>
              OPD Assistant AI is an assistance and information tool. Its purpose is to support healthcare professionals, not to independently implement clinical decisions or replace professional medical judgment.
            </p>
            <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-200 font-semibold text-xs">
              OPD Assistant AI should not be used to delay or replace urgent medical assessment or emergency care.
            </div>
          </div>
        </div>
      </section>

      {/* 13. BACKEND / TECHNICAL ARCHITECTURE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Technical Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Technical Architecture Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The application combines structured clinical-reference resources with AI-assisted clinical information processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-mono text-blue-400">LAYER 01</div>
              <div className="text-xs font-bold text-white">User Interface</div>
              <p className="text-[11px] text-slate-400">Android mobile client designed for intuitive chat interaction and quick reference</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-mono text-blue-400">LAYER 02</div>
              <div className="text-xs font-bold text-white">Clinical Reference Layer</div>
              <p className="text-[11px] text-slate-400">Structured reference resources covering diseases, medicines, labs, and triage</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-mono text-blue-400">LAYER 03</div>
              <div className="text-xs font-bold text-white">AI Assistance Layer</div>
              <p className="text-[11px] text-slate-400">Processes queries and correlates structured clinical knowledge for review</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-mono text-blue-400">LAYER 04</div>
              <div className="text-xs font-bold text-white">Backend Services</div>
              <p className="text-[11px] text-slate-400">Supports authentication, application functionality, and AI-assisted processing</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 space-y-1.5">
              <div className="text-xs font-mono text-emerald-400">LAYER 05</div>
              <div className="text-xs font-bold text-white">Professional Review</div>
              <p className="text-[11px] text-slate-300">Qualified healthcare professional validates all output before patient care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. PATIENT DATA / PRIVACY WORDING */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-blue-950 text-blue-400 flex-shrink-0 mt-1">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">
              Patient Data & Confidentiality
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Healthcare professionals should avoid entering directly identifying patient information unless necessary, authorized and handled in accordance with applicable confidentiality and privacy requirements.
            </p>
          </div>
        </div>
      </section>

      {/* 15. GOOGLE PLAY STORE COMING SOON BANNER & BACK TO ADI */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-900/50 text-blue-300">
              <span>Android Mobile Platform</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Google Play Store — Coming Soon
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              OPD Assistant AI is currently in active preparation for the Android platform on the Google Play Store.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all text-center"
            >
              Contact Regarding App
            </Link>
            <Link
              href="/"
              className="px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-center"
            >
              Back to Main Website
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
