import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Faq() {
  const [lang, setLang] = useState("ru");
  const [items, setItems] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api.getFaq(lang).then(setItems);
  }, [lang]);

  return (
    <div className="screen">
      <h2 className="screen-title">Поддержка</h2>

      <div className="lang-toggle">
        <button className={lang === "ru" ? "active" : ""} onClick={() => setLang("ru")}>
          Русский
        </button>
        <button className={lang === "kk" ? "active" : ""} onClick={() => setLang("kk")}>
          Қазақша
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="faq-item">
          <button className="faq-question" onClick={() => setOpenId(openId === item.id ? null : item.id)}>
            {item.question}
            <span>{openId === item.id ? "−" : "+"}</span>
          </button>
          {openId === item.id && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}

      <div className="support-card">
        <p className="screen-text">Не нашли ответ? Напишите в поддержку — запрос будет переадресован в Halyk Bank Georgia при необходимости.</p>
        {sent ? (
          <div className="badge badge-green">Запрос отправлен</div>
        ) : (
          <button className="btn-secondary" onClick={() => setSent(true)}>
            Написать в поддержку
          </button>
        )}
      </div>
    </div>
  );
}
