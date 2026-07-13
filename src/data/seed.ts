import type { Bootstrap } from '../types/models';

/**
 * The single home for all mock/seed data. Components never import this directly —
 * they receive data through the API stub layer + context. Values here are generic
 * placeholders standing in for what an authenticated session + API would supply
 * (they intentionally do NOT reuse the design reference's sample PII).
 */
export const seed: Bootstrap = {
  user: {
    firstName: 'Harrison',
    lastName: 'Rustan',
    initials: 'HR',
    role: 'UT EID · Student',
  },

  permits: [
    {
      id: 'permit-b',
      typeName: 'B Permit',
      classLine: 'Web · B · 26',
      permitNo: '26B0A17342',
      effective: '08/01/2025',
      expires: '07/31/2029',
      issued: '12/15/2025',
      status: 'Active',
      attachedVehicleCount: 1,
    },
  ],

  vehicles: [
    {
      id: 'veh-1',
      make: 'Toyota',
      color: 'Silver',
      plate: 'KJD2091',
      state: 'TEXAS',
      kind: 'car',
      driverRole: 'Driver',
      attachedPermit: 'B permit',
    },
    {
      id: 'veh-2',
      make: 'Giant',
      color: 'Blue',
      plate: 'BX7742019',
      state: 'TEXAS',
      kind: 'bicycle',
      driverRole: 'Driver',
      attachedPermit: null,
    },
  ],

  citations: [
    {
      id: 'cit-1',
      number: '100234567',
      date: '07/08/2026',
      amount: 75,
      status: 'Appeal pending',
    },
    {
      id: 'cit-2',
      number: '100234568',
      date: '03/20/2026',
      amount: 25,
      status: 'Appeal Rejected',
    },
  ],

  appeals: [
    {
      id: 'apl-1',
      citationNumber: '100234567',
      status: 'Under review',
    },
    {
      id: 'apl-2',
      citationNumber: '100234568',
      status: 'Under review',
    },
  ],

  letters: [
    { id: 'ltr-1', subject: 'Permit renewal notice', date: '06/02/2026' },
    { id: 'ltr-2', subject: 'Account verification', date: '01/14/2026' },
  ],

  paymentMethods: [
    { id: 'pm-1', brand: 'Visa', last4: '4242', isDefault: true },
  ],

  vehicleLimit: 3,

  announcement: {
    yearLabel: '2026–27',
    message: 'Permits for the new year are now open.',
    linkLabel: 'Read the announcement ›',
  },

  // Live garage availability (mock). Real UT Austin garage names + codes; the
  // statuses are placeholder tracker data. Closed garages match `garageAlert`.
  garages: [
    { code: 'BRG', name: 'Brazos Garage', status: 'open', detail: 'Spaces available' },
    { code: 'CCG', name: 'Conference Center Garage', status: 'open', detail: 'Spaces available' },
    { code: 'HCG', name: 'Health Center Garage', status: 'limited', detail: 'Nearly full' },
    { code: 'MAG', name: 'Manor Garage', status: 'closed', detail: 'Closed — event setup' },
    { code: 'SAG', name: 'San Antonio Garage', status: 'open', detail: 'Spaces available' },
    { code: 'TRG', name: 'Trinity Garage', status: 'closed', detail: 'Closed — event setup' },
    { code: 'SWG', name: 'Speedway Garage', status: 'limited', detail: 'Nearly full' },
    { code: 'ECG', name: 'East Campus Garage', status: 'open', detail: 'Spaces available' },
    { code: 'GUG', name: 'Guadalupe Garage', status: 'open', detail: 'Spaces available' },
    { code: 'NUG', name: 'Nueces Garage', status: 'limited', detail: 'Nearly full' },
    { code: 'RHG', name: 'Rowling Hall Garage', status: 'open', detail: 'Spaces available' },
    { code: 'SJG', name: 'San Jacinto Garage', status: 'limited', detail: 'Nearly full' },
    { code: 'TSG', name: '27th Street Garage', status: 'open', detail: 'Spaces available' },
  ],

  garageAlert: {
    date: 'Saturday, July 18',
    garageCodes: ['MAG', 'TRG'],
    message:
      'Manor and Trinity garages will be closed all day Sat, July 18 for event setup. Plan to park in nearby garages.',
    linkLabel: 'View closure details',
  },

  // Purchasable options are product catalog data (not PII) — kept verbatim
  // from the reference so the flow is faithful.
  options: {
    permits: [
      {
        id: 'ada',
        category: 'permits',
        name: 'ADA Permit',
        priceMain: 'Varies',
        priceLabel: 'full price',
        fee: '',
        desc: 'Requires a valid state ADA placard on file. Verification may be required.',
        eff: '08/01/2025',
        exp: '07/31/2026',
      },
    ],
    passes: [
      {
        id: 'perks',
        category: 'passes',
        name: 'Parking Perks Pass',
        priceMain: '$20.00',
        priceLabel: 'value on permit',
        fee: '$1.00 / 120 months',
        desc: 'A set fee per entry. Fee varies by garage.',
        eff: '07/12/2026',
        exp: '07/12/2036',
      },
    ],
    daypass: [
      {
        id: 'surface',
        category: 'daypass',
        name: 'Surface Day Pass',
        priceMain: 'By date',
        priceLabel: 'per day',
        fee: '',
        desc: 'Valid for a single day in eligible surface lots. Pick your date at checkout.',
        eff: '—',
        exp: '—',
      },
    ],
  },
};
