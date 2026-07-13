export type VehicleKind = 'car' | 'bicycle' | 'motorcycle';
export type OptionCategory = 'permits' | 'passes' | 'daypass';

export interface User {
  firstName: string;
  lastName: string;
  /** Two-letter initials derived from the name, e.g. "JL". */
  initials: string;
  /** Session/role line, e.g. "UT EID · Student". */
  role: string;
}

export interface PaymentMethod {
  id: string;
  brand: string; // e.g. "Visa"
  last4: string; // e.g. "4242"
  isDefault: boolean;
}

export interface Permit {
  id: string;
  /** Display name, e.g. "B Permit". */
  typeName: string;
  /** Secondary class line, e.g. "Web · B · 26". */
  classLine: string;
  permitNo: string;
  effective: string; // MM/DD/YYYY
  expires: string;
  issued: string;
  status: 'Active' | 'Expired' | 'Pending';
  attachedVehicleCount: number;
}

export interface Vehicle {
  id: string;
  make: string;
  color: string;
  plate: string;
  state: string; // e.g. "TEXAS"
  kind: VehicleKind;
  driverRole: string; // e.g. "Driver"
  /** Name of the permit this vehicle is attached to, or null. */
  attachedPermit: string | null;
}

export interface Citation {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: string;
}

export interface Appeal {
  id: string;
  citationNumber: string;
  status: string;
}

export interface Letter {
  id: string;
  subject: string;
  date: string;
}

export interface PurchaseOption {
  id: string;
  category: OptionCategory;
  name: string;
  priceMain: string;
  priceLabel: string;
  /** Fee chip text, or empty string for no fee. */
  fee: string;
  desc: string;
  eff: string;
  exp: string;
}

export interface PurchaseOptions {
  permits: PurchaseOption[];
  passes: PurchaseOption[];
  daypass: PurchaseOption[];
}

export type GarageStatus = 'open' | 'limited' | 'closed';

export interface Garage {
  /** Short code, e.g. "TRG". */
  code: string;
  /** Full name, e.g. "Trinity Garage". */
  name: string;
  status: GarageStatus;
  /** Short status detail, e.g. "Spaces available" or "Closed — event". */
  detail: string;
}

/** A campus-wide notice about upcoming garage closures. */
export interface GarageAlert {
  /** Human-readable date, e.g. "Saturday, July 18". */
  date: string;
  /** Codes of the affected garages, e.g. ["MAG", "TRG"]. */
  garageCodes: string[];
  message: string;
  linkLabel: string;
}

/** The full server bootstrap payload. */
export interface Bootstrap {
  user: User;
  permits: Permit[];
  vehicles: Vehicle[];
  citations: Citation[];
  appeals: Appeal[];
  letters: Letter[];
  paymentMethods: PaymentMethod[];
  options: PurchaseOptions;
  /** Live campus garage availability (mock tracker data). */
  garages: Garage[];
  /** Active garage-closure notice, or null when none. */
  garageAlert: GarageAlert | null;
  /** Max vehicles the user may register. */
  vehicleLimit: number;
  announcement: {
    yearLabel: string; // e.g. "2026–27"
    message: string;
    linkLabel: string;
  };
}
