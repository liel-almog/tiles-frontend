export enum Role {
  Admin = "Admin",
  Moderator = "Moderator",
  Editor = "Editor",
  Viewer = "Viewer",
}

enum NRole {
  Admin,
  Moderator,
  Editor,
  Viewer,
}

export function roleToNumber(role: Role) {
  return NRole[role];
}
