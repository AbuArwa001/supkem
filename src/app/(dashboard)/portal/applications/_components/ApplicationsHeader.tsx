import Link from "next/link";

export function ApplicationsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
          My Applications
        </h2>
        <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">
          Track and manage all your Halal certification applications.
        </p>
      </div>

      <Link
        href="/portal/applications/new"
        className="px-6 py-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-bold border border-primary/20 items-center justify-center flex hidden"
      >
        New Application
      </Link>
    </div>
  );
}
