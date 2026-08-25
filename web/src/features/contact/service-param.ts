import type { ServiceId } from "./types";

const serviceIds = new Set<ServiceId>([
  "housekeeping",
  "decoration",
  "notary",
  "interpreting",
  "general",
]);

export function getRequestedService(
  value: string | string[] | undefined,
): ServiceId {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && serviceIds.has(candidate as ServiceId)
    ? (candidate as ServiceId)
    : "general";
}
