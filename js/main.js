const App = {
    init: function () {
        App.viedoConsola();
    },

    viedoConsola: function () {
        function whichTransitionEvent() {
            let t;
            const el = document.createElement('fake');
            const transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }
//Funcion que al encender la consola        
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
//Funcion al apagar la consola
App.btnOff = function () {
    power.classList.remove('power-on');
    texto.classList.remove('end');

    const pantallaJuegoElement = document.querySelector('.gameboy .pantalla .pantallaJuego');
    pantallaJuegoElement.style.background = '#bdae58';
    document.querySelector('.pulsaStart').style.display = 'none';
    document.querySelector('.juego').style.display = 'none';
    document.querySelector('.animacionInicio').style.display = 'inline';
    power.classList.remove('power-on');
    texto.classList.remove('end');

    if (audioJuegosMusic && !audioJuegosMusic.paused) {
        audioJuegosMusic.pause();
        audioJuegosMusic.currentTime = 0; // Reinicia la posición de reproducción al principio del sonido
        }
};     
        
//Funciones para reproducir cada sound correspondiente
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
            audioJuegosMusic.play();
        }

//Variables para obtener elementos de DOM        
        let audioJuegosMusic = document.getElementById('juegosMusic');
        const audioIntro = document.getElementById('intro');
        const audioStart = document.getElementById('start');
        const power = document.querySelector('.power');
        const texto = document.querySelector('.animacionInicio');
        const onOffBoton = document.querySelector('.on-off');

//Variable que para que el boton ON-OFF esté apagado        
        let isOn = false;

//Función para el boton onOff        
        onOffBoton.onclick = function () {
            if (isOn) {
                App.btnOff();
            } else {
                App.btnOn();
            }
            isOn = !isOn;
        };


//Evento click en el start

        const btnControles = document.querySelector('.gameboy .btn-controles .btn-start-select');
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
            
// Añade la clase 'show' con retardo incremental
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
    
                const selector = juego.querySelector('.selector');
                if (selector) {
                    selector.style.display = 'inline-block';
                }
            });
        });
        
        const juegoSeleccionado = document.querySelector('.seleccionado .selector');
            if (juegoSeleccionado) {
            juegoSeleccionado.style.display = 'inline-block';
            }
        });
//Funcion para ocultar las flechas en los juegos    
        function ocultarTodasLasFlechas() {
            document.querySelectorAll('.selector').forEach(function (selector) {
            selector.style.display = 'none';
            });
        };



}


};

App.init();

