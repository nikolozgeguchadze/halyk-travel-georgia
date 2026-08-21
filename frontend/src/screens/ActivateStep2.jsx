export default function ActivateStep2({ onConfirm, onBack }) {
  return (
    <div className="screen">
      <button className="link-back" onClick={onBack}>
        ← Назад
      </button>
      <h2 className="screen-title">Подтверждение</h2>
      <p className="screen-text">
        Вы авторизованы в Homebank, дополнительная верификация не требуется.
      </p>

      <div className="confirm-card">
        <div className="confirm-row">
          <span>Режим</span>
          <span>Еду в Грузию</span>
        </div>
        <div className="confirm-row">
          <span>Конвертация</span>
          <span>KZT → GEL напрямую</span>
        </div>
        <div className="confirm-row">
          <span>Фрод-мониторинг</span>
          <span>Отметка «в поездке»</span>
        </div>
      </div>

      <button className="btn-primary" onClick={onConfirm}>
        Подтвердить активацию
      </button>
    </div>
  );
}
