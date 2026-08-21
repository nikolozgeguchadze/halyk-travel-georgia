import { useEffect, useState } from "react";
import { api } from "./api.js";
import PhoneFrame from "./components/PhoneFrame.jsx";
import BottomNav from "./components/BottomNav.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ActivateStep1 from "./screens/ActivateStep1.jsx";
import ActivateStep2 from "./screens/ActivateStep2.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import Branches from "./screens/Branches.jsx";
import Faq from "./screens/Faq.jsx";
import Transactions from "./screens/Transactions.jsx";

const STATUS_CACHE_KEY = "halyk-travel-status-cache";

export default function App() {
  const [tab, setTab] = useState("home");
  const [flow, setFlow] = useState(null); // null | "activate1" | "activate2"
  const [status, setStatus] = useState(() => {
    const cached = localStorage.getItem(STATUS_CACHE_KEY);
    return cached ? JSON.parse(cached) : { active: false, consent: false, fraudMonitoringFlag: false };
  });
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    refreshStatus();
  }, []);

  async function refreshStatus() {
    try {
      const data = await api.getStatus();
      setStatus(data);
      localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify(data));
      setOffline(false);
    } catch {
      // NFR: activation status must survive roaming with unstable connectivity —
      // fall back to the last cached value instead of blocking the UI.
      setOffline(true);
    }
  }

  async function handleActivate(consent) {
    const data = await api.activate(consent);
    setStatus(data);
    localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify(data));
    setFlow(null);
    setTab("home");
  }

  async function handleDeactivate() {
    const data = await api.deactivate();
    setStatus(data);
    localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify(data));
  }

  let content;
  if (flow === "activate1") {
    content = <ActivateStep1 onNext={() => setFlow("activate2")} onCancel={() => setFlow(null)} />;
  } else if (flow === "activate2") {
    content = (
      <ActivateStep2 onConfirm={() => handleActivate(true)} onBack={() => setFlow("activate1")} />
    );
  } else if (tab === "branches") {
    content = <Branches />;
  } else if (tab === "faq") {
    content = <Faq />;
  } else if (tab === "transactions") {
    content = <Transactions onActivateRequest={() => setFlow("activate1")} />;
  } else if (status.active) {
    content = <Dashboard status={status} onDeactivate={handleDeactivate} offline={offline} />;
  } else {
    content = <HomeScreen offline={offline} onActivateRequest={() => setFlow("activate1")} />;
  }

  return (
    <div className="app-shell">
      <PhoneFrame>
        <div className="screen-area">{content}</div>
        {!flow && <BottomNav tab={tab} onChange={setTab} />}
      </PhoneFrame>
    </div>
  );
}
