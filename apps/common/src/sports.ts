export const Sports = ["AAIPSC", "IPSC", "IDPA", "3-Guns", "USPSA"] as const;
export type Sport = (typeof Sports)[number];
