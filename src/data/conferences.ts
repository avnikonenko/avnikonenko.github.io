import type { ConferenceItem } from "./types";

export const conferences: ConferenceItem[] = [
  {
    event: "CEEC Chemoinformatics",
    location: "Prague, Czech Republic",
    year: 2025,
    title: "[ADD OR VERIFY: exact StreaMD talk or poster title]",
    type: "[ADD OR VERIFY: talk/poster]",
    links: [
      {
        label: "[ADD OR VERIFY: conference page]",
        href: "[ADD OR VERIFY: CEEC link]",
        kind: "profile",
      },
      {
        label: "[ADD OR VERIFY: slides or poster]",
        href: "[ADD OR VERIFY: StreaMD presentation link]",
        kind: "slides",
      },
    ],
    note: "StreaMD-related presentation; exact title, date, format, and links require confirmation.",
  },
  {
    event: "RDKit User Group Meeting",
    location: "Prague, Czech Republic",
    year: 2025,
    title:
      "[ADD OR VERIFY: exact explainable docking or de novo molecular design title]",
    type: "[ADD OR VERIFY: talk/poster]",
    links: [
      {
        label: "[ADD OR VERIFY: conference page]",
        href: "[ADD OR VERIFY: RDKit UGM link]",
        kind: "profile",
      },
      {
        label: "[ADD OR VERIFY: slides]",
        href: "[ADD OR VERIFY: RDKit presentation link]",
        kind: "slides",
      },
    ],
    note: "Related to explainable docking or de novo molecular design; exact public wording requires confirmation.",
  },
];
