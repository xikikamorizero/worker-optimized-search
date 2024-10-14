onmessage = (e) => {
  const orderProp = e.data[0];
  let phonesData = e.data[1];
  const searchKeyword = e.data[2].toLowerCase().trim();

  if (searchKeyword) {
    phonesData = phonesData.filter((item) =>
      item.name.toLowerCase().includes(searchKeyword)
    );
  }

  const sortFunctions = {
    age: (a, b) => a.age - b.age,
    name: (a, b) => a.name.localeCompare(b.name),
  };

  postMessage(phonesData.sort(sortFunctions[orderProp]));
};
