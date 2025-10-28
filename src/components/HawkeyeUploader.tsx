"use client";

import { useCallback, useMemo, useRef, useState } from 'react';
import { UploadCloud, FileText, Trash2, Link2, BarChart3 } from 'lucide-react';

type JsonLike = Record<string, unknown> | unknown[];

export default function HawkeyeUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [textPreview, setTextPreview] = useState<string>('');
  const [jsonPreview, setJsonPreview] = useState<JsonLike | null>(null);

  const onChooseFile = () => inputRef.current?.click();

  const handleFiles = useCallback((f: File) => {
    setFile(f);
    setJsonPreview(null);
    setTextPreview('');

    const reader = new FileReader();
    if (f.type === 'application/json' || f.name.toLowerCase().endsWith('.json')) {
      reader.onload = () => {
        try {
          const data = JSON.parse(String(reader.result || '{}')) as JsonLike;
        setJsonPreview(data);
        } catch {
          setTextPreview(String(reader.result || ''));
        }
      };
      reader.readAsText(f);
    } else {
      reader.onload = () => setTextPreview(String(reader.result || ''));
      reader.readAsText(f);
    }
  }, []);

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFiles(f);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFiles(f);
  };

  const clearAll = () => {
    setFile(null);
    setJsonPreview(null);
    setTextPreview('');
    setLink('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const previewSummary = useMemo(() => {
    if (jsonPreview) {
      if (Array.isArray(jsonPreview)) {
        return `JSON array detected — ~${jsonPreview.length} items`;
      }
      const keys = Object.keys(jsonPreview as Record<string, unknown>);
      return `JSON detected — top-level keys: ${keys.slice(0, 6).join(', ')}${keys.length > 6 ? '…' : ''}`;
    }
    if (textPreview) {
      const lines = textPreview.split(/\r?\n/).filter(Boolean);
      const cols = lines[0]?.split(',').length ?? undefined;
      return `Text/CSV detected — ~${lines.length} lines${cols ? `, ~${cols} columns` : ''}`;
    }
    return '';
  }, [jsonPreview, textPreview]);

  const canAnalyze = !!file || (!!link && /^https?:\/\//i.test(link));

  return (
    <div className="relative rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E8FD5] to-[#CCFF00]" />

      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
          <BarChart3 className="size-3.5" /> Hawkeye analysis — Beta
        </div>
        <span className="hidden sm:inline-flex text-[11px] text-white/70">Your data stays in-browser</span>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-2">
          <h3 className="text-lg font-bold text-white">Input Hawkeye data to analyse your game</h3>
          <p className="text-sm text-white/80 max-w-prose">
            Upload match tracking exports (CSV/JSON) or paste a session link. Tennanova will map patterns to coaching
            insights and plans. This early beta previews ingestion and basic parsing.
          </p>

          <div className="mt-3 grid gap-3">
            <label
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/25 bg-white/5 px-4 py-8 text-center hover:border-white/40"
            >
              <UploadCloud className="size-6 text-white/80" />
              <div className="text-sm font-medium text-white">Drag & drop CSV/JSON</div>
              <div className="text-xs text-white/60">or</div>
              <button
                type="button"
                onClick={onChooseFile}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-3 py-1.5 text-xs font-semibold border border-white hover:bg-white/90 hover:border-white/90"
              >
                Choose file
              </button>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.json,application/json,text/csv"
                onChange={onChange}
                className="hidden"
              />
            </label>

            <div className="grid gap-2">
              <label className="text-xs font-medium text-white/80 inline-flex items-center gap-2">
                <Link2 className="size-3.5" /> Or paste session link
              </label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://hawk-eye.example/session/abc"
                className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-sm text-white/80 placeholder:text-white/40"
              />
            </div>

            {(file || link) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                {file && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                    <FileText className="size-3.5" /> {file.name}
                  </span>
                )}
                {link && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                    <Link2 className="size-3.5" /> {link}
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-auto inline-flex items-center gap-1 rounded-md border border-white/20 px-2 py-1 text-[11px] text-white/80 hover:bg-white/10"
                >
                  <Trash2 className="size-3.5" /> Clear
                </button>
              </div>
            )}

            {previewSummary && (
              <p className="text-xs text-white/60">{previewSummary}</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white/80">Quick preview</p>
                <button
                  type="button"
                  disabled={!canAnalyze}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-3 py-2 text-xs font-semibold border border-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 hover:border-white/90"
                  onClick={() => {
                    // No-op for now; preview below already updates
                  }}
                >
                  Analyze
                </button>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 max-h-56 overflow-auto text-xs text-white/80 whitespace-pre-wrap">
                {jsonPreview ? (
                  <pre>{JSON.stringify(jsonPreview, null, 2)}</pre>
                ) : textPreview ? (
                  <pre>{textPreview.split(/\r?\n/).slice(0, 20).join('\n')}{textPreview.split(/\r?\n/).length > 20 ? '\n…' : ''}</pre>
                ) : (
                  <p className="text-white/50">No file selected yet.</p>
                )}
              </div>
              <p className="text-[11px] text-white/60">
                Early beta: parsing happens locally. We’ll soon map detected patterns (serve placement, rally length,
                error clusters) to coaching plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
