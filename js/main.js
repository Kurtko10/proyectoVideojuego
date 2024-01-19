//Objeto App que contiene las funciones y variables necesarias
const App = {

//Inicializa al cargar la página    
    init: function () {
//Llamada a la función ViedoConsola        
        App.videoConsola();
    },
//Funcion que contiene el resto de funciones, animaciones
    videoConsola: function () {
//Detecta la transición compatible con el navegador        
        function whichTransitionEvent() {
            let t;
            const el = document.createElement('fake');
            const transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };
//Bucle para ver que transición es compatible y devuelve la correspondiente
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }
//Funcion para encender la consola        
        App.btnOn = function () {
            power.classList.add('power-on');
            const transitionEvent = whichTransitionEvent();
            texto.classList.add('end');
    
            texto.addEventListener(transitionEvent, function(){
            playSound();
            setTimeout(function(){
            document.querySelector('.pulsaStart').style.display = 'inline-block'; 
            },2500);
            });

            const pantallaJuegoElement = document.querySelector('.gameboy .pantalla .pantallaJuego');
            pantallaJuegoElement.style.background = '#ffd700';
        };
//Funcion para apagar la consola
        App.btnOff = function () {
            power.classList.remove('power-on');
            texto.classList.remove('end');

            const pantallaJuegoElement = document.querySelector('.gameboy .pantalla .pantallaJuego');
            pantallaJuegoElement.style.background = '#bdae58';
            document.querySelector('.pulsaStart').style.display = 'none';
            document.querySelector('.juego').style.display = 'none';
            document.querySelector('.animacionInicio').style.display = 'inline';
            document.querySelector('#juegoMario img').style.display='none';
            document.querySelector('#juegoTetris img').style.display='none';
            document.querySelector('#juegoPacman img').style.display='none';
            power.classList.remove('power-on');
            texto.classList.remove('end');

            if (audioJuegosMusic && !audioJuegosMusic.paused) {
                audioJuegosMusic.pause();
                audioJuegosMusic.currentTime = 0; 
            }
            if ((musicaMario && !musicaMario.paused) || (musicaTetris && !musicaTetris.paused) || (musicaPacman && !musicaPacman.paused)) {
                musicaMario.pause();
                musicaTetris.pause();
                musicaPacman.pause();
                musicaMario.currentTime = 0; 
                musicaTetris.currentTime = 0;
                musicaPacman.currentTime = 0;
            }
        };     
        
//Funciones para reproducir cada sonido correspondiente
        function playSound() {
            console.log('Sonido Intro');
            audioIntro.currentTime = 0;
            audioIntro.play();
        }
        function playSound2(){
            audioStart.currentTime = 0;
            audioStart.play();
        }
        function playSound3(){
            console.log('Musica');
            audioJuegosMusic.currentTime = 0;
            audioJuegosMusic.loop = true;
            audioJuegosMusic.play();
        }
        function playSound4(){
            console.log('musicaMario');
            musicaMario.currentTime = 0;
            musicaMario.play();
            musicaMario.loop = true;
        }
        function playSound5(){
            console.log('musicaTetris');
            musicaTetris.currentTime = 0;
            musicaTetris.play();
            musicaTetris.loop = true;
        }
        function playSound6(){
            console.log('musicaPacman');
            musicaPacman.currentTime = 0;
            musicaPacman.play();
            musicaPacman.loop = true;
        }

//Variables para obtener elementos de DOM   
        const musicaMario = document.getElementById('musicaMario');  
        const musicaTetris = document.getElementById('musicaTetris');
        const musicaPacman = document.getElementById('musicaPacman');
        const audioJuegosMusic = document.getElementById('juegosMusic');
        const audioIntro = document.getElementById('intro');
        const audioStart = document.getElementById('start');
        const power = document.querySelector('.power');
        const texto = document.querySelector('.animacionInicio');
        const onOffBoton = document.querySelector('.on-off');
        const juegoMario = document.getElementById('juegoMario');
        const juegoTetris = document.getElementById('juegoTetris');
        const juegoPacman = document.getElementById('juegoPacman');
        
        const btnAB = document.querySelector('.btn-AB');
        const btnControles = document.querySelector('.gameboy .btn-controles .btn-start-select');
//Variable para que el boton ON-OFF esté apagado        
        let isOn = false;

//Función para llamar el boton onOff        
        onOffBoton.onclick = function () {
            if (isOn) {
                App.btnOff();
            } else {
                App.btnOn();
            }
            isOn = !isOn;
        };

//Evento click en el start
        btnControles.addEventListener('click', function (event) {
            const clickedElement = event.target.id;

            if (clickedElement === 'start') {
            mostrarJuego();
            }
        });

//Muestra la seleccion de juegos
        function mostrarJuego() {
            const juegoVisible = document.querySelector('.juego');
            const juegos = document.querySelectorAll('.juego li');
    
            if (document.querySelector('.pulsaStart').style.display === 'inline-block') {
                playSound2();
                juegoVisible.style.display = 'block';
            
                for (let i = 0; i < juegos.length; i++) {
                    setTimeout(function () {
                        juegos[i].classList.add("show");
                    }, i * 500); 
                }
                document.querySelector('.pulsaStart').style.display = 'none';
                document.querySelector('.animacionInicio').style.display = 'none';
                texto.classList.remove('end');
            }
            if(document.querySelector('.juego').style.display === 'block' && audioJuegosMusic.paused){
                playSound3();
            }
        
        }
//Para cambiar la flecha del selector de juegos
        document.addEventListener('DOMContentLoaded', function () {
        const juegos = document.querySelectorAll('#juegos li');

        juegos.forEach(function (juego) {
            juego.addEventListener('click', function () {
            ocultarTodasLasFlechas();

            // Elimina la clase 'seleccionado' del juego anterior
            document.querySelector('.seleccionado')?.classList.remove('seleccionado');

       // Agrega la clase 'seleccionado' al juego actual
                juego.classList.add('seleccionado');

                const selector = juego.querySelector('.selector');
                if (selector) {
                selector.style.display = 'inline-block';
                }
            });
        });

// Agrega la clase 'selector' al elemento seleccionado al inicializar
        const juegoSeleccionado = document.querySelector('.seleccionado .selector');
        if (juegoSeleccionado) {
        juegoSeleccionado.style.display = 'inline-block';
        }
        });

// Función para ocultar todas las flechas en los juegos    
        function ocultarTodasLasFlechas() {
        document.querySelectorAll('.selector').forEach(function (selector) {
        selector.style.display = 'none';
        });
        }

//Evento para el botón AB        
        btnAB.addEventListener('click', function () {

        const juegoSeleccionado = document.querySelector('#juegos .seleccionado');

        if (juegoSeleccionado) {
            const juegoSeleccionadoValue = juegoSeleccionado.getAttribute('data-value');
            const juegoElemento = document.querySelector('.juego');
            juegoElemento.style.display = 'none';

            audioJuegosMusic.pause();
//array con las acciones para cada juego
            const accionesPorJuego = {
            'mario': () => {
                
                //Acciones para el juego Mario
                console.log('Acción para Mario');
                playSound4();
                document.querySelector('#juegoTetris img').style.display='none';
                document.querySelector('#juegoMario img').style.display='inline-block';
                document.querySelector('#juegoPacman').style.display='none';
            },
            'tetris': () => {
                //Acciones juego Tetris
                console.log('Acción para Tetris');
                playSound5();
                document.querySelector('#juegoMario img').style.display='none';
                document.querySelector('#juegoPacman').style.display='none';
                document.querySelector('#juegoTetris img').style.display='inline-block';
            },
            'pacman': () => {
                //Acciones juego Pacman
                console.log('Acción para Pacman');
                playSound6();
                document.querySelector('#juegoMario img').style.display='none';
                document.querySelector('#juegoTetris img').style.display='none';
                document.querySelector('#juegoPacman img').style.display='inline-block';
            }
            };
          
// Verifica si existe una acción definida para el juego seleccionado
        if (juegoSeleccionadoValue && accionesPorJuego.hasOwnProperty(juegoSeleccionadoValue)) {
            
            accionesPorJuego[juegoSeleccionadoValue]();
        } else {
            console.log('Acción por defecto o manejo de otros juegos');
        }
        } else {
        
        console.log('No hay juego seleccionado');
        }
        
});
// Evento click en el botón start independiente de btnAB

}
};
App.init();

