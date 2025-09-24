"use client";

import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([input, ...todos]);
    setInput("");
  }

  function removeTodo(idx: number) {
    setTodos(todos.filter((_, i) => i !== idx));
  }

  return (
    <main className="mx-auto mt-10 flex min-h-screen max-w-xl flex-col items-center justify-center rounded-lg bg-white/80 p-8 shadow-lg sm:p-16 md:p-24">
      <h1 className="primary-text mb-6 text-4xl font-extrabold tracking-tight drop-shadow-lg">
        Todo App
      </h1>
      <form onSubmit={addTodo} className="mb-6 flex w-full gap-2">
        <input
          className="border-secondary-200 focus:ring-primary-500 flex-1 rounded border px-4 py-2 focus:ring-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button
          type="submit"
          className="primary-bg hover:bg-primary-500/90 rounded px-6 py-2 shadow transition"
        >
          Add
        </button>
      </form>
      <ul className="w-full space-y-2">
        {todos.length === 0 && (
          <li className="secondary-text text-center">No todos yet!</li>
        )}
        {todos.map((todo, idx) => (
          <li
            key={idx}
            className="bg-secondary-50 flex items-center justify-between rounded px-4 py-2 shadow-sm"
          >
            <span>{todo}</span>
            <button
              onClick={() => removeTodo(idx)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
