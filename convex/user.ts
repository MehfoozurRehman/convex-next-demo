import { mutation, query } from "./_generated/server";

import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const getUsers = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("user").collect();
  },
});

export const loginSignUpUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const existing = await ctx.db
      .query("user")
      .withIndex("byEmail", (q) => q.eq("email", email))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { online: true });
      return existing._id;
    }

    const id = await ctx.db.insert("user", { email, online: true });

    return id;
  },
});

export const logoutUser = mutation({
  args: { id: v.id("user") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { online: false });
  },
});
