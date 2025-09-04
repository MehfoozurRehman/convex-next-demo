"use client";

import { useMutation, useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Todo } from "./todo";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);

  const [email, setEmail] = useState("");

  const loginSignUpUser = useMutation(api.user.loginSignUpUser);

  const logoutUser = useMutation(api.user.logoutUser);

  if (!user) {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const id = await loginSignUpUser({ email });
            setUser(id);
          }}
        >
          <input
            type="email"
            className="border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Login/Signup</Button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={async () => {
          if (user) {
            await logoutUser({ id: user as Id<"user"> });
            setUser(null);
          }
        }}
      >
        Logout
      </Button>
      <Presence />
      <Todo user={user as Id<"user">} />
    </>
  );
}

function Presence() {
  const users = useQuery(api.user.getUsers);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user._id.toString()}>
            {user.email} - {user.online ? "online" : "offline"}
          </li>
        ))}
      </ul>
    </div>
  );
}
