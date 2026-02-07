import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ShieldCheck, FileCheck, Scale } from 'lucide-react';

const LICENSE_CODE = '58204711936582740916';
const REGISTRATION_NUMBER = 'SANG-2026-894-009';
const APP_VERSION = '2.1.0';

export default function License() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/30 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Application License</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-5 pb-12">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <img
            src="/images.jpeg"
            alt="Sangpt logo"
            className="w-20 h-20 rounded-3xl shadow-lg object-cover"
          />
          <h2 className="text-xl font-bold tracking-tight">Sangpt</h2>
          <p className="text-xs text-muted-foreground">Application License Information</p>
        </div>

        {/* Application Details */}
        <section className="glass-card rounded-2xl divide-y divide-border/30">
          <div className="px-4 py-3 flex items-center gap-3">
            <FileCheck className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Application Details
            </span>
          </div>
          <DetailRow label="Application Name" value="Sangpt" />
          <DetailRow label="Application Type" value="AI-powered Conversational Platform" />
          <DetailRow label="Registration Number" value={REGISTRATION_NUMBER} mono />
          <DetailRow label="Application Version" value={`v${APP_VERSION}`} />
        </section>

        {/* License Details — prominent */}
        <section className="glass-card rounded-2xl border border-primary/20 divide-y divide-border/30">
          <div className="px-4 py-3 flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              License Details
            </span>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-muted-foreground mb-1">License Code</p>
            <p className="font-mono text-base font-bold tracking-widest text-foreground select-all break-all">
              {LICENSE_CODE}
            </p>
          </div>
          <DetailRow label="License Type" value="Full Ownership" />
          <DetailRow label="License Status" value="Active" badge />
          <DetailRow label="Issued By" value="Sangpt (Original Developer)" />
          <DetailRow label="Issue Date" value="January 30, 2026" />
        </section>

        {/* Authenticity Notice */}
        <section className="glass-card rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Authenticity &amp; Validation
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This License Code must exactly match the License Code stated in the official Software
            License Certificate issued by Sangpt. Any mismatch, alteration, or unauthorized
            modification invalidates this license.
          </p>
        </section>

        {/* Compliance & Technology */}
        <section className="glass-card rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Compliance &amp; Technology
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sangpt integrates licensed third-party AI services, including Gemini API. Ownership of
            underlying AI models remains with their respective providers.
          </p>
        </section>

        <p className="text-center text-[10px] text-muted-foreground pt-2 pb-4">
          © 2026 Sangpt. All rights reserved.
        </p>
      </div>
    </div>
  );
}

/* Small helper for consistent rows */
function DetailRow({
  label,
  value,
  mono,
  badge,
}: {
  label: string;
  value: string;
  mono?: boolean;
  badge?: boolean;
}) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium text-foreground text-right ${
          mono ? 'font-mono tracking-wide' : ''
        } ${badge ? 'px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}
