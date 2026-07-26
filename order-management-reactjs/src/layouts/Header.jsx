function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="brand-mark">M2</span>
        <div>
          <p className="brand-text">Magento Admin</p>
          <strong>Order Control Center</strong>
        </div>
      </div>

      <div className="header-actions">
        <button type="button" className="button button-ghost">
          Global search
        </button>
        <button type="button" className="button button-ghost">
          Support
        </button>
      </div>
    </header>
  );
}

export default Header;
