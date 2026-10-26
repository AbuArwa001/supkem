export * from "./pillars/types";
import { StrategicPillar } from "./pillars/types";
import { programmesEn } from "./pillars/en/programmes";
import { institutionalStrengtheningEn } from "./pillars/en/institutionalStrengthening";
import { partnershipsEn } from "./pillars/en/partnerships";
import { crossCuttingEn } from "./pillars/en/crossCutting";

import { programmesAr } from "./pillars/ar/programmes";
import { institutionalStrengtheningAr } from "./pillars/ar/institutionalStrengthening";
import { partnershipsAr } from "./pillars/ar/partnerships";
import { crossCuttingAr } from "./pillars/ar/crossCutting";

export const STRATEGIC_PILLARS_EN: Record<string, StrategicPillar> = {
    "programmes": programmesEn,
    "institutional-strengthening": institutionalStrengtheningEn,
    "partnership-and-collaboration": partnershipsEn,
    "cross-cutting-areas": crossCuttingEn,
};

export const STRATEGIC_PILLARS_AR: Record<string, StrategicPillar> = {
    "programmes": programmesAr,
    "institutional-strengthening": institutionalStrengtheningAr,
    "partnership-and-collaboration": partnershipsAr,
    "cross-cutting-areas": crossCuttingAr,
};

export const getStrategicPillars = (locale: string) => {
    return locale === "ar" ? STRATEGIC_PILLARS_AR : STRATEGIC_PILLARS_EN;
};
