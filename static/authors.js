console.log('hello from authors');

const ulElAuthors = document.getElementById('authors');
const btnAll = document.getElementById('all');
const btnYoung = document.getElementById('young');

fetch('/authors')
  .then((resp) => resp.json())
  .then((authors) => {
    authors.forEach((a) => {
      const liEl = document.createElement('li');
      liEl.innerHTML = `<a href="/author/${a.au_id}">${a.name}</a>`;
      ulElAuthors.append(liEl);
    });
  });

async function getData() {
  const response = await fetch('/authors');
  const authors = await resp.json();
  return authors;
}

function generateList(data) {
  data.forEach((a) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `<a href="/author/${a.au_id}">${a.name}</a>`;
    ulElAuthors.append(liEl);
  });
}
