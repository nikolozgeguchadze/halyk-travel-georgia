import { useState } from "react";

export default function ActivateStep1({ onNext, onCancel }) {
  const [consent, setConsent] = useState(false);

  return (
    <div className="screen">
      <button className="link-back" onClick={onCancel}>
        ← Назад
      </button>
      <h2 className="screen-title">Режим «Еду в Грузию»</h2>
      <p className="screen-text">Что изменится после активации:</p>
      <ul className="feature-list">
        <li>Прямая конвертация KZT → GEL без промежуточного доллара/евро</li>
        <li>Отметка «в поездке» снижает ложные блокировки карты</li>
        <li>Доступ к карте отделений и банкоматов Halyk Bank Georgia</li>
        <li>Поддержка на русском и казахском с переадресацией в Грузию</li>
      </ul>

      <label className="consent-row">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Я согласен(а) на передачу признака «в поездке» и минимально необходимых данных между
          Halyk Kazakhstan и Halyk Bank Georgia для работы функции
        </span>
      </label>

      <button className="btn-primary" disabled={!consent} onClick={onNext}>
        Продолжить
      </button>
    </div>
  );
}
