const App = {
    init: function () {
        App.animacion();
    },

    animacion: function () {
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

        function playSound() {
            console.log('Sonido Intro');
            audioIntro.currentTime = 0;
            audioIntro.play();
        }
        function playSound2(){
            audioStart.currentTime = 0;
            audioStart.play();
        }

        const audioIntro = document.getElementById('intro');
        const audioStart = document.getElementById('start');
        const power = document.querySelector('.power');
        const texto = document.querySelector('.animacionInicio');
        const onOffBoton = document.querySelector('.on-off');

        let isOn = false;

        onOffBoton.onclick = function () {
            if (isOn) {
                App.btnOff();
            } else {
                App.btnOn();
            }
            isOn = !isOn;
        };
//MOSTRAR SELECT DE JUEGOS

        const btnControles = document.querySelector('.gameboy .btn-controles .btn-start-select');

    btnControles.addEventListener('click', function (event) {
    const clickedElement = event.target.id;

    if (clickedElement === 'start') {
        mostrarJuego();
        
        
    }
    });

    function mostrarJuego() {
        const juegoVisible = document.querySelector('.juego');
        const juegos = document.querySelectorAll('.juego li');
    
        // Verifica si la propiedad display de .pulsaStart es 'inline-block'
        if (document.querySelector('.pulsaStart').style.display === 'inline-block') {
            playSound2();
    
            // Cambia el estilo del elemento para hacerlo visible
            juegoVisible.style.display = 'block';
    
            // Añade la clase 'show' con retardo incremental
            for (let i = 0; i < juegos.length; i++) {
                setTimeout(function () {
                    juegos[i].classList.add("show");
                }, i * 500); // Ajusta este valor según sea necesario para el tiempo de retardo entre elementos
    
                // También puedes ajustar la lógica aquí para mostrar otros elementos o realizar acciones adicionales
            }
    
            document.querySelector('.pulsaStart').style.display = 'none';
            document.querySelector('.animacionInicio').style.display = 'none';
            
            texto.classList.remove('end');
            // Puedes agregar estilos adicionales o cualquier otra configuración necesaria
        }
    }
    


       
        
        
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
        };
    }
};

App.init();

