//Objeto App que contiene las funciones y variables necesarias
const App = {

//Inicializa al cargar la página    
    init: function () {
//Llamada a la función ViedoConsola        
        App.videoConsola();
    },

//Funcion que contiene el resto de funciones, animaciones
    videoConsola: function () {

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
const juegoVisible = document.querySelector('.juego');
const juegos = document.querySelectorAll('.juego li');
const juegoSeleccionado = document.querySelector('.seleccionado .selector');
const juego = document.querySelectorAll('#juegos li');
const btnStart = document.getElementById('btnStart');
const btnAB = document.querySelector('.btn-A');
const btnControles = document.querySelector('.gameboy .btn-controles .btn-start-select2');

//Variable para que el boton ON-OFF esté apagado        
let isOn = false;
let jugando = false;
let encendida = false;
let reiniciar = false;
let transicionFinalizada = false;


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
            //playSound();
            playSound('intro');
            setTimeout(function(){
            document.querySelector('.pulsaStart').style.display = 'inline-block'; 
            },2000);
            setTimeout(function(){
                encendida = true;
                btnStart.classList.add('active');
            },3000);
            });

            const pantallaJuegoElement = document.querySelector('.gameboy .pantalla .pantallaJuego');
            pantallaJuegoElement.style.background = '#ffd700';
        };

//Funcion para apagar la consola
        App.btnOff = function () {
            if(encendida === true){
            power.classList.remove('power-on');
            texto.classList.remove('end');
            jugando = false;
            transicionFinalizada= false;

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
            btnStart.classList.remove('active');
            encendida = false;

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
        }
        };  
    
//Función para los sonidos utilizando switch
        function playSound(sonidos) {
            switch (sonidos) {
                case 'intro':
                    console.log('Sonido Intro');
                    audioIntro.currentTime = 0;
                    audioIntro.play();
                    break;
                case 'start':
                    audioStart.currentTime = 0;
                    audioStart.play();
                    break;
                case 'juegosMusic':
                    console.log('Musica');
                    audioJuegosMusic.currentTime = 0;
                    audioJuegosMusic.loop = true;
                    audioJuegosMusic.play();
                    break;
                case 'mario':
                    console.log('musicaMario');
                    musicaMario.currentTime = 0;
                    musicaMario.play();
                    musicaMario.loop = true;
                    break;
                case 'tetris':
                    console.log('musicaTetris');
                    musicaTetris.currentTime = 0;
                    musicaTetris.play();
                    musicaTetris.loop = true;
                    break;
                case 'pacman':
                    console.log('musicaPacman');
                    musicaPacman.currentTime = 0;
                    musicaPacman.play();
                    musicaPacman.loop = true;
                    break;
                default:
                    console.log('Sonido no reconocido');
            }
        }

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
    const clickStart = event.target.id;

    if (clickStart === 'btnStart') {
        if (jugando) {
            detenerJuegoActivo();
            reiniciar == true;
            
        } else {
            transicionFinalizada = true;
            mostrarJuego();
        }
    }
});

//función para detener el juego activo
function detenerJuegoActivo() {

    playSound('start');
    jugando = false;
    musicaMario.pause();
    musicaTetris.pause();
    musicaPacman.pause();
    musicaMario.currentTime = 0; 
    musicaTetris.currentTime = 0;
    musicaPacman.currentTime = 0;
    
    document.querySelector('#juegoMario img').style.display = 'none';
    document.querySelector('#juegoTetris img').style.display = 'none';
    document.querySelector('#juegoPacman img').style.display = 'none';
    playSound('juegosMusic');
    juegoVisible.style.display = 'block';
    btnStart.classList.remove('active'); 

}
//Muestra la seleccion de juegos
        function mostrarJuego() {

            if (document.querySelector('.pulsaStart').style.display === 'inline-block') {

                playSound('start')
                juegoVisible.style.display = 'block';
            
                for (let i = 0; i < juegos.length; i++) {
                    setTimeout(function () {
                        juegos[i].classList.add("show");
                    }, i * 500); 
                }
                document.querySelector('.pulsaStart').style.display = 'none';
                document.querySelector('.animacionInicio').style.display = 'none';
                texto.classList.remove('end');

                playSound('juegosMusic');
            }
            
        
        }
//Para cambiar la flecha del selector de juegos
        document.addEventListener('DOMContentLoaded', function () {
        

        juego.forEach(function (juego) {
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

//Agrega la clase 'selector' al elemento seleccionado al inicializar
        
        if (juegoSeleccionado) {
        juegoSeleccionado.style.display = 'inline-block';
        }
        })
//función para ocultar todas las flechas en los juegos    
        function ocultarTodasLasFlechas() {
            document.querySelectorAll('.selector').forEach(function (selector) {
            selector.style.display = 'none';
            });
            };

//Evento para el botón AB        
        btnAB.addEventListener('click', function () {

        if (transicionFinalizada) {
            const juegoSeleccionado = document.querySelector('#juegos .seleccionado');

        if (juegoSeleccionado && jugando === false && isOn === true) {
            const juegoSeleccionadoValue = juegoSeleccionado.getAttribute('data-value');
            const juegoElemento = document.querySelector('.juego');
            juegoElemento.style.display = 'none';

            audioJuegosMusic.pause();
//array con las acciones para cada juego
            const accionesPorJuego = {
            'mario': () => {
                
            //Acciones para el juego Mario
                console.log('Acción para Mario');
            
                playSound('mario');
                document.querySelector('#juegoTetris img').style.display='none';
                document.querySelector('#juegoMario img').style.display='inline-block';
                document.querySelector('#juegoPacman img').style.display='none';
                jugando = true;
                btnStart.classList.add('active');
            },
            'tetris': () => {
            //Acciones juego Tetris
                console.log('Acción para Tetris');
            
                playSound('tetris');
                document.querySelector('#juegoMario img').style.display='none';
                document.querySelector('#juegoPacman img').style.display='none';
                document.querySelector('#juegoTetris img').style.display='inline-block';
                jugando = true;
                btnStart.classList.add('active');
            },
            'pacman': () => {
            //Acciones juego Pacman
                console.log('Acción para Pacman');
              
                playSound('pacman');
                document.querySelector('#juegoMario img').style.display='none';
                document.querySelector('#juegoTetris img').style.display='none';
                document.querySelector('#juegoPacman img').style.display='inline-block';
                jugando = true;
                btnStart.classList.add('active');
            }
            };
          
// Verifica si existe una acción definida para el juego seleccionado
        if (juegoSeleccionadoValue && accionesPorJuego.hasOwnProperty(juegoSeleccionadoValue)) {
            
            accionesPorJuego[juegoSeleccionadoValue]();
        } 
        }}     
});
}
};
App.init();

