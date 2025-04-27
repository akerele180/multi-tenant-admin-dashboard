import { Tenant } from "../utils/models";

export const getTenantSettings = async (tenantId: number): Promise<Tenant> => {
  const res = await fetch("/mockJson/tenants.json");
  if (!res.ok) throw new Error("Failed to load tenants");

  const tenantsData = await res.json();
  const tenant = tenantsData.find((t: Tenant) => t.id === tenantId);

  if (!tenant) throw new Error("Tenant not found");
  return tenant;
};
