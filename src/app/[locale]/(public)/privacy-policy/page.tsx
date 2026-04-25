import { getTranslations } from "next-intl/server";
import { Shield, Lock, FileText, Globe } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  // Use a generic translation or hardcoded english for the metadata title if translation doesn't exist
  return {
    title: `Privacy Policy | SUPKEM`,
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden bg-[#0A1A14]">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-700/20 rounded-full blur-[120px] -mt-32 -mr-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/40 rounded-full blur-[100px] -mb-32 -ml-32 pointer-events-none"></div>
        
        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-400 mb-8 backdrop-blur-md">
            <Shield size={16} />
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">Legal & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed font-medium">
            How we collect, use, and protect your personal information within the SUPKEM digital ecosystem.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-4xl -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 md:p-16">
            <div className="prose prose-slate max-w-none">
                <p className="text-sm text-slate-500 font-bold mb-10 uppercase tracking-widest">Last Updated: October 2025</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight flex items-center gap-3">
                    <FileText className="text-emerald-700 h-6 w-6" />
                    1. Information We Collect
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    We collect information you provide directly to us when organizing applications, processing portal payments, or interacting with the National Membership Assembly. This includes names, addresses, email addresses, phone numbers, and any other data relevant to rendering services. We also collect transactional records regarding financial pipelines and portal usage metrics.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 tracking-tight flex items-center gap-3">
                    <Lock className="text-emerald-700 h-6 w-6" />
                    2. How We Use Your Information
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    The Supreme Council of Kenya Muslims (SUPKEM) utilizes this data securely to:
                </p>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium">
                        <li>Process certification requests, Hajj directives, and membership validation.</li>
                        <li>Verify payment pipelines interactively (via M-PESA STK pushes).</li>
                        <li>Ensure structural compliance with constitutional mandates and Council guidelines.</li>
                        <li>Distribute systemic notifications and immediate operational communications.</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 tracking-tight flex items-center gap-3">
                    <Globe className="text-emerald-700 h-6 w-6" />
                    3. Deep-Level Data Security
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    We implement highly robust administrative, technical, and physical security parameters to protect your personal registry from unauthorized access. Your data is strictly guarded and never monetized or sold to third parties. We only share information with trusted operational partners (such as direct payment gateways) absolutely necessary for the execution of platform services.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 tracking-tight">4. Your Data Sovereignty Rights</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    As a verified platform citizen operating under the Data Protection Act, you hold the inherent right to access, rectify, or request complete deletion of your personal data stored within the portal grids. You may exercise these rights automatically via your portal dashboard settings or by reaching our central administrative officers.
                </p>

                <hr className="my-12 border-slate-200" />

                <div className="bg-[#0A1A14] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl shadow-slate-900/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/30 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-bold mb-2">Contacting the Compliance Desk</h3>
                    <p className="font-medium text-emerald-50/70 mb-6 max-w-md">
                        If you have inquiries regarding this Privacy Policy algorithm or how your data is administered through our pipelines, contact our agents:
                    </p>
                    <div className="inline-flex py-3 px-6 bg-white/10 rounded-xl border border-white/20 font-bold tracking-wider">
                        legal@supkem.org
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
