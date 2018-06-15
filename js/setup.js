'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizard = setup.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('focusout', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var getRandomTrait = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

wizardCoat.addEventListener('click', function () {
  var newCoatColor = getRandomTrait(COAT_COLORS);
  wizardCoat.style.fill = newCoatColor;
  setup.querySelector('input[name=coat-color]').value = newCoatColor;
});

wizardEyes.addEventListener('click', function () {
  var newEyesColor = getRandomTrait(EYE_COLORS);
  wizardEyes.style.fill = newEyesColor;
  setup.querySelector('input[name=eyes-color]').value = newEyesColor;
});

fireball.addEventListener('click', function () {
  var newFireballColor = getRandomTrait(FIREBALL_COLORS);
  fireball.style = 'background: ' + newFireballColor;
  fireball.querySelector('input[name=fireball-color]').value = newFireballColor;
});

var makeWizardsList = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    wizards[i] = {
      name: getRandomTrait(NAMES) + ' ' + getRandomTrait(LAST_NAMES),
      coatColor: getRandomTrait(COAT_COLORS),
      eyesColor: getRandomTrait(EYE_COLORS)
    };
  }
  return wizards;
};

var renderWizard = function (similarWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;

  return wizardElement;
};

var renderWizardsList = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizardsList(makeWizardsList());
setup.querySelector('.setup-similar').classList.remove('hidden');
