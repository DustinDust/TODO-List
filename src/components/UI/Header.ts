const Header = (): HTMLHeadElement => {
  const header = document.createElement('header');
  const LOGO = document.createElement('h1');
  LOGO.textContent = 'Todo List';
  LOGO.classList.add('logo-text');
  header.classList.add('header');
  header.appendChild(LOGO);
  return header;
};

export default Header;
