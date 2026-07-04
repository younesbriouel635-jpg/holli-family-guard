import type { ReactElement } from "react";
import { useState } from "react";
import {
  Sparkles, TrendingUp, TrendingDown, Wallet, PiggyBank, LineChart,
  Calendar as CalIcon, Repeat, Award, Baby, Scroll, Activity, Brain,
  ArrowUpRight, ArrowDownRight, ChevronRight, Home as HomeIcon, Car,
  Plane, Gem as RingIcon, Briefcase, Heart, GraduationCap, DollarSign,
  Zap, ShieldCheck, Bell, FileText, Users, Trophy, Target, Gamepad2,
  BookOpen, Lock, Gift, Coffee, Music, Tv, CreditCard,
  Info, CheckCircle2, AlertCircle,
} from "lucide-react";

// ---------- AI Copilot ----------
type CopilotTone = "positive" | "warning" | "neutral" | "insight";

export interface CopilotMsg {
  tone: CopilotTone;
  text: string;
  detail?: string;
}

const toneStyles: Record<CopilotTone, { border: string; icon: JSX.Element; label: string }> = {
  positive: { border: "border-emerald-400/30", icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />, label: "Ahead" },
  warning:  { border: "border-amber-400/30",   icon: <AlertCircle className="h-3.5 w-3.5 text-amber-400" />,   label: "Watch" },
  insight:  { border: "border-theme/40",       icon: <Sparkles className="h-3.5 w-3.5 text-theme" />,          label: "Copilot" },
  neutral:  { border: "border-white/10",       icon: <Info className="h-3.5 w-3.5 text-muted-foreground" />,   label: "Note" },
};

