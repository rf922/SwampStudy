import "express-session";

/* this file is for extending sessionData so we caan incude our own fields in our sessin cookie */

declare module "express-session" {
  interface SessionData {
    // fields for cookie go here note '?' to mark them as optional
    userId?: number;
    ip?: string;
  }
}
