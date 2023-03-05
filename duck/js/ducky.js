'use strict';

const MaaMeiAagaya = new Audio('./assets/audio/a.wav');

class ModalWindowState {

  #element = undefined;
  #onDismissHandlers = [];

  /**
   * @param {HTMLElement} elem
   */
  from(elem) {
    this.#element = elem;
  }

  isDissmissable() {
    return !!this.#element;
  }

  dismiss() {
    if (!this.#element) return;
    this.#element.remove();
    this.#element = undefined;
    this.#onDismissHandlers = [];
  }

  /**
   * @param {() => void} handler
   */
  onDismiss(handler) {
    this.#onDismissHandlers.push(handler);
  }

  emitOnDismiss() {
    this.#onDismissHandlers.forEach(e => e());
  }

}

class Ducky {
  /**
   * @param {string} nodeName 
   * @param {{style: Record<string, string>, events: Record<HTMLElementEventMap | any, any | (e: Event) => any>}} props 
   * @param {HTMLElement[]} childrens 
   * @returns {HTMLElement}
   */
  static createElement(nodeName, props = { style: {}, events: {}, ...props }, childrens) {
    const d = document.createElement(nodeName);
    for (const key in props.events) d[key] = props.events[key];
    for (const key in props.style) d.style[key] = props.style[key];
    if (Array.isArray(childrens)) childrens.forEach(e => d.appendChild(e));
    if (typeof childrens === 'string') d.innerHTML = childrens;
    return d;
  }

  /**
   * @param {string} text
   * @param {'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'WARNING' | 'INFO' | 'LIGHT' | 'DARK'} style
   * @param {Record<HTMLElementEventMap, (e: Event) => any>} events
   * @returns {HTMLElement}
   */
  static createButton(text, style, events) {
    return Ducky.createElement('button',
      {
        style: {
          color: (style in ['WARNING', 'INFO', 'LIGHT']) ? '#111' : '#fff',
          cursor: 'pointer',
          borderRadius: '4px',
          padding: '0.8em 1.2em',
          backgroundColor: `var(--ducky-${style.toLowerCase()})`,
        },
        events
      },
      text
    );
  }

