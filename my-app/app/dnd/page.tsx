"use client";

import { useState, useRef } from "react";

// ─── Tyyppi ───────────────────────────────────────────────────────────────────

type NPC = {
  id: number;
  name: string;
  maxHp: number;
  currentHp: number;
};

// ─── NPCForm ──────────────────────────────────────────────────────────────────

type NPCFormProps = {
  onAdd: (name: string, maxHp: number) => void;
};

function NPCForm({ onAdd }: NPCFormProps) {
  const [name, setName] = useState("");
  const [maxHp, setMaxHp] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hp = parseInt(maxHp, 10);
    if (!name.trim() || !hp || hp <= 0) return;
    onAdd(name.trim(), hp);
    setName("");
    setMaxHp("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-700/50 rounded-2xl p-6 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="NPC:n nimi"
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
      />
      <input
        type="number"
        value={maxHp}
        onChange={(e) => setMaxHp(e.target.value)}
        placeholder="Max HP"
        min={1}
        className="w-full sm:w-28 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
      >
        Lisää NPC
      </button>
    </form>
  );
}

// ─── NPCCard ──────────────────────────────────────────────────────────────────

type NPCCardProps = {
  npc: NPC;
  onDamage: (id: number, amount: number) => void;
  onRemove: (id: number) => void;
};

function hpBarColor(current: number, max: number): string {
  const pct = current / max;
  if (pct > 0.5) return "bg-green-500";
  if (pct > 0.25) return "bg-yellow-500";
  return "bg-red-500";
}

function NPCCard({ npc, onDamage, onRemove }: NPCCardProps) {
  const [damage, setDamage] = useState("");
  const isDead = npc.currentHp <= 0;
  const hpPercent = Math.max(0, (npc.currentHp / npc.maxHp) * 100);

  function handleDamage() {
    const amt = parseInt(damage, 10);
    if (!amt || amt <= 0) return;
    onDamage(npc.id, amt);
    setDamage("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleDamage();
  }

  return (
    <div
      className={`bg-gray-900 border rounded-2xl p-5 flex flex-col gap-4 ${
        isDead ? "border-red-900/60 opacity-60" : "border-gray-700/50"
      }`}
    >
      {/* Nimi ja tila */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-bold text-base leading-tight">{npc.name}</h3>
        {isDead && (
          <span className="text-red-400 text-xs font-semibold uppercase tracking-wide shrink-0">
            KO&apos;d
          </span>
        )}
      </div>

      {/* HP-luvut */}
      <div className="flex items-baseline gap-1">
        <span
          className={`text-3xl font-bold tabular-nums ${
            isDead ? "text-red-400" : "text-white"
          }`}
        >
          {npc.currentHp}
        </span>
        <span className="text-gray-500 text-sm">/ {npc.maxHp} HP</span>
      </div>

      {/* HP-palkki */}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${hpBarColor(npc.currentHp, npc.maxHp)}`}
          style={{ width: `${hpPercent}%` }}
        />
      </div>

      {/* Vahinko-toiminnot */}
      <div className="flex gap-2">
        <input
          type="number"
          value={damage}
          onChange={(e) => setDamage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Vahinko"
          min={1}
          disabled={isDead}
          className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 disabled:opacity-40"
        />
        <button
          onClick={handleDamage}
          disabled={isDead}
          className="flex-1 bg-gray-800 hover:bg-red-900/60 border border-gray-700 hover:border-red-700/60 text-gray-300 hover:text-red-300 text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Vähennä HP
        </button>
      </div>

      {/* Poista */}
      <button
        onClick={() => onRemove(npc.id)}
        className="text-gray-600 hover:text-red-400 text-xs transition-colors text-left"
      >
        Poista NPC
      </button>
    </div>
  );
}

// ─── NPCList ──────────────────────────────────────────────────────────────────

type NPCListProps = {
  npcs: NPC[];
  onDamage: (id: number, amount: number) => void;
  onRemove: (id: number) => void;
};

function NPCList({ npcs, onDamage, onRemove }: NPCListProps) {
  if (npcs.length === 0) {
    return (
      <p className="text-gray-600 text-sm text-center py-16">
        Ei NPC:itä vielä — lisää ensimmäinen lomakkeella.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {npcs.map((npc) => (
        <NPCCard key={npc.id} npc={npc} onDamage={onDamage} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ─── Sivu ─────────────────────────────────────────────────────────────────────

export default function DndPage() {
  const [npcs, setNpcs] = useState<NPC[]>([]);
  const nextId = useRef(1);

  function addNpc(name: string, maxHp: number) {
    setNpcs((prev) => [
      ...prev,
      { id: nextId.current++, name, maxHp, currentHp: maxHp },
    ]);
  }

  function dealDamage(id: number, amount: number) {
    setNpcs((prev) =>
      prev.map((npc) =>
        npc.id === id
          ? { ...npc, currentHp: Math.max(0, npc.currentHp - amount) }
          : npc
      )
    );
  }

  function removeNpc(id: number) {
    setNpcs((prev) => prev.filter((npc) => npc.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <p className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
          Dungeons &amp; Dragons
        </p>
        <h1 className="text-white text-3xl font-bold">NPC HP Tracker</h1>
      </div>

      <div className="mb-8">
        <NPCForm onAdd={addNpc} />
      </div>

      <NPCList npcs={npcs} onDamage={dealDamage} onRemove={removeNpc} />
    </main>
  );
}
