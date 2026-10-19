import {
  DemoState,
  CustomerInquiry,
  QuotationRecord,
  QuotationLineItem,
  StockMovement,
  FinancialTransaction,
  LedgerSummary
} from "./types";
import { INITIAL_DEMO_STATE } from "./initial-data";

const STORAGE_KEY = "kumar_solar_demo_sandbox_v1";

export function getDemoState(): DemoState {
  if (typeof window === "undefined") {
    return INITIAL_DEMO_STATE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveDemoState(INITIAL_DEMO_STATE);
      return INITIAL_DEMO_STATE;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Failed to parse demo state from localStorage, using initial", err);
    return INITIAL_DEMO_STATE;
  }
}

export function saveDemoState(state: DemoState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save demo state to localStorage", err);
  }
}

export function resetDemoState(): DemoState {
  const fresh: DemoState = {
    ...JSON.parse(JSON.stringify(INITIAL_DEMO_STATE)),
    lastResetAt: new Date().toISOString(),
  };
  saveDemoState(fresh);
  return fresh;
}

// ----------------------------------------------------
// INQUIRIES MANAGEMENT
// ----------------------------------------------------
export function addDemoInquiry(
  inquiry: Omit<CustomerInquiry, "id" | "inquiryNumber" | "createdAt" | "status">
): CustomerInquiry {
  const state = getDemoState();
  const nextNum = String(state.inquiries.length + 1).padStart(3, "0");
  const newInq: CustomerInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    inquiryNumber: `DEMO-INQ-2026-${nextNum}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  state.inquiries.unshift(newInq);
  saveDemoState(state);
  return newInq;
}

// ----------------------------------------------------
// QUOTATIONS MANAGEMENT & CALCULATIONS
// ----------------------------------------------------
export function recalculateQuotation(quote: QuotationRecord): QuotationRecord {
  let subtotalTaxable = 0;
  let totalCgst = 0;
  let totalSgst = 0;

  const items: QuotationLineItem[] = (quote.items || []).map((it) => {
    const discountMultiplier = 1 - (it.discountPercent || 0) / 100;
    const taxable = (it.quantity || 0) * (it.unitPrice || 0) * discountMultiplier;
    const halfGst = (it.gstRate || 0) / 2;
    const cgst = (taxable * halfGst) / 100;
    const sgst = (taxable * halfGst) / 100;
    const total = taxable + cgst + sgst;

    subtotalTaxable += taxable;
    totalCgst += cgst;
    totalSgst += sgst;

    return {
      ...it,
      taxableAmount: Number(taxable.toFixed(2)),
      cgstAmount: Number(cgst.toFixed(2)),
      sgstAmount: Number(sgst.toFixed(2)),
      totalAmount: Number(total.toFixed(2)),
    };
  });

  const totalGst = totalCgst + totalSgst;
  const installation = Number(quote.installationCharges || 0);
  const transport = Number(quote.transportCharges || 0);
  const discount = Number(quote.discountAmount || 0);
  const grandTotal = Math.max(0, subtotalTaxable + totalGst + installation + transport - discount);

  return {
    ...quote,
    items,
    subtotalTaxable: Number(subtotalTaxable.toFixed(2)),
    totalCgst: Number(totalCgst.toFixed(2)),
    totalSgst: Number(totalSgst.toFixed(2)),
    totalGst: Number(totalGst.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
}

export function saveDemoQuotation(quote: QuotationRecord): QuotationRecord {
  const state = getDemoState();
  const calculated = recalculateQuotation(quote);
  const index = state.quotations.findIndex((q) => q.id === calculated.id);

  if (index >= 0) {
    state.quotations[index] = calculated;
  } else {
    state.quotations.unshift(calculated);
  }

  saveDemoState(state);
  return calculated;
}

export function createNewDemoQuotationFromInquiry(inquiry: CustomerInquiry): QuotationRecord {
  const state = getDemoState();
  const nextNum = String(state.quotations.length + 1).padStart(3, "0");

  const defaultItem: QuotationLineItem = {
    id: `qi-${Date.now()}`,
    productId: state.products[0]?.id || "prod-001",
    description: state.products[0]?.name || "Waaree 540W Mono PERC Half-Cut Module",
    category: state.products[0]?.category || "Solar Panels",
    brand: state.products[0]?.brand || "Waaree Energies",
    quantity: 6,
    unit: "Nos",
    unitPrice: state.products[0]?.sellingPrice || 12420,
    discountPercent: 0,
    gstRate: state.products[0]?.gstRate || 12,
    taxableAmount: 74520,
    cgstAmount: 4471.2,
    sgstAmount: 4471.2,
    totalAmount: 83462.4,
  };

  const rawQuote: QuotationRecord = {
    id: `quo-${Date.now()}`,
    quotationNumber: `DEMO-QUO-2026-${nextNum}`,
    inquiryId: inquiry.id,
    customerName: inquiry.customerName,
    mobile: inquiry.mobile,
    whatsappNumber: inquiry.whatsappNumber || inquiry.mobile,
    email: inquiry.email,
    installationAddress: `${inquiry.district}, ${inquiry.state}`,
    district: inquiry.district,
    state: inquiry.state,
    systemCapacity: inquiry.systemCapacity || "3 kW Rooftop Solar",
    projectType: inquiry.projectType,
    subsidyEligible: true,
    subsidyAmount: 78000,
    items: [defaultItem],
    subtotalTaxable: 74520,
    totalCgst: 4471.2,
    totalSgst: 4471.2,
    totalGst: 8942.4,
    installationCharges: 10000,
    transportCharges: 2000,
    discountAmount: 0,
    grandTotal: 95462.4,
    status: "Draft",
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    notes: "Official EPC Quotation generated from customer requirement review.",
  };

  return saveDemoQuotation(rawQuote);
}

// ----------------------------------------------------
// STOCK MOVEMENTS & AUTO-BALANCE UPDATE
// ----------------------------------------------------
export function addDemoStockMovement(movement: Omit<StockMovement, "id" | "movementNumber" | "createdAt">): StockMovement {
  const state = getDemoState();
  const nextNum = String(state.stockMovements.length + 1).padStart(3, "0");
  const newMov: StockMovement = {
    ...movement,
    id: `mov-${Date.now()}`,
    movementNumber: `DEMO-MOV-2026-${nextNum}`,
    createdAt: new Date().toISOString(),
  };

  state.stockMovements.unshift(newMov);

  // Update associated stock item
  const stockItem = state.stockItems.find((s) => s.id === movement.stockItemId);
  if (stockItem) {
    if (movement.type === "Inward (Goods Receipt)") {
      stockItem.receivedQty += movement.quantity;
      stockItem.currentStock += movement.quantity;
    } else if (movement.type === "Outward (Sale / Issue)") {
      stockItem.issuedQty += movement.quantity;
      stockItem.currentStock = Math.max(0, stockItem.currentStock - movement.quantity);
    } else if (movement.type === "Damage / Loss") {
      stockItem.issuedQty += movement.quantity;
      stockItem.currentStock = Math.max(0, stockItem.currentStock - movement.quantity);
    } else if (movement.type === "Adjustment") {
      stockItem.currentStock += movement.quantity;
    }
    stockItem.valuation = stockItem.currentStock * stockItem.purchasePrice;
    stockItem.lastUpdated = new Date().toISOString();
  }

  saveDemoState(state);
  return newMov;
}

// ----------------------------------------------------
// FINANCIAL TRANSACTIONS & DOUBLE-ENTRY LEDGERS
// ----------------------------------------------------
export function addDemoFinancialTransaction(
  tx: Omit<FinancialTransaction, "id" | "voucherNumber">
): FinancialTransaction {
  const state = getDemoState();
  const nextNum = String(state.transactions.length + 1).padStart(3, "0");
  const newTx: FinancialTransaction = {
    ...tx,
    id: `vch-${Date.now()}`,
    voucherNumber: `DEMO-VCH-2026-${nextNum}`,
  };

  state.transactions.unshift(newTx);
  saveDemoState(state);
  return newTx;
}

// ----------------------------------------------------
// REAL-TIME FINANCIAL REPORT COMPUTATIONS
// ----------------------------------------------------
export interface ComputedFinancials {
  cashBalance: number;
  bankBalance: number;
  totalStockValuation: number;
  totalReceivables: number;
  totalPayables: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalDebits: number;
  totalCredits: number;
  customerLedgers: LedgerSummary[];
  supplierLedgers: LedgerSummary[];
}

export function computeFinancialStatements(state: DemoState): ComputedFinancials {
  let cashBalance = state.openingCashBalance;
  let bankBalance = state.openingBankBalance;

  let totalRevenue = 0;
  let totalExpenses = 0;
  let totalDebits = 0;
  let totalCredits = 0;

  const customerMap: Record<string, { debits: number; credits: number; contact: string }> = {};
  const supplierMap: Record<string, { debits: number; credits: number; contact: string }> = {};

  // Initialize from Quotations (Receivables)
  state.quotations.forEach((q) => {
    totalRevenue += q.grandTotal;
    if (!customerMap[q.customerName]) {
      customerMap[q.customerName] = { debits: 0, credits: 0, contact: q.mobile };
    }
    // Debit customer for invoice
    customerMap[q.customerName].debits += q.grandTotal;
  });

  // Calculate from Transactions
  state.transactions.forEach((tx) => {
    totalDebits += tx.debit;
    totalCredits += tx.credit;

    if (tx.bookType === "Cash Book") {
      if (tx.transactionType === "Receipt (Credit to Cash/Bank)") {
        cashBalance += tx.credit;
      } else {
        cashBalance -= tx.debit;
      }
    } else if (tx.bookType === "Bank Book (UPI/NEFT)") {
      if (tx.transactionType === "Receipt (Credit to Cash/Bank)") {
        bankBalance += tx.credit;
      } else {
        bankBalance -= tx.debit;
      }
    }

    if (tx.partyType === "Expense") {
      totalExpenses += tx.debit;
    }

    if (tx.partyType === "Customer") {
      if (!customerMap[tx.partyName]) {
        customerMap[tx.partyName] = { debits: 0, credits: 0, contact: "Demo Client" };
      }
      customerMap[tx.partyName].credits += tx.credit;
    }

    if (tx.partyType === "Supplier") {
      if (!supplierMap[tx.partyName]) {
        supplierMap[tx.partyName] = { debits: 0, credits: 0, contact: "Demo Supplier" };
      }
      supplierMap[tx.partyName].debits += tx.debit;
    }
  });

  // Total stock valuation
  const totalStockValuation = state.stockItems.reduce((acc, s) => acc + (s.valuation || 0), 0);

  // Compute Customer Ledgers
  const customerLedgers: LedgerSummary[] = Object.keys(customerMap).map((party) => {
    const data = customerMap[party];
    const closing = data.debits - data.credits;
    return {
      partyName: party,
      partyType: "Customer",
      contact: data.contact,
      openingBalance: 0,
      totalDebits: data.debits,
      totalCredits: data.credits,
      closingBalance: closing,
      balanceType: closing > 0 ? "Receivable" : closing < 0 ? "Payable" : "Settled",
    };
  });

  const totalReceivables = customerLedgers.reduce((acc, c) => acc + Math.max(0, c.closingBalance), 0);

  // Default supplier benchmark payable
  const supplierLedgers: LedgerSummary[] = Object.keys(supplierMap).map((party) => {
    const data = supplierMap[party];
    // Baseline purchase benchmark vs payments made
    const benchmarkPurchase = 583200;
    const closing = benchmarkPurchase - data.debits;
    return {
      partyName: party,
      partyType: "Supplier",
      contact: data.contact,
      openingBalance: benchmarkPurchase,
      totalDebits: data.debits,
      totalCredits: 0,
      closingBalance: closing,
      balanceType: closing > 0 ? "Payable" : "Settled",
    };
  });

  const totalPayables = supplierLedgers.reduce((acc, s) => acc + Math.max(0, s.closingBalance), 0);
  const netProfit = totalRevenue - (totalExpenses + totalStockValuation * 0.4);

  return {
    cashBalance,
    bankBalance,
    totalStockValuation,
    totalReceivables,
    totalPayables,
    totalRevenue,
    totalExpenses,
    netProfit,
    totalDebits,
    totalCredits,
    customerLedgers,
    supplierLedgers,
  };
}
