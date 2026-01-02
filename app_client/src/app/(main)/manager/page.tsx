import { RoleGuard } from "@/components/provider/RoleGuard";

export default function page() {
  return (
    <RoleGuard allow={["manager"]}>
      <div>Manager Page</div>
    </RoleGuard>
  );
}