  /**
   * @param {string} title 
   * @param {string} desc 
   * @param {HTMLElement[]} buttons
   * @param {ModalWindowState} state
   */
  static showModalWindow(title, desc, buttons, state) {
    const modalElem = Ducky.createElement(
      'div',
      {
        style: {
          top: '0',
          left: '0',
          zIndex: '1',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0 0 0 / 20%)'
        },
        events: {
          onclick: () => state.emitOnDismiss()
        }
      },
      [
        Ducky.createElement(
          'div',
          {
            style: {
              gap: '1.2em',
              maxWidth: '360px',
              display: 'flex',
              borderRadius: '8px',
              padding: '3em 2.7em',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'hsl(0, 0%, 93%)',
            }
          },
          [
            Ducky.createElement(
              'span',
              {
                style: {
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: '600',
                }
              },
              title
            ),
            Ducky.createElement(
              'p',
              {
                style: {
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: '500',
                }
              },
              desc
            ),
            Ducky.createElement(
              'div',
              {
                style: {
                  gap: '0.8em',
                  width: '100%',
                  display: 'flex',
                  marginTop: '0.4em',
                  alignItems: 'center',
                  justifyContent: 'right',
                }
              },
              buttons
            )
          ]
        )
      ]);
    document.body.appendChild(modalElem);
    return state.from(modalElem);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('i.ducky-icon').forEach(e => {
    if (e.innerHTML.toUpperCase() === 'SEARCH') e.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 22L20 20M21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5Z" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    else if (e.innerHTML.toUpperCase() === 'FACEBOOK') e.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_322_164)"><path d="M23.625 12C23.625 5.57812 18.4219 0.375 12 0.375C5.57812 0.375 0.375 5.57812 0.375 12C0.375 17.8022 4.62609 22.6116 10.1836 23.4844V15.3605H7.23047V12H10.1836V9.43875C10.1836 6.52547 11.918 4.91625 14.5744 4.91625C15.8466 4.91625 17.1769 5.14313 17.1769 5.14313V8.0025H15.7106C14.2669 8.0025 13.8164 8.89875 13.8164 9.81797V12H17.0405L16.5248 15.3605H13.8164V23.4844C19.3739 22.6116 23.625 17.8022 23.625 12Z" fill="white"/></g><defs><clipPath id="clip0_322_164"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>';
    else if (e.innerHTML.toUpperCase() === 'INSTAGRAM') e.innerHTML = '<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_322_161)"><path d="M10.5043 6.60977C7.52305 6.60977 5.11836 9.01445 5.11836 11.9957C5.11836 14.977 7.52305 17.3816 10.5043 17.3816C13.4855 17.3816 15.8902 14.977 15.8902 11.9957C15.8902 9.01445 13.4855 6.60977 10.5043 6.60977ZM10.5043 15.4973C8.57773 15.4973 7.00273 13.927 7.00273 11.9957C7.00273 10.0645 8.57305 8.49414 10.5043 8.49414C12.4355 8.49414 14.0059 10.0645 14.0059 11.9957C14.0059 13.927 12.4309 15.4973 10.5043 15.4973ZM17.3668 6.38945C17.3668 7.08789 16.8043 7.6457 16.1105 7.6457C15.4121 7.6457 14.8543 7.0832 14.8543 6.38945C14.8543 5.6957 15.4168 5.1332 16.1105 5.1332C16.8043 5.1332 17.3668 5.6957 17.3668 6.38945ZM20.934 7.66445C20.8543 5.98164 20.4699 4.49102 19.2371 3.26289C18.009 2.03477 16.5184 1.65039 14.8355 1.56602C13.1012 1.46758 7.90273 1.46758 6.16836 1.56602C4.49023 1.6457 2.99961 2.03008 1.7668 3.2582C0.533984 4.48633 0.154297 5.97695 0.0699219 7.65977C-0.0285156 9.39414 -0.0285156 14.5926 0.0699219 16.327C0.149609 18.0098 0.533984 19.5004 1.7668 20.7285C2.99961 21.9566 4.48555 22.341 6.16836 22.4254C7.90273 22.5238 13.1012 22.5238 14.8355 22.4254C16.5184 22.3457 18.009 21.9613 19.2371 20.7285C20.4652 19.5004 20.8496 18.0098 20.934 16.327C21.0324 14.5926 21.0324 9.39883 20.934 7.66445ZM18.6934 18.1879C18.3277 19.1066 17.6199 19.8145 16.6965 20.1848C15.3137 20.7332 12.0324 20.6066 10.5043 20.6066C8.97617 20.6066 5.69023 20.7285 4.31211 20.1848C3.39336 19.8191 2.68555 19.1113 2.31523 18.1879C1.7668 16.8051 1.89336 13.5238 1.89336 11.9957C1.89336 10.4676 1.77148 7.18164 2.31523 5.80352C2.68086 4.88477 3.38867 4.17695 4.31211 3.80664C5.69492 3.2582 8.97617 3.38477 10.5043 3.38477C12.0324 3.38477 15.3184 3.26289 16.6965 3.80664C17.6152 4.17227 18.323 4.88008 18.6934 5.80352C19.2418 7.18633 19.1152 10.4676 19.1152 11.9957C19.1152 13.5238 19.2418 16.8098 18.6934 18.1879Z" fill="white"/></g><defs><clipPath id="clip0_322_161"><rect width="21" height="24" fill="white"/></clipPath></defs></svg>';
    else if (e.innerHTML.toUpperCase() === 'GITHUB') e.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_321_159)"><path d="M7.77656 18.6281C7.77656 18.7219 7.66875 18.7969 7.53281 18.7969C7.37812 18.8109 7.27031 18.7359 7.27031 18.6281C7.27031 18.5344 7.37813 18.4594 7.51406 18.4594C7.65469 18.4453 7.77656 18.5203 7.77656 18.6281ZM6.31875 18.4172C6.28594 18.5109 6.37969 18.6187 6.52031 18.6469C6.64219 18.6937 6.78281 18.6469 6.81094 18.5531C6.83906 18.4594 6.75 18.3516 6.60938 18.3094C6.4875 18.2766 6.35156 18.3234 6.31875 18.4172ZM8.39062 18.3375C8.25469 18.3703 8.16094 18.4594 8.175 18.5672C8.18906 18.6609 8.31094 18.7219 8.45156 18.6891C8.5875 18.6563 8.68125 18.5672 8.66719 18.4734C8.65312 18.3844 8.52656 18.3234 8.39062 18.3375ZM11.475 0.375C4.97344 0.375 0 5.31094 0 11.8125C0 17.0109 3.27188 21.4594 7.94531 23.025C8.54531 23.1328 8.75625 22.7625 8.75625 22.4578C8.75625 22.1672 8.74219 20.5641 8.74219 19.5797C8.74219 19.5797 5.46094 20.2828 4.77188 18.1828C4.77188 18.1828 4.2375 16.8187 3.46875 16.4672C3.46875 16.4672 2.39531 15.7312 3.54375 15.7453C3.54375 15.7453 4.71094 15.8391 5.35312 16.9547C6.37969 18.7641 8.1 18.2438 8.77031 17.9344C8.87813 17.1844 9.18281 16.6641 9.52031 16.3547C6.9 16.0641 4.25625 15.6844 4.25625 11.175C4.25625 9.88594 4.6125 9.23906 5.3625 8.41406C5.24063 8.10938 4.84219 6.85312 5.48438 5.23125C6.46406 4.92656 8.71875 6.49688 8.71875 6.49688C9.65625 6.23438 10.6641 6.09844 11.6625 6.09844C12.6609 6.09844 13.6688 6.23438 14.6063 6.49688C14.6063 6.49688 16.8609 4.92187 17.8406 5.23125C18.4828 6.85781 18.0844 8.10938 17.9625 8.41406C18.7125 9.24375 19.1719 9.89062 19.1719 11.175C19.1719 15.6984 16.4109 16.0594 13.7906 16.3547C14.2219 16.725 14.5875 17.4281 14.5875 18.5297C14.5875 20.1094 14.5734 22.0641 14.5734 22.4484C14.5734 22.7531 14.7891 23.1234 15.3844 23.0156C20.0719 21.4594 23.25 17.0109 23.25 11.8125C23.25 5.31094 17.9766 0.375 11.475 0.375ZM4.55625 16.5422C4.49531 16.5891 4.50938 16.6969 4.58906 16.7859C4.66406 16.8609 4.77187 16.8938 4.83281 16.8328C4.89375 16.7859 4.87969 16.6781 4.8 16.5891C4.725 16.5141 4.61719 16.4812 4.55625 16.5422ZM4.05 16.1625C4.01719 16.2234 4.06406 16.2984 4.15781 16.3453C4.23281 16.3922 4.32656 16.3781 4.35938 16.3125C4.39219 16.2516 4.34531 16.1766 4.25156 16.1297C4.15781 16.1016 4.08281 16.1156 4.05 16.1625ZM5.56875 17.8312C5.49375 17.8922 5.52187 18.0328 5.62969 18.1219C5.7375 18.2297 5.87344 18.2438 5.93437 18.1688C5.99531 18.1078 5.96719 17.9672 5.87344 17.8781C5.77031 17.7703 5.62969 17.7562 5.56875 17.8312ZM5.03438 17.1422C4.95938 17.1891 4.95938 17.3109 5.03438 17.4188C5.10938 17.5266 5.23594 17.5734 5.29688 17.5266C5.37188 17.4656 5.37188 17.3438 5.29688 17.2359C5.23125 17.1281 5.10938 17.0813 5.03438 17.1422Z" fill="white"/></g><defs><clipPath id="clip0_321_159"><rect width="23.25" height="24" fill="white"/></clipPath></defs></svg>';
  })


