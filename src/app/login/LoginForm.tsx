"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth/actions";
import type { LoginState } from "@/lib/auth/actions";

type Props = {
  from: string;
};

export function LoginForm({ from }: Props) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    null
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-xl font-bold text-zinc-950">
            W
          </span>
          <h1 className="mt-4 text-xl font-semibold text-zinc-100">
            Wali Productions
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Admin Portal</p>
        </div>

        <form
          action={action}
          className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <input type="hidden" name="from" value={from} />

          {state?.error ? (
            <div
              role="alert"
              className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3"
            >
              <p className="text-sm text-red-400">{state.error}</p>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              disabled={pending}
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={pending}
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
