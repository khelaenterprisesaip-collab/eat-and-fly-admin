export function StaffAccess({ key, permissions, component }: any) {
  if (key === 'Students' && !permissions?.view_student) {
    return <></>;
  }
  if (key === 'Institutes' && !permissions?.view_college) {
    return <></>;
  }
  if (key === 'Applications' && !permissions?.view_application) {
    return <></>;
  }
}
