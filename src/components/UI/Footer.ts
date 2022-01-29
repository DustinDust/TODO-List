import icon from '../../resources/github-con.png';

const Footer = (): HTMLElement => {
  const footer = document.createElement('footer');
  const copyrightText = document.createElement('span');
  copyrightText.textContent = 'Copyright © 2022 DangPhuongNam';
  const link = document.createElement('a');
  link.href = 'https://github.com/DustinDust/TODO-List';
  const githubIcon = new Image();
  githubIcon.src = icon;
  githubIcon.classList.add('footer-photo');
  link.appendChild(githubIcon);
  footer.appendChild(copyrightText);
  footer.appendChild(link);
  footer.classList.add('footer');
  return footer;
};

export default Footer;
