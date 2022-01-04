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

export function toNumber(role: Role) {
  return NRole[role];
}
