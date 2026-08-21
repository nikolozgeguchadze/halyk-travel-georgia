const ITEMS = [
  { id: "home", label: "Главная", icon: "🏠" },
  { id: "transactions", label: "Транзакции", icon: "💳" },
  { id: "branches", label: "Отделения", icon: "📍" },
  { id: "faq", label: "Поддержка", icon: "💬" },
];

export default function BottomNav({ tab, onChange }) {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${tab === item.id ? "active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
