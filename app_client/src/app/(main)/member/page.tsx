import { RoleGuard } from "@/components/provider/RoleGuard";

export default function page() {
  return (
    <RoleGuard allow={["member"]}>
      <div>Member Page</div>
    </RoleGuard>
  );
}
