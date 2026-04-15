"use client";
import React from "react";

export function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function Field({
  label, required, full, hint, children,
}: { label: string; required?: boolean; full?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${full ? "md:col-span-2" : ""}`}>
      <span className="font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const textareaCls = inputCls + " min-h-[100px] resize-y";

export function RadioGroup<T extends string>({
  name, value, onChange, options, columns = 1,
}: {
  name: string;
  value: T | "";
  onChange: (v: T) => void;
  options: readonly T[];
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-2 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {options.map((o) => (
        <label key={o} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm hover:bg-slate-100">
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onChange(o)}
            className="h-4 w-4 accent-blue-600"
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}
