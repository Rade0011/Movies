import { Role } from "src/helpers/constans";
import { Permissions } from './permission.enum';

export const RolePermissions = {
  [Role.User]: [Permissions.VIEW_MOVIES],
  [Role.Admin]: [
    Permissions.VIEW_MOVIES,
    Permissions.CREATE_MOVIES,
    Permissions.CREATE_GENRE,
    Permissions.CREATE_DIRECTOR,
    Permissions.CREATE_GENRE,
  ],
};