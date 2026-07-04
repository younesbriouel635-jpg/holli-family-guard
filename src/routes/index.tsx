import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Globe, Check, Flame, Plus, AlertTriangle, Crown, Sparkles, Target,
  Car, Home as HomeIcon, ShoppingBag, Briefcase, GraduationCap, Coffee,
  Utensils, Fuel, Film, Gift, Heart, Bus, ArrowLeft,
  Users, Trophy, Eye, Lock, Zap, Shield, ChevronRight, MoreHorizontal,
} from "lucide-react";
import {
  AICopilot, WealthScoreCard, MoreHub, WealthScreen, TimelineScreen,
  SimulatorScreen, CalendarScreen, SubscriptionsScreen, MissionsScreen,
  ChildScreen, LegacyScreen, InsightsScreen, DNAScreen,
  type PlusScreen,
} from "@/components/holli-plus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HOLLI — Family Financial Guardrail" },
      { name: "description", content: "Ultra-premium family financial ecosystem. Lock daily budgets, sync the family, achieve dream goals." },
    ],
  }),
  component: HolliApp,
});

// ---------- i18n ----------
const LANGS = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
  { code: "fr", label: "French", native: "Français", dir: "ltr" },
  { code: "es", label: "Spanish", native: "Español", dir: "ltr" },
  { code: "pt", label: "Portuguese", native: "Português", dir: "ltr" },
  { code: "de", label: "German", native: "Deutsch", dir: "ltr" },
] as const;

type LangCode = typeof LANGS[number]["code"];

const T: Record<string, Record<LangCode, string>> = {
  welcome: { en: "Welcome to", ar: "أهلاً بك في", fr: "Bienvenue sur", es: "Bienvenido a", pt: "Bem-vindo ao", de: "Willkommen bei" },
  tagline: {
    en: "The family financial guardrail. Built for legacies.",
    ar: "الحارس المالي للعائلة. مصمم للإرث.",
    fr: "Le garde-fou financier familial. Conçu pour les héritages.",
    es: "El guardián financiero familiar. Diseñado para legados.",
    pt: "O guarda-corpo financeiro da família. Construído para legados.",
    de: "Das finanzielle Schutzgeländer der Familie. Für Vermächtnisse.",
  },
  begin: { en: "Begin", ar: "ابدأ", fr: "Commencer", es: "Comenzar", pt: "Começar", de: "Beginnen" },
  language: { en: "Language", ar: "اللغة", fr: "Langue", es: "Idioma", pt: "Idioma", de: "Sprache" },
};

// ---------- Types ----------
type Profile = "men" | "women" | "boys" | "girls" | "kid";
type Screen = "lang" | "welcome" | "auth" | "profile" | "goal" | "budget" | "dashboard" | "squad" | "vault" | "pricing" | "more" | PlusScreen;

interface UserData {
  email: string;
  name: string;
  gender: "male" | "female" | "";
  age: number;
  goalTitle: string;
  goalIcon: string;
  goalPrice: number;
  months: number;
  monthlyIncome: number;
}

// ---------- Component ----------
function HolliApp() {
  const [lang, setLang] = useState<LangCode>("en");
  const [screen, setScreen] = useState<Screen>("lang");
  const [profile, setProfile] = useState<Profile>("men");
  const [data, setData] = useState<UserData>({
    email: "",
    name: "", gender: "", age: 30,
    goalTitle: "", goalIcon: "✨",
    goalPrice: 25000, months: 18, monthlyIncome: 4500,
  });

  // Auto-derive profile theme from gender+age
  useEffect(() => {
    if (!data.gender) return;
    if (data.age < 13) setProfile("kid");
    else if (data.age < 18) setProfile(data.gender === "male" ? "boys" : "girls");
    else setProfile(data.gender === "male" ? "men" : "women");
  }, [data.gender, data.age]);

  const langDir = LANGS.find(l => l.code === lang)?.dir ?? "ltr";

  return (
    <div
      data-theme={profile}
      dir={langDir}
      className="min-h-screen w-full text-foreground"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {screen === "lang" && <LanguageScreen lang={lang} setLang={setLang} onNext={() => setScreen("welcome")} />}
        {screen === "welcome" && <WelcomeScreen lang={lang} onNext={() => setScreen("auth")} />}
        {screen === "auth" && <AuthScreen data={data} setData={setData} onBack={() => setScreen("welcome")} onNext={() => setScreen("profile")} />}
        {screen === "profile" && <ProfileScreen data={data} setData={setData} onNext={() => setScreen("goal")} />}
        {screen === "goal" && <GoalScreen data={data} setData={setData} onBack={() => setScreen("profile")} onNext={() => setScreen("budget")} />}
        {screen === "budget" && <BudgetScreen data={data} setData={setData} onBack={() => setScreen("goal")} onNext={() => setScreen("dashboard")} />}
        {(screen === "dashboard" || screen === "squad" || screen === "vault" || screen === "pricing" || screen === "more" ||
          screen === "wealth" || screen === "timeline" || screen === "simulator" || screen === "calendar" ||
          screen === "subscriptions" || screen === "missions" || screen === "child" || screen === "legacy" ||
          screen === "insights" || screen === "dna") && (
          <MainApp screen={screen} setScreen={setScreen} data={data} profile={profile} setProfile={setProfile} />
        )}
      </div>
    </div>
  );
}

