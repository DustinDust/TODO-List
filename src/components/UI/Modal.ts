import Card from './Card';

const Modal = (...children: Node[]) => {
  const dropBack: HTMLDivElement = document.createElement('div');
  dropBack.classList.add('drop-back');
  const modalContent: HTMLDivElement = Card(...children);
  modalContent.classList.add('modal-container');
  dropBack.appendChild(modalContent);
  const show = () => {
    document.body.appendChild(dropBack);
  };
  const clear = () => {
    dropBack.remove();
  };
  dropBack.addEventListener('click', (e) => {
    if (e.currentTarget !== e.target) return;
    dropBack.remove();
  });

  return {
    modalContent,
    show,
    clear,
  };
};

export default Modal;
