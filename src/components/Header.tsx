function Header() {
  return (
    <header style={styles.header}>
      <h1>Shop</h1>
    </header>
  );
}

const styles = {
  header: {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    borderBottom: '1px solid #e5e7eb',
  },
};

export default Header;
