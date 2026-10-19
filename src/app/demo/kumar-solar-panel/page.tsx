"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Sun,
  FileText,
  Boxes,
  BookOpen,
  Calculator,
  RotateCcw,
  Plus,
  Download,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  User,
  Phone,
  FileSpreadsheet,
  Wallet,
  Sparkles,
  ExternalLink,
  Info,
  ChevronRight,
  Layers,
  Check,
} from "lucide-react";
import {
  getDemoState,
  saveDemoState,
  resetDemoState,
  saveDemoQuotation,
  addDemoInquiry,
  createNewDemoQuotationFromInquiry,
  addDemoStockMovement,
  addDemoFinancialTransaction,
  computeFinancialStatements,
} from "@/lib/kumar-solar/demo-storage";
import {
  downloadQuotationPdf,
  downloadStockReportPdf,
  downloadFinancialReportPdf,
} from "@/lib/kumar-solar/pdf-generator";
import type {
  DemoState,
  ProductItem,
  CustomerInquiry,
  QuotationRecord,
  QuotationLineItem,
  StockItem,
  StockMovement,
  FinancialTransaction,
} from "@/lib/kumar-solar/types";

type ActiveTab =
  | "dashboard"
  | "products"
  | "inquiries"
  | "quotations"
  | "stock"
  | "ledger"
  | "reports"
  | "calculator";

