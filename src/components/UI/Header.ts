const Header = (): HTMLHeadElement => {
  const header = document.createElement("header");
  const LOGO = document.createElement("h1");
  LOGO.textContent = "TODO LIST";
  header.classList.add("header");
  header.appendChild(LOGO);
  return header;
};

export default Header;
