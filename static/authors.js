console.log('hello from authors');

const ulElAuthors = document.getElementById('authors');
const btnAll = document.getElementById('all');
const btnYoung = document.getElementById('young');
const btnFemale = document.getElementById('female');
const genderSelect = document.getElementById('gender');

fetch('/authors')
  .then((resp) => resp.json())
  .then((authors) => {
    authors.forEach((a) => {
      const liEl = document.createElement('li');
      liEl.innerHTML = `<a href="/author/${a.au_id}">${a.name}</a>`;
      ulElAuthors.append(liEl);
    });
  });

async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

function generateList(data) {
  data.forEach((a) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `<a href="/author/${a.au_id}">${a.name}</a>`;
    ulElAuthors.append(liEl);
  });
}

btnAll.addEventListener('click', () => {
  getData('/authors').then((data) => {
    ulElAuthors.innerHTML = '';
    generateList(data);
  });
});

btnYoung.addEventListener('click', () => {
  getData('/authors').then((data) => {
    const filtered = data.filter((d) => d.age < 30);
    ulElAuthors.innerHTML = '';
    generateList(filtered);
  });
});

btnFemale.addEventListener('click', () => {
  getData('/authors').then((data) => {
    const filtered = data.filter((d) => d.sex === 'female');
    ulElAuthors.innerHTML = '';
    generateList(filtered);
  });
});
