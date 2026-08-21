import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBranches()
      .then(setBranches)
      .finally(() => setLoading(false));
  }, []);

  const cities = [...new Set(branches.map((b) => b.city))];

  return (
    <div className="screen">
      <h2 className="screen-title">Отделения и банкоматы</h2>
      <p className="screen-text">Halyk Bank Georgia — Тбилиси, Батуми, Кутаиси</p>

      {loading && <div className="screen-text">Загрузка…</div>}

      {cities.map((city) => (
        <div key={city}>
          <div className="section-title">{city}</div>
          {branches
            .filter((b) => b.city === city)
            .map((b) => (
              <div key={b.id} className="branch-card">
                <div className="branch-header">
                  <span className={`badge ${b.type === "branch" ? "badge-green" : ""}`}>
                    {b.type === "branch" ? "Отделение" : "Банкомат"}
                  </span>
                  <span className="branch-hours">{b.hours}</span>
                </div>
                <div className="branch-name">{b.name}</div>
                <div className="branch-address">{b.address}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