// ---------- Screens ----------

function LanguageScreen({ lang, setLang, onNext }: { lang: LangCode; setLang: (l: LangCode) => void; onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col px-6 pt-16 pb-10">
      <div className="mb-12 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-2xl glow-theme rounded-full" />
          <Globe className="h-10 w-10 text-theme" strokeWidth={1.2} />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)" }} className="mt-6 text-4xl font-medium tracking-tight">
          {T.language[lang]}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Choose your tongue</p>
      </div>

      <div className="mx-auto w-full glass rounded-3xl p-2.5">
        <div className="flex flex-col gap-1.5">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 transition-all ${
                lang === l.code
                  ? "glass-theme glow-theme"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-base font-medium">{l.native}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{l.label}</span>
              </div>
              {lang === l.code && <Check className="h-5 w-5 text-theme" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      </div>

      <button onClick={onNext} className="mt-auto mt-10 w-full rounded-full bg-theme py-4 text-base font-semibold text-black glow-theme transition active:scale-[0.98]">
        {T.begin[lang]} →
      </button>
    </div>
  );
}

function WelcomeScreen({ lang, onNext }: { lang: LangCode; onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-between px-6 pt-20 pb-10 text-center">
      <div className="flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">{T.welcome[lang]}</span>
        <h1
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          className="mt-4 text-7xl font-semibold shimmer"
        >
          HOLLI
        </h1>
        <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-[var(--theme)] to-transparent" />
        <p className="mt-8 max-w-[280px] text-[15px] leading-relaxed text-muted-foreground">
          {T.tagline[lang]}
        </p>
      </div>

      <div className="my-10 grid w-full grid-cols-3 gap-3">
        {[
          { icon: Shield, label: "Guardrail" },
          { icon: Users, label: "Family Sync" },
          { icon: Sparkles, label: "AI Vision" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="glass flex flex-col items-center gap-2 rounded-2xl px-3 py-5">
            <Icon className="h-5 w-5 text-theme" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="w-full rounded-full bg-theme py-4 text-base font-semibold text-black glow-theme transition active:scale-[0.98]">
        {T.begin[lang]} →
      </button>
    </div>
  );
}

function AuthScreen({ data, setData, onBack, onNext }: { data: UserData; setData: (d: UserData) => void; onBack: () => void; onNext: () => void }) {
  const [email, setEmail] = useState(data.email);
  const [focused, setFocused] = useState(false);
  const [phase, setPhase] = useState<"idle" | "securing" | "done">("idle");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = (finalEmail: string) => {
    if (phase !== "idle") return;
    setEmail(finalEmail);
    setPhase("securing");
    setTimeout(() => {
      setData({ ...data, email: finalEmail });
      try { localStorage.setItem("holli:email", finalEmail); } catch {}
      setPhase("done");
      setTimeout(onNext, 700);
    }, 1100);
  };

  return (
    <div className="flex flex-1 flex-col px-6 pt-14 pb-10">
      <StepHeader step={0} of={3} title="Secure Access" subtitle="Your private gateway into HOLLI." onBack={onBack} />

      <div className="mt-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-2xl glow-theme rounded-full" />
          <div className="glass-theme flex h-16 w-16 items-center justify-center rounded-2xl">
            <Lock className="h-7 w-7 text-theme" strokeWidth={1.4} />
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-display)" }} className="mt-5 text-xl font-medium tracking-tight">
          End-to-end encrypted vault
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Your email · your legacy
        </p>
      </div>

      {/* Email field */}
      <div
        className={`mt-9 rounded-3xl p-[1px] transition-all duration-500 ${
          focused || valid ? "glow-theme" : ""
        }`}
        style={{
          background: focused || valid
            ? "linear-gradient(135deg, color-mix(in oklab, var(--theme) 70%, transparent), color-mix(in oklab, var(--theme-soft) 30%, transparent))"
            : "rgba(255,255,255,0.08)",
        }}
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-[#080808] px-5 py-4">
          <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Gmail address</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={phase !== "idle"}
            placeholder="you@gmail.com"
            className="mt-1 w-full bg-transparent text-lg font-medium outline-none placeholder:text-white/15"
          />
        </div>
      </div>

      {/* Google button */}
      <button
        onClick={() => handleAuth(valid ? email : "guardian@gmail.com")}
        disabled={phase !== "idle"}
        className="mt-4 flex w-full items-center justify-center gap-3 rounded-full glass border border-white/15 py-4 text-[15px] font-medium transition-all hover:border-white/30 active:scale-[0.98] disabled:opacity-60"
      >
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.4 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
        </svg>
        Continue with Google
      </button>

      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <div className="h-px flex-1 bg-white/10" />or<div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        onClick={() => handleAuth(email)}
        disabled={!valid || phase !== "idle"}
        className="mt-4 w-full rounded-full bg-theme py-4 text-base font-semibold text-black glow-theme transition active:scale-[0.98] disabled:opacity-30 disabled:glow-theme-none"
      >
        {phase === "securing" ? "Securing…" : phase === "done" ? "✓ Vault unlocked" : "Continue with Email →"}
      </button>

      <p className="mt-5 text-center text-[10px] leading-relaxed text-muted-foreground">
        <Shield className="mr-1 inline h-3 w-3 text-theme" />
        AES-256 encrypted · Never shared · Family-bound
      </p>

      {/* Securing overlay */}
      {phase !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border border-theme/30" />
              <div className="absolute inset-0 rounded-full border-t-2 border-theme animate-spin" style={{ animationDuration: "1.1s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                {phase === "done"
                  ? <Check className="h-8 w-8 text-theme" strokeWidth={2.5} />
                  : <Lock className="h-7 w-7 text-theme" strokeWidth={1.4} />}
              </div>
            </div>
            <div className="text-center">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-lg font-medium">
                {phase === "done" ? "Identity confirmed" : "Encrypting your vault"}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{email}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileScreen({ data, setData, onNext }: { data: UserData; setData: (d: UserData) => void; onNext: () => void }) {
  const valid = data.name.trim().length > 1 && data.gender !== "" && data.age > 0;
  return (
    <div className="flex flex-1 flex-col px-6 pt-14 pb-10">
      <StepHeader step={1} of={3} title="Your Identity" subtitle="HOLLI tailors itself to who you are." />

      <div className="mt-8 space-y-5">
        <Field label="Name">
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="e.g. Alexander"
            className="w-full bg-transparent text-xl font-medium outline-none placeholder:text-white/20"
          />
        </Field>

        <Field label="Gender">
          <div className="grid grid-cols-2 gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setData({ ...data, gender: g })}
                className={`rounded-2xl py-3 text-sm font-medium capitalize transition-all ${
                  data.gender === g
                    ? "glass-theme text-theme glow-theme"
                    : "border border-white/10 text-muted-foreground hover:border-white/20"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Field>

        <Field label={`Age — ${data.age}`}>
          <input
            type="range" min={6} max={75} value={data.age}
            onChange={(e) => setData({ ...data, age: +e.target.value })}
            className="h-1 w-full accent-[var(--theme)]"
          />
          <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Kid</span><span>Teen</span><span>Adult</span><span>Legacy</span>
          </div>
        </Field>

        <Field label="Monthly Income (USD)">
          <input
            type="number" value={data.monthlyIncome || ""}
            onChange={(e) => setData({ ...data, monthlyIncome: +e.target.value || 0 })}
            placeholder="e.g. 4500"
            className="w-full bg-transparent text-xl font-medium outline-none placeholder:text-white/20"
          />
        </Field>
      </div>

      <button
        onClick={onNext} disabled={!valid}
        className="mt-auto mt-10 w-full rounded-full bg-theme py-4 text-base font-semibold text-black glow-theme transition active:scale-[0.98] disabled:opacity-30 disabled:glow-theme-none"
      >
        Continue →
      </button>
    </div>
  );
}

const PRESET_GOALS = [
  { icon: Car, emoji: "🏎️", title: "Dream Car", price: 65000 },
  { icon: HomeIcon, emoji: "🏛️", title: "First House", price: 180000 },
  { icon: ShoppingBag, emoji: "👜", title: "Luxury Fashion", price: 8500 },
  { icon: Briefcase, emoji: "💼", title: "Business Fund", price: 30000 },
  { icon: GraduationCap, emoji: "🎓", title: "High-Income Course", price: 4500 },
];

function GoalScreen({ data, setData, onBack, onNext }: { data: UserData; setData: (d: UserData) => void; onBack: () => void; onNext: () => void }) {
  const [custom, setCustom] = useState(data.goalTitle && !PRESET_GOALS.find(g => g.title === data.goalTitle) ? data.goalTitle : "");

  return (
    <div className="flex flex-1 flex-col px-6 pt-14 pb-10">
      <StepHeader step={2} of={3} title="Your Vision" subtitle="Pick a luxury goal — or write your own dream." onBack={onBack} />

      <div className="mt-8 grid grid-cols-2 gap-3">
        {PRESET_GOALS.map((g) => {
          const active = data.goalTitle === g.title;
          return (
            <button
              key={g.title}
              onClick={() => { setData({ ...data, goalTitle: g.title, goalIcon: g.emoji, goalPrice: g.price }); setCustom(""); }}
              className={`relative flex flex-col items-start gap-3 rounded-3xl p-4 text-left transition-all ${
                active ? "glass-theme glow-theme" : "glass hover:border-white/15"
              }`}
            >
              <div className="text-3xl">{g.emoji}</div>
              <div>
                <div className="text-sm font-semibold">{g.title}</div>
                <div className="text-[11px] text-muted-foreground">~${g.price.toLocaleString()}</div>
              </div>
              {active && <Check className="absolute right-3 top-3 h-4 w-4 text-theme" strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Or write your own</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className={`glass rounded-3xl p-4 ${custom ? "glass-theme glow-theme" : ""}`}>
          <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Other Target</label>
          <input
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setData({ ...data, goalTitle: e.target.value, goalIcon: "✨", goalPrice: data.goalPrice });
            }}
            placeholder="Write your own goal..."
            className="mt-1 w-full bg-transparent text-lg font-medium outline-none placeholder:text-white/20"
          />
        </div>
      </div>

      <button
        onClick={onNext} disabled={!data.goalTitle}
        className="mt-auto mt-8 w-full rounded-full bg-theme py-4 text-base font-semibold text-black glow-theme transition active:scale-[0.98] disabled:opacity-30"
      >
        Set Price & Timeline →
      </button>
    </div>
  );
}

function BudgetScreen({ data, setData, onBack, onNext }: { data: UserData; setData: (d: UserData) => void; onBack: () => void; onNext: () => void }) {
  const monthlySave = data.goalPrice / data.months;
  const dailyBudget = monthlySave / 30;
  const incomeRatio = data.monthlyIncome > 0 ? monthlySave / data.monthlyIncome : 1;

  // AI feasibility
  const status: "ideal" | "tight" | "extreme" =
    incomeRatio < 0.25 ? "ideal" : incomeRatio < 0.45 ? "tight" : "extreme";

  const suggestedMonths = Math.ceil(data.goalPrice / (data.monthlyIncome * 0.2));
  const suggestedDaily = data.goalPrice / suggestedMonths / 30;

  return (
    <div className="flex flex-1 flex-col px-6 pt-14 pb-10">
      <StepHeader step={3} of={3} title="The Math" subtitle="HOLLI's AI feasibility engine." onBack={onBack} />

      <div className="mt-6 glass rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{data.goalIcon}</div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Vision</div>
            <div className="truncate text-base font-semibold">{data.goalTitle || "—"}</div>
          </div>
        </div>
      </div>

      <Field label={`Total Target Price — $${data.goalPrice.toLocaleString()}`} className="mt-5">
        <input
          type="number" value={data.goalPrice || ""}
          onChange={(e) => setData({ ...data, goalPrice: +e.target.value || 0 })}
          className="w-full bg-transparent text-2xl font-semibold text-theme outline-none"
        />
      </Field>

      <Field label={`Target Timeframe — ${data.months} months`} className="mt-4">
        <input
          type="range" min={3} max={120} value={data.months}
          onChange={(e) => setData({ ...data, months: +e.target.value })}
          className="h-1 w-full accent-[var(--theme)]"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>3 mo</span><span>2 yrs</span><span>5 yrs</span><span>10 yrs</span>
        </div>
      </Field>

      {/* AI Insight Card */}
      <div className={`mt-6 rounded-3xl p-5 transition-all ${status === "ideal" ? "glass-theme glow-theme" : status === "tight" ? "glass border-amber-500/30" : "glass border-red-500/30"}`}>
        <div className="flex items-center gap-2">
          <Sparkles className={`h-4 w-4 ${status === "ideal" ? "text-theme" : status === "tight" ? "text-amber-400" : "text-red-400"}`} />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">HOLLI AI Insight</span>
        </div>
        {status === "ideal" ? (
          <p className="mt-3 text-sm leading-relaxed">
            <span className="text-theme font-semibold">Highly Feasible.</span> Your HOLLI Daily Guardrail will lock this target smoothly in <b>{data.months} months</b> at just <b>${dailyBudget.toFixed(2)}/day</b>.
          </p>
        ) : status === "tight" ? (
          <p className="mt-3 text-sm leading-relaxed">
            <span className="text-amber-400 font-semibold">Smart Suggestion.</span> Extending your timeframe by <b>{suggestedMonths - data.months} months</b> reduces daily stress to <b>${suggestedDaily.toFixed(2)}/day</b>.
          </p>
        ) : (
          <>
            <p className="mt-3 text-sm leading-relaxed">
              <span className="text-red-400 font-semibold">Too tight.</span> This requires <b>{(incomeRatio * 100).toFixed(0)}%</b> of your income. To protect your peace, HOLLI recommends:
            </p>
            <button
              onClick={() => setData({ ...data, months: suggestedMonths })}
              className="mt-3 w-full rounded-2xl glass-theme py-3 text-sm font-semibold text-theme"
            >
              Auto-adjust to {suggestedMonths} months · ${suggestedDaily.toFixed(2)}/day
            </button>
          </>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Metric label="Monthly" value={`$${monthlySave.toFixed(0)}`} />
        <Metric label="Daily" value={`$${dailyBudget.toFixed(2)}`} />
        <Metric label="Income %" value={`${(incomeRatio * 100).toFixed(0)}%`} />
      </div>

      <button onClick={onNext} className="mt-auto mt-8 w-full rounded-full bg-theme py-4 text-base font-semibold text-black glow-theme transition active:scale-[0.98]">
        Enter HOLLI →
      </button>
    </div>
  );
}

// ---------- Main App ----------

function MainApp({ screen, setScreen, data, profile, setProfile }: {
  screen: Screen; setScreen: (s: Screen) => void; data: UserData; profile: Profile; setProfile: (p: Profile) => void;
}) {
  return (
    <div className="flex flex-1 flex-col pb-24">
      <TopBar data={data} profile={profile} setProfile={setProfile} />
      {screen === "dashboard" && <Dashboard data={data} />}
      {screen === "squad" && <SquadScreen data={data} />}
      {screen === "vault" && <VaultScreen data={data} />}
      {screen === "pricing" && <PricingScreen />}
      {screen === "more" && <MoreHub open={(s) => setScreen(s)} />}
      {screen === "wealth" && <WealthScreen income={data.monthlyIncome} />}
      {screen === "timeline" && <TimelineScreen />}
      {screen === "simulator" && <SimulatorScreen baseIncome={data.monthlyIncome} />}
      {screen === "calendar" && <CalendarScreen />}
      {screen === "subscriptions" && <SubscriptionsScreen />}
      {screen === "missions" && <MissionsScreen />}
      {screen === "child" && <ChildScreen />}
      {screen === "legacy" && <LegacyScreen />}
      {screen === "insights" && <InsightsScreen />}
      {screen === "dna" && <DNAScreen />}
      <BottomNav screen={screen} setScreen={setScreen} />
    </div>
  );
}

function TopBar({ data, profile, setProfile }: { data: UserData; profile: Profile; setProfile: (p: Profile) => void }) {
  const profiles: { id: Profile; label: string; emoji: string }[] = [
    { id: "men", label: "Father", emoji: "👨" },
    { id: "women", label: "Mother", emoji: "👩" },
    { id: "boys", label: "Son", emoji: "🧑" },
    { id: "girls", label: "Daughter", emoji: "👧" },
    { id: "kid", label: "Kid", emoji: "🧒" },
  ];
  return (
    <div className="px-5 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">HOLLI</div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-medium">Hello, {data.name || "Friend"}</div>
        </div>
        <div className="glass flex items-center gap-1.5 rounded-full p-1">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setProfile(p.id)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition ${profile === p.id ? "bg-theme glow-theme" : "hover:bg-white/5"}`}
              title={p.label}
            >
              <span>{p.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ data }: { data: UserData }) {
  const dailyBudget = data.goalPrice / data.months / 30;
  const [spent, setSpent] = useState(dailyBudget * 0.35);
  const [streak, setStreak] = useState(47);
  const [showFab, setShowFab] = useState(false);
  const [emergency, setEmergency] = useState(false);

  const remaining = Math.max(0, dailyBudget - spent);
  const pct = Math.min(1, spent / dailyBudget);
  const overspend = spent > dailyBudget;

  return (
    <div className="flex-1 px-5 pt-6">
      {/* Ring */}
      <div className="glass relative flex flex-col items-center rounded-[2rem] px-6 py-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Remaining Today</span>
        <div className="relative my-4">
          <Ring percent={pct} size={210} stroke={14} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">USD</div>
            <div style={{ fontFamily: "var(--font-display)" }} className={`text-5xl font-semibold ${overspend ? "text-red-400" : "text-theme"}`}>
              ${remaining.toFixed(2)}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">of ${dailyBudget.toFixed(2)} budget</div>
          </div>
        </div>

        {/* Streak */}
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
            <Flame className="h-5 w-5 animate-flame" style={{ color: "#FFA500" }} />
            <span className="text-sm font-semibold">{streak}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">streak</span>
          </div>
          <button
            onClick={() => setEmergency(true)}
            className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400"
          >
            <AlertTriangle className="h-4 w-4" />
            Brake
          </button>
        </div>
      </div>

      {/* Vault preview */}
      <div className="glass mt-4 rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{data.goalIcon}</div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Vision Vault</div>
              <div className="text-sm font-semibold">{data.goalTitle}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold text-theme">23%</div>
            <div className="text-[10px] text-muted-foreground">${(data.goalPrice * 0.23).toFixed(0)} / ${data.goalPrice.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-theme glow-theme" style={{ width: "23%" }} />
        </div>
      </div>

      {/* AI Copilot woven into the dashboard */}
      <AICopilot messages={[
        { tone: overspend ? "warning" : "positive",
          text: overspend
            ? `You're $${(spent - dailyBudget).toFixed(2)} over today. This delays "${data.goalTitle || "your goal"}" by ~${Math.ceil((spent - dailyBudget)/dailyBudget)} days.`
            : `You can safely spend $${remaining.toFixed(2)} more today.`,
          detail: `Daily lock $${dailyBudget.toFixed(2)} · Streak ${streak}d`,
        },
        { tone: "insight", text: "You usually overspend every Friday by ~34%.", detail: "Copilot can auto-lock a Friday cap." },
        { tone: "positive", text: "You're 17% ahead of your monthly savings target." },
        { tone: "warning", text: "3 subscriptions look unused — potential savings $820/yr.", detail: "Tap Subscriptions to review" },
      ]} />

      {/* HOLLI Wealth Score */}
      <WealthScoreCard score={782} delta={14} />

      {/* Quick category preview */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { icon: Coffee, label: "Coffee" },
          { icon: Utensils, label: "Food" },
          { icon: Fuel, label: "Fuel" },
          { icon: Film, label: "Fun" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => { setShowFab(true); }}
            className="glass flex flex-col items-center gap-1.5 rounded-2xl py-3"
          >
            <Icon className="h-4 w-4 text-theme" />
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </button>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowFab(true)}
        className="fixed bottom-24 right-1/2 z-30 translate-x-[8.5rem] rounded-full bg-theme p-4 glow-theme transition active:scale-95"
        aria-label="Log expense"
      >
        <Plus className="h-6 w-6 text-black" strokeWidth={3} />
      </button>

      {/* Expense sheet */}
      {showFab && (
        <Sheet onClose={() => setShowFab(false)} title="Quick Log">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Coffee, label: "Coffee", v: 5 },
              { icon: Utensils, label: "Food", v: 18 },
              { icon: Fuel, label: "Fuel", v: 40 },
              { icon: Film, label: "Fun", v: 15 },
              { icon: Bus, label: "Transit", v: 8 },
              { icon: Gift, label: "Gift", v: 25 },
              { icon: ShoppingBag, label: "Shop", v: 60 },
              { icon: Heart, label: "Care", v: 30 },
              { icon: Sparkles, label: "Other", v: 10 },
            ].map(({ icon: Icon, label, v }) => (
              <button
                key={label}
                onClick={() => { setSpent(spent + v); setShowFab(false); }}
                className="glass flex flex-col items-center gap-2 rounded-2xl py-4 transition active:scale-95"
              >
                <Icon className="h-5 w-5 text-theme" />
                <span className="text-[11px]">{label}</span>
                <span className="text-[10px] text-muted-foreground">${v}</span>
              </button>
            ))}
          </div>
        </Sheet>
      )}

      {emergency && (
        <Sheet onClose={() => setEmergency(false)} title="🚨 Emergency Brake">
          <p className="text-sm leading-relaxed text-muted-foreground">
            HOLLI's <span className="text-theme">AI Soft Guard</span> will absorb today's overspending into your weekly buffer — your streak survives.
          </p>
          <div className="mt-4 glass-theme rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Soft-guard absorption</div>
            <div className="mt-1 text-2xl font-semibold text-theme">${(dailyBudget * 0.5).toFixed(2)}</div>
            <div className="text-[11px] text-muted-foreground">deducted from next 7 days' buffer</div>
          </div>
          <button
            onClick={() => { setSpent(dailyBudget * 0.35); setStreak(streak + 0); setEmergency(false); }}
            className="mt-4 w-full rounded-full bg-theme py-4 text-sm font-semibold text-black glow-theme"
          >
            Activate Guard
          </button>
        </Sheet>
      )}
    </div>
  );
}

function SquadScreen({ data }: { data: UserData }) {
  const squad = [
    { name: data.name || "You", role: "You", streak: 47, theme: "men", emoji: "👨", goal: data.goalTitle, email: data.email || "you@gmail.com" },
    { name: "Layla", role: "Mother", streak: 62, theme: "women", emoji: "👩", goal: "Spa Sanctuary", email: "layla.h@gmail.com" },
    { name: "Adam", role: "Son", streak: 28, theme: "boys", emoji: "🧑", goal: "Gaming PC", email: "adam.h@gmail.com" },
    { name: "Maya", role: "Daughter", streak: 35, theme: "girls", emoji: "👧", goal: "Art Easel", email: "maya.h@gmail.com" },
    { name: "Noah", role: "Kid", streak: 12, theme: "kid", emoji: "🧒", goal: "LEGO Set", email: "noah.h@gmail.com" },
  ].sort((a, b) => b.streak - a.streak);

  return (
    <div className="flex-1 px-5 pt-6">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-theme" />
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold">HOLLI Squad</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Discipline is contagious. Rank by streak.</p>

      <div className="mt-5 space-y-3">
        {squad.map((m, i) => (
          <div key={m.name} data-theme={m.theme} className="glass-theme flex items-center gap-4 rounded-3xl p-4">
            <div className="text-3xl">{m.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{m.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.role}</span>
              </div>
              <div className="text-[11px] text-muted-foreground truncate">→ {m.goal}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4" style={{ color: "#FFA500" }} />
                <span className="text-lg font-bold text-theme">{m.streak}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">#{i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Parent radar */}
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-theme" />
          <h3 className="text-sm font-semibold uppercase tracking-widest">Parent Insights Hub</h3>
        </div>
        <div className="mt-3 space-y-2">
          {squad.filter(m => m.role === "Son" || m.role === "Daughter" || m.role === "Kid").map((m) => (
            <div key={m.name} className="glass flex items-center justify-between rounded-2xl p-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-xl">{m.emoji}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{m.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-theme/30 px-1.5 py-0.5 text-[8px] uppercase tracking-widest text-theme">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} /> synced
                    </span>
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground">{m.email}</div>
                  <div className="text-[10px] text-muted-foreground">{m.goal} · 41% funded</div>
                </div>
              </div>
              <button className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[11px]">
                Boost <ChevronRight className="inline h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VaultScreen({ data }: { data: UserData }) {
  const funded = data.goalPrice * 0.23;
  const dailyBudget = data.goalPrice / data.months / 30;
  return (
    <div className="flex-1 px-5 pt-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-theme" />
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold">Vision Reward Vault</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Every locked dollar funds your dream.</p>

      <div className="mt-6 glass-theme rounded-[2rem] p-6 text-center glow-theme">
        <div className="text-6xl">{data.goalIcon}</div>
        <div style={{ fontFamily: "var(--font-display)" }} className="mt-3 text-2xl font-semibold">{data.goalTitle}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">${data.goalPrice.toLocaleString()} target</div>

        <div className="mt-5 relative h-3 w-full overflow-hidden rounded-full bg-black/40">
          <div className="absolute inset-y-0 left-0 rounded-full bg-theme glow-theme" style={{ width: "23%" }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px]">
          <span className="text-theme font-semibold">${funded.toFixed(0)} locked</span>
          <span className="text-muted-foreground">${(data.goalPrice - funded).toFixed(0)} to go</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Daily lock" value={`$${dailyBudget.toFixed(2)}`} />
        <Metric label="Months left" value={`${Math.ceil(data.months * 0.77)}`} />
      </div>

      <div className="mt-5 glass rounded-3xl p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Recent locks</div>
        <div className="mt-3 space-y-3">
          {[
            { d: "Today", a: 11.40 },
            { d: "Yesterday", a: 12.10 },
            { d: "Mon", a: 9.80 },
            { d: "Sun", a: 13.00 },
          ].map(x => (
            <div key={x.d} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{x.d}</span>
              <span className="font-semibold text-theme">+${x.a.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingScreen() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="flex-1 px-5 pt-6">
      <div className="flex items-center gap-2">
        <Crown className="h-5 w-5 text-theme" />
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold">Legacy Pass</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Built for families who think in generations.</p>

      <div className="mt-5 glass inline-flex rounded-full p-1">
        <button onClick={() => setAnnual(false)} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${!annual ? "bg-theme text-black" : "text-muted-foreground"}`}>Monthly</button>
        <button onClick={() => setAnnual(true)} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${annual ? "bg-theme text-black" : "text-muted-foreground"}`}>Annual · Save 2 mo</button>
      </div>

      <div className="mt-5 glass-theme rounded-[2rem] p-6 glow-theme">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{annual ? "Annual Legacy Pass" : "Monthly Pass"}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span style={{ fontFamily: "var(--font-display)" }} className="text-5xl font-semibold text-theme">${annual ? "200" : "20"}</span>
              <span className="text-xs text-muted-foreground">/{annual ? "year" : "month"}</span>
            </div>
            {annual && <div className="mt-1 text-[11px] text-theme">2 months FREE</div>}
          </div>
          <Crown className="h-8 w-8 text-theme" />
        </div>

        <div className="mt-5 space-y-2.5">
          {[
            "Unlimited family members",
            "AI Soft Guard & Smart Suggestions",
            "Full Parent Insights Hub",
            "Custom unlimited Vision Vaults",
            "Multi-currency & 6 languages",
            "Priority concierge",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm">
              <Check className="h-4 w-4 text-theme" strokeWidth={3} />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full rounded-full bg-theme py-3.5 text-sm font-semibold text-black">
          Unlock Legacy
        </button>
      </div>

      <div className="mt-4 glass rounded-3xl p-5 text-center">
        <Zap className="mx-auto h-5 w-5 text-theme" />
        <div className="mt-2 text-sm font-semibold">Free forever — if you invite 20 friends</div>
        <div className="mt-1 text-[11px] text-muted-foreground">Share HOLLI. When 20 join, your Legacy Pass is on the house.</div>
        <button className="mt-4 w-full rounded-full border border-white/10 py-3 text-xs font-semibold uppercase tracking-widest">
          Invite Friends · 0 / 20
        </button>
      </div>
    </div>
  );
}

// ---------- Reusable ----------

function StepHeader({ step, of, title, subtitle, onBack }: { step: number; of: number; title: string; subtitle: string; onBack?: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {onBack ? (
          <button onClick={onBack} className="rounded-full glass p-2"><ArrowLeft className="h-4 w-4" /></button>
        ) : <div />}
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Step {step} / {of}</div>
        <div className="w-8" />
      </div>
      <h1 style={{ fontFamily: "var(--font-display)" }} className="mt-6 text-3xl font-medium">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-4 flex gap-1.5">
        {Array.from({ length: of }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < step ? "bg-theme glow-theme" : "bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-3xl p-4 ${className}`}>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold text-theme">{value}</div>
    </div>
  );
}

function Ring({ percent, size, stroke }: { percent: number; size: number; stroke: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(1, Math.max(0, percent)));
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--theme)" />
          <stop offset="100%" stopColor="var(--theme-soft)" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2} cy={size/2} r={r}
        stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round" fill="none"
        strokeDasharray={c} strokeDashoffset={offset}
        style={{ filter: "drop-shadow(0 0 12px var(--theme))", transition: "stroke-dashoffset 700ms cubic-bezier(.2,.8,.2,1)" }}
      />
    </svg>
  );
}

function BottomNav({ screen, setScreen }: { screen: Screen; setScreen: (s: Screen) => void }) {
  const tabs = [
    { id: "dashboard" as const, icon: Shield, label: "Guard" },
    { id: "squad" as const, icon: Users, label: "Squad" },
    { id: "vault" as const, icon: Target, label: "Vault" },
    { id: "more" as const, icon: MoreHorizontal, label: "More" },
    { id: "pricing" as const, icon: Crown, label: "Pass" },
  ];
  return (
    <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4 pb-4 pt-2">
      <div className="glass flex items-center justify-around rounded-full p-1.5">
        {tabs.map((t) => {
          const active = screen === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setScreen(t.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 transition ${active ? "bg-theme glow-theme text-black" : "text-muted-foreground"}`}
            >
              <t.icon className="h-4 w-4" strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[9px] font-semibold uppercase tracking-widest">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Sheet({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-[2rem] glass p-5 pb-8"
        style={{ background: "linear-gradient(180deg, rgba(20,20,20,0.95), rgba(8,8,8,0.98))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20" />
        <div className="mb-4 flex items-center justify-between">
          <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-xs text-muted-foreground">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
