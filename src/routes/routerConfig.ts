import type { ComponentType } from "react";

export type RouteConfig = {
  path: string;
  component: ComponentType;
  /** Wrap the route in RequireAuth. */
  protected?: boolean;
};
