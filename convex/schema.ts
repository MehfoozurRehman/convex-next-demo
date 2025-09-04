import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    email: v.string(),
    online: v.boolean(),
  }).index("byEmail", ["email"]),
  todo: defineTable({
    title: v.string(),
    completed: v.boolean(),
    createdBy: v.optional(v.id("user")),
    lastUpdatedBy: v.optional(v.id("user")),
  }).index("byCreatedBy", ["createdBy"]),
});
