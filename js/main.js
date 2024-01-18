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
            audio.currentTime = 0;
            audio.play();
        }

        const audio = document.querySelector('audio');
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

        App.btnOn = function () {
            power.classList.add('power-on');

            const transitionEvent = whichTransitionEvent();
            texto.classList.add('end');


            texto.addEventListener(transitionEvent, function(){

                playSound();
                

                setTimeout(function(){
                    document.querySelector('.pulsaStart').style.display = 'inline-block'; 
                },2000);
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
        };
    }
};

App.init();

