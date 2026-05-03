import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { login, register } from "../services/authService";
import { useSessionStore } from "../store/sessionStore";

const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;

export function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useSessionStore((state) => state.setSession);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = await register({ name, email, password });
      setSession({
        token: payload.token,
        roles: payload.roles,
        userName: payload.name,
        email: payload.email,
        venueIds: payload.venueIds,
      });
      navigate("/", { replace: true });
    } catch {
      setError("Registration failed. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleContinue() {
    if (googleAuthUrl) {
      window.location.href = googleAuthUrl;
      return;
    }

    setError("Google sign-up placeholder is ready. Add VITE_GOOGLE_AUTH_URL to enable it.");
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/40">
        
        {/* Compact Premium Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-10 text-center text-white sm:px-12">
          {/* Decorative Elements */}
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
              Join the Elite
            </p>
            <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-white">
              Create Identity
            </h1>
            <p className="mt-2 text-xs font-medium text-slate-400">
              Register to access your exclusive StagePass dashboard.
            </p>
          </div>
        </div>

        {/* Form Body - Reduced vertical padding */}
        <div className="p-6 sm:p-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name Field */}
            <div className="space-y-1">
              <label className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Full Name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  minLength={6}
                  required
                  placeholder="Choose a strong password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 pr-24 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-indigo-600 shadow-sm transition-all hover:bg-indigo-50"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Google Section */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGoogleContinue}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 focus:ring-4 focus:ring-indigo-100"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#EA4335" d="M12 11.8v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 4.8 14.7 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 7.6-3.2 7.6-7.8 0-.5-.1-.9-.1-1.3H12z" />
                  <path fill="#34A853" d="M4 12c0 1.4.4 2.8 1.2 4l3.2-2.5c-.2-.5-.4-1-.4-1.5s.1-1 .4-1.5L5.2 8C4.4 9.2 4 10.6 4 12z" />
                  <path fill="#FBBC05" d="M12 20c2.7 0 4.9-.9 6.5-2.5l-3.2-2.6c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.4-4l-3.2 2.5C4.8 17.7 8.1 20 12 20z" />
                  <path fill="#4285F4" d="M18.5 17.5c1.6-1.5 2.6-3.8 2.6-6.4 0-.5-.1-.9-.1-1.3H12v3.9h5.5c-.3 1.4-1.1 2.8-2.2 3.8l3.2 2.6z" />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-600 animate-in fade-in slide-in-from-top-1">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10">
                {loading ? (
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Initialize Account"
                )}
              </span>
            </button>

          </form>

          {/* Footer Navigation */}
          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <p className="text-xs font-medium text-slate-400">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-black uppercase tracking-widest text-indigo-600 transition-colors hover:text-indigo-800 hover:underline hover:underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const setSession = useSessionStore((state) => state.setSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(searchParams.get("googleError"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = await login({ email, password });
      setSession({
        token: payload.token,
        roles: payload.roles,
        userName: payload.name,
        email: payload.email,
        venueIds: payload.venueIds,
      });
      const from = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(from, { replace: true });
    } catch {
      setError("Unable to log in with those credentials.");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleContinue() {
    if (googleAuthUrl) {
      window.location.href = googleAuthUrl;
      return;
    }

    setError("Google sign-in placeholder is ready. Add VITE_GOOGLE_AUTH_URL to enable it.");
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 sm:px-6">
      <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/40">
        
        {/* Premium Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-center text-white sm:px-12">
          {/* Decorative Elements */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
              Secure Access
            </p>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="mt-3 text-sm font-medium text-slate-400">
              Enter your credentials to manage your StagePass identity.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 sm:p-12">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 pr-28 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm transition-all hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleContinue}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 focus:ring-4 focus:ring-indigo-100"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12 11.8v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 4.8 14.7 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 7.6-3.2 7.6-7.8 0-.5-.1-.9-.1-1.3H12z" />
                <path fill="#34A853" d="M4 12c0 1.4.4 2.8 1.2 4l3.2-2.5c-.2-.5-.4-1-.4-1.5s.1-1 .4-1.5L5.2 8C4.4 9.2 4 10.6 4 12z" />
                <path fill="#FBBC05" d="M12 20c2.7 0 4.9-.9 6.5-2.5l-3.2-2.6c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.4-4l-3.2 2.5C4.8 17.7 8.1 20 12 20z" />
                <path fill="#4285F4" d="M18.5 17.5c1.6-1.5 2.6-3.8 2.6-6.4 0-.5-.1-.9-.1-1.3H12v3.9h5.5c-.3 1.4-1.1 2.8-2.2 3.8l3.2 2.6z" />
              </svg>
              Google
            </button>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600 animate-in fade-in slide-in-from-top-2">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10">
                {loading ? (
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Authenticate"
                )}
              </span>
            </button>

          </form>

          {/* Footer Registration Link */}
          <div className="mt-10 border-t border-slate-100 pt-8 text-center">
            <p className="text-sm font-medium text-slate-400">
              New to StagePass?{" "}
              <Link 
                to="/register" 
                className="font-black uppercase tracking-widest text-indigo-600 transition-colors hover:text-indigo-800 hover:underline hover:underline-offset-4"
              >
                Create Identity
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
