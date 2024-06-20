export default function getUserRole(user) {
  if (!user) return "no-role";
  return user.role;
}
