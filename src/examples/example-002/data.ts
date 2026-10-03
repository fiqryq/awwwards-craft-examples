// Content for Sinyal — fictional festival, artists and stages.

export interface Act {
  name: string;
  time: string;
  note?: string;
}

export interface Station {
  id: string;
  freq: number; // MHz
  stage: string;
  english: string;
  blurb: string;
  acts: Act[];
}

export const BAND = { min: 87.5, max: 108.0 } as const;

export const STATIONS: Station[] = [
  {
    id: "dermaga", freq: 89.1, stage: "Dermaga", english: "The pier",
    blurb: "Main stage on the old phinisi berth. Big rooms, live drums, the sea behind the PA.",
    acts: [
      { name: "Kalimaya", time: "Fri 22:40", note: "live" },
      { name: "Ombak Biru Sound System", time: "Sat 23:30" },
      { name: "Haluan b2b Sauh", time: "Sun 21:15" },
      { name: "Low Orbit Choir", time: "Sun 00:20", note: "world premiere" },
    ],
  },
  {
    id: "gudang", freq: 93.7, stage: "Gudang", english: "The warehouse",
    blurb: "A 1920s spice warehouse with one strobe and no daylight until 05:00.",
    acts: [
      { name: "Palka", time: "Fri 01:00" },
      { name: "Arus Bawah", time: "Sat 02:30", note: "4-hour set" },
      { name: "Tide Index", time: "Sat 00:00" },
      { name: "Kabut Dub", time: "Sun 03:10" },
    ],
  },
  {
    id: "menara", freq: 98.3, stage: "Menara", english: "The lighthouse",
    blurb: "Ambient and modular at the foot of the harbour light. Bring a mat, stay till sunrise.",
    acts: [
      { name: "Senja Modular", time: "Fri 19:00" },
      { name: "Mercusuar Ensemble", time: "Sat 05:10", note: "sunrise" },
      { name: "Bisik Radio", time: "Sat 20:20" },
      { name: "Delta Hymn", time: "Sun 18:45" },
    ],
  },
  {
    id: "kapal", freq: 104.5, stage: "Kapal", english: "The boat",
    blurb: "A converted cargo boat, 180 people, three loops of the bay a night. Harbour pass only.",
    acts: [
      { name: "Garam Laut", time: "Fri 23:00" },
      { name: "Anemone FM", time: "Sat 21:00" },
      { name: "Tanjung Loop", time: "Sun 22:30" },
      { name: "Rumpon", time: "Sun 01:30", note: "closing" },
    ],
  },
];

export interface Night {
  label: string;
  date: string;
  acts: { name: string; stage: string; time: string }[];
}

export const NIGHTS: Night[] = [
  {
    label: "Night 01", date: "Fri 14 Nov",
    acts: [
      { name: "Senja Modular", stage: "Menara", time: "19:00" },
      { name: "Kalimaya", stage: "Dermaga", time: "22:40" },
      { name: "Garam Laut", stage: "Kapal", time: "23:00" },
      { name: "Palka", stage: "Gudang", time: "01:00" },
    ],
  },
  {
    label: "Night 02", date: "Sat 15 Nov",
    acts: [
      { name: "Bisik Radio", stage: "Menara", time: "20:20" },
      { name: "Anemone FM", stage: "Kapal", time: "21:00" },
      { name: "Ombak Biru Sound System", stage: "Dermaga", time: "23:30" },
      { name: "Arus Bawah", stage: "Gudang", time: "02:30" },
      { name: "Mercusuar Ensemble", stage: "Menara", time: "05:10" },
    ],
  },
  {
    label: "Night 03", date: "Sun 16 Nov",
    acts: [
      { name: "Delta Hymn", stage: "Menara", time: "18:45" },
      { name: "Haluan b2b Sauh", stage: "Dermaga", time: "21:15" },
      { name: "Tanjung Loop", stage: "Kapal", time: "22:30" },
      { name: "Low Orbit Choir", stage: "Dermaga", time: "00:20" },
      { name: "Kabut Dub", stage: "Gudang", time: "03:10" },
    ],
  },
];

export const PASSES = [
  { name: "Single night", detail: "Any one night · Dermaga, Gudang, Menara", price: "650K", sold: 0.61, phase: "Phase 2" },
  { name: "Full band", detail: "All three nights · every land stage · re-entry", price: "1.45M", sold: 0.78, phase: "Phase 2" },
  { name: "Harbour pass", detail: "Full band + one Kapal sailing of your choice", price: "2.2M", sold: 0.93, phase: "Last 120" },
] as const;

export const MARQUEE = [
  "Kalimaya", "Arus Bawah", "Mercusuar Ensemble", "Ombak Biru Sound System", "Garam Laut",
  "Tide Index", "Senja Modular", "Low Orbit Choir", "Kabut Dub", "Anemone FM",
];

/** Doors open on night one, Jakarta time (UTC+7). */
export const DOORS = "2026-11-14T18:00:00+07:00";
