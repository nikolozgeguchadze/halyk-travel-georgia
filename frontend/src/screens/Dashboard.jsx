import { useState } from "react";
import { api } from "../api.js";

export default function Dashboard({ status, onDeactivate, offline }) {
  const [amount, setAmount] = useState("50000");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [totalSavedGel, setTotalSavedGel] = useState(0);

  async function handleCalculate() {
    setError(null);
    try {
      const data = await api.convert(Number(amount));
      setResult(data);
      setTotalSavedGel((prev) => Math.round((prev + data.savings.gel) * 100) / 100);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="screen">
      {offline && <div className="offline-banner">Нет соединения — статус из кэша</div>}

      <div className="status-card">
        <div className="status-title">Режим «Еду в Грузию» активен</div>
        <div className="status-badges">
          <span className="badge badge-green">Фрод-флаг: в поездке</span>
          <span className="badge">KZT → GEL напрямую</span>
        </div>
        <div className="status-since">С {new Date(status.activatedAt).toLocaleString("ru-RU")}</div>
        <button className="btn-secondary" onClick={onDeactivate}>
          Деактивировать
        </button>
      </div>

      <div className="section-title">Виджет экономии</div>
      <div className="savings-card">
        <label className="field-label">Сумма покупки, ₸</label>
        <input
          className="text-input"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn-primary" onClick={handleCalculate}>
          Посчитать экономию
        </button>

        {error && <div className="error-text">{error}</div>}

        {result && (
          <div className="conversion-result">
            <div className="conversion-row">
              <span>Без функции ({result.doubleConversion.route})</span>
              <span>{result.doubleConversion.gel} ₾</span>
            </div>
            <div className="conversion-row highlight">
              <span>С функцией ({result.directConversion.route})</span>
              <span>{result.directConversion.gel} ₾</span>
            </div>
            <div className="conversion-row savings">
              <span>Экономия на операции</span>
              <span>
                +{result.savings.gel} ₾ ({result.savings.pct}%)
              </span>
            </div>
          </div>
        )}

        <div className="total-saved">
          Всего сэкономлено за эту сессию: <strong>{totalSavedGel} ₾</strong>
        </div>
      </div>
    </div>
  );
}
