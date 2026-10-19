// Domain Types for Kumar Solar Panel Management PWA (Abhiraj Digital Innovation)

export type ProductCategory =
  | 'Solar Panels'
  | 'Inverters'
  | 'Batteries'
  | 'Structures'
  | 'Accessories'
  | 'Solar Water Pumps'
  | 'Solar Fencing';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  model: string;
  description: string;
  wattage?: number;
  capacity?: string;
  efficiency?: number;
  warrantyYears: number;
  purchasePrice: number;
  sellingPrice: number;
  gstRate: number; // 5, 12, or 18%
  minStockThreshold: number;
  currentStock: number;
  unit: string;
  image?: string;
  dcrCompliant?: boolean;
  certifications?: string[];
  isActive: boolean;
}

export interface CustomerInquiry {
  id: string;
  inquiryNumber: string; // e.g. DEMO-INQ-2026-001
  customerName: string;
  mobile: string;
  whatsappNumber?: string;
  email?: string;
  district: string;
  state: string;
  customerType: 'Residential' | 'Commercial' | 'Agricultural' | 'Industrial';
  projectType: 'On-grid' | 'Off-grid' | 'Hybrid' | 'Solar Pump';
  systemCapacity: string; // e.g. "3 kW"
  roofAreaSqFt?: number;
  notes?: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Converted' | 'Closed';
  createdAt: string;
}

export interface QuotationLineItem {
  id: string;
  productId: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discountPercent: number;
  gstRate: number; // 5, 12, 18
  taxableAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  totalAmount: number;
}

export interface QuotationRecord {
  id: string;
  quotationNumber: string; // e.g. DEMO-QUO-2026-001
  inquiryId?: string;
  customerName: string;
  mobile: string;
  whatsappNumber?: string;
  email?: string;
  installationAddress: string;
  district: string;
  state: string;
  systemCapacity: string;
  projectType: 'On-grid' | 'Off-grid' | 'Hybrid' | 'Solar Pump';
  subsidyEligible: boolean;
  subsidyAmount: number;
  items: QuotationLineItem[];
  subtotalTaxable: number;
  totalCgst: number;
  totalSgst: number;
  totalGst: number;
  installationCharges: number;
  transportCharges: number;
  discountAmount: number;
  grandTotal: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Converted to Order';
  validUntil: string;
  createdAt: string;
  notes?: string;
}

export interface StockItem {
  id: string;
  productId: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  unit: string;
  openingStock: number;
  receivedQty: number;
  issuedQty: number;
  currentStock: number;
  minStockThreshold: number;
  purchasePrice: number;
  sellingPrice: number;
  valuation: number;
  lastUpdated: string;
}

export interface StockMovement {
  id: string;
  movementNumber: string; // e.g. DEMO-MOV-001
  stockItemId: string;
  productName: string;
  type: 'Inward (Goods Receipt)' | 'Outward (Sale / Issue)' | 'Adjustment' | 'Damage / Loss';
  quantity: number;
  unit: string;
  unitPrice: number;
  totalAmount: number;
  referenceType: 'Purchase Order' | 'Quotation Order' | 'Site Delivery' | 'Stock Correction';
  referenceNumber: string;
  partyName: string;
  notes?: string;
  createdAt: string;
}

export interface FinancialTransaction {
  id: string;
  voucherNumber: string; // e.g. DEMO-VCH-2026-001
  date: string;
  bookType: 'Cash Book' | 'Bank Book (UPI/NEFT)' | 'General Journal';
  transactionType: 'Receipt (Credit to Cash/Bank)' | 'Payment (Debit from Cash/Bank)';
  accountHead: string; // e.g. "Solar Sales", "Equipment Purchase", "Freight Charges", "Office Expense"
  partyType: 'Customer' | 'Supplier' | 'Internal' | 'Expense';
  partyName: string;
  referenceDoc?: string;
  debit: number;
  credit: number;
  narration: string;
}

export interface LedgerSummary {
  partyName: string;
  partyType: 'Customer' | 'Supplier';
  contact: string;
  openingBalance: number;
  totalDebits: number;
  totalCredits: number;
  closingBalance: number;
  balanceType: 'Receivable' | 'Payable' | 'Settled';
}

export interface DemoState {
  products: ProductItem[];
  inquiries: CustomerInquiry[];
  quotations: QuotationRecord[];
  stockItems: StockItem[];
  stockMovements: StockMovement[];
  transactions: FinancialTransaction[];
  openingCashBalance: number;
  openingBankBalance: number;
  lastResetAt: string;
}
