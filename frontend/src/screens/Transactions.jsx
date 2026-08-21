import { useEffect, useState } from "react";
import { api } from "../api.js";

const CATEGORY_LABELS = {
  flight_ticket: "Авиабилет",
  hotel: "Отель",
  groceries: "Продукты",
};

export default function Transactions({ onActivateRequest }) {
  const [data, setData] = useState({ transactions: [], suggestion: { show: false } });

  useEffect(() => {
    api.getTransactions().then(setData);
  }, []);

  return (
    <div className="screen">
      <h2 className="screen-title">Транзакции</h2>

      {data.suggestion.show && (
        <div className="push-banner">
          <div className="push-title">🔔 {data.suggestion.reason}</div>
          <p className="push-text">{data.suggestion.message}</p>
          <button className="btn-primary" onClick={onActivateRequest}>
            Активировать сейчас
          </button>
        </div>
      )}

      {data.transactions.map((t) => (
        <div key={t.id} className="transaction-row">
          <div>
            <div className="transaction-merchant">{t.merchant}</div>
            <div className="transaction-meta">
              {CATEGORY_LABELS[t.category] ?? t.category} · {t.date}
              {t.travelTrigger && <span className="badge badge-green transaction-flag">Триггер поездки</span>}
            </div>
          </div>
          <div className="transaction-amount">−{t.amountKzt.toLocaleString("ru-RU")} ₸</div>
        </div>
      ))}
    </div>
  );
}
