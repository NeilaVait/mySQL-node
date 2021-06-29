console.log('hello from posts');

const ulEl = document.getElementById('ul');
const idSelectEl = document.getElementById('ids');

async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

function generateLi(data) {
  data.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = ` <a href="/post/${item.id}">${item.title}</a> `;
    ulEl.append(li);
  });
}

function generateIdSelect(data) {
  data.forEach((item) => {
    //<option value="1">1</option>
    const op = document.createElement('option');
    op.value = item.id;
    op.innerHTML = item.title;
    idSelectEl.append(op);
  });
}

getData('/post').then((data) => generateLi(data));

getData('/post-ids').then((data) => generateIdSelect(data));
