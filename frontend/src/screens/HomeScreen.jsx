export default function HomeScreen({ offline, onActivateRequest }) {
  return (
    <div className="screen">
      <div className="greeting">
        <div className="avatar">А</div>
        <div>
          <div className="greeting-name">Айгерим Т.</div>
          <div className="greeting-sub">Карта •• 4471</div>
        </div>
      </div>

      {offline && <div className="offline-banner">Нет соединения — показан последний сохранённый статус</div>}

      <div className="banner-card">
        <div className="banner-title">✈️ Едете в Грузию?</div>
        <p className="banner-text">
          Активируйте режим поездки: прямая конвертация тенге в лари без потерь на двойной
          конвертации и меньше ложных блокировок карты.
        </p>
        <button className="btn-primary" onClick={onActivateRequest}>
          Активировать «Еду в Грузию»
        </button>
      </div>

      <div className="section-title">Ваши счета</div>
      <div className="account-row">
        <span>Карта Halyk Bonus</span>
        <span className="account-balance">1 240 500 ₸</span>
      </div>
      <div className="account-row">
        <span>Депозит</span>
        <span className="account-balance">3 800 000 ₸</span>
      </div>
    </div>
  );
}
