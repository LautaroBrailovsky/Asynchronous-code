//RESUELVE TUS EJERCICIOS AQUI


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bikram async/await</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }

        section {
            border: 1px solid #ccc;
            margin: 20px auto;
            padding: 10px;
            width: 400px;
        }

        img {
            width: 150px;
        }
    </style>
</head>
<body>

    <h1>Bikram async/await</h1>

    <h2>Pokemon aleatorio</h2>
    <div id="pokemon"></div>

    <h2>Pug vs Pikachu</h2>
    <div id="batalla"></div>

    <h2>Personaje de Rick and Morty</h2>
    <div id="rickandmorty"></div>

    <script>

        // Ejercicio 1
        async function getRandomPokemon() {
            let id = Math.floor(Math.random() * 1025) + 1;
            let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
            let pokemon = await respuesta.json();
            return pokemon;
        }

        // Ejercicio 2
        async function getImageAndName() {
            let pokemon = await getRandomPokemon();
            let img = pokemon.sprites.front_default;
            let name = pokemon.name;
            return { img, name };
        }

        // Ejercicio 3
        async function printImageAndName() {
            let { img, name } = await getImageAndName();
            return `<section>
                        <img src="${img}" alt="${name}">
                        <h1>${name}</h1>
                    </section>`;
        }

       

        // Ejercicio 4
        async function getRandomDogImage() {
            let respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
            let datos = await respuesta.json();
            return datos.message;
        }

        // Ejercicio 5
        async function getRandomPokemonImage() {
            let pokemon = await getRandomPokemon();
            return pokemon.sprites.front_default;
        }

        // Ejercicio 6
        async function printPugVsPikachu() {
            let respuestaPug = await fetch("https://dog.ceo/api/breed/pug/images/random");
            let datosPug = await respuestaPug.json();

            let respuestaPikachu = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
            let datosPikachu = await respuestaPikachu.json();

            document.getElementById("batalla").innerHTML = `
                <section>
                    <img src="${datosPug.message}" alt="Pug">
                    <h3>Pug</h3>
                    <h2>VS</h2>
                    <img src="${datosPikachu.sprites.front_default}" alt="Pikachu">
                    <h3>Pikachu</h3>
                </section>`;
        }


        // Ejercicio 7
        async function getRandomCharacter() {
            let id = Math.floor(Math.random() * 826) + 1;
            let respuesta = await fetch("https://rickandmortyapi.com/api/character/" + id);
            let personaje = await respuesta.json();
            return personaje;
        }

        // Ejercicio 8
        async function getRandomCharacterInfo() {
            let personaje = await getRandomCharacter();

            let img = personaje.image;
            let name = personaje.name;
            let episodes = personaje.episode;

            // Segundo fetch para sacar los datos del primer episodio
            let respuestaEpisodio = await fetch(episodes[0]);
            let episodio = await respuestaEpisodio.json();

            let firstEpisode = episodio.name;
            let dateEpisode = episodio.air_date;

            return { img, name, episodes, firstEpisode, dateEpisode };
        }

        // Ejercicio 9
        async function printCharacterInfo() {
            let { img, name, episodes, firstEpisode, dateEpisode } = await getRandomCharacterInfo();

            document.getElementById("rickandmorty").innerHTML = `
                <section>
                    <img src="${img}" alt="${name}">
                    <h3>${name}</h3>
                    <p>Aparece en ${episodes.length} episodios</p>
                    <p>Primer episodio: ${firstEpisode} (${dateEpisode})</p>
                </section>`;
        }

       

        async function iniciar() {
            console.log("Ejercicio 1:", await getRandomPokemon());
            console.log("Ejercicio 2:", await getImageAndName());
            console.log("Ejercicio 3:", await printImageAndName());
            console.log("Ejercicio 4:", await getRandomDogImage());
            console.log("Ejercicio 5:", await getRandomPokemonImage());
            console.log("Ejercicio 7:", await getRandomCharacter());
            console.log("Ejercicio 8:", await getRandomCharacterInfo());

            
            document.getElementById("pokemon").innerHTML = await printImageAndName();
            await printPugVsPikachu();
            await printCharacterInfo();
        }

        iniciar();
    </script>
</body>
</html>
