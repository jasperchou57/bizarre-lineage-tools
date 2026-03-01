"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Database, Download, Trash2, ArrowRightLeft, Target, Shield, Zap, Upload } from "lucide-react";
import { useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import standsData from "@/data/stands.json";

export default function VaultPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vault, setVault] = useLocalStorage<any[]>("bl-vault", []);
    const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Need to ensure we're rendering on client to avoid hydration mismatch with localStorage
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleDelete = (id: string) => {
        if (confirm("Delete this build?")) {
            setVault(vault.filter(b => b.id !== id));
            setSelectedForCompare(selectedForCompare.filter(sel => sel !== id));
        }
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(vault, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bizarre_lineage_vault_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target?.result as string);
                if (Array.isArray(importedData)) {
                    // Simple merge: keep existing, add new if ID doesn't exist
                    const existingIds = new Set(vault.map(b => b.id));
                    const newBuilds = importedData.filter(b => !existingIds.has(b.id));
                    if (newBuilds.length > 0) {
                        setVault([...vault, ...newBuilds]);
                        alert(`Successfully imported ${newBuilds.length} builds!`);
                    } else {
                        alert("No new builds found in the imported file.");
                    }
                } else {
                    alert("Invalid backup file format.");
                }
            } catch {
                alert("Failed to parse the backup file.");
            }
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = "";
        };
        reader.readAsText(file);
    };

    const toggleCompare = (id: string) => {
        if (selectedForCompare.includes(id)) {
            setSelectedForCompare(selectedForCompare.filter(sel => sel !== id));
        } else {
            if (selectedForCompare.length < 2) {
                setSelectedForCompare([...selectedForCompare, id]);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-heading font-extrabold text-white flex items-center gap-3">
                        <Database className="h-8 w-8 text-accent-blue" />
                        Your Vault
                    </h1>
                    <p className="text-muted mt-2">
                        {vault.length} stored builds. Data is saved locally in this browser.
                    </p>
                </div>

                <div className="flex gap-4">
                    {selectedForCompare.length === 2 && (
                        <Link
                            href={`/compare?a=${selectedForCompare[0]}&b=${selectedForCompare[1]}`}
                            className="px-6 py-2 bg-accent-indigo rounded-lg text-white font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] animate-pulse"
                        >
                            <ArrowRightLeft className="h-4 w-4" /> Compare Selected
                        </Link>
                    )}
                    <button
                        onClick={handleExport}
                        disabled={vault.length === 0}
                        className="px-6 py-2 bg-surface border border-white/10 rounded-lg text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="h-4 w-4" /> Export Backup
                    </button>

                    <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImport}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 bg-surface border border-white/10 rounded-lg text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
                    >
                        <Upload className="h-4 w-4" /> Import Backup
                    </button>
                </div>
            </div>

            {vault.length === 0 ? (
                <div className="bg-surface border border-border rounded-xl p-12 text-center">
                    <Database className="h-16 w-16 text-muted mx-auto mb-4 opacity-50" />
                    <h2 className="text-2xl font-bold text-white mb-2">Vault is Empty</h2>
                    <p className="text-muted mb-6">Create and save builds in the Planner to store them here.</p>
                    <Link href="/build-planner" className="px-6 py-3 bg-accent-blue rounded-lg text-white font-bold inline-block hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
                        Open Build Planner
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vault.map(build => {
                        const standName = standsData.find(s => s.id === build.stand)?.name || build.stand;
                        const isSelected = selectedForCompare.includes(build.id);

                        return (
                            <div
                                key={build.id}
                                className={`bg-surface border rounded-xl p-6 transition-all ${isSelected ? 'border-accent-indigo shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-border hover:border-white/20'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{build.name}</h3>
                                        <p className="text-xs text-muted">Patch: {build.patchVersion} | Saved: {new Date(build.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(build.id)}
                                        className="p-2 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white">{standName}</span>
                                    {build.style && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white capitalize">{build.style}</span>}
                                    {build.sub && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white capitalize">{build.sub}</span>}
                                </div>

                                <div className="grid grid-cols-2 gap-y-2 mb-6">
                                    <div className="text-xs text-muted flex items-center justify-between pr-4">
                                        <span className="flex items-center gap-1"><Target className="h-3 w-3" /> PvP</span>
                                        <strong className="text-white">{build.scores.pvp}</strong>
                                    </div>
                                    <div className="text-xs text-muted flex items-center justify-between pr-4">
                                        <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> PvE</span>
                                        <strong className="text-white">{build.scores.pve}</strong>
                                    </div>
                                    <div className="text-xs text-muted flex items-center justify-between pr-4">
                                        <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Surv</span>
                                        <strong className="text-white">{build.scores.survival}</strong>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/build-planner?stand=${build.stand}&style=${build.style}&sub=${build.sub}`}
                                        className="flex-1 py-2 text-center text-sm font-medium border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors"
                                    >
                                        Load
                                    </Link>
                                    <button
                                        onClick={() => toggleCompare(build.id)}
                                        className={`flex-1 py-2 text-center text-sm font-bold rounded-lg border transition-colors ${isSelected
                                            ? 'bg-accent-indigo text-white border-accent-indigo'
                                            : 'bg-transparent border-white/10 text-muted hover:text-white'
                                            }`}
                                    >
                                        {isSelected ? 'Selected' : 'Compare'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
