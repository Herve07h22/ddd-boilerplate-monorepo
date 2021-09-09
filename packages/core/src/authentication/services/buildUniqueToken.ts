import { uuid } from "uuidv4";

export function buildUniqueToken() {
  return uuid();
}
