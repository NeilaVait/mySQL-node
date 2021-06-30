console.log('va');

const catSelect = document.getElementById('cat-name');

async function getData(url) {
  try {
    const resp = await fetch();
    const data = await resp.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

function generateCatSelect(data) {
  data.forEach((item) => {
    //<option value="1">1</option>
    const op = document.createElement('option');
    op.value = item.cat_id;
    op.innerHTML = item.name;
    catSelect.append(op);
  });
}

getData('/products/categories').then((data) => generateCatSelect(data));
