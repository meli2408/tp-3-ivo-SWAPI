fetch("https://swapi.info/api/people")
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error))

  