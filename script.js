// console.log('Hi Rid!');

// tangkap beberapa element html
let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

// tambahkan date ke subtitle
subtitle.innerHTML = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// data list belanja
let data_list_belanja = [];

// menambahkan event listener ke id html floating_button
floating_button.addEventListener('click', () => {
  console.log(modal.style.display);

  // munculkan modal
  if (modal.style.display == 'flex') {
    showModal();
    return;
  }

  // sembunyikan modal
  hideModal();
});

// klik area grey untuk sembunyikan modal (via modal_bg)
modal_bg.addEventListener('click', () => {
  hideModalBg();
});

// tambahkan event listener submit ke element html dengan id addlist_form
addlist_form.addEventListener('submit', (event) => {
  // stop form dari reload page
  event.preventDefault();

  // tangkap value dari masing-masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // push data ke array data_list_belanja
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  });

  console.info(data_list_belanja);

  /* 
  console.info({
    barang,
    harga,
  });
   */

  // clear input field
  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModalBg();

  renderToHtml();
});

// show modal
function showModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#b38157';
  floating_button.style.transform = 'rotate(0deg)';
}

// hide modal
function hideModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

function hideModalBg() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#b38157';
  floating_button.style.transform = 'rotate(0deg)';
}

// function render ke HTML
function renderToHtml() {
  // clear element div
  root.innerHTML = '';

  // perulangan
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
      <small> ${e.tanggal} </small>
      <div>
        ${e.nama_barang} <span> ${e.harga_barang} </span>
      </div>
      <button onclick="handleDelete(${i})">Selesai</button>
    </div>
    `;
  });
}

// function delete pada array data_list_belanja
function handleDelete(index) {
  data_list_belanja.splice(index, 1);
  renderToHtml();
}