  // .tab-btn-container>a>span
  document.querySelectorAll('.tab-btn-container>a>span').forEach(e => {
    let audio;
    e.onmousedown = () => {
      MaaMeiAagaya.currentTime = 0;
      MaaMeiAagaya.play();
    }
    e.onmouseup = () => MaaMeiAagaya.pause();
  })
})



class Table {

  #headings = [];
  #dataRows = [];

  setHeadings(...headings) {
    this.#headings = headings;
    return this;
  }

  setDataRows(dataArr) {
    this.#dataRows = dataArr;
    return this;
  }

  toHTML() {
    const headingsCount = this.#headings.length;
    const titleHTML = [];
    const rowsHTML = [];

    const rowStyle = {
      display: 'flex',

    }

    this.#headings.forEach(e => titleHTML.push(Ducky.createElement('div', {}, e)));

    this.#dataRows.forEach(e => {
      const rowElems = [];
      for (let i = 0; i < headingsCount; i++) rowElems.push(Ducky.createElement('div', {}, e[i]));
      rowsHTML.push(Ducky.createElement('div', { style: rowStyle }, rowElems));
    });

    const headingHTML = Ducky.createElement('div', { style: rowStyle }, titleHTML);
    return Ducky.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      },
      [
        headingHTML,
        ...rowsHTML
      ]
    );
  }

}