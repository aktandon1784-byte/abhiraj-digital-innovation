import { jsPDF } from "jspdf";
import type { QuotationRecord, StockItem, StockMovement, DemoState } from "./types";
import type { ComputedFinancials } from "./demo-storage";

function formatCurrency(val: number): string {
  return "Rs. " + Math.abs(val || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "-";
  const parts = dateStr.split("T")[0].split("-");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return dateStr;
}

// ----------------------------------------------------
// 1. OFFICIAL QUOTATION PDF GENERATOR
// ----------------------------------------------------
export function downloadQuotationPdf(quotation: QuotationRecord): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // 1. DEMO WATERMARK / SAMPLE WARNING BANNER
  doc.setFillColor(254, 242, 242);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setTextColor(220, 38, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(
    "*** DEMO MODE — SAMPLE DATA ONLY — NOT ACTUAL BUSINESS RECORDS ***",
    pageWidth / 2,
    y + 4.8,
    { align: "center" }
  );
  y += 9;

  // 2. HEADER BANNER
  doc.setFillColor(11, 59, 96); // Kumar Solar Navy #0B3B60
  doc.rect(margin, y, contentWidth, 26, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("KUMAR SOLAR PANEL", margin + 6, y + 8.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Complete Solar Panel Solutions | Sampurna Solar Samadhan", margin + 6, y + 14.5);
  doc.text("Baloda Bazar - Bhatapara, Chhattisgarh • Approved EPC Standards", margin + 6, y + 20.5);

  doc.setFontSize(8);
  doc.text("Ph: +91 98260 00000 (Demo)", pageWidth - margin - 6, y + 8.5, { align: "right" });
  doc.text("Email: info@kumarsolar.demo", pageWidth - margin - 6, y + 14.5, { align: "right" });
  doc.text("GSTIN: 22AAAAK0000A1Z5 (Demo)", pageWidth - margin - 6, y + 20.5, { align: "right" });
  y += 29;

  // 3. QUOTATION TITLE BAR
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 10, 1, 1, "FD");

  doc.setTextColor(11, 59, 96);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`OFFICIAL ESTIMATE & QUOTATION: ${quotation.quotationNumber}`, margin + 4, y + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Date: ${formatDate(quotation.createdAt)}  |  Valid Until: ${formatDate(quotation.validUntil)}`, pageWidth - margin - 4, y + 6.5, { align: "right" });
  y += 13;

  // 4. CUSTOMER & SYSTEM SPECIFICATIONS
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 1, 1, "D");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("CUSTOMER DETAILS:", margin + 4, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${quotation.customerName}`, margin + 4, y + 10.5);
  doc.text(`Mobile: ${quotation.mobile}`, margin + 4, y + 15.5);
  doc.text(`Address: ${quotation.installationAddress || "Chhattisgarh, India"}`, margin + 4, y + 20.5);

  const rightColX = margin + 98;
  doc.setFont("helvetica", "bold");
  doc.text("PROJECT SCOPE:", rightColX, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.text(`System Capacity: ${quotation.systemCapacity || "3 kW"}`, rightColX, y + 10.5);
  doc.text(`Project Type: ${quotation.projectType} Rooftop`, rightColX, y + 15.5);
  doc.text(
    `Govt Subsidy: ${quotation.subsidyEligible ? `Eligible (Est. ${formatCurrency(quotation.subsidyAmount)})` : "Not Applicable"}`,
    rightColX,
    y + 20.5
  );
  y += 27;

  // 5. LINE ITEMS TABLE
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("#", margin + 2, y + 4.8);
  doc.text("Item Description & Specifications", margin + 9, y + 4.8);
  doc.text("Qty", margin + 90, y + 4.8, { align: "center" });
  doc.text("Rate (Rs.)", margin + 115, y + 4.8, { align: "right" });
  doc.text("Disc%", margin + 130, y + 4.8, { align: "right" });
  doc.text("GST%", margin + 144, y + 4.8, { align: "right" });
  doc.text("Total (Rs.)", pageWidth - margin - 3, y + 4.8, { align: "right" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);

  (quotation.items || []).forEach((item, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 8, "F");
    }

    doc.setTextColor(30, 41, 59);
    doc.text(String(idx + 1), margin + 2, y + 5.2);

    const desc = item.description.length > 50 ? item.description.substring(0, 48) + "..." : item.description;
    doc.text(desc, margin + 9, y + 5.2);
    doc.text(`${item.quantity} ${item.unit}`, margin + 90, y + 5.2, { align: "center" });
    doc.text(item.unitPrice.toFixed(2), margin + 115, y + 5.2, { align: "right" });
    doc.text(`${item.discountPercent || 0}%`, margin + 130, y + 5.2, { align: "right" });
    doc.text(`${item.gstRate}%`, margin + 144, y + 5.2, { align: "right" });
    doc.text(item.totalAmount.toFixed(2), pageWidth - margin - 3, y + 5.2, { align: "right" });

    y += 8;
  });

  y += 4;

  // 6. TOTALS & COMMERCIAL BREAKDOWN
  const totalsBoxX = margin + 95;
  const totalsWidth = contentWidth - 95;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(totalsBoxX, y, totalsWidth, 42, 1, 1, "FD");

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  const drawRow = (label: string, value: string, rowY: number, isBold: boolean = false) => {
    if (isBold) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 59, 96);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105);
    }
    doc.text(label, totalsBoxX + 4, rowY);
    doc.text(value, pageWidth - margin - 4, rowY, { align: "right" });
  };

  drawRow("Taxable Subtotal:", formatCurrency(quotation.subtotalTaxable), y + 5.5);
  drawRow(`CGST (${(quotation.totalGst / 2).toFixed(2)}):`, formatCurrency(quotation.totalCgst), y + 10.5);
  drawRow(`SGST (${(quotation.totalGst / 2).toFixed(2)}):`, formatCurrency(quotation.totalSgst), y + 15.5);
  drawRow("Installation & Commissioning:", formatCurrency(quotation.installationCharges), y + 20.5);
  drawRow("Freight & Transport:", formatCurrency(quotation.transportCharges), y + 25.5);
  if (quotation.discountAmount > 0) {
    drawRow("Special Discount Applied:", `- ${formatCurrency(quotation.discountAmount)}`, y + 30.5);
  }

  // Grand Total highlight bar
  doc.setFillColor(11, 59, 96);
  doc.rect(totalsBoxX, y + 34, totalsWidth, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("GRAND TOTAL (INC. GST):", totalsBoxX + 4, y + 39.5);
  doc.text(formatCurrency(quotation.grandTotal), pageWidth - margin - 4, y + 39.5, { align: "right" });

  // Left terms box
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, 90, 42, 1, 1, "D");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("KEY TERMS & EPC WARRANTIES:", margin + 4, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text("• Solar Panels: 25-Year Performance Output Warranty (ALMM Tier-1).", margin + 4, y + 11);
  doc.text("• Solar Inverters: 5-Year Comprehensive Replacement Warranty.", margin + 4, y + 16);
  doc.text("• Mounting Structures: 10-Year Anti-Rust Hot-Dip Galvanized guarantee.", margin + 4, y + 21);
  doc.text("• Discom Net-Metering: Full documentation and liaisoning supported.", margin + 4, y + 26);
  doc.text("• Workmanship: 5-Year on-site maintenance & quarterly health checks.", margin + 4, y + 31);
  doc.text("• Bank Transfers: Payable to 'Kumar Solar Panel (Demo Sandbox)'.", margin + 4, y + 36);

  y += 48;

  // 7. SIGNATURE SECTION
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Customer Acceptance Signature:", margin + 6, y + 14);
  doc.line(margin + 6, y + 12, margin + 65, y + 12);

  doc.text("For KUMAR SOLAR PANEL", pageWidth - margin - 55, y + 5);
  doc.setFont("helvetica", "bold");
  doc.text("Authorised Signatory", pageWidth - margin - 55, y + 14);
  doc.line(pageWidth - margin - 55, y + 12, pageWidth - margin - 5, y + 12);

  // FOOTER
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Generated from Kumar Solar Panel Management PWA (Abhiraj Digital Innovation Demo Suite).",
    pageWidth / 2,
    pageHeight - 6,
    { align: "center" }
  );

  doc.save(`${quotation.quotationNumber}.pdf`);
}

