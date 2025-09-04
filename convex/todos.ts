import { internalMutation, mutation, query } from "./_generated/server";

import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const getTodos = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const todos = await ctx.db
      .query("todo")
      .withIndex("byCreatedBy", (q) =>
        args.userId ? q.eq("createdBy", args.userId) : q
      )
      .collect();

    const userIds = Array.from(
      new Set(
        todos
          .map((todo) => todo.createdBy)
          .filter((id): id is Id<"user"> => id !== undefined)
      )
    );

    const users = await Promise.all(userIds.map((id) => ctx.db.get(id)));

    const usersMap = new Map(userIds.map((id, i) => [id.toString(), users[i]]));

    return todos.map((todo) => {
      const createdBy = usersMap.get(todo.createdBy?.toString() || "");

      return {
        ...todo,
        createdByEmail: createdBy ? createdBy.email : "Unknown",
      };
    });
  },
});

export const createTodo = mutation({
  args: { title: v.string(), user: v.id("user") },
  handler: async (ctx, { title, user }) => {
    const id = await ctx.db.insert("todo", {
      completed: false,
      title,
      createdBy: user,
    });

    const after24Hours = 24 * 60 * 60 * 1000;

    await ctx.scheduler.runAfter(5000, internal.todos.destruct, { todoId: id });
  },
});

export const destruct = internalMutation({
  args: {
    todoId: v.id("todo"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.todoId);
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todo"), completed: v.boolean() },
  handler: async (ctx, { id, completed }) => {
    await ctx.db.patch(id, { completed });
  },
});
