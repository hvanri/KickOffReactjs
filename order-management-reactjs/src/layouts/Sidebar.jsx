function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-brand">
        <strong>Magento</strong>
        <span>Admin</span>
      </div>

      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link active">
          Orders
        </a>
        <a href="#" className="sidebar-link">
          Invoices
        </a>
        <a href="#" className="sidebar-link">
          Shipments
        </a>
        <a href="#" className="sidebar-link">
          Customers
        </a>
        <a href="#" className="sidebar-link">
          Catalog
        </a>
        <a href="#" className="sidebar-link">
          Reports
        </a>
      </nav>

      <div className="sidebar-footer">
        <p>Data last updated 5 minutes ago</p>
      </div>
    </aside>
  );
}

export default Sidebar;
