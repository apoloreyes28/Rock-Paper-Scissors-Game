// Get  to DOM elements

// seleccionamos al contenedor del juego (en donde están TODOS los elementos)
const gameContainer = document.querySelector(".container"),

// seleccionamos a la imagen (mano) del jugador
  userResult = document.querySelector(".user_result img"),

// seleccionamos a la imagen (mano) del CPU
  cpuResult = document.querySelector(".cpu_result img"),

// seleccionamos al texto que nos dice el resultado (quien es el ganador)
  result = document.querySelector(".result"),

// seleccionamos la imagen (mano) que queremos elegir como opción
  optionImages = document.querySelectorAll(".option_image");

// Todos estos elementos van a estar cambiando cada vez que el usuario realice una acción 
// -------------------------------------------------------------------------

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");
    // al seleccionar una imagen de opción esto le agrega una nueva 
    // clase llamada: active

    // esto hace que solo podamos ver la imagen de Piedra y su animación de moverse
    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";// esto cambia el texto de resultado hasta que se termina la animación

    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // esto crea 2 arreglos [0][0], [0][1], [0][2] con el cual podemos verificar
      // si la imagen de opción es igual o diferente apartir de su índice (posición)

      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
      // esto evita repetir el poner ó quitar la clase .active si el elemento ya la tiene
    });

    gameContainer.classList.add("start"); // agregamos la clase: start
    // para empezar el juego y las animaciones

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");// removemos la clase: start
      // para detener el juego y las animaciones para asi mostrar el resultado

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;
      // obtenemos y cambiamos la fuente 'src' de la imagen que seleccionamos


      // aqui hacemos que la imagen del CPU cambie aleatoriamente: 0,1,2
      // estos son los índices de cada imagen: 0 = Piedra, 1 = Papel, 3 = Tijera

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      //                      0                  1                   2    
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];
      // con esto podemos comparar la opción del usuario con la del CPU

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw", // Piedra, Piedra = empate
        RP: "Cpu",  // Piedra, Papel
        RS: "User", // Piedra, Tijera
        PP: "Draw", // Papel, Papel = empate
        PR: "User", // Papel, Piedra
        PS: "Cpu", // Papel, Tijera
        SS: "Draw", // Tijera, Tijera = empate
        SR: "Cpu", // Tijera, Piedra
        SP: "User", // Tijera, Papel
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
    }, 2500);// con esto retardamos el tiempo en que se muestra la animación y/o resultado de quien gana

// mostramos el resultado con este operador ternario quue según la salida RP nos muestra el texto de quien gana 
  });
});
