const clock = document.querySelector('.clock');
const btnStart = document.querySelector('.button_type_start');
const btnLap = document.querySelector('.button_type_lap');
const itemTemplate = document.querySelector('#laps-area__titles').content;
const lapsArea = document.querySelector('.laps-area');

let millisec = 0;
let sec = 0;
let min = 0;

let interval;
let lap = 0;

// Функция для включения таймера
function timerOn() {
  interval = setInterval(() => {
    millisec++;
    
    if(millisec > 99) {
      sec++;
      millisec = 0;
    }
  
    if(sec > 59) {
      min++;
      sec = 0;
      millisec = 0;
    }
  
    const ms =  millisec < 10 ? '0' + millisec : millisec.toString();
    const s =  sec < 10 ? '0' + sec : sec.toString();
    const m =  min < 10 ? '0' + min : min.toString();
  
    clock.textContent = m + ':' + s + '.' + ms;
  }, 10);
}

// Функция для паузы таймера
function timerOff() {
  clearInterval(interval);
}

// Функция сбрасывания секундомера
function handleReset() {
  timerOff();

  millisec = 0;
  sec = 0;
  min = 0;
  clock.textContent = '00:00.00';

  lapsArea.style.display = 'none';
  btnLap.textContent = 'Интервал';
  btnStart.textContent = 'Начать';
  btnLap.setAttribute("disabled","disabled");

  const items = document.querySelectorAll('.laps-area__titles');
  items.forEach((item, index) => {
    if(index > 0) {
      item.remove();
    }
  });

  lap = 0;
}

// При нажатии на кнопку интервал
function handleLap() {
  lapsArea.style.display = 'inline';
  lap = lap + 1;

  const itemElement = itemTemplate.querySelector('.laps-area__titles').cloneNode(true);
  itemElement.querySelector('#lap').textContent = lap < 10 ? '0' + lap : lap;
  itemElement.querySelector('#total-time').textContent = clock.textContent;
  lapsArea.append(itemElement);
}

// При нажатие на кнопку стоп
function handleStop() {
  timerOff();

  btnStart.removeEventListener('click', handleStop);
  btnStart.addEventListener('click', handleStart);

  btnStart.classList.remove('button_type_stop');
  btnStart.classList.add('button_type_start');
  btnStart.textContent = 'Продолж.';

  btnLap.removeEventListener('click', handleLap);
  btnLap.addEventListener('click', handleReset);

  btnLap.textContent = 'Сбросить';
}

// При нажатие на кнопку старт
function handleStart() {
  timerOn();

  btnStart.removeEventListener('click', handleStart);
  btnStart.addEventListener('click', handleStop);

  btnStart.classList.remove('button_type_start');
  btnStart.classList.add('button_type_stop');
  btnStart.textContent = 'Cтоп';

  btnLap.removeAttribute("disabled");
  btnLap.removeEventListener('click', handleReset);
  btnLap.addEventListener('click', handleLap);

  btnLap.textContent = 'Интервал';
}

// Слушатель на кнопку старт
btnStart.addEventListener('click', handleStart);