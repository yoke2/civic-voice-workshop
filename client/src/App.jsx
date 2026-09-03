import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { AdminPage } from "./pages/AdminPage";
import { CitizenPage } from "./pages/CitizenPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    try {
      const savedSession = window.localStorage.getItem("civicvoice-session");
      if (savedSession) setSession(JSON.parse(savedSession));
    } catch {
      window.localStorage.removeItem("civicvoice-session");
    }
  }, []);

  function handleLogin(nextSession) {
    window.localStorage.setItem("civicvoice-session", JSON.stringify(nextSession));
    setSession(nextSession);
  }

  function handleLogout() {
    window.localStorage.removeItem("civicvoice-session");
    setSession(null);
  }

  return (
    <>
      <Header user={session?.user} onLogout={handleLogout} />
      {!session && <LoginPage onLogin={handleLogin} />}
      {session?.user.role === "citizen" && <CitizenPage user={session.user} />}
      {session?.user.role === "admin" && <AdminPage user={session.user} />}
    </>
  );
}
