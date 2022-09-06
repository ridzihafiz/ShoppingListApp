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
  // console.log(modal.style.display);

  // munculkan modal
  if (modal.style.display == 'none') {
    console.log(modal.style.display);
    showModal();
    return;
  }

  // sembunyikan modal
  hideModal();
});

// klik area grey untuk sembunyikan modal (via modal_bg)
modal_bg.addEventListener('click', () => {
  hideModal();
});

// tambahkan event listener submit ke element html dengan id addlist_form
addlist_form.addEventListener('submit', (event) => {
  // stop form dari reload page
  event.preventDefault();

  // tangkap value dari masing-masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  if (barang == '' /* || harga == '' */) {
    alert('Please, input an Item and Price!');
    return;
  }

  // push data ke array data_list_belanja
  data_list_belanja.push({
    barang,
    harga,
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

  hideModal();

  renderToHtml();
});

// show modal
function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

// hide modal
function hideModal() {
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
        ${e.barang} <span> ${e.harga} </span>
      </div>
      <div>
        <button onclick="handleEdit(${i})">Edit</button>
        <button onclick="handleDelete(${i})">Selesai</button>
      </div>
    </div>
    `;
  });
}

// function delete pada array data_list_belanja
function handleDelete(index) {
  data_list_belanja.splice(index, 1);
  renderToHtml();
}

function handleEdit(index) {
  let editBarang = prompt('Please edit Item');
  let editHarga = prompt('Please edit Price');

  data_list_belanja[index].barang = editBarang;
  data_list_belanja[index].harga = editHarga;

  renderToHtml();
}

// let replacedItem = items.splice(items.indexOf('RUBY'), 1, 'PYTHON')

// let fruits = ['apple', 'orange', false, 3];
// fruits.indexOf('orange'); // returns 1
// fruits.indexOf(3); // returns 3
// friuts.indexOf(null); // returns -1 (not found)
