'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const servicesConteiner = document.querySelector('.services');
  [
    'Anesthesiology And Critical Care',
    'Clinical Biochemistry',
    'Department of Dentistry',
    'Department of Dermatology',
    'Department of General Practice and Emergency',
    'Forensic And Medical Toxicology',
    'Internal Medicine',
    'Microbiology',
    'Obstetrics and Gynecology',
    'Operation Theatre',
    'Ophthalmology',
    'Orthopedics and Traumatology',
    'Otorhinolaryngology - ENT',
    'Pathology',
    'Pediatrics',
    'Pharmacy',
    'Department of Physiotherapy',
    'Psychiatry',
    'Radiology',
    'Surgery'
  ].forEach(e => {
    servicesConteiner.appendChild(
      Ducky.createElement(
        'a',
        {
          events: {
            target: '_blank',
            href: 'https://www.google.com/search?q=' + e
          }
        },
        e
      )
    );
  })
})