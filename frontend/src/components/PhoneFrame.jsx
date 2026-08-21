export default function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-notch" />
      <div className="phone-header">Halyk Homebank</div>
      <div className="phone-body">{children}</div>
    </div>
  );
}
