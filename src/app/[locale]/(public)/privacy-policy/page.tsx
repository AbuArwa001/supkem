import { getTranslations } from "next-intl/server";
import { Shield, Lock, FileText, Globe } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });
  return {
    title: `${t('title')} | SUPKEM`,
  };
}

export default async function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });

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
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">{t('badge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-4xl -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 md:p-16">
            <div className="prose prose-slate max-w-none">
                <p className="text-sm text-slate-500 font-bold mb-10 uppercase tracking-widest">{t('lastUpdated')}</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight flex items-center gap-3">
                    <FileText className="text-emerald-700 h-6 w-6" />
                    {t('section1.title')}
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    {t('section1.content')}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 tracking-tight flex items-center gap-3">
                    <Lock className="text-emerald-700 h-6 w-6" />
                    {t('section2.title')}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    {t('section2.content')}
                </p>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium">
                        <li>{t('section2.bullet1')}</li>
                        <li>{t('section2.bullet2')}</li>
                        <li>{t('section2.bullet3')}</li>
                        <li>{t('section2.bullet4')}</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 tracking-tight flex items-center gap-3">
                    <Globe className="text-emerald-700 h-6 w-6" />
                    {t('section3.title')}
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    {t('section3.content')}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 tracking-tight">{t('section4.title')}</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    {t('section4.content')}
                </p>

                <hr className="my-12 border-slate-200" />

                <div className="bg-[#0A1A14] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl shadow-slate-900/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/30 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-bold mb-2">{t('contact.title')}</h3>
                    <p className="font-medium text-emerald-50/70 mb-6 max-w-md">
                        {t('contact.content')}
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
