import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { AdminPage } from "./pages/AdminPage";
import { CitizenPage } from "./pages/CitizenPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const [session, setSession] = useState(null);
  const [theme, setTheme] = useState(() => window.localStorage.getItem("civicvoice-theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("civicvoice-theme", theme);
  }, [theme]);
  return (
    <>
      <Header user={session?.user} onLogout={() => setSession(null)} theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      {!session && <LoginPage onLogin={setSession} />}
      {session?.user.role === "citizen" && <CitizenPage user={session.user} />}
      {session?.user.role === "admin" && <AdminPage user={session.user} />}
    </>
  );
}
