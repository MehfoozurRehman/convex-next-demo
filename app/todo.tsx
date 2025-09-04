"use client";

import { useMutation, useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function Todo({ user }: { user: Id<"user"> }) {
  const todos = useQuery(api.todos.getTodos, { userId: user });

  const createTodo = useMutation(api.todos.createTodo);

  const updateTodo = useMutation(api.todos.updateTodo);

  const [todo, setTodo] = useState("");

  return (
    <div>
      <div>todos</div>
      <ul>
        {todos?.length === 0 ? (
          <li>No todos</li>
        ) : (
          todos?.map((todo) => (
            <li key={todo._id.toString()}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={async (e) => {
                    await updateTodo({
                      id: todo._id,
                      completed: e.target.checked,
                    });
                  }}
                />
                {todo.title} - {todo.completed ? "done" : "not done"} (by{" "}
                {todo.createdByEmail})
              </label>
            </li>
          ))
        )}
      </ul>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await createTodo({
            title: todo,
            user,
          });

          setTodo("");
          console.log("done");
        }}
      >
        <input
          type="text"
          className="border"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button type="submit">Add Todo</Button>
      </form>
    </div>
  );
}