export function AICopilot({ messages }: { messages: CopilotMsg[] }) {
  const [idx, setIdx] = useState(0);
  const msg = messages[idx % messages.length];
  const s = toneStyles[msg.tone];
  return (
    <div className={`glass mt-4 rounded-3xl p-4 ${s.border} border`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-theme/15">
            <div className="absolute inset-0 rounded-full bg-theme/10 animate-ping" style={{ animationDuration: "2.4s" }} />
            <Sparkles className="h-3.5 w-3.5 text-theme" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">HOLLI Copilot</div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">{s.icon}<span>{s.label}</span></div>
          </div>
        </div>
        <button onClick={() => setIdx(i => i + 1)} className="rounded-full glass p-1.5"><ChevronRight className="h-3.5 w-3.5" /></button>
      </div>
      <p className="mt-3 text-sm leading-relaxed">{msg.text}</p>
      {msg.detail && <p className="mt-1 text-[11px] text-muted-foreground">{msg.detail}</p>}
      <div className="mt-3 flex gap-1">
        {messages.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full ${i === idx % messages.length ? "bg-theme" : "bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}

// ---------- HOLLI Wealth Score ----------
export function WealthScoreCard({ score = 782, delta = 14 }: { score?: number; delta?: number }) {
  const pct = score / 1000;
  return (
    <div className="glass-theme mt-4 rounded-[2rem] p-5 glow-theme">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">HOLLI Wealth Score</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span style={{ fontFamily: "var(--font-display)" }} className="text-5xl font-semibold text-theme">{score}</span>
            <span className="text-xs text-muted-foreground">/ 1000</span>
          </div>
          <div className={`mt-1 inline-flex items-center gap-1 text-[11px] ${delta >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {delta >= 0 ? "+" : ""}{delta} this week
          </div>
        </div>
        <MiniRing pct={pct} />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { l: "Save", v: 92 }, { l: "Debt", v: 71 }, { l: "Invest", v: 64 }, { l: "Consist.", v: 88 },
        ].map((x) => (
          <div key={x.l} className="rounded-xl bg-black/30 p-2 text-center">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{x.l}</div>
            <div className="mt-0.5 text-sm font-semibold text-theme">{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniRing({ pct }: { pct: number }) {
  const r = 30, c = 2 * Math.PI * r, off = c * (1 - pct);
  return (
    <svg width={80} height={80} className="-rotate-90">
      <circle cx={40} cy={40} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={7} fill="none" />
      <circle cx={40} cy={40} r={r} stroke="var(--theme)" strokeWidth={7} strokeLinecap="round" fill="none"
        strokeDasharray={c} strokeDashoffset={off}
        style={{ filter: "drop-shadow(0 0 8px var(--theme))" }} />
    </svg>
  );
}

// ---------- More Menu (Hub) ----------
export type PlusScreen =
  | "wealth" | "timeline" | "simulator" | "calendar"
  | "subscriptions" | "missions" | "child" | "legacy"
  | "insights" | "dna";

interface HubItem { id: PlusScreen; icon: React.ComponentType<{ className?: string }>; label: string; hint: string }
const HUB: HubItem[] = [
  { id: "wealth",       icon: Wallet,       label: "Net Worth",     hint: "Assets · Liabilities" },
  { id: "timeline",     icon: LineChart,    label: "Wealth Timeline", hint: "Life & money" },
  { id: "simulator",    icon: Brain,        label: "Life Simulator", hint: "What if…" },
  { id: "calendar",     icon: CalIcon,      label: "Smart Calendar", hint: "Bills · Salary" },
  { id: "subscriptions",icon: Repeat,       label: "Subscriptions",  hint: "Detect · Save" },
  { id: "missions",     icon: Award,        label: "Family Missions",hint: "Weekly quests" },
  { id: "child",        icon: Baby,         label: "Child Mode",     hint: "Allowance · Learn" },
  { id: "legacy",       icon: Scroll,       label: "Legacy Center",  hint: "Vault · Will" },
  { id: "insights",     icon: Activity,     label: "Insights",       hint: "Trends · Deep" },
  { id: "dna",          icon: Zap,          label: "Money DNA",      hint: "Your patterns" },
];

export function MoreHub({ open, onSelect }: { open: (s: PlusScreen) => void; onSelect?: (s: PlusScreen) => void }) {
  const go = onSelect ?? open;
  return (
    <div className="flex-1 px-5 pt-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-theme" />
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold">Wealth OS</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Everything HOLLI can do for your family.</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {HUB.map((h) => (
          <button key={h.id} onClick={() => go(h.id)} className="glass hover:glass-theme group relative flex flex-col items-start gap-3 rounded-3xl p-4 text-left transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-theme/10">
              <h.icon className="h-5 w-5 text-theme" />
            </div>
            <div>
              <div className="text-sm font-semibold">{h.label}</div>
              <div className="text-[10px] text-muted-foreground">{h.hint}</div>
            </div>
            <ChevronRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Wealth / Net Worth + Cash Flow ----------
export function WealthScreen({ income }: { income: number }) {
  const assets = [
    { k: "Cash", v: 8_420, i: DollarSign }, { k: "Savings", v: 22_500, i: PiggyBank },
    { k: "Investments", v: 41_300, i: TrendingUp }, { k: "Crypto", v: 6_800, i: Zap },
    { k: "Real Estate", v: 285_000, i: HomeIcon }, { k: "Vehicles", v: 34_000, i: Car },
  ];
  const liab = [
    { k: "Mortgage", v: 168_000, i: HomeIcon }, { k: "Credit Cards", v: 3_200, i: CreditCard },
    { k: "Auto Loan", v: 14_500, i: Car },
  ];
  const A = assets.reduce((s, x) => s + x.v, 0);
  const L = liab.reduce((s, x) => s + x.v, 0);
  const NW = A - L;

  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Wallet} title="Net Worth" hint="Live consolidated wealth" />

      <div className="glass-theme mt-4 rounded-[2rem] p-6 glow-theme">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Total Net Worth</div>
        <div style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl font-semibold text-theme">
          ${NW.toLocaleString()}
        </div>
        <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-400">
          <TrendingUp className="h-3 w-3" /> +$4,210 · +2.1% this month
        </div>
        <Sparkline className="mt-4" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricCard label="Assets" value={`$${(A/1000).toFixed(1)}k`} tone="positive" />
        <MetricCard label="Liabilities" value={`$${(L/1000).toFixed(1)}k`} tone="warning" />
      </div>

      <SubTitle>Assets</SubTitle>
      <div className="mt-3 space-y-2">
        {assets.map(a => <Row key={a.k} icon={a.i} label={a.k} value={`$${a.v.toLocaleString()}`} />)}
      </div>

      <SubTitle>Liabilities</SubTitle>
      <div className="mt-3 space-y-2">
        {liab.map(a => <Row key={a.k} icon={a.i} label={a.k} value={`- $${a.v.toLocaleString()}`} tone="warning" />)}
      </div>

      <SubTitle>Cash Flow · This Month</SubTitle>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <FlowCard label="Money In" value={income} tone="in" />
        <FlowCard label="Money Out" value={Math.round(income * 0.68)} tone="out" />
      </div>
      <div className="glass mt-3 rounded-3xl p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Forecast</div>
        <p className="mt-2 text-sm">You'll close the month with <span className="font-semibold text-theme">${Math.round(income*0.32).toLocaleString()}</span> free cash. Copilot suggests moving 60% to investments.</p>
      </div>
    </div>
  );
}

function Sparkline({ className = "" }: { className?: string }) {
  const pts = [12, 18, 14, 22, 20, 28, 26, 34, 30, 38, 44, 41, 52];
  const w = 320, h = 70, mx = Math.max(...pts), mn = Math.min(...pts);
  const path = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - mn) / (mx - mn)) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`h-16 w-full ${className}`}>
      <defs>
        <linearGradient id="sp" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--theme)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--theme)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#sp)" />
      <path d={path} stroke="var(--theme)" strokeWidth={2} fill="none" style={{ filter: "drop-shadow(0 0 6px var(--theme))" }} />
    </svg>
  );
}

// ---------- Wealth Timeline ----------
export function TimelineScreen() {
  const items = [
    { y: "Now",   icon: DollarSign,     t: "Salary $4,500",         c: "positive" },
    { y: "+5d",   icon: HomeIcon,       t: "Rent $1,600 due",       c: "warning"  },
    { y: "+12d",  icon: PiggyBank,      t: "Auto-save $600",        c: "positive" },
    { y: "+1mo",  icon: Plane,          t: "Family vacation $2,100",c: "insight"  },
    { y: "+3mo",  icon: GraduationCap,  t: "Kids school year",      c: "insight"  },
    { y: "+1yr",  icon: Car,            t: "New car goal 68%",      c: "insight"  },
    { y: "+3yr",  icon: RingIcon,       t: "Wedding fund complete", c: "positive" },
    { y: "+5yr",  icon: HomeIcon,       t: "House downpayment",     c: "insight"  },
    { y: "+20yr", icon: Briefcase,      t: "Retirement runway 74%", c: "insight"  },
  ] as const;
  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={LineChart} title="Family Wealth Timeline" hint="Life visualized end-to-end" />
      <div className="relative mt-6">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-theme/60 via-white/10 to-transparent" />
        <div className="space-y-4">
          {items.map((x, i) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-theme/20 ring-2 ring-black">
                <div className="h-1.5 w-1.5 rounded-full bg-theme glow-theme" />
              </div>
              <div className="glass rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <x.icon className="h-4 w-4 text-theme" />
                    <span className="text-sm font-medium">{x.t}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{x.y}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Life Simulator ----------
export function SimulatorScreen({ baseIncome }: { baseIncome: number }) {
  const scenarios = [
    { id: "car",     icon: Car,          label: "Buy a Car",    cost: 32000, months: 60 },
    { id: "house",   icon: HomeIcon,     label: "Buy a House",  cost: 180000, months: 360 },
    { id: "baby",    icon: Baby,         label: "New Baby",     cost: 24000, months: 216 },
    { id: "wed",     icon: RingIcon,     label: "Wedding",      cost: 28000, months: 12 },
    { id: "vac",     icon: Plane,        label: "Big Vacation", cost: 6500,  months: 6 },
    { id: "loan",    icon: DollarSign,   label: "Take a Loan",  cost: -15000, months: 36 },
    { id: "med",     icon: Heart,        label: "Medical Event",cost: 8000,  months: 4 },
    { id: "ret",     icon: Briefcase,    label: "Retire Early", cost: 500000, months: 240 },
  ];
  const [pick, setPick] = useState(scenarios[0]);
  const [salary, setSalary] = useState(baseIncome);

  const monthly = pick.cost / pick.months;
  const impact = (monthly / salary) * 100;
  const health = Math.max(0, 100 - impact * 1.4);

  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Brain} title="Life Simulator" hint="What if you did this?" />

      <div className="mt-5 grid grid-cols-4 gap-2">
        {scenarios.map((s) => (
          <button key={s.id} onClick={() => setPick(s)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center transition ${pick.id === s.id ? "glass-theme glow-theme" : "glass"}`}>
            <s.icon className={`h-4 w-4 ${pick.id === s.id ? "text-theme" : "text-muted-foreground"}`} />
            <span className="text-[10px] leading-tight">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="glass mt-5 rounded-3xl p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{pick.label}</div>
        <div className="mt-2 flex items-baseline justify-between">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-semibold text-theme">${Math.abs(pick.cost).toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground">over {pick.months} mo</div>
        </div>

        <div className="mt-4">
          <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Salary — ${salary.toLocaleString()}</label>
          <input type="range" min={1500} max={20000} step={100} value={salary} onChange={e => setSalary(+e.target.value)} className="mt-1 h-1 w-full accent-[var(--theme)]" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <MetricCard label="Monthly" value={`$${Math.abs(monthly).toFixed(0)}`} />
          <MetricCard label="Income %" value={`${Math.abs(impact).toFixed(0)}%`} tone={impact > 30 ? "warning" : "positive"} />
          <MetricCard label="Health" value={`${health.toFixed(0)}`} tone={health < 50 ? "warning" : "positive"} />
        </div>
      </div>

      <AICopilot messages={[
        { tone: impact > 30 ? "warning" : "positive",
          text: impact > 30
            ? `${pick.label} would consume ${impact.toFixed(0)}% of your income. Copilot suggests extending timeframe or raising income by $${Math.round(monthly*0.4)}.`
            : `${pick.label} fits your cash flow — only ${impact.toFixed(0)}% impact. Green light.`,
          detail: `Projected wealth score change: ${impact > 30 ? "-42" : "+18"} points`,
        },
      ]} />
    </div>
  );
}

// ---------- Smart Calendar ----------
export function CalendarScreen() {
  const today = new Date();
  const days = Array.from({ length: 35 }, (_, i) => i - today.getDay() + 1);
  const events: Record<number, { c: string; icon: React.ComponentType<{ className?: string }> }[]> = {
    3: [{ c: "salary",  icon: DollarSign }],
    5: [{ c: "bill",    icon: HomeIcon }],
    8: [{ c: "sub",     icon: Tv }],
    12:[{ c: "invest",  icon: TrendingUp }],
    15:[{ c: "bill",    icon: Zap }],
    18:[{ c: "goal",    icon: Target }],
    22:[{ c: "salary",  icon: DollarSign }],
    25:[{ c: "family",  icon: Users }],
    28:[{ c: "sub",     icon: Music }],
  };
  const colorFor = (c: string) => (
    c === "salary" ? "bg-emerald-400" : c === "bill" ? "bg-red-400" :
    c === "sub" ? "bg-amber-400" : c === "invest" ? "bg-theme" :
    c === "goal" ? "bg-fuchsia-400" : "bg-sky-400"
  );

  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={CalIcon} title="Smart Calendar" hint="Bills · Salary · AI predictions" />

      <div className="glass mt-4 rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-lg">
            {today.toLocaleString("en", { month: "long", year: "numeric" })}
          </div>
          <Bell className="h-4 w-4 text-theme" />
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          {["S","M","T","W","T","F","S"].map((d,i) => <div key={i}>{d}</div>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const valid = d > 0 && d <= 31;
            const isToday = valid && d === today.getDate();
            const ev = events[d] || [];
            return (
              <div key={i} className={`aspect-square rounded-lg p-1 text-[10px] ${isToday ? "bg-theme text-black font-bold" : valid ? "bg-white/[0.03]" : ""}`}>
                {valid && <div>{d}</div>}
                <div className="mt-0.5 flex flex-wrap gap-0.5">
                  {ev.map((e, j) => <span key={j} className={`h-1 w-1 rounded-full ${colorFor(e.c)}`} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SubTitle>Upcoming</SubTitle>
      <div className="mt-3 space-y-2">
        <Row icon={DollarSign} label="Salary — Acme Corp" value="+$4,500" tone="positive" hint="In 3 days" />
        <Row icon={HomeIcon}   label="Rent"               value="- $1,600" tone="warning"  hint="In 5 days" />
        <Row icon={Tv}         label="Netflix"            value="- $15.99" tone="warning"  hint="In 8 days" />
        <Row icon={TrendingUp} label="Auto-invest S&P"    value="- $600"   tone="neutral"  hint="In 12 days" />
        <Row icon={Target}     label="Vault milestone 25%"value="Reward"   tone="positive" hint="In 18 days" />
      </div>
    </div>
  );
}

// ---------- Subscriptions Manager ----------
export function SubscriptionsScreen() {
  const subs = [
    { n: "Netflix",   c: 15.99, u: "high",   icon: Tv,         d: "Family plan" },
    { n: "Spotify",   c: 10.99, u: "high",   icon: Music,      d: "Duo" },
    { n: "iCloud+",   c: 2.99,  u: "med",    icon: Wallet,     d: "200GB" },
    { n: "Gym",       c: 39.00, u: "low",    icon: Activity,   d: "Not used in 47d" },
    { n: "Adobe CC",  c: 54.99, u: "unused", icon: FileText,   d: "Unused this quarter" },
    { n: "Amazon Prime", c: 14.99, u: "high",icon: Gift,       d: "Active daily" },
    { n: "Nytimes",   c: 4.25,  u: "low",    icon: BookOpen,   d: "Read 1x/month" },
  ];
  const monthly = subs.reduce((s, x) => s + x.c, 0);
  const wasted = subs.filter(s => s.u === "unused" || s.u === "low").reduce((s, x) => s + x.c, 0);
  const badge = (u: string) => (
    u === "unused" ? "text-red-400 border-red-400/30" :
    u === "low" ? "text-amber-400 border-amber-400/30" :
    u === "med" ? "text-sky-400 border-sky-400/30" :
    "text-emerald-400 border-emerald-400/30"
  );

  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Repeat} title="Subscriptions" hint="Detect · Save · Cancel" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricCard label="Monthly" value={`$${monthly.toFixed(2)}`} />
        <MetricCard label="Yearly waste" value={`$${(wasted*12).toFixed(0)}`} tone="warning" />
      </div>

      <AICopilot messages={[
        { tone: "warning", text: `Cancel Adobe CC and Gym to save $${((wasted)*12).toFixed(0)}/yr.`, detail: "Frees ~$94/month of budget" },
        { tone: "insight", text: "Netflix price rises $2 next month.", detail: "Renewal on the 8th" },
      ]} />

      <SubTitle>Detected</SubTitle>
      <div className="mt-3 space-y-2">
        {subs.map(s => (
          <div key={s.n} className="glass flex items-center gap-3 rounded-2xl p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5"><s.icon className="h-4 w-4 text-theme" /></div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{s.n}</div>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-widest ${badge(s.u)}`}>{s.u}</span>
              </div>
              <div className="truncate text-[10px] text-muted-foreground">{s.d}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">${s.c.toFixed(2)}</div>
              <button className="text-[10px] text-muted-foreground hover:text-theme">manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Family Missions ----------
export function MissionsScreen() {
  const missions = [
    { t: "No-Spend Weekend", p: 60, xp: 120, icon: ShieldCheck, tone: "positive" },
    { t: "Cook at Home 5x",  p: 80, xp: 90,  icon: Coffee,      tone: "insight" },
    { t: "Save $100 Family", p: 45, xp: 200, icon: PiggyBank,   tone: "insight" },
    { t: "Kids Save $20",    p: 100,xp: 80,  icon: Baby,        tone: "positive" },
    { t: "Cancel 1 Subscription", p: 0, xp: 150, icon: Repeat,  tone: "warning"  },
  ] as const;
  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Award} title="Family Missions" hint="Discipline, gamified" />

      <div className="glass-theme mt-4 rounded-[2rem] p-5 glow-theme">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Family Level</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="mt-1 text-4xl font-semibold text-theme">Level 12</div>
          </div>
          <Trophy className="h-8 w-8 text-theme" />
        </div>
        <div className="mt-3 h-2 rounded-full bg-black/40 overflow-hidden">
          <div className="h-full bg-theme glow-theme" style={{ width: "68%" }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>1,240 XP</span><span>Next: 1,800 XP</span></div>
      </div>

      <SubTitle>This Week</SubTitle>
      <div className="mt-3 space-y-2">
        {missions.map((m) => (
          <div key={m.t} className="glass rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-theme/10"><m.icon className="h-4 w-4 text-theme" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{m.t}</div>
                  <span className="text-[10px] font-semibold text-theme">+{m.xp} XP</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full ${m.p === 100 ? "bg-emerald-400" : "bg-theme"} glow-theme`} style={{ width: `${m.p}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubTitle>Badges</SubTitle>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {["🔥","💎","👑","🏆","⚡","🎯","🛡️","🌟"].map((e, i) => (
          <div key={i} className="glass flex aspect-square items-center justify-center rounded-2xl text-2xl">{e}</div>
        ))}
      </div>
    </div>
  );
}

// ---------- Child Mode ----------
export function ChildScreen() {
  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Baby} title="Child Mode" hint="Allowance · Learn · Grow" />

      <div className="glass-theme mt-4 rounded-[2rem] p-5 glow-theme text-center">
        <div className="text-6xl">🐷</div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Piggy Bank</div>
        <div style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-semibold text-theme">$78.40</div>
        <div className="text-[11px] text-muted-foreground">of $150 · Nintendo Switch goal</div>
        <div className="mt-3 h-2 rounded-full bg-black/40 overflow-hidden">
          <div className="h-full bg-theme glow-theme" style={{ width: "52%" }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricCard label="Weekly allowance" value="$10.00" tone="positive" />
        <MetricCard label="Tasks done" value="6 / 8" />
      </div>

      <SubTitle>Tasks</SubTitle>
      <div className="mt-3 space-y-2">
        {[
          { t: "Make bed",       d: true,  v: 1 },
          { t: "Homework",       d: true,  v: 2 },
          { t: "Read 20 min",    d: true,  v: 1 },
          { t: "Kitchen help",   d: false, v: 2 },
          { t: "Save $5",        d: false, v: 3 },
        ].map(t => (
          <div key={t.t} className="glass flex items-center justify-between rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full ${t.d ? "bg-theme text-black" : "border border-white/15"}`}>
                {t.d && <CheckCircle2 className="h-4 w-4" />}
              </div>
              <span className={`text-sm ${t.d ? "line-through text-muted-foreground" : ""}`}>{t.t}</span>
            </div>
            <span className="text-xs font-semibold text-theme">+${t.v}</span>
          </div>
        ))}
      </div>

      <SubTitle>Money Quiz</SubTitle>
      <div className="glass mt-3 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <Gamepad2 className="h-3 w-3 text-theme" /> Lesson 4 · Saving vs Spending
        </div>
        <p className="mt-2 text-sm">If you save $2 every day for a year, how much do you have?</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["$300","$730","$1000"].map(a => (
            <button key={a} className="glass rounded-xl py-2 text-sm hover:glass-theme">{a}</button>
          ))}
        </div>
      </div>

      <SubTitle>Wish List</SubTitle>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[{e:"🎮",t:"Switch"},{e:"🚲",t:"Bike"},{e:"🎧",t:"Headset"}].map(x => (
          <div key={x.t} className="glass rounded-2xl p-3 text-center">
            <div className="text-3xl">{x.e}</div>
            <div className="mt-1 text-[11px]">{x.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Legacy Center ----------
export function LegacyScreen() {
  const docs = [
    { t: "Life Insurance",     s: "Active",       i: ShieldCheck, tone: "positive" },
    { t: "Home Insurance",     s: "Renews 42d",   i: HomeIcon,    tone: "neutral"  },
    { t: "Will & Testament",   s: "Draft ready",  i: Scroll,      tone: "warning"  },
    { t: "Passports (x4)",     s: "Valid",        i: FileText,    tone: "positive" },
    { t: "Bank Documents",     s: "Vaulted",      i: Wallet,      tone: "positive" },
  ];
  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Scroll} title="Legacy Center" hint="Family vault & inheritance" />

      <div className="glass-theme mt-4 rounded-[2rem] p-5 glow-theme">
        <div className="flex items-center gap-3">
          <Lock className="h-6 w-6 text-theme" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Family Vault</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-xl font-semibold">Sealed · Biometric</div>
          </div>
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground">18 documents · AES-256 encrypted · Cross-generational access</div>
      </div>

      <SubTitle>Documents</SubTitle>
      <div className="mt-3 space-y-2">
        {docs.map(d => <Row key={d.t} icon={d.i} label={d.t} value={d.s} tone={d.tone as any} />)}
      </div>

      <SubTitle>Emergency Contacts</SubTitle>
      <div className="mt-3 space-y-2">
        {[
          { n: "Dr. R. Hassan",     r: "Family Physician" },
          { n: "Bank Concierge",    r: "Financial POC" },
          { n: "Aunt Sarah",        r: "Guardian if needed" },
        ].map(c => (
          <div key={c.n} className="glass flex items-center justify-between rounded-2xl p-3">
            <div>
              <div className="text-sm font-medium">{c.n}</div>
              <div className="text-[11px] text-muted-foreground">{c.r}</div>
            </div>
            <button className="rounded-full glass-theme px-3 py-1.5 text-xs text-theme">Call</button>
          </div>
        ))}
      </div>

      <SubTitle>Will Checklist</SubTitle>
      <div className="glass mt-3 rounded-2xl p-4">
        {[
          { t: "Assets listed",           d: true },
          { t: "Beneficiaries assigned",  d: true },
          { t: "Executor appointed",      d: true },
          { t: "Notarize document",       d: false },
          { t: "Store 2 copies safely",   d: false },
        ].map(x => (
          <div key={x.t} className="flex items-center gap-3 py-1.5">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${x.d ? "bg-theme text-black" : "border border-white/15"}`}>
              {x.d && <CheckCircle2 className="h-3 w-3" />}
            </div>
            <span className={`text-sm ${x.d ? "line-through text-muted-foreground" : ""}`}>{x.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Insights ----------
export function InsightsScreen() {
  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Activity} title="Insights" hint="How your money actually flows" />

      <div className="glass mt-4 rounded-3xl p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Spending by Category · Sep</div>
        <div className="mt-4 space-y-2.5">
          {[
            { l: "Housing",    v: 34, c: "bg-theme" },
            { l: "Food",       v: 18, c: "bg-emerald-400" },
            { l: "Transport",  v: 12, c: "bg-sky-400" },
            { l: "Kids",       v: 11, c: "bg-fuchsia-400" },
            { l: "Fun",        v: 9,  c: "bg-amber-400" },
            { l: "Subs",       v: 7,  c: "bg-orange-400" },
            { l: "Other",      v: 9,  c: "bg-white/40" },
          ].map(x => (
            <div key={x.l}>
              <div className="flex justify-between text-xs"><span>{x.l}</span><span className="text-muted-foreground">{x.v}%</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className={`h-full ${x.c}`} style={{ width: `${x.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass mt-4 rounded-3xl p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Savings · 12 months</div>
        <Sparkline className="mt-3" />
        <div className="mt-2 grid grid-cols-3 text-center">
          <div><div className="text-[10px] text-muted-foreground">Best</div><div className="text-sm text-emerald-400">$1,240</div></div>
          <div><div className="text-[10px] text-muted-foreground">Avg</div><div className="text-sm text-theme">$820</div></div>
          <div><div className="text-[10px] text-muted-foreground">Trend</div><div className="text-sm">+18%</div></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricCard label="Save rate" value="24%" tone="positive" />
        <MetricCard label="Debt / Inc" value="18%" />
        <MetricCard label="Vs Family avg" value="+11%" tone="positive" />
        <MetricCard label="Vs Nation" value="+4%" tone="positive" />
      </div>
    </div>
  );
}

// ---------- Money DNA ----------
export function DNAScreen() {
  const traits = [
    { l: "Weekend Spender",      v: 78, tone: "warning"  },
    { l: "Excellent Saver",      v: 88, tone: "positive" },
    { l: "Impulse Buyer",        v: 42, tone: "warning"  },
    { l: "Investment Minded",    v: 71, tone: "positive" },
    { l: "Bill Punctuality",     v: 94, tone: "positive" },
    { l: "Risk Appetite",        v: 55, tone: "neutral"  },
    { l: "Night Buyer",          v: 63, tone: "warning"  },
  ] as const;
  return (
    <div className="flex-1 px-5 pt-6">
      <SectionTitle icon={Zap} title="Money DNA" hint="Your personal financial genome" />

      <div className="glass-theme mt-4 rounded-[2rem] p-5 glow-theme">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Archetype</div>
        <div style={{ fontFamily: "var(--font-display)" }} className="mt-1 text-3xl font-semibold text-theme">The Strategist</div>
        <p className="mt-2 text-[11px] text-muted-foreground">Disciplined saver with tactical spending bursts. High long-term compounding potential.</p>
      </div>

      <SubTitle>Traits</SubTitle>
      <div className="mt-3 space-y-3">
        {traits.map(t => (
          <div key={t.l}>
            <div className="flex justify-between text-xs">
              <span>{t.l}</span>
              <span className={`${t.tone === "warning" ? "text-amber-400" : t.tone === "positive" ? "text-emerald-400" : "text-muted-foreground"}`}>{t.v}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full ${t.tone === "warning" ? "bg-amber-400" : t.tone === "positive" ? "bg-emerald-400" : "bg-white/30"}`} style={{ width: `${t.v}%` }} />
            </div>
          </div>
        ))}
      </div>

      <AICopilot messages={[
        { tone: "insight", text: "You spend 3.2x more on Fridays. Copilot can auto-lock a Friday cap of $40.", detail: "Would save ~$780/year" },
        { tone: "positive", text: "You've been consistent 47 days. That's Elite tier discipline." },
      ]} />
    </div>
  );
}

// ---------- Micro-primitives ----------
function SectionTitle({ icon: Icon, title, hint }: { icon: React.ComponentType<{ className?: string }>; title: string; hint: string }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-theme" />
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </>
  );
}
function SubTitle({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{children}</div>;
}
function Row({ icon: Icon, label, value, tone = "neutral", hint }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone?: "positive"|"warning"|"neutral"|"insight"; hint?: string;
}) {
  const c = tone === "positive" ? "text-emerald-400" : tone === "warning" ? "text-amber-400" : tone === "insight" ? "text-theme" : "text-foreground";
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5"><Icon className="h-4 w-4 text-theme" /></div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-[10px] text-muted-foreground">{hint}</div>}
      </div>
      <div className={`text-sm font-semibold ${c}`}>{value}</div>
    </div>
  );
}
function MetricCard({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "positive"|"warning"|"neutral" }) {
  const c = tone === "positive" ? "text-emerald-400" : tone === "warning" ? "text-amber-400" : "text-theme";
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${c}`}>{value}</div>
    </div>
  );
}
function FlowCard({ label, value, tone }: { label: string; value: number; tone: "in" | "out" }) {
  const isIn = tone === "in";
  return (
    <div className={`glass rounded-3xl p-4 ${isIn ? "border-emerald-400/20" : "border-red-400/20"} border`}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 flex items-center gap-1 text-2xl font-semibold ${isIn ? "text-emerald-400" : "text-red-400"}`}>
        {isIn ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        ${value.toLocaleString()}
      </div>
    </div>
  );
}
