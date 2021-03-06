import "./style";

import { MainScreen } from "./components/mainScreen/MainScreen";

const application = new MainScreen(document.body);

console.log(
`Стартовая страница и навигация: \n 
  -  вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения +10 \n
  -  На стартовой странице есть кнопка, при клике по которой открываются настройки викторины, и две кнопки, при кликах по которым можно выбрать тип вопроса: \n
  -    угадать художника по картине \n
  -    угадать картину по имени её автора \n
  -  реализована навигация по страницам приложения +10 \n
  -    со стартовой страницы при клике по кнопке с типом вопроса пользователь попадает на страницу категорий выбранного типа вопросов. Со страницы категорий пользователь может вернуться на стартовую страницу приложения \n
  -    !!! страница с результатами реализовано в отдельной вкладке "Score" \n
Настройки +40 \n
  -    в настройках есть возможность включать/выключать звук, есть регулятор громкости звука (!!! отдельного чекбокса для звука нету, реализовано за счет range input'а). Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда \n
  -    в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время(!!! таймер в виде полосы), которое отведено для ответа на вопрос \n
  -    в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос \n
  -    при перезагрузке страницы приложения выбранные настройки сохраняются \n
Страница категорий +30 \n
  -    вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения \n
  -    на странице категорий размещаются карточки категорий. \n
  -    карточки категорий могут иметь названия, или их можно просто пронумеровать. \n
  -    карточки категорий вопросов про художников и про картины внешне отличаются между собой, например, в их оформлении использутся разные изображения. \n
  -    карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась \n
  -    на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ \n
 Страница с вопросами +50 \n
  -    вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения \n
  -    вопросы должны генерироваться средствами JavaScript на основе исходных данных. \n
  -    вопросы в викторине идут в том порядке, в каком информация про картины и их авторов размещается в коллекции исходных данных. \n
  -    варианты ответов на вопросы генерируются случайным образом \n
  -    в вариантах ответов на вопросы викторины должен быть правильный ответ и только один. \n
  -    правильный ответ в разных вопросах должен находиться на разных местах, а не, например, всегда быть только первым. \n
  -    варианты ответов должны быть разными. \n
  -    (!!! бывают случаи повтора авторов, т.к. они повторяются в исходном файле (но редко) -> исправлено!!!)в вариантах ответов не должны повторяться картины одного и того же художника. \n
  -    правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета \n
  -    после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории \n
  -    после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов \n
Страница с результатами +50 \n
  -    вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения \n
  -    страница с результатами содержит превью всех картин категории \n
  -    картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые \n
  -    при клике по картине выводится информация о ней - название, автор, год создания \n
  -    если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами \n
  -  Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера +10 \n
  -  Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия, чтобы работа с приложением шла плавным и непрерывным потоком +20 \n
  -
Доп функционал: 
  -    разные уведомления по окончанию раунда в зависимости от результата +2`
 );