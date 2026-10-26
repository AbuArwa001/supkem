export function SearchPaletteFooter() {
  return (
    <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↑</kbd>
          <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↓</kbd>
          to navigate
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↵</kbd>
          to open
        </span>
      </div>
      <span className="flex items-center gap-1">
        <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">esc</kbd>
        to close
      </span>
    </div>
  );
}