// ----------------------------------------------------
// 2. STOCK VALUATION & MOVEMENT REGISTER PDF
// ----------------------------------------------------
export function downloadStockReportPdf(stockItems: StockItem[], movements: StockMovement[]): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Watermark Banner
  doc.setFillColor(254, 242, 242);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setTextColor(220, 38, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(
    "*** DEMO MODE — SAMPLE STOCK DATA ONLY — NOT ACTUAL INVENTORY ***",
    pageWidth / 2,
    y + 4.8,
    { align: "center" }
  );
  y += 9;

  // Header Banner
  doc.setFillColor(11, 59, 96);
  doc.rect(margin, y, contentWidth, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("KUMAR SOLAR PANEL — STOCK VALUATION REGISTER", margin + 6, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Warehouse: Main Central Hub (Baloda Bazar)  |  As of: ${formatDate(new Date().toISOString())}`, margin + 6, y + 14);

  const totalValuation = stockItems.reduce((acc, s) => acc + (s.valuation || 0), 0);
  const totalQty = stockItems.reduce((acc, s) => acc + s.currentStock, 0);

  doc.text(`Total SKU Items: ${stockItems.length}  |  Total Units: ${totalQty}`, pageWidth - margin - 6, y + 8, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.text(`Aggregate Valuation: ${formatCurrency(totalValuation)}`, pageWidth - margin - 6, y + 14, { align: "right" });
  y += 26;

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);

  doc.text("SKU", margin + 2, y + 4.8);
  doc.text("Product Description", margin + 28, y + 4.8);
  doc.text("Category", margin + 92, y + 4.8);
  doc.text("Bal Qty", margin + 120, y + 4.8, { align: "center" });
  doc.text("Unit Cost", margin + 144, y + 4.8, { align: "right" });
  doc.text("Valuation (Rs.)", pageWidth - margin - 3, y + 4.8, { align: "right" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);

  stockItems.forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 7, "F");
    }

    doc.setTextColor(30, 41, 59);
    doc.text(item.sku, margin + 2, y + 4.8);

    const desc = item.name.length > 40 ? item.name.substring(0, 38) + "..." : item.name;
    doc.text(desc, margin + 28, y + 4.8);
    doc.text(item.category, margin + 92, y + 4.8);
    doc.text(`${item.currentStock} ${item.unit}`, margin + 120, y + 4.8, { align: "center" });
    doc.text(formatCurrency(item.purchasePrice), margin + 144, y + 4.8, { align: "right" });
    doc.text(formatCurrency(item.valuation), pageWidth - margin - 3, y + 4.8, { align: "right" });

    y += 7;
  });

  y += 5;

  // Stock Movements Header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setTextColor(11, 59, 96);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("RECENT STOCK MOVEMENT AUDIT TRAIL:", margin + 4, y + 4.8);
  y += 9;

  movements.slice(0, 8).forEach((mov, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y, contentWidth, 6, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);

    doc.text(formatDate(mov.createdAt), margin + 2, y + 4.2);
    doc.text(mov.movementNumber, margin + 24, y + 4.2);
    doc.text(mov.type, margin + 55, y + 4.2);
    doc.text(`${mov.quantity} ${mov.unit}`, margin + 105, y + 4.2);
    doc.text(mov.partyName.substring(0, 32), margin + 125, y + 4.2);

    y += 6;
  });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Kumar Solar Panel Management System • Stock Register Valuation Export",
    pageWidth / 2,
    pageHeight - 6,
    { align: "center" }
  );

  doc.save("Kumar_Solar_Stock_Valuation_Report.pdf");
}

// ----------------------------------------------------
// 3. CA / FINANCIAL STATEMENTS PDF
// ----------------------------------------------------
export function downloadFinancialReportPdf(
  reportType: "Cash Book" | "Bank Book" | "Trial Balance" | "Profit & Loss",
  state: DemoState,
  computed: ComputedFinancials
): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Watermark Banner
  doc.setFillColor(254, 242, 242);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setTextColor(220, 38, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(
    "*** DEMO MODE — SAMPLE ACCOUNTING DATA ONLY — NOT ACTUAL FINANCIAL BOOKS ***",
    pageWidth / 2,
    y + 4.8,
    { align: "center" }
  );
  y += 9;

  // Header Banner
  doc.setFillColor(11, 59, 96);
  doc.rect(margin, y, contentWidth, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`KUMAR SOLAR PANEL — ${reportType.toUpperCase()}`, margin + 6, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Financial Year: 2026-27  |  Period: October 2026  |  Accounting Standard: Double-Entry", margin + 6, y + 14);

  doc.text(`Generated: ${formatDate(new Date().toISOString())}`, pageWidth - margin - 6, y + 8, { align: "right" });
  y += 26;

  // Summary Cards Bar
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 12, 1, 1, "FD");

  doc.setFontSize(8);
  doc.setTextColor(11, 59, 96);
  doc.setFont("helvetica", "bold");
  doc.text(`Cash Balance: ${formatCurrency(computed.cashBalance)}`, margin + 6, y + 7.5);
  doc.text(`Bank Balance: ${formatCurrency(computed.bankBalance)}`, margin + 55, y + 7.5);
  doc.text(`Receivables: ${formatCurrency(computed.totalReceivables)}`, margin + 105, y + 7.5);
  doc.text(`Payables: ${formatCurrency(computed.totalPayables)}`, margin + 145, y + 7.5);
  y += 16;

  // Transaction Ledger Table
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);

  doc.text("Date", margin + 2, y + 4.8);
  doc.text("Voucher #", margin + 22, y + 4.8);
  doc.text("Particulars / Account Head", margin + 55, y + 4.8);
  doc.text("Book Type", margin + 115, y + 4.8);
  doc.text("Debit (Rs.)", margin + 145, y + 4.8, { align: "right" });
  doc.text("Credit (Rs.)", pageWidth - margin - 3, y + 4.8, { align: "right" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);

  const filteredTx = state.transactions.filter((t) => {
    if (reportType === "Cash Book") return t.bookType === "Cash Book";
    if (reportType === "Bank Book") return t.bookType === "Bank Book (UPI/NEFT)";
    return true;
  });

  filteredTx.forEach((tx, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 7, "F");
    }

    doc.setTextColor(30, 41, 59);
    doc.text(formatDate(tx.date), margin + 2, y + 4.8);
    doc.text(tx.voucherNumber, margin + 22, y + 4.8);
    doc.text(`${tx.accountHead} - ${tx.partyName}`.substring(0, 36), margin + 55, y + 4.8);
    doc.text(tx.bookType, margin + 115, y + 4.8);
    doc.text(tx.debit > 0 ? tx.debit.toFixed(2) : "-", margin + 145, y + 4.8, { align: "right" });
    doc.text(tx.credit > 0 ? tx.credit.toFixed(2) : "-", pageWidth - margin - 3, y + 4.8, { align: "right" });

    y += 7;
  });

  y += 6;

  // Closing Balance bar
  doc.setFillColor(11, 59, 96);
  doc.rect(margin, y, contentWidth, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);

  const totalD = filteredTx.reduce((acc, t) => acc + t.debit, 0);
  const totalC = filteredTx.reduce((acc, t) => acc + t.credit, 0);

  doc.text("TOTAL TRANSACTIONS:", margin + 4, y + 5.5);
  doc.text(`Total Debit: ${formatCurrency(totalD)}`, margin + 115, y + 5.5);
  doc.text(`Total Credit: ${formatCurrency(totalC)}`, pageWidth - margin - 4, y + 5.5, { align: "right" });

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Kumar Solar Panel Management System • Chartered Accountant Financial Ledger Export",
    pageWidth / 2,
    pageHeight - 6,
    { align: "center" }
  );

  doc.save(`Kumar_Solar_${reportType.replace(/\s+/g, "_")}_Statement.pdf`);
}