export default function KumarSolarDemoPage() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<DemoState | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [notification, setNotification] = useState<string | null>(null);

  // Selected Quotation for Editing / Viewing
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);

  // New Inquiry Form Modal
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [newInquiry, setNewInquiry] = useState({
    customerName: "",
    mobile: "+91 98260 00000",
    district: "Raipur",
    state: "Chhattisgarh",
    customerType: "Residential" as const,
    projectType: "On-grid" as const,
    systemCapacity: "3 kW Rooftop",
    roofAreaSqFt: 350,
    notes: "",
  });

  // Stock Movement Modal
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockFormData, setStockFormData] = useState({
    stockItemId: "",
    type: "Inward (Goods Receipt)" as "Inward (Goods Receipt)" | "Outward (Sale / Issue)",
    quantity: 10,
    partyName: "DEMO-SUPPLIER-001: Waaree Authorized Distributor",
    referenceNumber: "DEMO-PO-2026-042",
    notes: "",
  });

  // Transaction Voucher Modal
  const [showTxModal, setShowTxModal] = useState(false);
  const [txFormData, setTxFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    bookType: "Bank Book (UPI/NEFT)" as "Cash Book" | "Bank Book (UPI/NEFT)",
    transactionType: "Receipt (Credit to Cash/Bank)" as
      | "Receipt (Credit to Cash/Bank)"
      | "Payment (Debit from Cash/Bank)",
    accountHead: "Solar Installation Sales",
    partyType: "Customer" as "Customer" | "Supplier" | "Expense",
    partyName: "DEMO-CUSTOMER-001: Ramesh Verma",
    amount: 50000,
    narration: "Project stage payment received via UPI / NEFT.",
  });

  // Product Catalogue Filter
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("All");

  // Solar Calculator State
  const [calcMonthlyBill, setCalcMonthlyBill] = useState<number>(3500);
  const [calcSanctionedLoad, setCalcSanctionedLoad] = useState<number>(3);

  // Load from sandbox on mount
  useEffect(() => {
    setMounted(true);
    const loaded = getDemoState();
    setState(loaded);
    if (loaded.quotations.length > 0) {
      setEditingQuoteId(loaded.quotations[0].id);
    }
  }, []);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Reset demo sandbox
  const handleReset = () => {
    if (confirm("Reset the demo sandbox back to initial sample records? This only affects your demo session.")) {
      const fresh = resetDemoState();
      setState(fresh);
      if (fresh.quotations.length > 0) {
        setEditingQuoteId(fresh.quotations[0].id);
      }
      showNotice("Demo sandbox has been reset to initial baseline dataset.");
    }
  };

  // Computed Financials
  const computed = useMemo(() => {
    if (!state) return null;
    return computeFinancialStatements(state);
  }, [state]);

  // Active Editing Quote
  const currentEditingQuote = useMemo(() => {
    if (!state || !editingQuoteId) return null;
    return state.quotations.find((q) => q.id === editingQuoteId) || null;
  }, [state, editingQuoteId]);

  // Solar Calculator Derived Metrics
  const solarCalculations = useMemo(() => {
    const recommendedKw = Math.max(1, Math.min(25, Math.ceil(calcMonthlyBill / 1100)));
    const roofAreaSqFt = recommendedKw * 100;
    const unitsPerDay = recommendedKw * 4.2;
    const unitsPerYear = Math.round(unitsPerDay * 365);
    const annualSavings = Math.round(unitsPerYear * 7.2);
    // PM Surya Ghar Central Government Subsidy
    let subsidy = 0;
    if (recommendedKw === 1) subsidy = 30000;
    else if (recommendedKw === 2) subsidy = 60000;
    else if (recommendedKw >= 3) subsidy = 78000;

    const co2Tonnes = Number((unitsPerYear * 0.82 * 25 / 1000).toFixed(1));

    return {
      recommendedKw,
      roofAreaSqFt,
      unitsPerYear,
      annualSavings,
      subsidy,
      co2Tonnes,
    };
  }, [calcMonthlyBill, calcSanctionedLoad]);

  if (!mounted || !state || !computed) {
    return (
      <div className="min-h-screen bg-[#060B18] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <Sun className="w-6 h-6 text-amber-400 animate-spin" />
          <span className="text-sm font-mono">Initializing Kumar Solar Demo Sandbox...</span>
        </div>
      </div>
    );
  }

  // Helper for Updating Active Quotation Line Item
  const handleUpdateLineItem = (itemId: string, field: "quantity" | "unitPrice" | "discountPercent" | "gstRate", val: number) => {
    if (!currentEditingQuote) return;
    const updatedItems = currentEditingQuote.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, [field]: val };
      }
      return item;
    });

    const updatedQuote = saveDemoQuotation({
      ...currentEditingQuote,
      items: updatedItems,
    });

    const nextState = getDemoState();
    setState(nextState);
  };

  const handleRemoveLineItem = (itemId: string) => {
    if (!currentEditingQuote) return;
    if (currentEditingQuote.items.length <= 1) {
      alert("A quotation must have at least one line item.");
      return;
    }
    const updatedItems = currentEditingQuote.items.filter((item) => item.id !== itemId);
    saveDemoQuotation({ ...currentEditingQuote, items: updatedItems });
    setState(getDemoState());
    showNotice("Item removed from quotation.");
  };

  const handleAddProductToQuote = (prod: ProductItem) => {
    if (!currentEditingQuote) return;
    const newItem: QuotationLineItem = {
      id: `qi-${Date.now()}`,
      productId: prod.id,
      description: prod.name,
      category: prod.category,
      brand: prod.brand,
      quantity: 1,
      unit: prod.unit,
      unitPrice: prod.sellingPrice,
      discountPercent: 0,
      gstRate: prod.gstRate,
      taxableAmount: prod.sellingPrice,
      cgstAmount: (prod.sellingPrice * (prod.gstRate / 2)) / 100,
      sgstAmount: (prod.sellingPrice * (prod.gstRate / 2)) / 100,
      totalAmount: prod.sellingPrice * (1 + prod.gstRate / 100),
    };

    saveDemoQuotation({
      ...currentEditingQuote,
      items: [...currentEditingQuote.items, newItem],
    });
    setState(getDemoState());
    showNotice(`Added ${prod.name} to active quotation.`);
  };

  // Convert Inquiry to Quotation
  const handleConvertInquiryToQuotation = (inq: CustomerInquiry) => {
    const newQuote = createNewDemoQuotationFromInquiry(inq);
    setState(getDemoState());
    setEditingQuoteId(newQuote.id);
    setActiveTab("quotations");
    showNotice(`Created new quotation ${newQuote.quotationNumber} from inquiry.`);
  };

  // Convert Calculator Recommendation to Quotation
  const handleCalculatorToQuote = () => {
    const rawInq = addDemoInquiry({
      customerName: "DEMO-CUSTOMER-CALC: Rooftop Solar Client",
      mobile: "+91 98260 00099 (Demo)",
      whatsappNumber: "+91 98260 00099",
      email: "solar.calc.demo@example.com",
      district: "Raipur",
      state: "Chhattisgarh",
      customerType: "Residential",
      projectType: "On-grid",
      systemCapacity: `${solarCalculations.recommendedKw} kW Rooftop Solar`,
      roofAreaSqFt: solarCalculations.roofAreaSqFt,
      notes: `Calculated from monthly power bill of Rs. ${calcMonthlyBill}. Annual savings est. Rs. ${solarCalculations.annualSavings}.`,
    });

    const newQuote = createNewDemoQuotationFromInquiry(rawInq);
    setState(getDemoState());
    setEditingQuoteId(newQuote.id);
    setActiveTab("quotations");
    showNotice(`Quotation for ${solarCalculations.recommendedKw} kW created successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 pb-20 font-sans">
      {/* 1. TOP DEMO ISOLATION & SAMPLE WARNING BANNER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-slate-950 px-4 py-2 text-xs font-bold shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-950 flex-shrink-0" />
            <span>
              DEMO MODE — Sample Data Only — Not Actual Business Records. Isolated Visitor Sandbox.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products/kumar-solar-panel-management"
              className="hover:underline flex items-center gap-1 font-semibold text-slate-950"
            >
              <span>Back to Product Overview</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 text-white text-[11px] font-mono hover:bg-slate-900 transition-colors"
              title="Reset sample data back to baseline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-amber-500 text-amber-300 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. DEMO WORKSPACE HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white font-heading">
                  Kumar Solar Panel Management PWA
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Interactive Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                End-to-End Solar Business Management Workspace • Baloda Bazar - Bhatapara, Chhattisgarh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products/kumar-solar-panel-management#inquire-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
            >
              <span>Inquire to Buy Software</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto space-x-1 border-t border-slate-800/60 pt-1">
          {[
            { id: "dashboard", label: "Dashboard (अवलोकन)", icon: TrendingUp },
            { id: "products", label: "Catalogue (उत्पाद)", icon: Sun },
            { id: "inquiries", label: "Inquiries (पूछताछ)", icon: User },
            { id: "quotations", label: "Quotations & PDF (कोटेशन)", icon: FileText },
            { id: "stock", label: "Stock Register (स्टॉक)", icon: Boxes },
            { id: "ledger", label: "Ledger & Books (खाता बही)", icon: BookOpen },
            { id: "reports", label: "CA Statements (रिपोर्ट्स)", icon: FileSpreadsheet },
            { id: "calculator", label: "Solar Calculator (कैलकुलेटर)", icon: Calculator },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? "border-amber-400 text-amber-300 bg-amber-500/10"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* ============================================================== */}
        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {/* ============================================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Active Quotations</div>
                <div className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {state.quotations.length}
                </div>
                <div className="text-[10px] text-amber-400 font-mono">
                  Quoted: ₹{state.quotations.reduce((acc, q) => acc + q.grandTotal, 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Warehouse Valuation</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-heading">
                  ₹{computed.totalStockValuation.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {state.stockItems.reduce((acc, s) => acc + s.currentStock, 0)} Units in Stock
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Cash &amp; Bank Balance</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-400 font-heading">
                  ₹{(computed.cashBalance + computed.bankBalance).toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Cash: ₹{computed.cashBalance.toLocaleString("en-IN")} | Bank: ₹{computed.bankBalance.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Client Receivables</div>
                <div className="text-xl sm:text-2xl font-bold text-amber-300 font-heading">
                  ₹{computed.totalReceivables.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Payables: ₹{computed.totalPayables.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Workflow Quick Actions
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setShowInquiryModal(true);
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-left transition-colors group"
                >
                  <Plus className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">New Demo Inquiry</div>
                  <div className="text-[10px] text-slate-400">Record customer project</div>
                </button>

                <button
                  onClick={() => {
                    if (state.quotations[0]) {
                      downloadQuotationPdf(state.quotations[0]);
                      showNotice(`Downloaded PDF for ${state.quotations[0].quotationNumber}`);
                    }
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-400 text-left transition-colors group"
                >
                  <Download className="w-4 h-4 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">Generate Quote PDF</div>
                  <div className="text-[10px] text-slate-400">Official vector invoice</div>
                </button>

                <button
                  onClick={() => {
                    setStockFormData({
                      stockItemId: state.stockItems[0]?.id || "",
                      type: "Inward (Goods Receipt)",
                      quantity: 10,
                      partyName: "DEMO-SUPPLIER-001: Waaree Authorized Distributor",
                      referenceNumber: "DEMO-PO-2026-042",
                      notes: "New stock inward batch",
                    });
                    setShowStockModal(true);
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-400 text-left transition-colors group"
                >
                  <Boxes className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">Inward Stock (GRN)</div>
                  <div className="text-[10px] text-slate-400">Add inventory units</div>
                </button>

                <button
                  onClick={() => {
                    setShowTxModal(true);
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-400 text-left transition-colors group"
                >
                  <BookOpen className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white">Record Voucher</div>
                  <div className="text-[10px] text-slate-400">Cash / Bank / Khata Bahi</div>
                </button>
              </div>
            </div>

            {/* Split: Recent Inquiries & Recent Stock Movements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Inquiries */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Recent Customer Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {state.inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{inq.customerName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {inq.systemCapacity} • {inq.district}, {inq.state}
                        </div>
                      </div>
                      <button
                        onClick={() => handleConvertInquiryToQuotation(inq)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[11px] font-semibold transition-colors"
                      >
                        Quote
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Stock Movements */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Recent Stock Movements
                  </h3>
                  <button
                    onClick={() => setActiveTab("stock")}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    View Register
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {state.stockMovements.slice(0, 3).map((mov) => (
                    <div key={mov.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">{mov.productName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {mov.movementNumber} • {mov.partyName}
                        </div>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold ${
                          mov.type.includes("Inward") ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {mov.type.includes("Inward") ? `+${mov.quantity}` : `-${mov.quantity}`} {mov.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PRODUCT CATALOGUE */}
        {/* ============================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Solar Hardware &amp; Component Catalogue
                </h2>
                <p className="text-xs text-slate-400">
                  Select items to add directly to current customer requirement or quotation.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {["All", "Solar Panels", "Inverters", "Batteries", "Structures", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      productCategoryFilter === cat
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {state.products
                .filter((p) => productCategoryFilter === "All" || p.category === productCategoryFilter)
                .map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {prod.category}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          Stock: {prod.currentStock} {prod.unit}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug">{prod.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-300">
                        <span className="font-semibold text-amber-300">{prod.brand}</span>
                        <span>•</span>
                        <span>Warranty: {prod.warrantyYears} Yrs</span>
                        <span>•</span>
                        <span>GST: {prod.gstRate}%</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">Selling Rate</div>
                        <div className="text-sm font-bold text-white">
                          ₹{prod.sellingPrice.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddProductToQuote(prod)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Quote</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CUSTOMER INQUIRIES */}
        {/* ============================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Customer Solar Inquiries &amp; Site Leads
                </h2>
                <p className="text-xs text-slate-400">
                  Track requirements, power bills, and convert inquiries into official quotations.
                </p>
              </div>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Demo Inquiry</span>
              </button>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Inquiry Ref</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Contact (Demo Safe)</th>
                      <th className="py-3 px-4">District</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {state.inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-amber-400 font-semibold">
                          {inq.inquiryNumber}
                        </td>
                        <td className="py-3 px-4 font-semibold text-white">{inq.customerName}</td>
                        <td className="py-3 px-4 font-mono text-slate-400">{inq.mobile}</td>
                        <td className="py-3 px-4">{inq.district}, {inq.state}</td>
                        <td className="py-3 px-4 font-mono">{inq.systemCapacity}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleConvertInquiryToQuotation(inq)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                          >
                            <span>Generate Quote</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: QUOTATION BUILDER & VECTOR PDF */}
        {/* ============================================================== */}
        {activeTab === "quotations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Interactive Quotation Builder &amp; Vector PDF
                </h2>
                <p className="text-xs text-slate-400">
                  Edit line items, adjust quantities (+/-), modify rates &amp; taxes, and download official PDF.
                </p>
              </div>

              {/* Switch Quote Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Select Quote:</span>
                <select
                  value={editingQuoteId || ""}
                  onChange={(e) => setEditingQuoteId(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                >
                  {state.quotations.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.quotationNumber} — {q.customerName.substring(0, 25)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {currentEditingQuote ? (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                {/* Quotation Header Strip */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-amber-400 font-mono">
                        {currentEditingQuote.quotationNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {currentEditingQuote.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-semibold mt-1">
                      Customer: {currentEditingQuote.customerName} • {currentEditingQuote.systemCapacity}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        downloadQuotationPdf(currentEditingQuote);
                        showNotice(`Downloaded PDF for ${currentEditingQuote.quotationNumber}`);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official PDF</span>
                    </button>
                  </div>
                </div>

                {/* Line Items Table with Interactive Controls */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3 text-center">Qty Controls</th>
                        <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                        <th className="py-2.5 px-3 text-right">Disc%</th>
                        <th className="py-2.5 px-3 text-right">GST%</th>
                        <th className="py-2.5 px-3 text-right">Total (₹)</th>
                        <th className="py-2.5 px-2 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-200">
                      {currentEditingQuote.items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{item.description}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{item.brand}</div>
                          </td>

                          {/* Plus / Minus Quantity Controls */}
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                              <button
                                onClick={() =>
                                  handleUpdateLineItem(
                                    item.id,
                                    "quantity",
                                    Math.max(1, (item.quantity || 1) - 1)
                                  )
                                }
                                className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-mono font-bold text-amber-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateLineItem(item.id, "quantity", (item.quantity || 1) + 1)
                                }
                                className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          {/* Unit Rate Edit */}
                          <td className="py-3 px-3 text-right">
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleUpdateLineItem(
                                  item.id,
                                  "unitPrice",
                                  Math.max(0, Number(e.target.value))
                                )
                              }
                              className="w-24 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-right text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                            />
                          </td>

                          {/* Discount % Edit */}
                          <td className="py-3 px-3 text-right">
                            <input
                              type="number"
                              value={item.discountPercent}
                              onChange={(e) =>
                                handleUpdateLineItem(
                                  item.id,
                                  "discountPercent",
                                  Math.max(0, Math.min(100, Number(e.target.value)))
                                )
                              }
                              className="w-14 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-right text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                            />
                          </td>

                          {/* GST Rate Selector */}
                          <td className="py-3 px-3 text-right">
                            <select
                              value={item.gstRate}
                              onChange={(e) =>
                                handleUpdateLineItem(item.id, "gstRate", Number(e.target.value))
                              }
                              className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                            >
                              <option value={5}>5%</option>
                              <option value={12}>12%</option>
                              <option value={18}>18%</option>
                            </select>
                          </td>

                          <td className="py-3 px-3 text-right font-mono font-bold text-white">
                            ₹{item.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </td>

                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() => handleRemoveLineItem(item.id)}
                              className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Additional Charges & Grand Total Calculations */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Notes & Terms */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="text-xs font-bold text-slate-300">Quotation Terms &amp; Scope:</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {currentEditingQuote.notes}
                    </p>
                    <div className="text-[11px] font-mono text-emerald-400 pt-1">
                      PM Surya Ghar Central Subsidy: ₹{currentEditingQuote.subsidyAmount.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* Right: Commercial Calculations Breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Taxable Subtotal:</span>
                      <span className="font-mono text-white">
                        ₹{currentEditingQuote.subtotalTaxable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Total GST (CGST + SGST):</span>
                      <span className="font-mono text-white">
                        ₹{currentEditingQuote.totalGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Installation &amp; Commissioning:</span>
                      <span className="font-mono text-white">
                        ₹{currentEditingQuote.installationCharges.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Transport &amp; Freight:</span>
                      <span className="font-mono text-white">
                        ₹{currentEditingQuote.transportCharges.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base font-extrabold">
                      <span className="text-white">GRAND TOTAL (INC. GST):</span>
                      <span className="font-mono text-amber-400">
                        ₹{currentEditingQuote.grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">No quotation selected.</div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: STOCK REGISTER & AUDIT */}
        {/* ============================================================== */}
        {activeTab === "stock" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Real-Time Stock Register &amp; Warehouse Valuation
                </h2>
                <p className="text-xs text-slate-400">
                  Track goods received, dispatch outward, minimum threshold alerts, and valuation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setStockFormData({
                      stockItemId: state.stockItems[0]?.id || "",
                      type: "Inward (Goods Receipt)",
                      quantity: 10,
                      partyName: "DEMO-SUPPLIER-001: Waaree Authorized Distributor",
                      referenceNumber: "DEMO-PO-2026-042",
                      notes: "New stock inward batch",
                    });
                    setShowStockModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Record Movement</span>
                </button>

                <button
                  onClick={() => {
                    downloadStockReportPdf(state.stockItems, state.stockMovements);
                    showNotice("Downloaded Stock Valuation PDF report.");
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Stock PDF</span>
                </button>
              </div>
            </div>

            {/* Stock Items Table */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">SKU</th>
                      <th className="py-3 px-3">Product Name</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3 text-center">Available Stock</th>
                      <th className="py-3 px-3 text-center">Threshold</th>
                      <th className="py-3 px-3 text-right">Unit Cost (₹)</th>
                      <th className="py-3 px-3 text-right">Valuation (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {state.stockItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono text-amber-400 font-semibold">{item.sku}</td>
                        <td className="py-3 px-3 font-semibold text-white">{item.name}</td>
                        <td className="py-3 px-3">{item.category}</td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">
                          {item.currentStock} {item.unit}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-slate-400">
                          {item.minStockThreshold}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          ₹{item.purchasePrice.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-white">
                          ₹{item.valuation.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Movements Audit Trail */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Stock Movements Audit Ledger
              </h3>
              <div className="divide-y divide-slate-800/80 text-xs">
                {state.stockMovements.map((mov) => (
                  <div key={mov.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-white">{mov.productName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {mov.movementNumber} • Ref: {mov.referenceNumber} • Party: {mov.partyName}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">{mov.type}</span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          mov.type.includes("Inward") ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {mov.type.includes("Inward") ? `+${mov.quantity}` : `-${mov.quantity}`} {mov.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: LEDGER & ACCOUNT BOOKS */}
        {/* ============================================================== */}
        {activeTab === "ledger" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Double-Entry Ledgers &amp; Khata Bahi (खाता बही)
                </h2>
                <p className="text-xs text-slate-400">
                  Cash book, bank &amp; UPI book, customer receivables, and supplier payables.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTxModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Transaction Voucher</span>
                </button>
              </div>
            </div>

            {/* Cash & Bank Balances Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Cash Book Balance (रोकड़)</div>
                <div className="text-xl font-bold text-white font-mono">
                  ₹{computed.cashBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Bank / UPI Book Balance (बैंक)</div>
                <div className="text-xl font-bold text-blue-400 font-mono">
                  ₹{computed.bankBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Total Liquid Reserves</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  ₹{(computed.cashBalance + computed.bankBalance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Split: Customer Ledgers vs Supplier Ledgers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Receivables Ledger */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Customer Khata Bahi (Receivables)
                  </h3>
                  <span className="text-xs font-bold text-amber-400 font-mono">
                    Due: ₹{computed.totalReceivables.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {computed.customerLedgers.map((cl, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{cl.partyName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Billed: ₹{cl.totalDebits.toLocaleString("en-IN")} • Paid: ₹{cl.totalCredits.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-amber-300">
                        ₹{cl.closingBalance.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supplier Payables Ledger */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Supplier Khata Bahi (Payables)
                  </h3>
                  <span className="text-xs font-bold text-blue-400 font-mono">
                    Due: ₹{computed.totalPayables.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {computed.supplierLedgers.map((sl, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{sl.partyName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Purchased: ₹{sl.openingBalance.toLocaleString("en-IN")} • Paid: ₹{sl.totalDebits.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-blue-300">
                        ₹{sl.closingBalance.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions Journal */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Financial Transactions &amp; Journal Vouchers
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Voucher #</th>
                      <th className="py-2.5 px-3">Particulars</th>
                      <th className="py-2.5 px-3">Book Type</th>
                      <th className="py-2.5 px-3 text-right">Debit (₹)</th>
                      <th className="py-2.5 px-3 text-right">Credit (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {state.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-mono">{tx.date}</td>
                        <td className="py-2.5 px-3 font-mono text-amber-400">{tx.voucherNumber}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-white">{tx.accountHead}</div>
                          <div className="text-[10px] text-slate-400">{tx.narration}</div>
                        </td>
                        <td className="py-2.5 px-3">{tx.bookType}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-red-400 font-semibold">
                          {tx.debit > 0 ? `₹${tx.debit.toLocaleString("en-IN")}` : "—"}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                          {tx.credit > 0 ? `₹${tx.credit.toLocaleString("en-IN")}` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: CA STATEMENTS & REPORTS */}
        {/* ============================================================== */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Chartered Accountant Reports &amp; Financial Statements
                </h2>
                <p className="text-xs text-slate-400">
                  Exportable statements for monthly audits, GST filing, and financial year review.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    downloadFinancialReportPdf("Cash Book", state, computed);
                    showNotice("Downloaded Cash Book PDF Statement.");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Cash Book PDF
                </button>

                <button
                  onClick={() => {
                    downloadFinancialReportPdf("Bank Book", state, computed);
                    showNotice("Downloaded Bank Book PDF Statement.");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Bank Book PDF
                </button>

                <button
                  onClick={() => {
                    downloadFinancialReportPdf("Trial Balance", state, computed);
                    showNotice("Downloaded Trial Balance PDF Statement.");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
                >
                  Trial Balance PDF
                </button>
              </div>
            </div>

            {/* Trial Balance & P&L Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trial Balance Summary */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Trial Balance (तलपट)
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">Balanced Ledger</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Cash on Hand:</span>
                    <span className="font-mono text-white">₹{computed.cashBalance.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Bank &amp; UPI Accounts:</span>
                    <span className="font-mono text-white">₹{computed.bankBalance.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Closing Inventory Stock:</span>
                    <span className="font-mono text-white">₹{computed.totalStockValuation.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Trade Receivables (Debtors):</span>
                    <span className="font-mono text-white">₹{computed.totalReceivables.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Trade Payables (Creditors):</span>
                    <span className="font-mono text-white">₹{computed.totalPayables.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Profit & Loss Account */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Profit &amp; Loss Statement (आय-व्यय)
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">FY 2026-27</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Total Sales Turnover:</span>
                    <span className="font-mono text-white">₹{computed.totalRevenue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Cost of Goods &amp; Hardware:</span>
                    <span className="font-mono text-white">
                      ₹{(computed.totalRevenue * 0.72).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Direct Site Fabrication &amp; Freight:</span>
                    <span className="font-mono text-white">₹{computed.totalExpenses.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-sm">
                    <span className="text-white">Estimated Operating Profit:</span>
                    <span className="font-mono text-emerald-400">
                      ₹{(computed.totalRevenue * 0.28 - computed.totalExpenses).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: SOLAR CALCULATOR */}
        {/* ============================================================== */}
        {activeTab === "calculator" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Interactive Rooftop Solar Calculator &amp; Subsidy Estimator
              </h2>
              <p className="text-xs text-slate-400">
                Estimate capacity, shadow-free roof area, unit generation, bill savings, and PM Surya Ghar subsidy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders Input Column */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Monthly Electricity Bill (₹)</span>
                    <span className="text-amber-400 font-mono text-sm">
                      ₹{calcMonthlyBill.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={800}
                    max={25000}
                    step={200}
                    value={calcMonthlyBill}
                    onChange={(e) => setCalcMonthlyBill(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>₹800</span>
                    <span>₹12,000</span>
                    <span>₹25,000+</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Sanctioned Load (kW)</span>
                    <span className="text-amber-400 font-mono text-sm">{calcSanctionedLoad} kW</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={calcSanctionedLoad}
                    onChange={(e) => setCalcSanctionedLoad(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>1 kW</span>
                    <span>5 kW</span>
                    <span>15 kW</span>
                  </div>
                </div>

                <button
                  onClick={handleCalculatorToQuote}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Generate Quotation for {solarCalculations.recommendedKw} kW</span>
                </button>
              </div>

              {/* Derived Results Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Recommended System</div>
                  <div className="text-2xl font-bold text-amber-400 font-heading">
                    {solarCalculations.recommendedKw} kW Rooftop
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Shadow-free roof: ~{solarCalculations.roofAreaSqFt} sq. ft
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Annual Unit Generation</div>
                  <div className="text-2xl font-bold text-blue-400 font-heading">
                    {solarCalculations.unitsPerYear.toLocaleString("en-IN")} kWh
                  </div>
                  <div className="text-[11px] text-slate-400">Clean solar power generated</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Annual Savings</div>
                  <div className="text-2xl font-bold text-emerald-400 font-heading">
                    ₹{solarCalculations.annualSavings.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-slate-400">Reduces electricity bills ~90%</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">PM Surya Ghar Subsidy</div>
                  <div className="text-2xl font-bold text-yellow-300 font-heading">
                    ₹{solarCalculations.subsidy.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-slate-400">Central Government DBT credit</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL 1: NEW INQUIRY MODAL */}
      {/* ============================================================== */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-heading">Create New Demo Customer Inquiry</h3>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. DEMO-CUSTOMER-004: Sunil Agrawal"
                  value={newInquiry.customerName}
                  onChange={(e) => setNewInquiry({ ...newInquiry, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile (Demo Safe)</label>
                  <input
                    type="text"
                    value={newInquiry.mobile}
                    onChange={(e) => setNewInquiry({ ...newInquiry, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={newInquiry.district}
                    onChange={(e) => setNewInquiry({ ...newInquiry, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">System Capacity</label>
                  <input
                    type="text"
                    value={newInquiry.systemCapacity}
                    onChange={(e) => setNewInquiry({ ...newInquiry, systemCapacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Project Type</label>
                  <select
                    value={newInquiry.projectType}
                    onChange={(e) => setNewInquiry({ ...newInquiry, projectType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="On-grid">On-grid</option>
                    <option value="Off-grid">Off-grid</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Solar Pump">Solar Pump</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Requirement Notes</label>
                <textarea
                  rows={2}
                  value={newInquiry.notes}
                  onChange={(e) => setNewInquiry({ ...newInquiry, notes: e.target.value })}
                  placeholder="Installation specifications or PM Surya Ghar requirements..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowInquiryModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newInquiry.customerName) {
                    alert("Please enter a customer name.");
                    return;
                  }
                  addDemoInquiry({
                    ...newInquiry,
                    customerName: newInquiry.customerName.startsWith("DEMO-")
                      ? newInquiry.customerName
                      : `DEMO-CUSTOMER-${newInquiry.customerName}`,
                  });
                  setState(getDemoState());
                  setShowInquiryModal(false);
                  showNotice("New demo customer inquiry created successfully!");
                }}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
              >
                Save Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: STOCK MOVEMENT MODAL */}
      {/* ============================================================== */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-heading">Record Stock Movement (Inward / Outward)</h3>
              <button
                onClick={() => setShowStockModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Item</label>
                <select
                  value={stockFormData.stockItemId}
                  onChange={(e) => setStockFormData({ ...stockFormData, stockItemId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                >
                  {state.stockItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.sku} — {item.name} (Current: {item.currentStock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Movement Type</label>
                  <select
                    value={stockFormData.type}
                    onChange={(e) => setStockFormData({ ...stockFormData, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Inward (Goods Receipt)">Inward (Goods Receipt / Purchase)</option>
                    <option value="Outward (Sale / Issue)">Outward (Sale / Site Issue)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={stockFormData.quantity}
                    onChange={(e) => setStockFormData({ ...stockFormData, quantity: Math.max(1, Number(e.target.value)) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Party / Supplier / Customer</label>
                <input
                  type="text"
                  value={stockFormData.partyName}
                  onChange={(e) => setStockFormData({ ...stockFormData, partyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reference Doc / PO / Invoice #</label>
                <input
                  type="text"
                  value={stockFormData.referenceNumber}
                  onChange={(e) => setStockFormData({ ...stockFormData, referenceNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const targetItem = state.stockItems.find((s) => s.id === stockFormData.stockItemId);
                  if (!targetItem) {
                    alert("Please select a valid item.");
                    return;
                  }
                  addDemoStockMovement({
                    stockItemId: targetItem.id,
                    productName: targetItem.name,
                    type: stockFormData.type,
                    quantity: stockFormData.quantity,
                    unit: targetItem.unit,
                    unitPrice: targetItem.purchasePrice,
                    totalAmount: stockFormData.quantity * targetItem.purchasePrice,
                    referenceType: "Purchase Order",
                    referenceNumber: stockFormData.referenceNumber,
                    partyName: stockFormData.partyName,
                    notes: "Logged via demo stock manager",
                  });
                  setState(getDemoState());
                  setShowStockModal(false);
                  showNotice("Stock movement logged and inventory recalculated!");
                }}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                Record Movement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: TRANSACTION VOUCHER MODAL */}
      {/* ============================================================== */}
      {showTxModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-heading">Record Financial Voucher</h3>
              <button
                onClick={() => setShowTxModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Book Type</label>
                  <select
                    value={txFormData.bookType}
                    onChange={(e) => setTxFormData({ ...txFormData, bookType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cash Book">Cash Book (रोकड़)</option>
                    <option value="Bank Book (UPI/NEFT)">Bank Book (UPI/NEFT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Transaction Type</label>
                  <select
                    value={txFormData.transactionType}
                    onChange={(e) => setTxFormData({ ...txFormData, transactionType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Receipt (Credit to Cash/Bank)">Receipt (प्राप्ति - Inflow)</option>
                    <option value="Payment (Debit from Cash/Bank)">Payment (भुगतान - Outflow)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Account Head</label>
                  <input
                    type="text"
                    value={txFormData.accountHead}
                    onChange={(e) => setTxFormData({ ...txFormData, accountHead: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={txFormData.amount}
                    onChange={(e) => setTxFormData({ ...txFormData, amount: Math.max(1, Number(e.target.value)) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Party / Customer / Supplier Name</label>
                <input
                  type="text"
                  value={txFormData.partyName}
                  onChange={(e) => setTxFormData({ ...txFormData, partyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Narration</label>
                <input
                  type="text"
                  value={txFormData.narration}
                  onChange={(e) => setTxFormData({ ...txFormData, narration: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowTxModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const isReceipt = txFormData.transactionType.includes("Receipt");
                  addDemoFinancialTransaction({
                    date: txFormData.date,
                    bookType: txFormData.bookType,
                    transactionType: txFormData.transactionType,
                    accountHead: txFormData.accountHead,
                    partyType: txFormData.partyType,
                    partyName: txFormData.partyName,
                    referenceDoc: "DEMO-DOC-01",
                    debit: isReceipt ? 0 : txFormData.amount,
                    credit: isReceipt ? txFormData.amount : 0,
                    narration: txFormData.narration,
                  });
                  setState(getDemoState());
                  setShowTxModal(false);
                  showNotice("Transaction voucher logged and double-entry books updated!");
                }}
                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold"
              >
                Post Voucher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
