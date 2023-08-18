/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/flowbite/dist/datepicker.js":
/*!**************************************************!*\
  !*** ./node_modules/flowbite/dist/datepicker.js ***!
  \**************************************************/
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 482:
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_561__) {

/* harmony export */ __nested_webpack_require_561__.d(__nested_webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ DateRangePicker; }
/* harmony export */ });
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_561__(698);
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_561__(963);
/* harmony import */ var _Datepicker_js__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_561__(770);




// filter out the config options inapproprite to pass to Datepicker
function filterOptions(options) {
  const newOpts = Object.assign({}, options);

  delete newOpts.inputs;
  delete newOpts.allowOneSidedRange;
  delete newOpts.maxNumberOfDates; // to ensure each datepicker handles a single date

  return newOpts;
}

function setupDatepicker(rangepicker, changeDateListener, el, options) {
  (0,_lib_event_js__WEBPACK_IMPORTED_MODULE_0__/* .registerListeners */ .cF)(rangepicker, [
    [el, 'changeDate', changeDateListener],
  ]);
  new _Datepicker_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(el, options, rangepicker);
}

function onChangeDate(rangepicker, ev) {
  // to prevent both datepickers trigger the other side's update each other
  if (rangepicker._updating) {
    return;
  }
  rangepicker._updating = true;

  const target = ev.target;
  if (target.datepicker === undefined) {
    return;
  }

  const datepickers = rangepicker.datepickers;
  const setDateOptions = {render: false};
  const changedSide = rangepicker.inputs.indexOf(target);
  const otherSide = changedSide === 0 ? 1 : 0;
  const changedDate = datepickers[changedSide].dates[0];
  const otherDate = datepickers[otherSide].dates[0];

  if (changedDate !== undefined && otherDate !== undefined) {
    // if the start of the range > the end, swap them
    if (changedSide === 0 && changedDate > otherDate) {
      datepickers[0].setDate(otherDate, setDateOptions);
      datepickers[1].setDate(changedDate, setDateOptions);
    } else if (changedSide === 1 && changedDate < otherDate) {
      datepickers[0].setDate(changedDate, setDateOptions);
      datepickers[1].setDate(otherDate, setDateOptions);
    }
  } else if (!rangepicker.allowOneSidedRange) {
    // to prevent the range from becoming one-sided, copy changed side's
    // selection (no matter if it's empty) to the other side
    if (changedDate !== undefined || otherDate !== undefined) {
      setDateOptions.clear = true;
      datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
    }
  }
  datepickers[0].picker.update().render();
  datepickers[1].picker.update().render();
  delete rangepicker._updating;
}

/**
 * Class representing a date range picker
 */
class DateRangePicker  {
  /**
   * Create a date range picker
   * @param  {Element} element - element to bind a date range picker
   * @param  {Object} [options] - config options
   */
  constructor(element, options = {}) {
    const inputs = Array.isArray(options.inputs)
      ? options.inputs
      : Array.from(element.querySelectorAll('input'));
    if (inputs.length < 2) {
      return;
    }

    element.rangepicker = this;
    this.element = element;
    this.inputs = inputs.slice(0, 2);
    this.allowOneSidedRange = !!options.allowOneSidedRange;

    const changeDateListener = onChangeDate.bind(null, this);
    const cleanOptions = filterOptions(options);
    // in order for initial date setup to work right when pcicLvel > 0,
    // let Datepicker constructor add the instance to the rangepicker
    const datepickers = [];
    Object.defineProperty(this, 'datepickers', {
      get() {
        return datepickers;
      },
    });
    setupDatepicker(this, changeDateListener, this.inputs[0], cleanOptions);
    setupDatepicker(this, changeDateListener, this.inputs[1], cleanOptions);
    Object.freeze(datepickers);
    // normalize the range if inital dates are given
    if (datepickers[0].dates.length > 0) {
      onChangeDate(this, {target: this.inputs[0]});
    } else if (datepickers[1].dates.length > 0) {
      onChangeDate(this, {target: this.inputs[1]});
    }
  }

  /**
   * @type {Array} - selected date of the linked date pickers
   */
  get dates() {
    return this.datepickers.length === 2
      ? [
          this.datepickers[0].dates[0],
          this.datepickers[1].dates[0],
        ]
      : undefined;
  }

  /**
   * Set new values to the config options
   * @param {Object} options - config options to update
   */
  setOptions(options) {
    this.allowOneSidedRange = !!options.allowOneSidedRange;

    const cleanOptions = filterOptions(options);
    this.datepickers[0].setOptions(cleanOptions);
    this.datepickers[1].setOptions(cleanOptions);
  }

  /**
   * Destroy the DateRangePicker instance
   * @return {DateRangePicker} - the instance destroyed
   */
  destroy() {
    this.datepickers[0].destroy();
    this.datepickers[1].destroy();
    (0,_lib_event_js__WEBPACK_IMPORTED_MODULE_0__/* .unregisterListeners */ .uV)(this);
    delete this.element.rangepicker;
  }

  /**
   * Get the start and end dates of the date range
   *
   * The method returns Date objects by default. If format string is passed,
   * it returns date strings formatted in given format.
   * The result array always contains 2 items (start date/end date) and
   * undefined is used for unselected side. (e.g. If none is selected,
   * the result will be [undefined, undefined]. If only the end date is set
   * when allowOneSidedRange config option is true, [undefined, endDate] will
   * be returned.)
   *
   * @param  {String} [format] - Format string to stringify the dates
   * @return {Array} - Start and end dates
   */
  getDates(format = undefined) {
    const callback = format
      ? date => (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_1__/* .formatDate */ .p6)(date, format, this.datepickers[0].config.locale)
      : date => new Date(date);

    return this.dates.map(date => date === undefined ? date : callback(date));
  }

  /**
   * Set the start and end dates of the date range
   *
   * The method calls datepicker.setDate() internally using each of the
   * arguments in start→end order.
   *
   * When a clear: true option object is passed instead of a date, the method
   * clears the date.
   *
   * If an invalid date, the same date as the current one or an option object
   * without clear: true is passed, the method considers that argument as an
   * "ineffective" argument because calling datepicker.setDate() with those
   * values makes no changes to the date selection.
   *
   * When the allowOneSidedRange config option is false, passing {clear: true}
   * to clear the range works only when it is done to the last effective
   * argument (in other words, passed to rangeEnd or to rangeStart along with
   * ineffective rangeEnd). This is because when the date range is changed,
   * it gets normalized based on the last change at the end of the changing
   * process.
   *
   * @param {Date|Number|String|Object} rangeStart - Start date of the range
   * or {clear: true} to clear the date
   * @param {Date|Number|String|Object} rangeEnd - End date of the range
   * or {clear: true} to clear the date
   */
  setDates(rangeStart, rangeEnd) {
    const [datepicker0, datepicker1] = this.datepickers;
    const origDates = this.dates;

    // If range normalization runs on every change, we can't set a new range
    // that starts after the end of the current range correctly because the
    // normalization process swaps start↔︎end right after setting the new start
    // date. To prevent this, the normalization process needs to run once after
    // both of the new dates are set.
    this._updating = true;
    datepicker0.setDate(rangeStart);
    datepicker1.setDate(rangeEnd);
    delete this._updating;

    if (datepicker1.dates[0] !== origDates[1]) {
      onChangeDate(this, {target: this.inputs[1]});
    } else if (datepicker0.dates[0] !== origDates[0]) {
      onChangeDate(this, {target: this.inputs[0]});
    }
  }
}


/***/ }),

/***/ 770:
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_8693__) {


// EXPORTS
__nested_webpack_require_8693__.d(__nested_webpack_exports__, {
  "Z": function() { return /* binding */ Datepicker; }
});

// EXTERNAL MODULE: ./node_modules/flowbite-datepicker/js/lib/utils.js
var utils = __nested_webpack_require_8693__(105);
// EXTERNAL MODULE: ./node_modules/flowbite-datepicker/js/lib/date.js
var lib_date = __nested_webpack_require_8693__(560);
// EXTERNAL MODULE: ./node_modules/flowbite-datepicker/js/lib/date-format.js
var date_format = __nested_webpack_require_8693__(963);
// EXTERNAL MODULE: ./node_modules/flowbite-datepicker/js/lib/event.js
var lib_event = __nested_webpack_require_8693__(698);
;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/i18n/base-locales.js
// default locales
const locales = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM y"
  }
};

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/options/defaultOptions.js
// config options updatable by setOptions() and their default values
const defaultOptions = {
  autohide: false,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  calendarWeeks: false,
  clearBtn: false,
  dateDelimiter: ',',
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: undefined, // placeholder, defaults to today() by the program
  disableTouchKeyboard: false,
  format: 'mm/dd/yyyy',
  language: 'en',
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  nextArrow: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
  orientation: 'auto',
  pickLevel: 0,
  prevArrow: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>',
  showDaysOfWeek: true,
  showOnClick: true,
  showOnFocus: true,
  startView: 0,
  title: '',
  todayBtn: false,
  todayBtnMode: 0,
  todayHighlight: false,
  updateOnBlur: true,
  weekStart: 0,
};

/* harmony default export */ var options_defaultOptions = (defaultOptions);

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/lib/dom.js
const range = document.createRange();

function parseHTML(html) {
  return range.createContextualFragment(html);
}

// equivalent to jQuery's :visble
function isVisible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function hideElement(el) {
  if (el.style.display === 'none') {
    return;
  }
  // back up the existing display setting in data-style-display
  if (el.style.display) {
    el.dataset.styleDisplay = el.style.display;
  }
  el.style.display = 'none';
}

function showElement(el) {
  if (el.style.display !== 'none') {
    return;
  }
  if (el.dataset.styleDisplay) {
    // restore backed-up dispay property
    el.style.display = el.dataset.styleDisplay;
    delete el.dataset.styleDisplay;
  } else {
    el.style.display = '';
  }
}

function emptyChildNodes(el) {
  if (el.firstChild) {
    el.removeChild(el.firstChild);
    emptyChildNodes(el);
  }
}

function replaceChildNodes(el, newChildNodes) {
  emptyChildNodes(el);
  if (newChildNodes instanceof DocumentFragment) {
    el.appendChild(newChildNodes);
  } else if (typeof newChildNodes === 'string') {
    el.appendChild(parseHTML(newChildNodes));
  } else if (typeof newChildNodes.forEach === 'function') {
    newChildNodes.forEach((node) => {
      el.appendChild(node);
    });
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/options/processOptions.js






const {
  language: defaultLang,
  format: defaultFormat,
  weekStart: defaultWeekStart,
} = options_defaultOptions;

// Reducer function to filter out invalid day-of-week from the input
function sanitizeDOW(dow, day) {
  return dow.length < 6 && day >= 0 && day < 7
    ? (0,utils/* pushUnique */.$C)(dow, day)
    : dow;
}

function calcEndOfWeek(startOfWeek) {
  return (startOfWeek + 6) % 7;
}

// validate input date. if invalid, fallback to the original value
function validateDate(value, format, locale, origValue) {
  const date = (0,date_format/* parseDate */.sG)(value, format, locale);
  return date !== undefined ? date : origValue;
}

// Validate viewId. if invalid, fallback to the original value
function validateViewId(value, origValue, max = 3) {
  const viewId = parseInt(value, 10);
  return viewId >= 0 && viewId <= max ? viewId : origValue;
}

// Create Datepicker configuration to set
function processOptions(options, datepicker) {
  const inOpts = Object.assign({}, options);
  const config = {};
  const locales = datepicker.constructor.locales;
  let {
    format,
    language,
    locale,
    maxDate,
    maxView,
    minDate,
    pickLevel,
    startView,
    weekStart,
  } = datepicker.config || {};

  if (inOpts.language) {
    let lang;
    if (inOpts.language !== language) {
      if (locales[inOpts.language]) {
        lang = inOpts.language;
      } else {
        // Check if langauge + region tag can fallback to the one without
        // region (e.g. fr-CA → fr)
        lang = inOpts.language.split('-')[0];
        if (locales[lang] === undefined) {
          lang = false;
        }
      }
    }
    delete inOpts.language;
    if (lang) {
      language = config.language = lang;

      // update locale as well when updating language
      const origLocale = locale || locales[defaultLang];
      // use default language's properties for the fallback
      locale = Object.assign({
        format: defaultFormat,
        weekStart: defaultWeekStart
      }, locales[defaultLang]);
      if (language !== defaultLang) {
        Object.assign(locale, locales[language]);
      }
      config.locale = locale;
      // if format and/or weekStart are the same as old locale's defaults,
      // update them to new locale's defaults
      if (format === origLocale.format) {
        format = config.format = locale.format;
      }
      if (weekStart === origLocale.weekStart) {
        weekStart = config.weekStart = locale.weekStart;
        config.weekEnd = calcEndOfWeek(locale.weekStart);
      }
    }
  }

  if (inOpts.format) {
    const hasToDisplay = typeof inOpts.format.toDisplay === 'function';
    const hasToValue = typeof inOpts.format.toValue === 'function';
    const validFormatString = date_format/* reFormatTokens.test */.CL.test(inOpts.format);
    if ((hasToDisplay && hasToValue) || validFormatString) {
      format = config.format = inOpts.format;
    }
    delete inOpts.format;
  }

  //*** dates ***//
  // while min and maxDate for "no limit" in the options are better to be null
  // (especially when updating), the ones in the config have to be undefined
  // because null is treated as 0 (= unix epoch) when comparing with time value
  let minDt = minDate;
  let maxDt = maxDate;
  if (inOpts.minDate !== undefined) {
    minDt = inOpts.minDate === null
      ? (0,lib_date/* dateValue */.by)(0, 0, 1)  // set 0000-01-01 to prevent negative values for year
      : validateDate(inOpts.minDate, format, locale, minDt);
    delete inOpts.minDate;
  }
  if (inOpts.maxDate !== undefined) {
    maxDt = inOpts.maxDate === null
      ? undefined
      : validateDate(inOpts.maxDate, format, locale, maxDt);
    delete inOpts.maxDate;
  }
  if (maxDt < minDt) {
    minDate = config.minDate = maxDt;
    maxDate = config.maxDate = minDt;
  } else {
    if (minDate !== minDt) {
      minDate = config.minDate = minDt;
    }
    if (maxDate !== maxDt) {
      maxDate = config.maxDate = maxDt;
    }
  }

  if (inOpts.datesDisabled) {
    config.datesDisabled = inOpts.datesDisabled.reduce((dates, dt) => {
      const date = (0,date_format/* parseDate */.sG)(dt, format, locale);
      return date !== undefined ? (0,utils/* pushUnique */.$C)(dates, date) : dates;
    }, []);
    delete inOpts.datesDisabled;
  }
  if (inOpts.defaultViewDate !== undefined) {
    const viewDate = (0,date_format/* parseDate */.sG)(inOpts.defaultViewDate, format, locale);
    if (viewDate !== undefined) {
      config.defaultViewDate = viewDate;
    }
    delete inOpts.defaultViewDate;
  }

  //*** days of week ***//
  if (inOpts.weekStart !== undefined) {
    const wkStart = Number(inOpts.weekStart) % 7;
    if (!isNaN(wkStart)) {
      weekStart = config.weekStart = wkStart;
      config.weekEnd = calcEndOfWeek(wkStart);
    }
    delete inOpts.weekStart;
  }
  if (inOpts.daysOfWeekDisabled) {
    config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekDisabled;
  }
  if (inOpts.daysOfWeekHighlighted) {
    config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekHighlighted;
  }

  //*** multi date ***//
  if (inOpts.maxNumberOfDates !== undefined) {
    const maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
    if (maxNumberOfDates >= 0) {
      config.maxNumberOfDates = maxNumberOfDates;
      config.multidate = maxNumberOfDates !== 1;
    }
    delete inOpts.maxNumberOfDates;
  }
  if (inOpts.dateDelimiter) {
    config.dateDelimiter = String(inOpts.dateDelimiter);
    delete inOpts.dateDelimiter;
  }

  //*** pick level & view ***//
  let newPickLevel = pickLevel;
  if (inOpts.pickLevel !== undefined) {
    newPickLevel = validateViewId(inOpts.pickLevel, 2);
    delete inOpts.pickLevel;
  }
  if (newPickLevel !== pickLevel) {
    pickLevel = config.pickLevel = newPickLevel;
  }

  let newMaxView = maxView;
  if (inOpts.maxView !== undefined) {
    newMaxView = validateViewId(inOpts.maxView, maxView);
    delete inOpts.maxView;
  }
  // ensure max view >= pick level
  newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
  if (newMaxView !== maxView) {
    maxView = config.maxView = newMaxView;
  }

  let newStartView = startView;
  if (inOpts.startView !== undefined) {
    newStartView = validateViewId(inOpts.startView, newStartView);
    delete inOpts.startView;
  }
  // ensure pick level <= start view <= max view
  if (newStartView < pickLevel) {
    newStartView = pickLevel;
  } else if (newStartView > maxView) {
    newStartView = maxView;
  }
  if (newStartView !== startView) {
    config.startView = newStartView;
  }

  //*** template ***//
  if (inOpts.prevArrow) {
    const prevArrow = parseHTML(inOpts.prevArrow);
    if (prevArrow.childNodes.length > 0) {
      config.prevArrow = prevArrow.childNodes;
    }
    delete inOpts.prevArrow;
  }
  if (inOpts.nextArrow) {
    const nextArrow = parseHTML(inOpts.nextArrow);
    if (nextArrow.childNodes.length > 0) {
      config.nextArrow = nextArrow.childNodes;
    }
    delete inOpts.nextArrow;
  }

  //*** misc ***//
  if (inOpts.disableTouchKeyboard !== undefined) {
    config.disableTouchKeyboard = 'ontouchstart' in document && !!inOpts.disableTouchKeyboard;
    delete inOpts.disableTouchKeyboard;
  }
  if (inOpts.orientation) {
    const orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
    config.orientation = {
      x: orientation.find(x => (x === 'left' || x === 'right')) || 'auto',
      y: orientation.find(y => (y === 'top' || y === 'bottom')) || 'auto',
    };
    delete inOpts.orientation;
  }
  if (inOpts.todayBtnMode !== undefined) {
    switch(inOpts.todayBtnMode) {
      case 0:
      case 1:
        config.todayBtnMode = inOpts.todayBtnMode;
    }
    delete inOpts.todayBtnMode;
  }

  //*** copy the rest ***//
  Object.keys(inOpts).forEach((key) => {
    if (inOpts[key] !== undefined && (0,utils/* hasProperty */.l$)(options_defaultOptions, key)) {
      config[key] = inOpts[key];
    }
  });

  return config;
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/templates/pickerTemplate.js


const pickerTemplate = (0,utils/* optimizeTemplateHTML */.zh)(`<div class="datepicker hidden">
  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">
    <div class="datepicker-header">
      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>
      <div class="datepicker-controls flex justify-between mb-2">
        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>
        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>
        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>
      </div>
    </div>
    <div class="datepicker-main p-1"></div>
    <div class="datepicker-footer">
      <div class="datepicker-controls flex space-x-2 mt-2">
        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>
        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>
      </div>
    </div>
  </div>
</div>`);

/* harmony default export */ var templates_pickerTemplate = (pickerTemplate);

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/templates/daysTemplate.js


const daysTemplate = (0,utils/* optimizeTemplateHTML */.zh)(`<div class="days">
  <div class="days-of-week grid grid-cols-7 mb-1">${(0,utils/* createTagRepeat */.em)('span', 7, {class: 'dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm'})}</div>
  <div class="datepicker-grid w-64 grid grid-cols-7">${(0,utils/* createTagRepeat */.em)('span', 42 , {class: 'block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400'})}</div>
</div>`);

/* harmony default export */ var templates_daysTemplate = (daysTemplate);

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/templates/calendarWeeksTemplate.js


const calendarWeeksTemplate = (0,utils/* optimizeTemplateHTML */.zh)(`<div class="calendar-weeks">
  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>
  <div class="weeks">${(0,utils/* createTagRepeat */.em)('span', 6, {class: 'week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm'})}</div>
</div>`);

/* harmony default export */ var templates_calendarWeeksTemplate = (calendarWeeksTemplate);

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/views/View.js



// Base class of the view classes
class View {
  constructor(picker, config) {
    Object.assign(this, config, {
      picker,
      element: parseHTML(`<div class="datepicker-view flex"></div>`).firstChild,
      selected: [],
    });
    this.init(this.picker.datepicker.config);
  }

  init(options) {
    if (options.pickLevel !== undefined) {
      this.isMinView = this.id === options.pickLevel;
    }
    this.setOptions(options);
    this.updateFocus();
    this.updateSelection();
  }

  // Execute beforeShow() callback and apply the result to the element
  // args:
  // - current - current value on the iteration on view rendering
  // - timeValue - time value of the date to pass to beforeShow()
  performBeforeHook(el, current, timeValue) {
    let result = this.beforeShow(new Date(timeValue));
    switch (typeof result) {
      case 'boolean':
        result = {enabled: result};
        break;
      case 'string':
        result = {classes: result};
    }

    if (result) {
      if (result.enabled === false) {
        el.classList.add('disabled');
        (0,utils/* pushUnique */.$C)(this.disabled, current);
      }
      if (result.classes) {
        const extraClasses = result.classes.split(/\s+/);
        el.classList.add(...extraClasses);
        if (extraClasses.includes('disabled')) {
          (0,utils/* pushUnique */.$C)(this.disabled, current);
        }
      }
      if (result.content) {
        replaceChildNodes(el, result.content);
      }
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/views/DaysView.js








class DaysView extends View {
  constructor(picker) {
    super(picker, {
      id: 0,
      name: 'days',
      cellClass: 'day',
    });
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      const inner = parseHTML(templates_daysTemplate).firstChild;
      this.dow = inner.firstChild;
      this.grid = inner.lastChild;
      this.element.appendChild(inner);
    }
    super.init(options);
  }

  setOptions(options) {
    let updateDOW;

    if ((0,utils/* hasProperty */.l$)(options, 'minDate')) {
      this.minDate = options.minDate;
    }
    if ((0,utils/* hasProperty */.l$)(options, 'maxDate')) {
      this.maxDate = options.maxDate;
    }
    if (options.datesDisabled) {
      this.datesDisabled = options.datesDisabled;
    }
    if (options.daysOfWeekDisabled) {
      this.daysOfWeekDisabled = options.daysOfWeekDisabled;
      updateDOW = true;
    }
    if (options.daysOfWeekHighlighted) {
      this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
    }
    if (options.todayHighlight !== undefined) {
      this.todayHighlight = options.todayHighlight;
    }
    if (options.weekStart !== undefined) {
      this.weekStart = options.weekStart;
      this.weekEnd = options.weekEnd;
      updateDOW = true;
    }
    if (options.locale) {
      const locale = this.locale = options.locale;
      this.dayNames = locale.daysMin;
      this.switchLabelFormat = locale.titleFormat;
      updateDOW = true;
    }
    if (options.beforeShowDay !== undefined) {
      this.beforeShow = typeof options.beforeShowDay === 'function'
        ? options.beforeShowDay
        : undefined;
    }

    if (options.calendarWeeks !== undefined) {
      if (options.calendarWeeks && !this.calendarWeeks) {
        const weeksElem = parseHTML(templates_calendarWeeksTemplate).firstChild;
        this.calendarWeeks = {
          element: weeksElem,
          dow: weeksElem.firstChild,
          weeks: weeksElem.lastChild,
        };
        this.element.insertBefore(weeksElem, this.element.firstChild);
      } else if (this.calendarWeeks && !options.calendarWeeks) {
        this.element.removeChild(this.calendarWeeks.element);
        this.calendarWeeks = null;
      }
    }
    if (options.showDaysOfWeek !== undefined) {
      if (options.showDaysOfWeek) {
        showElement(this.dow);
        if (this.calendarWeeks) {
          showElement(this.calendarWeeks.dow);
        }
      } else {
        hideElement(this.dow);
        if (this.calendarWeeks) {
          hideElement(this.calendarWeeks.dow);
        }
      }
    }

    // update days-of-week when locale, daysOfweekDisabled or weekStart is changed
    if (updateDOW) {
      Array.from(this.dow.children).forEach((el, index) => {
        const dow = (this.weekStart + index) % 7;
        el.textContent = this.dayNames[dow];
        el.className = this.daysOfWeekDisabled.includes(dow) ? 'dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400';
      });
    }
  }

  // Apply update on the focused date to view's settings
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    const firstOfMonth = (0,lib_date/* dateValue */.by)(viewYear, viewMonth, 1);
    const start = (0,lib_date/* dayOfTheWeekOf */.fr)(firstOfMonth, this.weekStart, this.weekStart);

    this.first = firstOfMonth;
    this.last = (0,lib_date/* dateValue */.by)(viewYear, viewMonth + 1, 0);
    this.start = start;
    this.focused = this.picker.viewDate;
  }

  // Apply update on the selected dates to view's settings
  updateSelection() {
    const {dates, rangepicker} = this.picker.datepicker;
    this.selected = dates;
    if (rangepicker) {
      this.range = rangepicker.dates;
    }
  }

   // Update the entire view UI
  render() {
    // update today marker on ever render
    this.today = this.todayHighlight ? (0,lib_date/* today */.Lg)() : undefined;
    // refresh disabled dates on every render in order to clear the ones added
    // by beforeShow hook at previous render
    this.disabled = [...this.datesDisabled];

    const switchLabel = (0,date_format/* formatDate */.p6)(this.focused, this.switchLabelFormat, this.locale);
    this.picker.setViewSwitchLabel(switchLabel);
    this.picker.setPrevBtnDisabled(this.first <= this.minDate);
    this.picker.setNextBtnDisabled(this.last >= this.maxDate);

    if (this.calendarWeeks) {
      // start of the UTC week (Monday) of the 1st of the month
      const startOfWeek = (0,lib_date/* dayOfTheWeekOf */.fr)(this.first, 1, 1);
      Array.from(this.calendarWeeks.weeks.children).forEach((el, index) => {
        el.textContent = (0,lib_date/* getWeek */.Qk)((0,lib_date/* addWeeks */.jh)(startOfWeek, index));
      });
    }
    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      const current = (0,lib_date/* addDays */.E4)(this.start, index);
      const date = new Date(current);
      const day = date.getDay();

      el.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`;
      el.dataset.date = current;
      el.textContent = date.getDate();

      if (current < this.first) {
        classList.add('prev', 'text-gray-500', 'dark:text-white');
      } else if (current > this.last) {
        classList.add('next', 'text-gray-500', 'dark:text-white');
      }
      if (this.today === current) {
        classList.add('today', 'bg-gray-100', 'dark:bg-gray-600');
      }
      if (current < this.minDate || current > this.maxDate || this.disabled.includes(current)) {
        classList.add('disabled', 'cursor-not-allowed');
      }
      if (this.daysOfWeekDisabled.includes(day)) {
        classList.add('disabled', 'cursor-not-allowed');
        (0,utils/* pushUnique */.$C)(this.disabled, current);
      }
      if (this.daysOfWeekHighlighted.includes(day)) {
        classList.add('highlighted');
      }
      if (this.range) {
        const [rangeStart, rangeEnd] = this.range;
        if (current > rangeStart && current < rangeEnd) {
          classList.add('range', 'bg-gray-200', 'dark:bg-gray-600');
          classList.remove('rounded-lg', 'rounded-l-lg', 'rounded-r-lg')
        }
        if (current === rangeStart) {
          classList.add('range-start', 'bg-gray-100', 'dark:bg-gray-600', 'rounded-l-lg');
          classList.remove('rounded-lg', 'rounded-r-lg');
        }
        if (current === rangeEnd) {
          classList.add('range-end', 'bg-gray-100', 'dark:bg-gray-600', 'rounded-r-lg');
          classList.remove('rounded-lg', 'rounded-l-lg');
        }
      }
      if (this.selected.includes(current)) {
        classList.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
        classList.remove('text-gray-900', 'text-gray-500', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600', 'dark:bg-gray-600', 'bg-gray-100', 'bg-gray-200');
      }
      if (current === this.focused) {
        classList.add('focused');
      }

      if (this.beforeShow) {
        this.performBeforeHook(el, current, current);
      }
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const [rangeStart, rangeEnd] = this.range || [];
    this.grid
      .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
      .forEach((el) => {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white', 'focused');
        el.classList.add('text-gray-900', 'rounded-lg', 'dark:text-white');
      });
    Array.from(this.grid.children).forEach((el) => {
      const current = Number(el.dataset.date);
      const classList = el.classList;
      classList.remove('bg-gray-200', 'dark:bg-gray-600', 'rounded-l-lg', 'rounded-r-lg')
      if (current > rangeStart && current < rangeEnd) {
        classList.add('range', 'bg-gray-200', 'dark:bg-gray-600');
        classList.remove('rounded-lg');
      }
      if (current === rangeStart) {
        classList.add('range-start', 'bg-gray-200', 'dark:bg-gray-600', 'rounded-l-lg');
        classList.remove('rounded-lg', 'rounded-r-lg');
      }
      if (current === rangeEnd) {
        classList.add('range-end', 'bg-gray-200', 'dark:bg-gray-600', 'rounded-r-lg');
        classList.remove('rounded-lg', 'rounded-l-lg');
      }
      if (this.selected.includes(current)) {
        classList.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
        classList.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600', 'bg-gray-100', 'bg-gray-200', 'dark:bg-gray-600');
      }
      if (current === this.focused) {
        classList.add('focused');
      }
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    const index = Math.round((this.focused - this.start) / 86400000);
    this.grid.querySelectorAll('.focused').forEach((el) => {
      el.classList.remove('focused');
    });
    this.grid.children[index].classList.add('focused');
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/views/MonthsView.js





function computeMonthRange(range, thisYear) {
  if (!range || !range[0] || !range[1]) {
    return;
  }

  const [[startY, startM], [endY, endM]] = range;
  if (startY > thisYear || endY < thisYear) {
    return;
  }
  return [
    startY === thisYear ? startM : -1,
    endY === thisYear ? endM : 12,
  ];
}

class MonthsView extends View {
  constructor(picker) {
    super(picker, {
      id: 1,
      name: 'months',
      cellClass: 'month',
    });
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      this.grid = this.element;
      this.element.classList.add('months', 'datepicker-grid', 'w-64', 'grid', 'grid-cols-4');
      this.grid.appendChild(parseHTML((0,utils/* createTagRepeat */.em)('span', 12, {'data-month': ix => ix})));
    }
    super.init(options);
  }

  setOptions(options) {
    if (options.locale) {
      this.monthNames = options.locale.monthsShort;
    }
    if ((0,utils/* hasProperty */.l$)(options, 'minDate')) {
      if (options.minDate === undefined) {
        this.minYear = this.minMonth = this.minDate = undefined;
      } else {
        const minDateObj = new Date(options.minDate);
        this.minYear = minDateObj.getFullYear();
        this.minMonth = minDateObj.getMonth();
        this.minDate = minDateObj.setDate(1);
      }
    }
    if ((0,utils/* hasProperty */.l$)(options, 'maxDate')) {
      if (options.maxDate === undefined) {
        this.maxYear = this.maxMonth = this.maxDate = undefined;
      } else {
        const maxDateObj = new Date(options.maxDate);
        this.maxYear = maxDateObj.getFullYear();
        this.maxMonth = maxDateObj.getMonth();
        this.maxDate = (0,lib_date/* dateValue */.by)(this.maxYear, this.maxMonth + 1, 0);
      }
    }
    if (options.beforeShowMonth !== undefined) {
      this.beforeShow = typeof options.beforeShowMonth === 'function'
        ? options.beforeShowMonth
        : undefined;
    }
  }

  // Update view's settings to reflect the viewDate set on the picker
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    this.year = viewDate.getFullYear();
    this.focused = viewDate.getMonth();
  }

  // Update view's settings to reflect the selected dates
  updateSelection() {
    const {dates, rangepicker} = this.picker.datepicker;
    this.selected = dates.reduce((selected, timeValue) => {
      const date = new Date(timeValue);
      const year = date.getFullYear();
      const month = date.getMonth();
      if (selected[year] === undefined) {
        selected[year] = [month];
      } else {
        (0,utils/* pushUnique */.$C)(selected[year], month);
      }
      return selected;
    }, {});
    if (rangepicker && rangepicker.dates) {
      this.range = rangepicker.dates.map(timeValue => {
        const date = new Date(timeValue);
        return isNaN(date) ? undefined : [date.getFullYear(), date.getMonth()];
      });
    }
  }

  // Update the entire view UI
  render() {
    // refresh disabled months on every render in order to clear the ones added
    // by beforeShow hook at previous render
    this.disabled = [];

    this.picker.setViewSwitchLabel(this.year);
    this.picker.setPrevBtnDisabled(this.year <= this.minYear);
    this.picker.setNextBtnDisabled(this.year >= this.maxYear);

    const selected = this.selected[this.year] || [];
    const yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
    const isMinYear = this.year === this.minYear;
    const isMaxYear = this.year === this.maxYear;
    const range = computeMonthRange(this.range, this.year);

    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      const date = (0,lib_date/* dateValue */.by)(this.year, index, 1);

      el.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`;
      if (this.isMinView) {
        el.dataset.date = date;
      }
      // reset text on every render to clear the custom content set
      // by beforeShow hook at previous render
      el.textContent = this.monthNames[index];

      if (
        yrOutOfRange
        || isMinYear && index < this.minMonth
        || isMaxYear && index > this.maxMonth
      ) {
        classList.add('disabled');
      }
      if (range) {
        const [rangeStart, rangeEnd] = range;
        if (index > rangeStart && index < rangeEnd) {
          classList.add('range');
        }
        if (index === rangeStart) {
          classList.add('range-start');
        }
        if (index === rangeEnd) {
          classList.add('range-end');
        }
      }
      if (selected.includes(index)) {
        classList.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
        classList.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600');
      }
      if (index === this.focused) {
        classList.add('focused');
      }

      if (this.beforeShow) {
        this.performBeforeHook(el, index, date);
      }
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const selected = this.selected[this.year] || [];
    const [rangeStart, rangeEnd] = computeMonthRange(this.range, this.year) || [];
    this.grid
      .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
      .forEach((el) => {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'bg-blue-700', 'dark:bg-blue-600', 'dark:text-white', 'text-white', 'focused');
        el.classList.add('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600');
      });
    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      if (index > rangeStart && index < rangeEnd) {
        classList.add('range');
      }
      if (index === rangeStart) {
        classList.add('range-start');
      }
      if (index === rangeEnd) {
        classList.add('range-end');
      }
      if (selected.includes(index)) {
        classList.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
        classList.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600');
      }
      if (index === this.focused) {
        classList.add('focused');
      }
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    this.grid.querySelectorAll('.focused').forEach((el) => {
      el.classList.remove('focused');
    });
    this.grid.children[this.focused].classList.add('focused');
  }
}
;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/views/YearsView.js





function toTitleCase(word) {
  return [...word].reduce((str, ch, ix) => str += ix ? ch : ch.toUpperCase(), '');
}

// Class representing the years and decades view elements
class YearsView extends View {
  constructor(picker, config) {
    super(picker, config);
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      this.navStep = this.step * 10;
      this.beforeShowOption = `beforeShow${toTitleCase(this.cellClass)}`;
      this.grid = this.element;
      this.element.classList.add(this.name, 'datepicker-grid', 'w-64', 'grid', 'grid-cols-4');
      this.grid.appendChild(parseHTML((0,utils/* createTagRepeat */.em)('span', 12)));
    }
    super.init(options);
  }

  setOptions(options) {
    if ((0,utils/* hasProperty */.l$)(options, 'minDate')) {
      if (options.minDate === undefined) {
        this.minYear = this.minDate = undefined;
      } else {
        this.minYear = (0,lib_date/* startOfYearPeriod */.ak)(options.minDate, this.step);
        this.minDate = (0,lib_date/* dateValue */.by)(this.minYear, 0, 1);
      }
    }
    if ((0,utils/* hasProperty */.l$)(options, 'maxDate')) {
      if (options.maxDate === undefined) {
        this.maxYear = this.maxDate = undefined;
      } else {
        this.maxYear = (0,lib_date/* startOfYearPeriod */.ak)(options.maxDate, this.step);
        this.maxDate = (0,lib_date/* dateValue */.by)(this.maxYear, 11, 31);
      }
    }
    if (options[this.beforeShowOption] !== undefined) {
      const beforeShow = options[this.beforeShowOption];
      this.beforeShow = typeof beforeShow === 'function' ? beforeShow : undefined;
    }
  }

  // Update view's settings to reflect the viewDate set on the picker
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    const first = (0,lib_date/* startOfYearPeriod */.ak)(viewDate, this.navStep);
    const last = first + 9 * this.step;

    this.first = first;
    this.last = last;
    this.start = first - this.step;
    this.focused = (0,lib_date/* startOfYearPeriod */.ak)(viewDate, this.step);
  }

  // Update view's settings to reflect the selected dates
  updateSelection() {
    const {dates, rangepicker} = this.picker.datepicker;
    this.selected = dates.reduce((years, timeValue) => {
      return (0,utils/* pushUnique */.$C)(years, (0,lib_date/* startOfYearPeriod */.ak)(timeValue, this.step));
    }, []);
    if (rangepicker && rangepicker.dates) {
      this.range = rangepicker.dates.map(timeValue => {
        if (timeValue !== undefined) {
          return (0,lib_date/* startOfYearPeriod */.ak)(timeValue, this.step);
        }
      });
    }
  }

  // Update the entire view UI
  render() {
    // refresh disabled years on every render in order to clear the ones added
    // by beforeShow hook at previous render
    this.disabled = [];

    this.picker.setViewSwitchLabel(`${this.first}-${this.last}`);
    this.picker.setPrevBtnDisabled(this.first <= this.minYear);
    this.picker.setNextBtnDisabled(this.last >= this.maxYear);

    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      const current = this.start + (index * this.step);
      const date = (0,lib_date/* dateValue */.by)(current, 0, 1);

      el.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`;
      if (this.isMinView) {
        el.dataset.date = date;
      }
      el.textContent = el.dataset.year = current;

      if (index === 0) {
        classList.add('prev');
      } else if (index === 11) {
        classList.add('next');
      }
      if (current < this.minYear || current > this.maxYear) {
        classList.add('disabled');
      }
      if (this.range) {
        const [rangeStart, rangeEnd] = this.range;
        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }
        if (current === rangeStart) {
          classList.add('range-start');
        }
        if (current === rangeEnd) {
          classList.add('range-end');
        }
      }
      if (this.selected.includes(current)) {
        classList.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
        classList.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600');
      }
      if (current === this.focused) {
        classList.add('focused');
      }

      if (this.beforeShow) {
        this.performBeforeHook(el, current, date);
      }
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const [rangeStart, rangeEnd] = this.range || [];
    this.grid
      .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
      .forEach((el) => {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white', 'focused');
      });
    Array.from(this.grid.children).forEach((el) => {
      const current = Number(el.textContent);
      const classList = el.classList;
      if (current > rangeStart && current < rangeEnd) {
        classList.add('range');
      }
      if (current === rangeStart) {
        classList.add('range-start');
      }
      if (current === rangeEnd) {
        classList.add('range-end');
      }
      if (this.selected.includes(current)) {
        classList.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
        classList.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600');
      }
      if (current === this.focused) {
        classList.add('focused');
      }
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    const index = Math.round((this.focused - this.start) / this.step);
    this.grid.querySelectorAll('.focused').forEach((el) => {
      el.classList.remove('focused');
    });
    this.grid.children[index].classList.add('focused');
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/events/functions.js



function triggerDatepickerEvent(datepicker, type) {
  const detail = {
    date: datepicker.getDate(),
    viewDate: new Date(datepicker.picker.viewDate),
    viewId: datepicker.picker.currentView.id,
    datepicker,
  };
  datepicker.element.dispatchEvent(new CustomEvent(type, {detail}));
}

// direction: -1 (to previous), 1 (to next)
function goToPrevOrNext(datepicker, direction) {
  const {minDate, maxDate} = datepicker.config;
  const {currentView, viewDate} = datepicker.picker;
  let newViewDate;
  switch (currentView.id) {
    case 0:
      newViewDate = (0,lib_date/* addMonths */.zI)(viewDate, direction);
      break;
    case 1:
      newViewDate = (0,lib_date/* addYears */.Bc)(viewDate, direction);
      break;
    default:
      newViewDate = (0,lib_date/* addYears */.Bc)(viewDate, direction * currentView.navStep);
  }
  newViewDate = (0,utils/* limitToRange */.jG)(newViewDate, minDate, maxDate);
  datepicker.picker.changeFocus(newViewDate).render();
}

function switchView(datepicker) {
  const viewId = datepicker.picker.currentView.id;
  if (viewId === datepicker.config.maxView) {
    return;
  }
  datepicker.picker.changeView(viewId + 1).render();
}

function unfocus(datepicker) {
  if (datepicker.config.updateOnBlur) {
    datepicker.update({autohide: true});
  } else {
    datepicker.refresh('input');
    datepicker.hide();
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/events/pickerListeners.js




function goToSelectedMonthOrYear(datepicker, selection) {
  const picker = datepicker.picker;
  const viewDate = new Date(picker.viewDate);
  const viewId = picker.currentView.id;
  const newDate = viewId === 1
    ? (0,lib_date/* addMonths */.zI)(viewDate, selection - viewDate.getMonth())
    : (0,lib_date/* addYears */.Bc)(viewDate, selection - viewDate.getFullYear());

  picker.changeFocus(newDate).changeView(viewId - 1).render();
}

function onClickTodayBtn(datepicker) {
  const picker = datepicker.picker;
  const currentDate = (0,lib_date/* today */.Lg)();
  if (datepicker.config.todayBtnMode === 1) {
    if (datepicker.config.autohide) {
      datepicker.setDate(currentDate);
      return;
    }
    datepicker.setDate(currentDate, {render: false});
    picker.update();
  }
  if (picker.viewDate !== currentDate) {
    picker.changeFocus(currentDate);
  }
  picker.changeView(0).render();
}

function onClickClearBtn(datepicker) {
  datepicker.setDate({clear: true});
}

function onClickViewSwitch(datepicker) {
  switchView(datepicker);
}

function onClickPrevBtn(datepicker) {
  goToPrevOrNext(datepicker, -1);
}

function onClickNextBtn(datepicker) {
  goToPrevOrNext(datepicker, 1);
}

// For the picker's main block to delegete the events from `datepicker-cell`s
function onClickView(datepicker, ev) {
  const target = (0,lib_event/* findElementInEventPath */.He)(ev, '.datepicker-cell');
  if (!target || target.classList.contains('disabled')) {
    return;
  }

  const {id, isMinView} = datepicker.picker.currentView;
  if (isMinView) {
    datepicker.setDate(Number(target.dataset.date));
  } else if (id === 1) {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.month));
  } else {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.year));
  }
}

function onClickPicker(datepicker) {
  if (!datepicker.inline && !datepicker.config.disableTouchKeyboard) {
    datepicker.inputField.focus();
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/picker/Picker.js











function processPickerOptions(picker, options) {
  if (options.title !== undefined) {
    if (options.title) {
      picker.controls.title.textContent = options.title;
      showElement(picker.controls.title);
    } else {
      picker.controls.title.textContent = '';
      hideElement(picker.controls.title);
    }
  }
  if (options.prevArrow) {
    const prevBtn = picker.controls.prevBtn;
    emptyChildNodes(prevBtn);
    options.prevArrow.forEach((node) => {
      prevBtn.appendChild(node.cloneNode(true));
    });
  }
  if (options.nextArrow) {
    const nextBtn = picker.controls.nextBtn;
    emptyChildNodes(nextBtn);
    options.nextArrow.forEach((node) => {
      nextBtn.appendChild(node.cloneNode(true));
    });
  }
  if (options.locale) {
    picker.controls.todayBtn.textContent = options.locale.today;
    picker.controls.clearBtn.textContent = options.locale.clear;
  }
  if (options.todayBtn !== undefined) {
    if (options.todayBtn) {
      showElement(picker.controls.todayBtn);
    } else {
      hideElement(picker.controls.todayBtn);
    }
  }
  if ((0,utils/* hasProperty */.l$)(options, 'minDate') || (0,utils/* hasProperty */.l$)(options, 'maxDate')) {
    const {minDate, maxDate} = picker.datepicker.config;
    picker.controls.todayBtn.disabled = !(0,utils/* isInRange */.mh)((0,lib_date/* today */.Lg)(), minDate, maxDate);
  }
  if (options.clearBtn !== undefined) {
    if (options.clearBtn) {
      showElement(picker.controls.clearBtn);
    } else {
      hideElement(picker.controls.clearBtn);
    }
  }
}

// Compute view date to reset, which will be...
// - the last item of the selected dates or defaultViewDate if no selection
// - limitted to minDate or maxDate if it exceeds the range
function computeResetViewDate(datepicker) {
  const {dates, config} = datepicker;
  const viewDate = dates.length > 0 ? (0,utils/* lastItemOf */.Jm)(dates) : config.defaultViewDate;
  return (0,utils/* limitToRange */.jG)(viewDate, config.minDate, config.maxDate);
}

// Change current view's view date
function setViewDate(picker, newDate) {
  const oldViewDate = new Date(picker.viewDate);
  const newViewDate = new Date(newDate);
  const {id, year, first, last} = picker.currentView;
  const viewYear = newViewDate.getFullYear();

  picker.viewDate = newDate;
  if (viewYear !== oldViewDate.getFullYear()) {
    triggerDatepickerEvent(picker.datepicker, 'changeYear');
  }
  if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
    triggerDatepickerEvent(picker.datepicker, 'changeMonth');
  }

  // return whether the new date is in different period on time from the one
  // displayed in the current view
  // when true, the view needs to be re-rendered on the next UI refresh.
  switch (id) {
    case 0:
      return newDate < first || newDate > last;
    case 1:
      return viewYear !== year;
    default:
      return viewYear < first || viewYear > last;
  }
}

function getTextDirection(el) {
  return window.getComputedStyle(el).direction;
}

// Class representing the picker UI
class Picker {
  constructor(datepicker) {
    this.datepicker = datepicker;

    const template = templates_pickerTemplate.replace(/%buttonClass%/g, datepicker.config.buttonClass);
    const element = this.element = parseHTML(template).firstChild;
    const [header, main, footer] = element.firstChild.children;
    const title = header.firstElementChild;
    const [prevBtn, viewSwitch, nextBtn] = header.lastElementChild.children;
    const [todayBtn, clearBtn] = footer.firstChild.children;
    const controls = {
      title,
      prevBtn,
      viewSwitch,
      nextBtn,
      todayBtn,
      clearBtn,
    };
    this.main = main;
    this.controls = controls;

    const elementClass = datepicker.inline ? 'inline' : 'dropdown';
    element.classList.add(`datepicker-${elementClass}`);
    elementClass === 'dropdown' ? element.classList.add('dropdown', 'absolute', 'top-0', 'left-0', 'z-50', 'pt-2') : null;

    processPickerOptions(this, datepicker.config);
    this.viewDate = computeResetViewDate(datepicker);

    // set up event listeners
    (0,lib_event/* registerListeners */.cF)(datepicker, [
      [element, 'click', onClickPicker.bind(null, datepicker), {capture: true}],
      [main, 'click', onClickView.bind(null, datepicker)],
      [controls.viewSwitch, 'click', onClickViewSwitch.bind(null, datepicker)],
      [controls.prevBtn, 'click', onClickPrevBtn.bind(null, datepicker)],
      [controls.nextBtn, 'click', onClickNextBtn.bind(null, datepicker)],
      [controls.todayBtn, 'click', onClickTodayBtn.bind(null, datepicker)],
      [controls.clearBtn, 'click', onClickClearBtn.bind(null, datepicker)],
    ]);

    // set up views
    this.views = [
      new DaysView(this),
      new MonthsView(this),
      new YearsView(this, {id: 2, name: 'years', cellClass: 'year', step: 1}),
      new YearsView(this, {id: 3, name: 'decades', cellClass: 'decade', step: 10}),
    ];
    this.currentView = this.views[datepicker.config.startView];

    this.currentView.render();
    this.main.appendChild(this.currentView.element);
    datepicker.config.container.appendChild(this.element);
  }

  setOptions(options) {
    processPickerOptions(this, options);
    this.views.forEach((view) => {
      view.init(options, false);
    });
    this.currentView.render();
  }

  detach() {
    this.datepicker.config.container.removeChild(this.element);
  }

  show() {
    if (this.active) {
      return;
    }
    this.element.classList.add('active', 'block');
    this.element.classList.remove('hidden');
    this.active = true;

    const datepicker = this.datepicker;
    if (!datepicker.inline) {
      // ensure picker's direction matches input's
      const inputDirection = getTextDirection(datepicker.inputField);
      if (inputDirection !== getTextDirection(datepicker.config.container)) {
        this.element.dir = inputDirection;
      } else if (this.element.dir) {
        this.element.removeAttribute('dir');
      }

      this.place();
      if (datepicker.config.disableTouchKeyboard) {
        datepicker.inputField.blur();
      }
    }
    triggerDatepickerEvent(datepicker, 'show');
  }

  hide() {
    if (!this.active) {
      return;
    }
    this.datepicker.exitEditMode();
    this.element.classList.remove('active', 'block');
    this.element.classList.add('active', 'block', 'hidden');
    this.active = false;
    triggerDatepickerEvent(this.datepicker, 'hide');
  }

  place() {
    const {classList, style} = this.element;
    const {config, inputField} = this.datepicker;
    const container = config.container;
    const {
      width: calendarWidth,
      height: calendarHeight,
    } = this.element.getBoundingClientRect();
    const {
      left: containerLeft,
      top: containerTop,
      width: containerWidth,
    } = container.getBoundingClientRect();
    const {
      left: inputLeft,
      top: inputTop,
      width: inputWidth,
      height: inputHeight
    } = inputField.getBoundingClientRect();
    let {x: orientX, y: orientY} = config.orientation;
    let scrollTop;
    let left;
    let top;

    if (container === document.body) {
      scrollTop = window.scrollY;
      left = inputLeft + window.scrollX;
      top = inputTop + scrollTop;
    } else {
      scrollTop = container.scrollTop;
      left = inputLeft - containerLeft;
      top = inputTop - containerTop + scrollTop;
    }

    if (orientX === 'auto') {
      if (left < 0) {
        // align to the left and move into visible area if input's left edge < window's
        orientX = 'left';
        left = 10;
      } else if (left + calendarWidth > containerWidth) {
        // align to the right if canlendar's right edge > container's
        orientX = 'right';
      } else {
        orientX = getTextDirection(inputField) === 'rtl' ? 'right' : 'left';
      }
    }
    if (orientX === 'right') {
      left -= calendarWidth - inputWidth;
    }

    if (orientY === 'auto') {
      orientY = top - calendarHeight < scrollTop ? 'bottom' : 'top';
    }
    if (orientY === 'top') {
      top -= calendarHeight;
    } else {
      top += inputHeight;
    }

    classList.remove(
      'datepicker-orient-top',
      'datepicker-orient-bottom',
      'datepicker-orient-right',
      'datepicker-orient-left'
    );
    classList.add(`datepicker-orient-${orientY}`, `datepicker-orient-${orientX}`);

    style.top = top ? `${top}px` : top;
    style.left = left ? `${left}px` : left;
  }

  setViewSwitchLabel(labelText) {
    this.controls.viewSwitch.textContent = labelText;
  }

  setPrevBtnDisabled(disabled) {
    this.controls.prevBtn.disabled = disabled;
  }

  setNextBtnDisabled(disabled) {
    this.controls.nextBtn.disabled = disabled;
  }

  changeView(viewId) {
    const oldView = this.currentView;
    const newView =  this.views[viewId];
    if (newView.id !== oldView.id) {
      this.currentView = newView;
      this._renderMethod = 'render';
      triggerDatepickerEvent(this.datepicker, 'changeView');
      this.main.replaceChild(newView.element, oldView.element);
    }
    return this;
  }

  // Change the focused date (view date)
  changeFocus(newViewDate) {
    this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refreshFocus';
    this.views.forEach((view) => {
      view.updateFocus();
    });
    return this;
  }

  // Apply the change of the selected dates
  update() {
    const newViewDate = computeResetViewDate(this.datepicker);
    this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refresh';
    this.views.forEach((view) => {
      view.updateFocus();
      view.updateSelection();
    });
    return this;
  }

  // Refresh the picker UI
  render(quickRender = true) {
    const renderMethod = (quickRender && this._renderMethod) || 'render';
    delete this._renderMethod;

    this.currentView[renderMethod]();
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/events/inputFieldListeners.js




// Find the closest date that doesn't meet the condition for unavailable date
// Returns undefined if no available date is found
// addFn: function to calculate the next date
//   - args: time value, amount
// increase: amount to pass to addFn
// testFn: function to test the unavailablity of the date
//   - args: time value; retun: true if unavailable
function findNextAvailableOne(date, addFn, increase, testFn, min, max) {
  if (!(0,utils/* isInRange */.mh)(date, min, max)) {
    return;
  }
  if (testFn(date)) {
    const newDate = addFn(date, increase);
    return findNextAvailableOne(newDate, addFn, increase, testFn, min, max);
  }
  return date;
}

// direction: -1 (left/up), 1 (right/down)
// vertical: true for up/down, false for left/right
function moveByArrowKey(datepicker, ev, direction, vertical) {
  const picker = datepicker.picker;
  const currentView = picker.currentView;
  const step = currentView.step || 1;
  let viewDate = picker.viewDate;
  let addFn;
  let testFn;
  switch (currentView.id) {
    case 0:
      if (vertical) {
        viewDate = (0,lib_date/* addDays */.E4)(viewDate, direction * 7);
      } else if (ev.ctrlKey || ev.metaKey) {
        viewDate = (0,lib_date/* addYears */.Bc)(viewDate, direction);
      } else {
        viewDate = (0,lib_date/* addDays */.E4)(viewDate, direction);
      }
      addFn = lib_date/* addDays */.E4;
      testFn = (date) => currentView.disabled.includes(date);
      break;
    case 1:
      viewDate = (0,lib_date/* addMonths */.zI)(viewDate, vertical ? direction * 4 : direction);
      addFn = lib_date/* addMonths */.zI;
      testFn = (date) => {
        const dt = new Date(date);
        const {year, disabled} = currentView;
        return dt.getFullYear() === year && disabled.includes(dt.getMonth());
      };
      break;
    default:
      viewDate = (0,lib_date/* addYears */.Bc)(viewDate, direction * (vertical ? 4 : 1) * step);
      addFn = lib_date/* addYears */.Bc;
      testFn = date => currentView.disabled.includes((0,lib_date/* startOfYearPeriod */.ak)(date, step));
  }
  viewDate = findNextAvailableOne(
    viewDate,
    addFn,
    direction < 0 ? -step : step,
    testFn,
    currentView.minDate,
    currentView.maxDate
  );
  if (viewDate !== undefined) {
    picker.changeFocus(viewDate).render();
  }
}

function onKeydown(datepicker, ev) {
  if (ev.key === 'Tab') {
    unfocus(datepicker);
    return;
  }

  const picker = datepicker.picker;
  const {id, isMinView} = picker.currentView;
  if (!picker.active) {
    switch (ev.key) {
      case 'ArrowDown':
      case 'Escape':
        picker.show();
        break;
      case 'Enter':
        datepicker.update();
        break;
      default:
        return;
    }
  } else if (datepicker.editMode) {
    switch (ev.key) {
      case 'Escape':
        picker.hide();
        break;
      case 'Enter':
        datepicker.exitEditMode({update: true, autohide: datepicker.config.autohide});
        break;
      default:
        return;
    }
  } else {
    switch (ev.key) {
      case 'Escape':
        picker.hide();
        break;
      case 'ArrowLeft':
        if (ev.ctrlKey || ev.metaKey) {
          goToPrevOrNext(datepicker, -1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, false);
        }
        break;
      case 'ArrowRight':
        if (ev.ctrlKey || ev.metaKey) {
          goToPrevOrNext(datepicker, 1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, 1, false);
        }
        break;
      case 'ArrowUp':
        if (ev.ctrlKey || ev.metaKey) {
          switchView(datepicker);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, true);
        }
        break;
      case 'ArrowDown':
        if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
          return;
        }
        moveByArrowKey(datepicker, ev, 1, true);
        break;
      case 'Enter':
        if (isMinView) {
          datepicker.setDate(picker.viewDate);
        } else {
          picker.changeView(id - 1).render();
        }
        break;
      case 'Backspace':
      case 'Delete':
        datepicker.enterEditMode();
        return;
      default:
        if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
        }
        return;
    }
  }
  ev.preventDefault();
  ev.stopPropagation();
}

function onFocus(datepicker) {
  if (datepicker.config.showOnFocus && !datepicker._showing) {
    datepicker.show();
  }
}

// for the prevention for entering edit mode while getting focus on click
function onMousedown(datepicker, ev) {
  const el = ev.target;
  if (datepicker.picker.active || datepicker.config.showOnClick) {
    el._active = el === document.activeElement;
    el._clicking = setTimeout(() => {
      delete el._active;
      delete el._clicking;
    }, 2000);
  }
}

function onClickInput(datepicker, ev) {
  const el = ev.target;
  if (!el._clicking) {
    return;
  }
  clearTimeout(el._clicking);
  delete el._clicking;

  if (el._active) {
    datepicker.enterEditMode();
  }
  delete el._active;

  if (datepicker.config.showOnClick) {
    datepicker.show();
  }
}

function onPaste(datepicker, ev) {
  if (ev.clipboardData.types.includes('text/plain')) {
    datepicker.enterEditMode();
  }
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/events/otherListeners.js



// for the `document` to delegate the events from outside the picker/input field
function onClickOutside(datepicker, ev) {
  const element = datepicker.element;
  if (element !== document.activeElement) {
    return;
  }
  const pickerElem = datepicker.picker.element;
  if ((0,lib_event/* findElementInEventPath */.He)(ev, el => el === element || el === pickerElem)) {
    return;
  }
  unfocus(datepicker);
}

;// CONCATENATED MODULE: ./node_modules/flowbite-datepicker/js/Datepicker.js












function stringifyDates(dates, config) {
  return dates
    .map(dt => (0,date_format/* formatDate */.p6)(dt, config.format, config.locale))
    .join(config.dateDelimiter);
}

// parse input dates and create an array of time values for selection
// returns undefined if there are no valid dates in inputDates
// when origDates (current selection) is passed, the function works to mix
// the input dates into the current selection
function processInputDates(datepicker, inputDates, clear = false) {
  const {config, dates: origDates, rangepicker} = datepicker;
  if (inputDates.length === 0) {
    // empty input is considered valid unless origiDates is passed
    return clear ? [] : undefined;
  }

  const rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
  let newDates = inputDates.reduce((dates, dt) => {
    let date = (0,date_format/* parseDate */.sG)(dt, config.format, config.locale);
    if (date === undefined) {
      return dates;
    }
    if (config.pickLevel > 0) {
      // adjust to 1st of the month/Jan 1st of the year
      // or to the last day of the monh/Dec 31st of the year if the datepicker
      // is the range-end picker of a rangepicker
      const dt = new Date(date);
      if (config.pickLevel === 1) {
        date = rangeEnd
          ? dt.setMonth(dt.getMonth() + 1, 0)
          : dt.setDate(1);
      } else {
        date = rangeEnd
          ? dt.setFullYear(dt.getFullYear() + 1, 0, 0)
          : dt.setMonth(0, 1);
      }
    }
    if (
      (0,utils/* isInRange */.mh)(date, config.minDate, config.maxDate)
      && !dates.includes(date)
      && !config.datesDisabled.includes(date)
      && !config.daysOfWeekDisabled.includes(new Date(date).getDay())
    ) {
      dates.push(date);
    }
    return dates;
  }, []);
  if (newDates.length === 0) {
    return;
  }
  if (config.multidate && !clear) {
    // get the synmetric difference between origDates and newDates
    newDates = newDates.reduce((dates, date) => {
      if (!origDates.includes(date)) {
        dates.push(date);
      }
      return dates;
    }, origDates.filter(date => !newDates.includes(date)));
  }
  // do length check always because user can input multiple dates regardless of the mode
  return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates
    ? newDates.slice(config.maxNumberOfDates * -1)
    : newDates;
}

// refresh the UI elements
// modes: 1: input only, 2, picker only, 3 both
function refreshUI(datepicker, mode = 3, quickRender = true) {
  const {config, picker, inputField} = datepicker;
  if (mode & 2) {
    const newView = picker.active ? config.pickLevel : config.startView;
    picker.update().changeView(newView).render(quickRender);
  }
  if (mode & 1 && inputField) {
    inputField.value = stringifyDates(datepicker.dates, config);
  }
}

function setDate(datepicker, inputDates, options) {
  let {clear, render, autohide} = options;
  if (render === undefined) {
    render = true;
  }
  if (!render) {
    autohide = false;
  } else if (autohide === undefined) {
    autohide = datepicker.config.autohide;
  }

  const newDates = processInputDates(datepicker, inputDates, clear);
  if (!newDates) {
    return;
  }
  if (newDates.toString() !== datepicker.dates.toString()) {
    datepicker.dates = newDates;
    refreshUI(datepicker, render ? 3 : 1);
    triggerDatepickerEvent(datepicker, 'changeDate');
  } else {
    refreshUI(datepicker, 1);
  }
  if (autohide) {
    datepicker.hide();
  }
}

/**
 * Class representing a date picker
 */
class Datepicker {
  /**
   * Create a date picker
   * @param  {Element} element - element to bind a date picker
   * @param  {Object} [options] - config options
   * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
   * date picker belongs to. Use this only when creating date picker as a part
   * of date range picker
   */
  constructor(element, options = {}, rangepicker = undefined) {
    element.datepicker = this;
    this.element = element;

    // set up config
    const config = this.config = Object.assign({
      buttonClass: (options.buttonClass && String(options.buttonClass)) || 'button',
      container: document.body,
      defaultViewDate: (0,lib_date/* today */.Lg)(),
      maxDate: undefined,
      minDate: undefined,
    }, processOptions(options_defaultOptions, this));
    this._options = options;
    Object.assign(config, processOptions(options, this));

    // configure by type
    const inline = this.inline = element.tagName !== 'INPUT';
    let inputField;
    let initialDates;

    if (inline) {
      config.container = element;
      initialDates = (0,utils/* stringToArray */.W7)(element.dataset.date, config.dateDelimiter);
      delete element.dataset.date;
    } else {
      const container = options.container ? document.querySelector(options.container) : null;
      if (container) {
        config.container = container;
      }
      inputField = this.inputField = element;
      inputField.classList.add('datepicker-input');
      initialDates = (0,utils/* stringToArray */.W7)(inputField.value, config.dateDelimiter);
    }
    if (rangepicker) {
      // check validiry
      const index = rangepicker.inputs.indexOf(inputField);
      const datepickers = rangepicker.datepickers;
      if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
        throw Error('Invalid rangepicker object.');
      }
      // attach itaelf to the rangepicker here so that processInputDates() can
      // determine if this is the range-end picker of the rangepicker while
      // setting inital values when pickLevel > 0
      datepickers[index] = this;
      // add getter for rangepicker
      Object.defineProperty(this, 'rangepicker', {
        get() {
          return rangepicker;
        },
      });
    }

    // set initial dates
    this.dates = [];
    // process initial value
    const inputDateValues = processInputDates(this, initialDates);
    if (inputDateValues && inputDateValues.length > 0) {
      this.dates = inputDateValues;
    }
    if (inputField) {
      inputField.value = stringifyDates(this.dates, config);
    }

    const picker = this.picker = new Picker(this);

    if (inline) {
      this.show();
    } else {
      // set up event listeners in other modes
      const onMousedownDocument = onClickOutside.bind(null, this);
      const listeners = [
        [inputField, 'keydown', onKeydown.bind(null, this)],
        [inputField, 'focus', onFocus.bind(null, this)],
        [inputField, 'mousedown', onMousedown.bind(null, this)],
        [inputField, 'click', onClickInput.bind(null, this)],
        [inputField, 'paste', onPaste.bind(null, this)],
        [document, 'mousedown', onMousedownDocument],
        [document, 'touchstart', onMousedownDocument],
        [window, 'resize', picker.place.bind(picker)]
      ];
      (0,lib_event/* registerListeners */.cF)(this, listeners);
    }
  }

  /**
   * Format Date object or time value in given format and language
   * @param  {Date|Number} date - date or time value to format
   * @param  {String|Object} format - format string or object that contains
   * toDisplay() custom formatter, whose signature is
   * - args:
   *   - date: {Date} - Date instance of the date passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {String} formatted date
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {String} formatted date
   */
  static formatDate(date, format, lang) {
    return (0,date_format/* formatDate */.p6)(date, format, lang && locales[lang] || locales.en);
  }

  /**
   * Parse date string
   * @param  {String|Date|Number} dateStr - date string, Date object or time
   * value to parse
   * @param  {String|Object} format - format string or object that contains
   * toValue() custom parser, whose signature is
   * - args:
   *   - dateStr: {String|Date|Number} - the dateStr passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {Date|Number} parsed date or its time value
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {Number} time value of parsed date
   */
  static parseDate(dateStr, format, lang) {
    return (0,date_format/* parseDate */.sG)(dateStr, format, lang && locales[lang] || locales.en);
  }

  /**
   * @type {Object} - Installed locales in `[languageCode]: localeObject` format
   * en`:_English (US)_ is pre-installed.
   */
  static get locales() {
    return locales;
  }

  /**
   * @type {Boolean} - Whether the picker element is shown. `true` whne shown
   */
  get active() {
    return !!(this.picker && this.picker.active);
  }

  /**
   * @type {HTMLDivElement} - DOM object of picker element
   */
  get pickerElement() {
    return this.picker ? this.picker.element : undefined;
  }

  /**
   * Set new values to the config options
   * @param {Object} options - config options to update
   */
  setOptions(options) {
    const picker = this.picker;
    const newOptions = processOptions(options, this);
    Object.assign(this._options, options);
    Object.assign(this.config, newOptions);
    picker.setOptions(newOptions);

    refreshUI(this, 3);
  }

  /**
   * Show the picker element
   */
  show() {
    if (this.inputField) {
      if (this.inputField.disabled) {
        return;
      }
      if (this.inputField !== document.activeElement) {
        this._showing = true;
        this.inputField.focus();
        delete this._showing;
      }
    }
    this.picker.show();
  }

  /**
   * Hide the picker element
   * Not available on inline picker
   */
  hide() {
    if (this.inline) {
      return;
    }
    this.picker.hide();
    this.picker.update().changeView(this.config.startView).render();
  }

  /**
   * Destroy the Datepicker instance
   * @return {Detepicker} - the instance destroyed
   */
  destroy() {
    this.hide();
    (0,lib_event/* unregisterListeners */.uV)(this);
    this.picker.detach();
    if (!this.inline) {
      this.inputField.classList.remove('datepicker-input');
    }
    delete this.element.datepicker;
    return this;
  }

  /**
   * Get the selected date(s)
   *
   * The method returns a Date object of selected date by default, and returns
   * an array of selected dates in multidate mode. If format string is passed,
   * it returns date string(s) formatted in given format.
   *
   * @param  {String} [format] - Format string to stringify the date(s)
   * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
   * selected, empty array in multidate mode and untitled in sigledate mode
   */
  getDate(format = undefined) {
    const callback = format
      ? date => (0,date_format/* formatDate */.p6)(date, format, this.config.locale)
      : date => new Date(date);

    if (this.config.multidate) {
      return this.dates.map(callback);
    }
    if (this.dates.length > 0) {
      return callback(this.dates[0]);
    }
  }

  /**
   * Set selected date(s)
   *
   * In multidate mode, you can pass multiple dates as a series of arguments
   * or an array. (Since each date is parsed individually, the type of the
   * dates doesn't have to be the same.)
   * The given dates are used to toggle the select status of each date. The
   * number of selected dates is kept from exceeding the length set to
   * maxNumberOfDates.
   *
   * With clear: true option, the method can be used to clear the selection
   * and to replace the selection instead of toggling in multidate mode.
   * If the option is passed with no date arguments or an empty dates array,
   * it works as "clear" (clear the selection then set nothing), and if the
   * option is passed with new dates to select, it works as "replace" (clear
   * the selection then set the given dates)
   *
   * When render: false option is used, the method omits re-rendering the
   * picker element. In this case, you need to call refresh() method later in
   * order for the picker element to reflect the changes. The input field is
   * refreshed always regardless of this option.
   *
   * When invalid (unparsable, repeated, disabled or out-of-range) dates are
   * passed, the method ignores them and applies only valid ones. In the case
   * that all the given dates are invalid, which is distinguished from passing
   * no dates, the method considers it as an error and leaves the selection
   * untouched.
   *
   * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
   * objects, time values or mix of those for new selection
   * @param {Object} [options] - function options
   * - clear: {boolean} - Whether to clear the existing selection
   *     defualt: false
   * - render: {boolean} - Whether to re-render the picker element
   *     default: true
   * - autohide: {boolean} - Whether to hide the picker element after re-render
   *     Ignored when used with render: false
   *     default: config.autohide
   */
  setDate(...args) {
    const dates = [...args];
    const opts = {};
    const lastArg = (0,utils/* lastItemOf */.Jm)(args);
    if (
      typeof lastArg === 'object'
      && !Array.isArray(lastArg)
      && !(lastArg instanceof Date)
      && lastArg
    ) {
      Object.assign(opts, dates.pop());
    }

    const inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
    setDate(this, inputDates, opts);
  }

  /**
   * Update the selected date(s) with input field's value
   * Not available on inline picker
   *
   * The input field will be refreshed with properly formatted date string.
   *
   * @param  {Object} [options] - function options
   * - autohide: {boolean} - whether to hide the picker element after refresh
   *     default: false
   */
  update(options = undefined) {
    if (this.inline) {
      return;
    }

    const opts = {clear: true, autohide: !!(options && options.autohide)};
    const inputDates = (0,utils/* stringToArray */.W7)(this.inputField.value, this.config.dateDelimiter);
    setDate(this, inputDates, opts);
  }

  /**
   * Refresh the picker element and the associated input field
   * @param {String} [target] - target item when refreshing one item only
   * 'picker' or 'input'
   * @param {Boolean} [forceRender] - whether to re-render the picker element
   * regardless of its state instead of optimized refresh
   */
  refresh(target = undefined, forceRender = false) {
    if (target && typeof target !== 'string') {
      forceRender = target;
      target = undefined;
    }

    let mode;
    if (target === 'picker') {
      mode = 2;
    } else if (target === 'input') {
      mode = 1;
    } else {
      mode = 3;
    }
    refreshUI(this, mode, !forceRender);
  }

  /**
   * Enter edit mode
   * Not available on inline picker or when the picker element is hidden
   */
  enterEditMode() {
    if (this.inline || !this.picker.active || this.editMode) {
      return;
    }
    this.editMode = true;
    this.inputField.classList.add('in-edit', 'border-blue-700');
  }

  /**
   * Exit from edit mode
   * Not available on inline picker
   * @param  {Object} [options] - function options
   * - update: {boolean} - whether to call update() after exiting
   *     If false, input field is revert to the existing selection
   *     default: false
   */
  exitEditMode(options = undefined) {
    if (this.inline || !this.editMode) {
      return;
    }
    const opts = Object.assign({update: false}, options);
    delete this.editMode;
    this.inputField.classList.remove('in-edit', 'border-blue-700');
    if (opts.update) {
      this.update(opts);
    }
  }
}


/***/ }),

/***/ 963:
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_84376__) {

/* harmony export */ __nested_webpack_require_84376__.d(__nested_webpack_exports__, {
/* harmony export */   "CL": function() { return /* binding */ reFormatTokens; },
/* harmony export */   "p6": function() { return /* binding */ formatDate; },
/* harmony export */   "sG": function() { return /* binding */ parseDate; }
/* harmony export */ });
/* unused harmony export reNonDateParts */
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_84376__(560);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_84376__(105);



// pattern for format parts
const reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
// pattern for non date parts
const reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
// cache for persed formats
let knownFormats = {};
// parse funtions for date parts
const parseFns = {
  y(date, year) {
    return new Date(date).setFullYear(parseInt(year, 10));
  },
  m(date, month, locale) {
    const newDate = new Date(date);
    let monthIndex = parseInt(month, 10) - 1;

    if (isNaN(monthIndex)) {
      if (!month) {
        return NaN;
      }

      const monthName = month.toLowerCase();
      const compareNames = name => name.toLowerCase().startsWith(monthName);
      // compare with both short and full names because some locales have periods
      // in the short names (not equal to the first X letters of the full names)
      monthIndex = locale.monthsShort.findIndex(compareNames);
      if (monthIndex < 0) {
        monthIndex = locale.months.findIndex(compareNames);
      }
      if (monthIndex < 0) {
        return NaN;
      }
    }

    newDate.setMonth(monthIndex);
    return newDate.getMonth() !== normalizeMonth(monthIndex)
      ? newDate.setDate(0)
      : newDate.getTime();
  },
  d(date, day) {
    return new Date(date).setDate(parseInt(day, 10));
  },
};
// format functions for date parts
const formatFns = {
  d(date) {
    return date.getDate();
  },
  dd(date) {
    return padZero(date.getDate(), 2);
  },
  D(date, locale) {
    return locale.daysShort[date.getDay()];
  },
  DD(date, locale) {
    return locale.days[date.getDay()];
  },
  m(date) {
    return date.getMonth() + 1;
  },
  mm(date) {
    return padZero(date.getMonth() + 1, 2);
  },
  M(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MM(date, locale) {
    return locale.months[date.getMonth()];
  },
  y(date) {
    return date.getFullYear();
  },
  yy(date) {
    return padZero(date.getFullYear(), 2).slice(-2);
  },
  yyyy(date) {
    return padZero(date.getFullYear(), 4);
  },
};

// get month index in normal range (0 - 11) from any number
function normalizeMonth(monthIndex) {
  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}

function padZero(num, length) {
  return num.toString().padStart(length, '0');
}

function parseFormatString(format) {
  if (typeof format !== 'string') {
    throw new Error("Invalid date format.");
  }
  if (format in knownFormats) {
    return knownFormats[format];
  }

  // sprit the format string into parts and seprators
  const separators = format.split(reFormatTokens);
  const parts = format.match(new RegExp(reFormatTokens, 'g'));
  if (separators.length === 0 || !parts) {
    throw new Error("Invalid date format.");
  }

  // collect format functions used in the format
  const partFormatters = parts.map(token => formatFns[token]);

  // collect parse function keys used in the format
  // iterate over parseFns' keys in order to keep the order of the keys.
  const partParserKeys = Object.keys(parseFns).reduce((keys, key) => {
    const token = parts.find(part => part[0] !== 'D' && part[0].toLowerCase() === key);
    if (token) {
      keys.push(key);
    }
    return keys;
  }, []);

  return knownFormats[format] = {
    parser(dateStr, locale) {
      const dateParts = dateStr.split(reNonDateParts).reduce((dtParts, part, index) => {
        if (part.length > 0 && parts[index]) {
          const token = parts[index][0];
          if (token === 'M') {
            dtParts.m = part;
          } else if (token !== 'D') {
            dtParts[token] = part;
          }
        }
        return dtParts;
      }, {});

      // iterate over partParserkeys so that the parsing is made in the oder
      // of year, month and day to prevent the day parser from correcting last
      // day of month wrongly
      return partParserKeys.reduce((origDate, key) => {
        const newDate = parseFns[key](origDate, dateParts[key], locale);
        // ingnore the part failed to parse
        return isNaN(newDate) ? origDate : newDate;
      }, (0,_date_js__WEBPACK_IMPORTED_MODULE_0__/* .today */ .Lg)());
    },
    formatter(date, locale) {
      let dateStr = partFormatters.reduce((str, fn, index) => {
        return str += `${separators[index]}${fn(date, locale)}`;
      }, '');
      // separators' length is always parts' length + 1,
      return dateStr += (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .lastItemOf */ .Jm)(separators);
    },
  };
}

function parseDate(dateStr, format, locale) {
  if (dateStr instanceof Date || typeof dateStr === 'number') {
    const date = (0,_date_js__WEBPACK_IMPORTED_MODULE_0__/* .stripTime */ .xR)(dateStr);
    return isNaN(date) ? undefined : date;
  }
  if (!dateStr) {
    return undefined;
  }
  if (dateStr === 'today') {
    return (0,_date_js__WEBPACK_IMPORTED_MODULE_0__/* .today */ .Lg)();
  }

  if (format && format.toValue) {
    const date = format.toValue(dateStr, format, locale);
    return isNaN(date) ? undefined : (0,_date_js__WEBPACK_IMPORTED_MODULE_0__/* .stripTime */ .xR)(date);
  }

  return parseFormatString(format).parser(dateStr, locale);
}

function formatDate(date, format, locale) {
  if (isNaN(date) || (!date && date !== 0)) {
    return '';
  }

  const dateObj = typeof date === 'number' ? new Date(date) : date;

  if (format.toDisplay) {
    return format.toDisplay(dateObj, format, locale);
  }

  return parseFormatString(format).formatter(dateObj, locale);
}


/***/ }),

/***/ 560:
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_90488__) {

/* harmony export */ __nested_webpack_require_90488__.d(__nested_webpack_exports__, {
/* harmony export */   "Bc": function() { return /* binding */ addYears; },
/* harmony export */   "E4": function() { return /* binding */ addDays; },
/* harmony export */   "Lg": function() { return /* binding */ today; },
/* harmony export */   "Qk": function() { return /* binding */ getWeek; },
/* harmony export */   "ak": function() { return /* binding */ startOfYearPeriod; },
/* harmony export */   "by": function() { return /* binding */ dateValue; },
/* harmony export */   "fr": function() { return /* binding */ dayOfTheWeekOf; },
/* harmony export */   "jh": function() { return /* binding */ addWeeks; },
/* harmony export */   "xR": function() { return /* binding */ stripTime; },
/* harmony export */   "zI": function() { return /* binding */ addMonths; }
/* harmony export */ });
function stripTime(timeValue) {
  return new Date(timeValue).setHours(0, 0, 0, 0);
}

function today() {
  return new Date().setHours(0, 0, 0, 0);
}

// Get the time value of the start of given date or year, month and day
function dateValue(...args) {
  switch (args.length) {
    case 0:
      return today();
    case 1:
      return stripTime(args[0]);
  }

  // use setFullYear() to keep 2-digit year from being mapped to 1900-1999
  const newDate = new Date(0);
  newDate.setFullYear(...args);
  return newDate.setHours(0, 0, 0, 0);
}

function addDays(date, amount) {
  const newDate = new Date(date);
  return newDate.setDate(newDate.getDate() + amount);
}

function addWeeks(date, amount) {
  return addDays(date, amount * 7);
}

function addMonths(date, amount) {
  // If the day of the date is not in the new month, the last day of the new
  // month will be returned. e.g. Jan 31 + 1 month → Feb 28 (not Mar 03)
  const newDate = new Date(date);
  const monthsToSet = newDate.getMonth() + amount;
  let expectedMonth = monthsToSet % 12;
  if (expectedMonth < 0) {
    expectedMonth += 12;
  }

  const time = newDate.setMonth(monthsToSet);
  return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
}

function addYears(date, amount) {
  // If the date is Feb 29 and the new year is not a leap year, Feb 28 of the
  // new year will be returned.
  const newDate = new Date(date);
  const expectedMonth = newDate.getMonth();
  const time = newDate.setFullYear(newDate.getFullYear() + amount);
  return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
}

// Calculate the distance bettwen 2 days of the week
function dayDiff(day, from) {
  return (day - from + 7) % 7;
}

// Get the date of the specified day of the week of given base date
function dayOfTheWeekOf(baseDate, dayOfWeek, weekStart = 0) {
  const baseDay = new Date(baseDate).getDay();
  return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
}

// Get the ISO week of a date
function getWeek(date) {
  // start of ISO week is Monday
  const thuOfTheWeek = dayOfTheWeekOf(date, 4, 1);
  // 1st week == the week where the 4th of January is in
  const firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
  return Math.round((thuOfTheWeek - firstThu) / 604800000) + 1;
}

// Get the start year of the period of years that includes given date
// years: length of the year period
function startOfYearPeriod(date, years) {
  /* @see https://en.wikipedia.org/wiki/Year_zero#ISO_8601 */
  const year = new Date(date).getFullYear();
  return Math.floor(year / years) * years;
}


/***/ }),

/***/ 698:
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_94098__) {

/* harmony export */ __nested_webpack_require_94098__.d(__nested_webpack_exports__, {
/* harmony export */   "He": function() { return /* binding */ findElementInEventPath; },
/* harmony export */   "cF": function() { return /* binding */ registerListeners; },
/* harmony export */   "uV": function() { return /* binding */ unregisterListeners; }
/* harmony export */ });
const listenerRegistry = new WeakMap();
const {addEventListener, removeEventListener} = EventTarget.prototype;

// Register event listeners to a key object
// listeners: array of listener definitions;
//   - each definition must be a flat array of event target and the arguments
//     used to call addEventListener() on the target
function registerListeners(keyObj, listeners) {
  let registered = listenerRegistry.get(keyObj);
  if (!registered) {
    registered = [];
    listenerRegistry.set(keyObj, registered);
  }
  listeners.forEach((listener) => {
    addEventListener.call(...listener);
    registered.push(listener);
  });
}

function unregisterListeners(keyObj) {
  let listeners = listenerRegistry.get(keyObj);
  if (!listeners) {
    return;
  }
  listeners.forEach((listener) => {
    removeEventListener.call(...listener);
  });
  listenerRegistry.delete(keyObj);
}

// Event.composedPath() polyfill for Edge
// based on https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec
if (!Event.prototype.composedPath) {
  const getComposedPath = (node, path = []) => {
    path.push(node);

    let parent;
    if (node.parentNode) {
      parent = node.parentNode;
    } else if (node.host) { // ShadowRoot
      parent = node.host;
    } else if (node.defaultView) {  // Document
      parent = node.defaultView;
    }
    return parent ? getComposedPath(parent, path) : path;
  };

  Event.prototype.composedPath = function () {
    return getComposedPath(this.target);
  };
}

function findFromPath(path, criteria, currentTarget, index = 0) {
  const el = path[index];
  if (criteria(el)) {
    return el;
  } else if (el === currentTarget || !el.parentElement) {
    // stop when reaching currentTarget or <html>
    return;
  }
  return findFromPath(path, criteria, currentTarget, index + 1);
}

// Search for the actual target of a delegated event
function findElementInEventPath(ev, selector) {
  const criteria = typeof selector === 'function' ? selector : el => el.matches(selector);
  return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
}


/***/ }),

/***/ 105:
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_96649__) {

/* harmony export */ __nested_webpack_require_96649__.d(__nested_webpack_exports__, {
/* harmony export */   "$C": function() { return /* binding */ pushUnique; },
/* harmony export */   "Jm": function() { return /* binding */ lastItemOf; },
/* harmony export */   "W7": function() { return /* binding */ stringToArray; },
/* harmony export */   "em": function() { return /* binding */ createTagRepeat; },
/* harmony export */   "jG": function() { return /* binding */ limitToRange; },
/* harmony export */   "l$": function() { return /* binding */ hasProperty; },
/* harmony export */   "mh": function() { return /* binding */ isInRange; },
/* harmony export */   "zh": function() { return /* binding */ optimizeTemplateHTML; }
/* harmony export */ });
function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function lastItemOf(arr) {
  return arr[arr.length - 1];
}

// push only the items not included in the array
function pushUnique(arr, ...items) {
  items.forEach((item) => {
    if (arr.includes(item)) {
      return;
    }
    arr.push(item);
  });
  return arr;
}

function stringToArray(str, separator) {
  // convert empty string to an empty array
  return str ? str.split(separator) : [];
}

function isInRange(testVal, min, max) {
  const minOK = min === undefined || testVal >= min;
  const maxOK = max === undefined || testVal <= max;
  return minOK && maxOK;
}

function limitToRange(val, min, max) {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

function createTagRepeat(tagName, repeat, attributes = {}, index = 0, html = '') {
  const openTagSrc = Object.keys(attributes).reduce((src, attr) => {
    let val = attributes[attr];
    if (typeof val === 'function') {
      val = val(index);
    }
    return `${src} ${attr}="${val}"`;
  }, tagName);
  html += `<${openTagSrc}></${tagName}>`;

  const next = index + 1;
  return next < repeat
    ? createTagRepeat(tagName, repeat, attributes, next, html)
    : html;
}

// Remove the spacing surrounding tags for HTML parser not to create text nodes
// before/after elements
function optimizeTemplateHTML(html) {
  return html.replace(/>\s+/g, '>').replace(/\s+</, '<');
}


/***/ }),

/***/ 947:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var Events = /** @class */ (function () {
    function Events(eventType, eventFunctions) {
        if (eventFunctions === void 0) { eventFunctions = []; }
        this._eventType = eventType;
        this._eventFunctions = eventFunctions;
    }
    Events.prototype.init = function () {
        var _this = this;
        this._eventFunctions.forEach(function (eventFunction) {
            if (typeof window !== 'undefined') {
                window.addEventListener(_this._eventType, eventFunction);
            }
        });
    };
    return Events;
}());
exports["default"] = Events;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_99858__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_99858__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_99858__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_99858__.o(definition, key) && !__nested_webpack_require_99858__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_99858__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_99858__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__nested_webpack_require_99858__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_99858__.d(__nested_webpack_exports__, {
/* harmony export */   "initDatepickers": function() { return /* binding */ initDatepickers; }
/* harmony export */ });
/* harmony import */ var flowbite_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_99858__(770);
/* harmony import */ var flowbite_datepicker_DateRangePicker__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_99858__(482);
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_99858__(947);



var getDatepickerOptions = function getDatepickerOptions(datepickerEl) {
  var buttons = datepickerEl.hasAttribute('datepicker-buttons');
  var autohide = datepickerEl.hasAttribute('datepicker-autohide');
  var format = datepickerEl.hasAttribute('datepicker-format');
  var orientation = datepickerEl.hasAttribute('datepicker-orientation');
  var title = datepickerEl.hasAttribute('datepicker-title');
  var options = {};
  if (buttons) {
    options.todayBtn = true;
    options.clearBtn = true;
  }
  if (autohide) {
    options.autohide = true;
  }
  if (format) {
    options.format = datepickerEl.getAttribute('datepicker-format');
  }
  if (orientation) {
    options.orientation = datepickerEl.getAttribute('datepicker-orientation');
  }
  if (title) {
    options.title = datepickerEl.getAttribute('datepicker-title');
  }
  return options;
};
function initDatepickers() {
  document.querySelectorAll('[datepicker]').forEach(function (datepickerEl) {
    new flowbite_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(datepickerEl, getDatepickerOptions(datepickerEl));
  });
  document.querySelectorAll('[inline-datepicker]').forEach(function (datepickerEl) {
    new flowbite_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(datepickerEl, getDatepickerOptions(datepickerEl));
  });
  document.querySelectorAll('[date-rangepicker]').forEach(function (datepickerEl) {
    new flowbite_datepicker_DateRangePicker__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(datepickerEl, getDatepickerOptions(datepickerEl));
  });
}
var events = new _dom_events__WEBPACK_IMPORTED_MODULE_2__["default"]('DOMContentLoaded', [initDatepickers]);
events.init();
}();
/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=datepicker.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/task.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
// task.ts
__webpack_require__(/*! flowbite/dist/datepicker.js */ "./node_modules/flowbite/dist/datepicker.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7QUFPRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQSxvREFBb0QsOENBQThDLHVIQUF1SCxFQUFFO0FBQzNOLHVEQUF1RCxnREFBZ0Qsc0xBQXNMLEVBQUU7QUFDL1I7O0FBRUE7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLHVCQUF1Qiw4Q0FBOEMsd0hBQXdILEVBQUU7QUFDL0w7O0FBRUE7O0FBRUEsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7OztBQVNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyTUFBMk0sZUFBZTtBQUMxTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7QUFNRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQXFGLHVCQUF1QjtBQUM1RztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJNQUEyTSxlQUFlO0FBQzFOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7OztBQU1EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyw0QkFBNEI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDLFdBQVcsR0FBRyxVQUFVO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMk1BQTJNLGVBQWU7QUFDMU47QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLGVBQWU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbURBQW1EO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWFEO0FBQ0E7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QTtBQUNBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsNkJBQTZCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsU0FBUztBQUN4QjtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFD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QUFpQjtBQUNuRjtBQUNBLDJEQUEyRCxhQUFhO0FBQ3hFO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxJQUFJLDBCQUFtQjtBQUN2QjtBQUNBO0FBQ0EsZ0NBQW1CLEdBQUcsMEJBQW1CO0FBQ3pDLHFCQUFxQixnQ0FBbUIsR0FBRywwQkFBbUI7QUFDOUQsdURBQXVEO0FBQ3ZELHNCQUFzQjtBQUN0Qix1RkFBdUYsZ0NBQW1CO0FBQzFHLDRGQUE0RixnQ0FBbUI7QUFDL0csb0VBQW9FLGdDQUFtQjs7OztBQUl2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlCQUFpQiwwQkFBbUI7QUFDcEMsVUFBVTtBQUNWO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7VUM5aUdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsVUFBVTtBQUNWLHFHQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmlzLnNpbXBsZTJiLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2Rpc3QvZGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly9wYXJpcy5zaW1wbGUyYi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wYXJpcy5zaW1wbGUyYi8uL3NyYy90YXNrLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRmxvd2JpdGVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRmxvd2JpdGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRmxvd2JpdGVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gNDgyOlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiWlwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gRGF0ZVJhbmdlUGlja2VyOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfbGliX2V2ZW50X2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY5OCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX2xpYl9kYXRlX2Zvcm1hdF9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5NjMpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9EYXRlcGlja2VyX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc3MCk7XG5cblxuXG5cbi8vIGZpbHRlciBvdXQgdGhlIGNvbmZpZyBvcHRpb25zIGluYXBwcm9wcml0ZSB0byBwYXNzIHRvIERhdGVwaWNrZXJcbmZ1bmN0aW9uIGZpbHRlck9wdGlvbnMob3B0aW9ucykge1xuICBjb25zdCBuZXdPcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cbiAgZGVsZXRlIG5ld09wdHMuaW5wdXRzO1xuICBkZWxldGUgbmV3T3B0cy5hbGxvd09uZVNpZGVkUmFuZ2U7XG4gIGRlbGV0ZSBuZXdPcHRzLm1heE51bWJlck9mRGF0ZXM7IC8vIHRvIGVuc3VyZSBlYWNoIGRhdGVwaWNrZXIgaGFuZGxlcyBhIHNpbmdsZSBkYXRlXG5cbiAgcmV0dXJuIG5ld09wdHM7XG59XG5cbmZ1bmN0aW9uIHNldHVwRGF0ZXBpY2tlcihyYW5nZXBpY2tlciwgY2hhbmdlRGF0ZUxpc3RlbmVyLCBlbCwgb3B0aW9ucykge1xuICAoMCxfbGliX2V2ZW50X2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAucmVnaXN0ZXJMaXN0ZW5lcnMgKi8gLmNGKShyYW5nZXBpY2tlciwgW1xuICAgIFtlbCwgJ2NoYW5nZURhdGUnLCBjaGFuZ2VEYXRlTGlzdGVuZXJdLFxuICBdKTtcbiAgbmV3IF9EYXRlcGlja2VyX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18vKiBbXCJkZWZhdWx0XCJdICovIC5aKGVsLCBvcHRpb25zLCByYW5nZXBpY2tlcik7XG59XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlRGF0ZShyYW5nZXBpY2tlciwgZXYpIHtcbiAgLy8gdG8gcHJldmVudCBib3RoIGRhdGVwaWNrZXJzIHRyaWdnZXIgdGhlIG90aGVyIHNpZGUncyB1cGRhdGUgZWFjaCBvdGhlclxuICBpZiAocmFuZ2VwaWNrZXIuX3VwZGF0aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJhbmdlcGlja2VyLl91cGRhdGluZyA9IHRydWU7XG5cbiAgY29uc3QgdGFyZ2V0ID0gZXYudGFyZ2V0O1xuICBpZiAodGFyZ2V0LmRhdGVwaWNrZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGRhdGVwaWNrZXJzID0gcmFuZ2VwaWNrZXIuZGF0ZXBpY2tlcnM7XG4gIGNvbnN0IHNldERhdGVPcHRpb25zID0ge3JlbmRlcjogZmFsc2V9O1xuICBjb25zdCBjaGFuZ2VkU2lkZSA9IHJhbmdlcGlja2VyLmlucHV0cy5pbmRleE9mKHRhcmdldCk7XG4gIGNvbnN0IG90aGVyU2lkZSA9IGNoYW5nZWRTaWRlID09PSAwID8gMSA6IDA7XG4gIGNvbnN0IGNoYW5nZWREYXRlID0gZGF0ZXBpY2tlcnNbY2hhbmdlZFNpZGVdLmRhdGVzWzBdO1xuICBjb25zdCBvdGhlckRhdGUgPSBkYXRlcGlja2Vyc1tvdGhlclNpZGVdLmRhdGVzWzBdO1xuXG4gIGlmIChjaGFuZ2VkRGF0ZSAhPT0gdW5kZWZpbmVkICYmIG90aGVyRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gaWYgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZSA+IHRoZSBlbmQsIHN3YXAgdGhlbVxuICAgIGlmIChjaGFuZ2VkU2lkZSA9PT0gMCAmJiBjaGFuZ2VkRGF0ZSA+IG90aGVyRGF0ZSkge1xuICAgICAgZGF0ZXBpY2tlcnNbMF0uc2V0RGF0ZShvdGhlckRhdGUsIHNldERhdGVPcHRpb25zKTtcbiAgICAgIGRhdGVwaWNrZXJzWzFdLnNldERhdGUoY2hhbmdlZERhdGUsIHNldERhdGVPcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZWRTaWRlID09PSAxICYmIGNoYW5nZWREYXRlIDwgb3RoZXJEYXRlKSB7XG4gICAgICBkYXRlcGlja2Vyc1swXS5zZXREYXRlKGNoYW5nZWREYXRlLCBzZXREYXRlT3B0aW9ucyk7XG4gICAgICBkYXRlcGlja2Vyc1sxXS5zZXREYXRlKG90aGVyRGF0ZSwgc2V0RGF0ZU9wdGlvbnMpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcmFuZ2VwaWNrZXIuYWxsb3dPbmVTaWRlZFJhbmdlKSB7XG4gICAgLy8gdG8gcHJldmVudCB0aGUgcmFuZ2UgZnJvbSBiZWNvbWluZyBvbmUtc2lkZWQsIGNvcHkgY2hhbmdlZCBzaWRlJ3NcbiAgICAvLyBzZWxlY3Rpb24gKG5vIG1hdHRlciBpZiBpdCdzIGVtcHR5KSB0byB0aGUgb3RoZXIgc2lkZVxuICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gdW5kZWZpbmVkIHx8IG90aGVyRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXREYXRlT3B0aW9ucy5jbGVhciA9IHRydWU7XG4gICAgICBkYXRlcGlja2Vyc1tvdGhlclNpZGVdLnNldERhdGUoZGF0ZXBpY2tlcnNbY2hhbmdlZFNpZGVdLmRhdGVzLCBzZXREYXRlT3B0aW9ucyk7XG4gICAgfVxuICB9XG4gIGRhdGVwaWNrZXJzWzBdLnBpY2tlci51cGRhdGUoKS5yZW5kZXIoKTtcbiAgZGF0ZXBpY2tlcnNbMV0ucGlja2VyLnVwZGF0ZSgpLnJlbmRlcigpO1xuICBkZWxldGUgcmFuZ2VwaWNrZXIuX3VwZGF0aW5nO1xufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNsYXNzIERhdGVSYW5nZVBpY2tlciAge1xuICAvKipcbiAgICogQ3JlYXRlIGEgZGF0ZSByYW5nZSBwaWNrZXJcbiAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCAtIGVsZW1lbnQgdG8gYmluZCBhIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnNdIC0gY29uZmlnIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGlucHV0cyA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5pbnB1dHMpXG4gICAgICA/IG9wdGlvbnMuaW5wdXRzXG4gICAgICA6IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKTtcbiAgICBpZiAoaW5wdXRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50LnJhbmdlcGlja2VyID0gdGhpcztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5wdXRzID0gaW5wdXRzLnNsaWNlKDAsIDIpO1xuICAgIHRoaXMuYWxsb3dPbmVTaWRlZFJhbmdlID0gISFvcHRpb25zLmFsbG93T25lU2lkZWRSYW5nZTtcblxuICAgIGNvbnN0IGNoYW5nZURhdGVMaXN0ZW5lciA9IG9uQ2hhbmdlRGF0ZS5iaW5kKG51bGwsIHRoaXMpO1xuICAgIGNvbnN0IGNsZWFuT3B0aW9ucyA9IGZpbHRlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgLy8gaW4gb3JkZXIgZm9yIGluaXRpYWwgZGF0ZSBzZXR1cCB0byB3b3JrIHJpZ2h0IHdoZW4gcGNpY0x2ZWwgPiAwLFxuICAgIC8vIGxldCBEYXRlcGlja2VyIGNvbnN0cnVjdG9yIGFkZCB0aGUgaW5zdGFuY2UgdG8gdGhlIHJhbmdlcGlja2VyXG4gICAgY29uc3QgZGF0ZXBpY2tlcnMgPSBbXTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RhdGVwaWNrZXJzJywge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gZGF0ZXBpY2tlcnM7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHNldHVwRGF0ZXBpY2tlcih0aGlzLCBjaGFuZ2VEYXRlTGlzdGVuZXIsIHRoaXMuaW5wdXRzWzBdLCBjbGVhbk9wdGlvbnMpO1xuICAgIHNldHVwRGF0ZXBpY2tlcih0aGlzLCBjaGFuZ2VEYXRlTGlzdGVuZXIsIHRoaXMuaW5wdXRzWzFdLCBjbGVhbk9wdGlvbnMpO1xuICAgIE9iamVjdC5mcmVlemUoZGF0ZXBpY2tlcnMpO1xuICAgIC8vIG5vcm1hbGl6ZSB0aGUgcmFuZ2UgaWYgaW5pdGFsIGRhdGVzIGFyZSBnaXZlblxuICAgIGlmIChkYXRlcGlja2Vyc1swXS5kYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICBvbkNoYW5nZURhdGUodGhpcywge3RhcmdldDogdGhpcy5pbnB1dHNbMF19KTtcbiAgICB9IGVsc2UgaWYgKGRhdGVwaWNrZXJzWzFdLmRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIG9uQ2hhbmdlRGF0ZSh0aGlzLCB7dGFyZ2V0OiB0aGlzLmlucHV0c1sxXX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXl9IC0gc2VsZWN0ZWQgZGF0ZSBvZiB0aGUgbGlua2VkIGRhdGUgcGlja2Vyc1xuICAgKi9cbiAgZ2V0IGRhdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXJzLmxlbmd0aCA9PT0gMlxuICAgICAgPyBbXG4gICAgICAgICAgdGhpcy5kYXRlcGlja2Vyc1swXS5kYXRlc1swXSxcbiAgICAgICAgICB0aGlzLmRhdGVwaWNrZXJzWzFdLmRhdGVzWzBdLFxuICAgICAgICBdXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IHZhbHVlcyB0byB0aGUgY29uZmlnIG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb25maWcgb3B0aW9ucyB0byB1cGRhdGVcbiAgICovXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuYWxsb3dPbmVTaWRlZFJhbmdlID0gISFvcHRpb25zLmFsbG93T25lU2lkZWRSYW5nZTtcblxuICAgIGNvbnN0IGNsZWFuT3B0aW9ucyA9IGZpbHRlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5kYXRlcGlja2Vyc1swXS5zZXRPcHRpb25zKGNsZWFuT3B0aW9ucyk7XG4gICAgdGhpcy5kYXRlcGlja2Vyc1sxXS5zZXRPcHRpb25zKGNsZWFuT3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgRGF0ZVJhbmdlUGlja2VyIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge0RhdGVSYW5nZVBpY2tlcn0gLSB0aGUgaW5zdGFuY2UgZGVzdHJveWVkXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGF0ZXBpY2tlcnNbMF0uZGVzdHJveSgpO1xuICAgIHRoaXMuZGF0ZXBpY2tlcnNbMV0uZGVzdHJveSgpO1xuICAgICgwLF9saWJfZXZlbnRfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC51bnJlZ2lzdGVyTGlzdGVuZXJzICovIC51VikodGhpcyk7XG4gICAgZGVsZXRlIHRoaXMuZWxlbWVudC5yYW5nZXBpY2tlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgb2YgdGhlIGRhdGUgcmFuZ2VcbiAgICpcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIERhdGUgb2JqZWN0cyBieSBkZWZhdWx0LiBJZiBmb3JtYXQgc3RyaW5nIGlzIHBhc3NlZCxcbiAgICogaXQgcmV0dXJucyBkYXRlIHN0cmluZ3MgZm9ybWF0dGVkIGluIGdpdmVuIGZvcm1hdC5cbiAgICogVGhlIHJlc3VsdCBhcnJheSBhbHdheXMgY29udGFpbnMgMiBpdGVtcyAoc3RhcnQgZGF0ZS9lbmQgZGF0ZSkgYW5kXG4gICAqIHVuZGVmaW5lZCBpcyB1c2VkIGZvciB1bnNlbGVjdGVkIHNpZGUuIChlLmcuIElmIG5vbmUgaXMgc2VsZWN0ZWQsXG4gICAqIHRoZSByZXN1bHQgd2lsbCBiZSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLiBJZiBvbmx5IHRoZSBlbmQgZGF0ZSBpcyBzZXRcbiAgICogd2hlbiBhbGxvd09uZVNpZGVkUmFuZ2UgY29uZmlnIG9wdGlvbiBpcyB0cnVlLCBbdW5kZWZpbmVkLCBlbmREYXRlXSB3aWxsXG4gICAqIGJlIHJldHVybmVkLilcbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbZm9ybWF0XSAtIEZvcm1hdCBzdHJpbmcgdG8gc3RyaW5naWZ5IHRoZSBkYXRlc1xuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBTdGFydCBhbmQgZW5kIGRhdGVzXG4gICAqL1xuICBnZXREYXRlcyhmb3JtYXQgPSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IGZvcm1hdFxuICAgICAgPyBkYXRlID0+ICgwLF9saWJfZGF0ZV9mb3JtYXRfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5mb3JtYXREYXRlICovIC5wNikoZGF0ZSwgZm9ybWF0LCB0aGlzLmRhdGVwaWNrZXJzWzBdLmNvbmZpZy5sb2NhbGUpXG4gICAgICA6IGRhdGUgPT4gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5kYXRlcy5tYXAoZGF0ZSA9PiBkYXRlID09PSB1bmRlZmluZWQgPyBkYXRlIDogY2FsbGJhY2soZGF0ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlcyBvZiB0aGUgZGF0ZSByYW5nZVxuICAgKlxuICAgKiBUaGUgbWV0aG9kIGNhbGxzIGRhdGVwaWNrZXIuc2V0RGF0ZSgpIGludGVybmFsbHkgdXNpbmcgZWFjaCBvZiB0aGVcbiAgICogYXJndW1lbnRzIGluIHN0YXJ04oaSZW5kIG9yZGVyLlxuICAgKlxuICAgKiBXaGVuIGEgY2xlYXI6IHRydWUgb3B0aW9uIG9iamVjdCBpcyBwYXNzZWQgaW5zdGVhZCBvZiBhIGRhdGUsIHRoZSBtZXRob2RcbiAgICogY2xlYXJzIHRoZSBkYXRlLlxuICAgKlxuICAgKiBJZiBhbiBpbnZhbGlkIGRhdGUsIHRoZSBzYW1lIGRhdGUgYXMgdGhlIGN1cnJlbnQgb25lIG9yIGFuIG9wdGlvbiBvYmplY3RcbiAgICogd2l0aG91dCBjbGVhcjogdHJ1ZSBpcyBwYXNzZWQsIHRoZSBtZXRob2QgY29uc2lkZXJzIHRoYXQgYXJndW1lbnQgYXMgYW5cbiAgICogXCJpbmVmZmVjdGl2ZVwiIGFyZ3VtZW50IGJlY2F1c2UgY2FsbGluZyBkYXRlcGlja2VyLnNldERhdGUoKSB3aXRoIHRob3NlXG4gICAqIHZhbHVlcyBtYWtlcyBubyBjaGFuZ2VzIHRvIHRoZSBkYXRlIHNlbGVjdGlvbi5cbiAgICpcbiAgICogV2hlbiB0aGUgYWxsb3dPbmVTaWRlZFJhbmdlIGNvbmZpZyBvcHRpb24gaXMgZmFsc2UsIHBhc3Npbmcge2NsZWFyOiB0cnVlfVxuICAgKiB0byBjbGVhciB0aGUgcmFuZ2Ugd29ya3Mgb25seSB3aGVuIGl0IGlzIGRvbmUgdG8gdGhlIGxhc3QgZWZmZWN0aXZlXG4gICAqIGFyZ3VtZW50IChpbiBvdGhlciB3b3JkcywgcGFzc2VkIHRvIHJhbmdlRW5kIG9yIHRvIHJhbmdlU3RhcnQgYWxvbmcgd2l0aFxuICAgKiBpbmVmZmVjdGl2ZSByYW5nZUVuZCkuIFRoaXMgaXMgYmVjYXVzZSB3aGVuIHRoZSBkYXRlIHJhbmdlIGlzIGNoYW5nZWQsXG4gICAqIGl0IGdldHMgbm9ybWFsaXplZCBiYXNlZCBvbiB0aGUgbGFzdCBjaGFuZ2UgYXQgdGhlIGVuZCBvZiB0aGUgY2hhbmdpbmdcbiAgICogcHJvY2Vzcy5cbiAgICpcbiAgICogQHBhcmFtIHtEYXRlfE51bWJlcnxTdHJpbmd8T2JqZWN0fSByYW5nZVN0YXJ0IC0gU3RhcnQgZGF0ZSBvZiB0aGUgcmFuZ2VcbiAgICogb3Ige2NsZWFyOiB0cnVlfSB0byBjbGVhciB0aGUgZGF0ZVxuICAgKiBAcGFyYW0ge0RhdGV8TnVtYmVyfFN0cmluZ3xPYmplY3R9IHJhbmdlRW5kIC0gRW5kIGRhdGUgb2YgdGhlIHJhbmdlXG4gICAqIG9yIHtjbGVhcjogdHJ1ZX0gdG8gY2xlYXIgdGhlIGRhdGVcbiAgICovXG4gIHNldERhdGVzKHJhbmdlU3RhcnQsIHJhbmdlRW5kKSB7XG4gICAgY29uc3QgW2RhdGVwaWNrZXIwLCBkYXRlcGlja2VyMV0gPSB0aGlzLmRhdGVwaWNrZXJzO1xuICAgIGNvbnN0IG9yaWdEYXRlcyA9IHRoaXMuZGF0ZXM7XG5cbiAgICAvLyBJZiByYW5nZSBub3JtYWxpemF0aW9uIHJ1bnMgb24gZXZlcnkgY2hhbmdlLCB3ZSBjYW4ndCBzZXQgYSBuZXcgcmFuZ2VcbiAgICAvLyB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHJhbmdlIGNvcnJlY3RseSBiZWNhdXNlIHRoZVxuICAgIC8vIG5vcm1hbGl6YXRpb24gcHJvY2VzcyBzd2FwcyBzdGFydOKGlO+4jmVuZCByaWdodCBhZnRlciBzZXR0aW5nIHRoZSBuZXcgc3RhcnRcbiAgICAvLyBkYXRlLiBUbyBwcmV2ZW50IHRoaXMsIHRoZSBub3JtYWxpemF0aW9uIHByb2Nlc3MgbmVlZHMgdG8gcnVuIG9uY2UgYWZ0ZXJcbiAgICAvLyBib3RoIG9mIHRoZSBuZXcgZGF0ZXMgYXJlIHNldC5cbiAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG4gICAgZGF0ZXBpY2tlcjAuc2V0RGF0ZShyYW5nZVN0YXJ0KTtcbiAgICBkYXRlcGlja2VyMS5zZXREYXRlKHJhbmdlRW5kKTtcbiAgICBkZWxldGUgdGhpcy5fdXBkYXRpbmc7XG5cbiAgICBpZiAoZGF0ZXBpY2tlcjEuZGF0ZXNbMF0gIT09IG9yaWdEYXRlc1sxXSkge1xuICAgICAgb25DaGFuZ2VEYXRlKHRoaXMsIHt0YXJnZXQ6IHRoaXMuaW5wdXRzWzFdfSk7XG4gICAgfSBlbHNlIGlmIChkYXRlcGlja2VyMC5kYXRlc1swXSAhPT0gb3JpZ0RhdGVzWzBdKSB7XG4gICAgICBvbkNoYW5nZURhdGUodGhpcywge3RhcmdldDogdGhpcy5pbnB1dHNbMF19KTtcbiAgICB9XG4gIH1cbn1cblxuXG4vKioqLyB9KSxcblxuLyoqKi8gNzcwOlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblxuLy8gRVhQT1JUU1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbiAgXCJaXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBEYXRlcGlja2VyOyB9XG59KTtcblxuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL2xpYi91dGlscy5qc1xudmFyIHV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDUpO1xuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL2xpYi9kYXRlLmpzXG52YXIgbGliX2RhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU2MCk7XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvbGliL2RhdGUtZm9ybWF0LmpzXG52YXIgZGF0ZV9mb3JtYXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk2Myk7XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvbGliL2V2ZW50LmpzXG52YXIgbGliX2V2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OTgpO1xuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvaTE4bi9iYXNlLWxvY2FsZXMuanNcbi8vIGRlZmF1bHQgbG9jYWxlc1xuY29uc3QgbG9jYWxlcyA9IHtcbiAgZW46IHtcbiAgICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICBkYXlzU2hvcnQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBkYXlzTWluOiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIG1vbnRoc1Nob3J0OiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl0sXG4gICAgdG9kYXk6IFwiVG9kYXlcIixcbiAgICBjbGVhcjogXCJDbGVhclwiLFxuICAgIHRpdGxlRm9ybWF0OiBcIk1NIHlcIlxuICB9XG59O1xuXG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9vcHRpb25zL2RlZmF1bHRPcHRpb25zLmpzXG4vLyBjb25maWcgb3B0aW9ucyB1cGRhdGFibGUgYnkgc2V0T3B0aW9ucygpIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlc1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGF1dG9oaWRlOiBmYWxzZSxcbiAgYmVmb3JlU2hvd0RheTogbnVsbCxcbiAgYmVmb3JlU2hvd0RlY2FkZTogbnVsbCxcbiAgYmVmb3JlU2hvd01vbnRoOiBudWxsLFxuICBiZWZvcmVTaG93WWVhcjogbnVsbCxcbiAgY2FsZW5kYXJXZWVrczogZmFsc2UsXG4gIGNsZWFyQnRuOiBmYWxzZSxcbiAgZGF0ZURlbGltaXRlcjogJywnLFxuICBkYXRlc0Rpc2FibGVkOiBbXSxcbiAgZGF5c09mV2Vla0Rpc2FibGVkOiBbXSxcbiAgZGF5c09mV2Vla0hpZ2hsaWdodGVkOiBbXSxcbiAgZGVmYXVsdFZpZXdEYXRlOiB1bmRlZmluZWQsIC8vIHBsYWNlaG9sZGVyLCBkZWZhdWx0cyB0byB0b2RheSgpIGJ5IHRoZSBwcm9ncmFtXG4gIGRpc2FibGVUb3VjaEtleWJvYXJkOiBmYWxzZSxcbiAgZm9ybWF0OiAnbW0vZGQveXl5eScsXG4gIGxhbmd1YWdlOiAnZW4nLFxuICBtYXhEYXRlOiBudWxsLFxuICBtYXhOdW1iZXJPZkRhdGVzOiAxLFxuICBtYXhWaWV3OiAzLFxuICBtaW5EYXRlOiBudWxsLFxuICBuZXh0QXJyb3c6ICc8c3ZnIGNsYXNzPVwidy00IGgtNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyLjI5MyA1LjI5M2ExIDEgMCAwMTEuNDE0IDBsNCA0YTEgMSAwIDAxMCAxLjQxNGwtNCA0YTEgMSAwIDAxLTEuNDE0LTEuNDE0TDE0LjU4NiAxMUgzYTEgMSAwIDExMC0yaDExLjU4NmwtMi4yOTMtMi4yOTNhMSAxIDAgMDEwLTEuNDE0elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+JyxcbiAgb3JpZW50YXRpb246ICdhdXRvJyxcbiAgcGlja0xldmVsOiAwLFxuICBwcmV2QXJyb3c6ICc8c3ZnIGNsYXNzPVwidy00IGgtNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTkuNzA3IDE2LjcwN2ExIDEgMCAwMS0xLjQxNCAwbC02LTZhMSAxIDAgMDEwLTEuNDE0bDYtNmExIDEgMCAwMTEuNDE0IDEuNDE0TDUuNDE0IDlIMTdhMSAxIDAgMTEwIDJINS40MTRsNC4yOTMgNC4yOTNhMSAxIDAgMDEwIDEuNDE0elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+JyxcbiAgc2hvd0RheXNPZldlZWs6IHRydWUsXG4gIHNob3dPbkNsaWNrOiB0cnVlLFxuICBzaG93T25Gb2N1czogdHJ1ZSxcbiAgc3RhcnRWaWV3OiAwLFxuICB0aXRsZTogJycsXG4gIHRvZGF5QnRuOiBmYWxzZSxcbiAgdG9kYXlCdG5Nb2RlOiAwLFxuICB0b2RheUhpZ2hsaWdodDogZmFsc2UsXG4gIHVwZGF0ZU9uQmx1cjogdHJ1ZSxcbiAgd2Vla1N0YXJ0OiAwLFxufTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgb3B0aW9uc19kZWZhdWx0T3B0aW9ucyA9IChkZWZhdWx0T3B0aW9ucyk7XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL2xpYi9kb20uanNcbmNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblxuZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcbiAgcmV0dXJuIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKTtcbn1cblxuLy8gZXF1aXZhbGVudCB0byBqUXVlcnkncyA6dmlzYmxlXG5mdW5jdGlvbiBpc1Zpc2libGUoZWwpIHtcbiAgcmV0dXJuICEhKGVsLm9mZnNldFdpZHRoIHx8IGVsLm9mZnNldEhlaWdodCB8fCBlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsKSB7XG4gIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYmFjayB1cCB0aGUgZXhpc3RpbmcgZGlzcGxheSBzZXR0aW5nIGluIGRhdGEtc3R5bGUtZGlzcGxheVxuICBpZiAoZWwuc3R5bGUuZGlzcGxheSkge1xuICAgIGVsLmRhdGFzZXQuc3R5bGVEaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheTtcbiAgfVxuICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBzaG93RWxlbWVudChlbCkge1xuICBpZiAoZWwuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbC5kYXRhc2V0LnN0eWxlRGlzcGxheSkge1xuICAgIC8vIHJlc3RvcmUgYmFja2VkLXVwIGRpc3BheSBwcm9wZXJ0eVxuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBlbC5kYXRhc2V0LnN0eWxlRGlzcGxheTtcbiAgICBkZWxldGUgZWwuZGF0YXNldC5zdHlsZURpc3BsYXk7XG4gIH0gZWxzZSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtcHR5Q2hpbGROb2RlcyhlbCkge1xuICBpZiAoZWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgIGVtcHR5Q2hpbGROb2RlcyhlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNoaWxkTm9kZXMoZWwsIG5ld0NoaWxkTm9kZXMpIHtcbiAgZW1wdHlDaGlsZE5vZGVzKGVsKTtcbiAgaWYgKG5ld0NoaWxkTm9kZXMgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQobmV3Q2hpbGROb2Rlcyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld0NoaWxkTm9kZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQocGFyc2VIVE1MKG5ld0NoaWxkTm9kZXMpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3Q2hpbGROb2Rlcy5mb3JFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbmV3Q2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9KTtcbiAgfVxufVxuXG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9vcHRpb25zL3Byb2Nlc3NPcHRpb25zLmpzXG5cblxuXG5cblxuXG5jb25zdCB7XG4gIGxhbmd1YWdlOiBkZWZhdWx0TGFuZyxcbiAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICB3ZWVrU3RhcnQ6IGRlZmF1bHRXZWVrU3RhcnQsXG59ID0gb3B0aW9uc19kZWZhdWx0T3B0aW9ucztcblxuLy8gUmVkdWNlciBmdW5jdGlvbiB0byBmaWx0ZXIgb3V0IGludmFsaWQgZGF5LW9mLXdlZWsgZnJvbSB0aGUgaW5wdXRcbmZ1bmN0aW9uIHNhbml0aXplRE9XKGRvdywgZGF5KSB7XG4gIHJldHVybiBkb3cubGVuZ3RoIDwgNiAmJiBkYXkgPj0gMCAmJiBkYXkgPCA3XG4gICAgPyAoMCx1dGlscy8qIHB1c2hVbmlxdWUgKi8uJEMpKGRvdywgZGF5KVxuICAgIDogZG93O1xufVxuXG5mdW5jdGlvbiBjYWxjRW5kT2ZXZWVrKHN0YXJ0T2ZXZWVrKSB7XG4gIHJldHVybiAoc3RhcnRPZldlZWsgKyA2KSAlIDc7XG59XG5cbi8vIHZhbGlkYXRlIGlucHV0IGRhdGUuIGlmIGludmFsaWQsIGZhbGxiYWNrIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZVxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlKHZhbHVlLCBmb3JtYXQsIGxvY2FsZSwgb3JpZ1ZhbHVlKSB7XG4gIGNvbnN0IGRhdGUgPSAoMCxkYXRlX2Zvcm1hdC8qIHBhcnNlRGF0ZSAqLy5zRykodmFsdWUsIGZvcm1hdCwgbG9jYWxlKTtcbiAgcmV0dXJuIGRhdGUgIT09IHVuZGVmaW5lZCA/IGRhdGUgOiBvcmlnVmFsdWU7XG59XG5cbi8vIFZhbGlkYXRlIHZpZXdJZC4gaWYgaW52YWxpZCwgZmFsbGJhY2sgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG5mdW5jdGlvbiB2YWxpZGF0ZVZpZXdJZCh2YWx1ZSwgb3JpZ1ZhbHVlLCBtYXggPSAzKSB7XG4gIGNvbnN0IHZpZXdJZCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gIHJldHVybiB2aWV3SWQgPj0gMCAmJiB2aWV3SWQgPD0gbWF4ID8gdmlld0lkIDogb3JpZ1ZhbHVlO1xufVxuXG4vLyBDcmVhdGUgRGF0ZXBpY2tlciBjb25maWd1cmF0aW9uIHRvIHNldFxuZnVuY3Rpb24gcHJvY2Vzc09wdGlvbnMob3B0aW9ucywgZGF0ZXBpY2tlcikge1xuICBjb25zdCBpbk9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgY29uc3QgY29uZmlnID0ge307XG4gIGNvbnN0IGxvY2FsZXMgPSBkYXRlcGlja2VyLmNvbnN0cnVjdG9yLmxvY2FsZXM7XG4gIGxldCB7XG4gICAgZm9ybWF0LFxuICAgIGxhbmd1YWdlLFxuICAgIGxvY2FsZSxcbiAgICBtYXhEYXRlLFxuICAgIG1heFZpZXcsXG4gICAgbWluRGF0ZSxcbiAgICBwaWNrTGV2ZWwsXG4gICAgc3RhcnRWaWV3LFxuICAgIHdlZWtTdGFydCxcbiAgfSA9IGRhdGVwaWNrZXIuY29uZmlnIHx8IHt9O1xuXG4gIGlmIChpbk9wdHMubGFuZ3VhZ2UpIHtcbiAgICBsZXQgbGFuZztcbiAgICBpZiAoaW5PcHRzLmxhbmd1YWdlICE9PSBsYW5ndWFnZSkge1xuICAgICAgaWYgKGxvY2FsZXNbaW5PcHRzLmxhbmd1YWdlXSkge1xuICAgICAgICBsYW5nID0gaW5PcHRzLmxhbmd1YWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgbGFuZ2F1Z2UgKyByZWdpb24gdGFnIGNhbiBmYWxsYmFjayB0byB0aGUgb25lIHdpdGhvdXRcbiAgICAgICAgLy8gcmVnaW9uIChlLmcuIGZyLUNBIOKGkiBmcilcbiAgICAgICAgbGFuZyA9IGluT3B0cy5sYW5ndWFnZS5zcGxpdCgnLScpWzBdO1xuICAgICAgICBpZiAobG9jYWxlc1tsYW5nXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGFuZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMubGFuZ3VhZ2U7XG4gICAgaWYgKGxhbmcpIHtcbiAgICAgIGxhbmd1YWdlID0gY29uZmlnLmxhbmd1YWdlID0gbGFuZztcblxuICAgICAgLy8gdXBkYXRlIGxvY2FsZSBhcyB3ZWxsIHdoZW4gdXBkYXRpbmcgbGFuZ3VhZ2VcbiAgICAgIGNvbnN0IG9yaWdMb2NhbGUgPSBsb2NhbGUgfHwgbG9jYWxlc1tkZWZhdWx0TGFuZ107XG4gICAgICAvLyB1c2UgZGVmYXVsdCBsYW5ndWFnZSdzIHByb3BlcnRpZXMgZm9yIHRoZSBmYWxsYmFja1xuICAgICAgbG9jYWxlID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICAgICAgd2Vla1N0YXJ0OiBkZWZhdWx0V2Vla1N0YXJ0XG4gICAgICB9LCBsb2NhbGVzW2RlZmF1bHRMYW5nXSk7XG4gICAgICBpZiAobGFuZ3VhZ2UgIT09IGRlZmF1bHRMYW5nKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obG9jYWxlLCBsb2NhbGVzW2xhbmd1YWdlXSk7XG4gICAgICB9XG4gICAgICBjb25maWcubG9jYWxlID0gbG9jYWxlO1xuICAgICAgLy8gaWYgZm9ybWF0IGFuZC9vciB3ZWVrU3RhcnQgYXJlIHRoZSBzYW1lIGFzIG9sZCBsb2NhbGUncyBkZWZhdWx0cyxcbiAgICAgIC8vIHVwZGF0ZSB0aGVtIHRvIG5ldyBsb2NhbGUncyBkZWZhdWx0c1xuICAgICAgaWYgKGZvcm1hdCA9PT0gb3JpZ0xvY2FsZS5mb3JtYXQpIHtcbiAgICAgICAgZm9ybWF0ID0gY29uZmlnLmZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gICAgICB9XG4gICAgICBpZiAod2Vla1N0YXJ0ID09PSBvcmlnTG9jYWxlLndlZWtTdGFydCkge1xuICAgICAgICB3ZWVrU3RhcnQgPSBjb25maWcud2Vla1N0YXJ0ID0gbG9jYWxlLndlZWtTdGFydDtcbiAgICAgICAgY29uZmlnLndlZWtFbmQgPSBjYWxjRW5kT2ZXZWVrKGxvY2FsZS53ZWVrU3RhcnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbk9wdHMuZm9ybWF0KSB7XG4gICAgY29uc3QgaGFzVG9EaXNwbGF5ID0gdHlwZW9mIGluT3B0cy5mb3JtYXQudG9EaXNwbGF5ID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IGhhc1RvVmFsdWUgPSB0eXBlb2YgaW5PcHRzLmZvcm1hdC50b1ZhbHVlID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IHZhbGlkRm9ybWF0U3RyaW5nID0gZGF0ZV9mb3JtYXQvKiByZUZvcm1hdFRva2Vucy50ZXN0ICovLkNMLnRlc3QoaW5PcHRzLmZvcm1hdCk7XG4gICAgaWYgKChoYXNUb0Rpc3BsYXkgJiYgaGFzVG9WYWx1ZSkgfHwgdmFsaWRGb3JtYXRTdHJpbmcpIHtcbiAgICAgIGZvcm1hdCA9IGNvbmZpZy5mb3JtYXQgPSBpbk9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLmZvcm1hdDtcbiAgfVxuXG4gIC8vKioqIGRhdGVzICoqKi8vXG4gIC8vIHdoaWxlIG1pbiBhbmQgbWF4RGF0ZSBmb3IgXCJubyBsaW1pdFwiIGluIHRoZSBvcHRpb25zIGFyZSBiZXR0ZXIgdG8gYmUgbnVsbFxuICAvLyAoZXNwZWNpYWxseSB3aGVuIHVwZGF0aW5nKSwgdGhlIG9uZXMgaW4gdGhlIGNvbmZpZyBoYXZlIHRvIGJlIHVuZGVmaW5lZFxuICAvLyBiZWNhdXNlIG51bGwgaXMgdHJlYXRlZCBhcyAwICg9IHVuaXggZXBvY2gpIHdoZW4gY29tcGFyaW5nIHdpdGggdGltZSB2YWx1ZVxuICBsZXQgbWluRHQgPSBtaW5EYXRlO1xuICBsZXQgbWF4RHQgPSBtYXhEYXRlO1xuICBpZiAoaW5PcHRzLm1pbkRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIG1pbkR0ID0gaW5PcHRzLm1pbkRhdGUgPT09IG51bGxcbiAgICAgID8gKDAsbGliX2RhdGUvKiBkYXRlVmFsdWUgKi8uYnkpKDAsIDAsIDEpICAvLyBzZXQgMDAwMC0wMS0wMSB0byBwcmV2ZW50IG5lZ2F0aXZlIHZhbHVlcyBmb3IgeWVhclxuICAgICAgOiB2YWxpZGF0ZURhdGUoaW5PcHRzLm1pbkRhdGUsIGZvcm1hdCwgbG9jYWxlLCBtaW5EdCk7XG4gICAgZGVsZXRlIGluT3B0cy5taW5EYXRlO1xuICB9XG4gIGlmIChpbk9wdHMubWF4RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4RHQgPSBpbk9wdHMubWF4RGF0ZSA9PT0gbnVsbFxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogdmFsaWRhdGVEYXRlKGluT3B0cy5tYXhEYXRlLCBmb3JtYXQsIGxvY2FsZSwgbWF4RHQpO1xuICAgIGRlbGV0ZSBpbk9wdHMubWF4RGF0ZTtcbiAgfVxuICBpZiAobWF4RHQgPCBtaW5EdCkge1xuICAgIG1pbkRhdGUgPSBjb25maWcubWluRGF0ZSA9IG1heER0O1xuICAgIG1heERhdGUgPSBjb25maWcubWF4RGF0ZSA9IG1pbkR0O1xuICB9IGVsc2Uge1xuICAgIGlmIChtaW5EYXRlICE9PSBtaW5EdCkge1xuICAgICAgbWluRGF0ZSA9IGNvbmZpZy5taW5EYXRlID0gbWluRHQ7XG4gICAgfVxuICAgIGlmIChtYXhEYXRlICE9PSBtYXhEdCkge1xuICAgICAgbWF4RGF0ZSA9IGNvbmZpZy5tYXhEYXRlID0gbWF4RHQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGluT3B0cy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgY29uZmlnLmRhdGVzRGlzYWJsZWQgPSBpbk9wdHMuZGF0ZXNEaXNhYmxlZC5yZWR1Y2UoKGRhdGVzLCBkdCkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9ICgwLGRhdGVfZm9ybWF0LyogcGFyc2VEYXRlICovLnNHKShkdCwgZm9ybWF0LCBsb2NhbGUpO1xuICAgICAgcmV0dXJuIGRhdGUgIT09IHVuZGVmaW5lZCA/ICgwLHV0aWxzLyogcHVzaFVuaXF1ZSAqLy4kQykoZGF0ZXMsIGRhdGUpIDogZGF0ZXM7XG4gICAgfSwgW10pO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF0ZXNEaXNhYmxlZDtcbiAgfVxuICBpZiAoaW5PcHRzLmRlZmF1bHRWaWV3RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qgdmlld0RhdGUgPSAoMCxkYXRlX2Zvcm1hdC8qIHBhcnNlRGF0ZSAqLy5zRykoaW5PcHRzLmRlZmF1bHRWaWV3RGF0ZSwgZm9ybWF0LCBsb2NhbGUpO1xuICAgIGlmICh2aWV3RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWcuZGVmYXVsdFZpZXdEYXRlID0gdmlld0RhdGU7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMuZGVmYXVsdFZpZXdEYXRlO1xuICB9XG5cbiAgLy8qKiogZGF5cyBvZiB3ZWVrICoqKi8vXG4gIGlmIChpbk9wdHMud2Vla1N0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCB3a1N0YXJ0ID0gTnVtYmVyKGluT3B0cy53ZWVrU3RhcnQpICUgNztcbiAgICBpZiAoIWlzTmFOKHdrU3RhcnQpKSB7XG4gICAgICB3ZWVrU3RhcnQgPSBjb25maWcud2Vla1N0YXJ0ID0gd2tTdGFydDtcbiAgICAgIGNvbmZpZy53ZWVrRW5kID0gY2FsY0VuZE9mV2Vlayh3a1N0YXJ0KTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy53ZWVrU3RhcnQ7XG4gIH1cbiAgaWYgKGluT3B0cy5kYXlzT2ZXZWVrRGlzYWJsZWQpIHtcbiAgICBjb25maWcuZGF5c09mV2Vla0Rpc2FibGVkID0gaW5PcHRzLmRheXNPZldlZWtEaXNhYmxlZC5yZWR1Y2Uoc2FuaXRpemVET1csIFtdKTtcbiAgICBkZWxldGUgaW5PcHRzLmRheXNPZldlZWtEaXNhYmxlZDtcbiAgfVxuICBpZiAoaW5PcHRzLmRheXNPZldlZWtIaWdobGlnaHRlZCkge1xuICAgIGNvbmZpZy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQgPSBpbk9wdHMuZGF5c09mV2Vla0hpZ2hsaWdodGVkLnJlZHVjZShzYW5pdGl6ZURPVywgW10pO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF5c09mV2Vla0hpZ2hsaWdodGVkO1xuICB9XG5cbiAgLy8qKiogbXVsdGkgZGF0ZSAqKiovL1xuICBpZiAoaW5PcHRzLm1heE51bWJlck9mRGF0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1heE51bWJlck9mRGF0ZXMgPSBwYXJzZUludChpbk9wdHMubWF4TnVtYmVyT2ZEYXRlcywgMTApO1xuICAgIGlmIChtYXhOdW1iZXJPZkRhdGVzID49IDApIHtcbiAgICAgIGNvbmZpZy5tYXhOdW1iZXJPZkRhdGVzID0gbWF4TnVtYmVyT2ZEYXRlcztcbiAgICAgIGNvbmZpZy5tdWx0aWRhdGUgPSBtYXhOdW1iZXJPZkRhdGVzICE9PSAxO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLm1heE51bWJlck9mRGF0ZXM7XG4gIH1cbiAgaWYgKGluT3B0cy5kYXRlRGVsaW1pdGVyKSB7XG4gICAgY29uZmlnLmRhdGVEZWxpbWl0ZXIgPSBTdHJpbmcoaW5PcHRzLmRhdGVEZWxpbWl0ZXIpO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF0ZURlbGltaXRlcjtcbiAgfVxuXG4gIC8vKioqIHBpY2sgbGV2ZWwgJiB2aWV3ICoqKi8vXG4gIGxldCBuZXdQaWNrTGV2ZWwgPSBwaWNrTGV2ZWw7XG4gIGlmIChpbk9wdHMucGlja0xldmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICBuZXdQaWNrTGV2ZWwgPSB2YWxpZGF0ZVZpZXdJZChpbk9wdHMucGlja0xldmVsLCAyKTtcbiAgICBkZWxldGUgaW5PcHRzLnBpY2tMZXZlbDtcbiAgfVxuICBpZiAobmV3UGlja0xldmVsICE9PSBwaWNrTGV2ZWwpIHtcbiAgICBwaWNrTGV2ZWwgPSBjb25maWcucGlja0xldmVsID0gbmV3UGlja0xldmVsO1xuICB9XG5cbiAgbGV0IG5ld01heFZpZXcgPSBtYXhWaWV3O1xuICBpZiAoaW5PcHRzLm1heFZpZXcgIT09IHVuZGVmaW5lZCkge1xuICAgIG5ld01heFZpZXcgPSB2YWxpZGF0ZVZpZXdJZChpbk9wdHMubWF4VmlldywgbWF4Vmlldyk7XG4gICAgZGVsZXRlIGluT3B0cy5tYXhWaWV3O1xuICB9XG4gIC8vIGVuc3VyZSBtYXggdmlldyA+PSBwaWNrIGxldmVsXG4gIG5ld01heFZpZXcgPSBwaWNrTGV2ZWwgPiBuZXdNYXhWaWV3ID8gcGlja0xldmVsIDogbmV3TWF4VmlldztcbiAgaWYgKG5ld01heFZpZXcgIT09IG1heFZpZXcpIHtcbiAgICBtYXhWaWV3ID0gY29uZmlnLm1heFZpZXcgPSBuZXdNYXhWaWV3O1xuICB9XG5cbiAgbGV0IG5ld1N0YXJ0VmlldyA9IHN0YXJ0VmlldztcbiAgaWYgKGluT3B0cy5zdGFydFZpZXcgIT09IHVuZGVmaW5lZCkge1xuICAgIG5ld1N0YXJ0VmlldyA9IHZhbGlkYXRlVmlld0lkKGluT3B0cy5zdGFydFZpZXcsIG5ld1N0YXJ0Vmlldyk7XG4gICAgZGVsZXRlIGluT3B0cy5zdGFydFZpZXc7XG4gIH1cbiAgLy8gZW5zdXJlIHBpY2sgbGV2ZWwgPD0gc3RhcnQgdmlldyA8PSBtYXggdmlld1xuICBpZiAobmV3U3RhcnRWaWV3IDwgcGlja0xldmVsKSB7XG4gICAgbmV3U3RhcnRWaWV3ID0gcGlja0xldmVsO1xuICB9IGVsc2UgaWYgKG5ld1N0YXJ0VmlldyA+IG1heFZpZXcpIHtcbiAgICBuZXdTdGFydFZpZXcgPSBtYXhWaWV3O1xuICB9XG4gIGlmIChuZXdTdGFydFZpZXcgIT09IHN0YXJ0Vmlldykge1xuICAgIGNvbmZpZy5zdGFydFZpZXcgPSBuZXdTdGFydFZpZXc7XG4gIH1cblxuICAvLyoqKiB0ZW1wbGF0ZSAqKiovL1xuICBpZiAoaW5PcHRzLnByZXZBcnJvdykge1xuICAgIGNvbnN0IHByZXZBcnJvdyA9IHBhcnNlSFRNTChpbk9wdHMucHJldkFycm93KTtcbiAgICBpZiAocHJldkFycm93LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uZmlnLnByZXZBcnJvdyA9IHByZXZBcnJvdy5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLnByZXZBcnJvdztcbiAgfVxuICBpZiAoaW5PcHRzLm5leHRBcnJvdykge1xuICAgIGNvbnN0IG5leHRBcnJvdyA9IHBhcnNlSFRNTChpbk9wdHMubmV4dEFycm93KTtcbiAgICBpZiAobmV4dEFycm93LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uZmlnLm5leHRBcnJvdyA9IG5leHRBcnJvdy5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLm5leHRBcnJvdztcbiAgfVxuXG4gIC8vKioqIG1pc2MgKioqLy9cbiAgaWYgKGluT3B0cy5kaXNhYmxlVG91Y2hLZXlib2FyZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uZmlnLmRpc2FibGVUb3VjaEtleWJvYXJkID0gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQgJiYgISFpbk9wdHMuZGlzYWJsZVRvdWNoS2V5Ym9hcmQ7XG4gICAgZGVsZXRlIGluT3B0cy5kaXNhYmxlVG91Y2hLZXlib2FyZDtcbiAgfVxuICBpZiAoaW5PcHRzLm9yaWVudGF0aW9uKSB7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBpbk9wdHMub3JpZW50YXRpb24udG9Mb3dlckNhc2UoKS5zcGxpdCgvXFxzKy9nKTtcbiAgICBjb25maWcub3JpZW50YXRpb24gPSB7XG4gICAgICB4OiBvcmllbnRhdGlvbi5maW5kKHggPT4gKHggPT09ICdsZWZ0JyB8fCB4ID09PSAncmlnaHQnKSkgfHwgJ2F1dG8nLFxuICAgICAgeTogb3JpZW50YXRpb24uZmluZCh5ID0+ICh5ID09PSAndG9wJyB8fCB5ID09PSAnYm90dG9tJykpIHx8ICdhdXRvJyxcbiAgICB9O1xuICAgIGRlbGV0ZSBpbk9wdHMub3JpZW50YXRpb247XG4gIH1cbiAgaWYgKGluT3B0cy50b2RheUJ0bk1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHN3aXRjaChpbk9wdHMudG9kYXlCdG5Nb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbmZpZy50b2RheUJ0bk1vZGUgPSBpbk9wdHMudG9kYXlCdG5Nb2RlO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLnRvZGF5QnRuTW9kZTtcbiAgfVxuXG4gIC8vKioqIGNvcHkgdGhlIHJlc3QgKioqLy9cbiAgT2JqZWN0LmtleXMoaW5PcHRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoaW5PcHRzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoMCx1dGlscy8qIGhhc1Byb3BlcnR5ICovLmwkKShvcHRpb25zX2RlZmF1bHRPcHRpb25zLCBrZXkpKSB7XG4gICAgICBjb25maWdba2V5XSA9IGluT3B0c1trZXldO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvcGlja2VyL3RlbXBsYXRlcy9waWNrZXJUZW1wbGF0ZS5qc1xuXG5cbmNvbnN0IHBpY2tlclRlbXBsYXRlID0gKDAsdXRpbHMvKiBvcHRpbWl6ZVRlbXBsYXRlSFRNTCAqLy56aCkoYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyIGhpZGRlblwiPlxuICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1waWNrZXIgaW5saW5lLWJsb2NrIHJvdW5kZWQtbGcgYmctd2hpdGUgZGFyazpiZy1ncmF5LTcwMCBzaGFkb3ctbGcgcC00XCI+XG4gICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci10aXRsZSBiZy13aGl0ZSBkYXJrOmJnLWdyYXktNzAwIGRhcms6dGV4dC13aGl0ZSBweC0yIHB5LTMgdGV4dC1jZW50ZXIgZm9udC1zZW1pYm9sZFwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY29udHJvbHMgZmxleCBqdXN0aWZ5LWJldHdlZW4gbWItMlwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJnLXdoaXRlIGRhcms6YmctZ3JheS03MDAgcm91bmRlZC1sZyB0ZXh0LWdyYXktNTAwIGRhcms6dGV4dC13aGl0ZSBob3ZlcjpiZy1ncmF5LTEwMCBkYXJrOmhvdmVyOmJnLWdyYXktNjAwIGhvdmVyOnRleHQtZ3JheS05MDAgZGFyazpob3Zlcjp0ZXh0LXdoaXRlIHRleHQtbGcgcC0yLjUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWdyYXktMjAwIHByZXYtYnRuXCI+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidGV4dC1zbSByb3VuZGVkLWxnIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlIGJnLXdoaXRlIGRhcms6YmctZ3JheS03MDAgZm9udC1zZW1pYm9sZCBweS0yLjUgcHgtNSBob3ZlcjpiZy1ncmF5LTEwMCBkYXJrOmhvdmVyOmJnLWdyYXktNjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ncmF5LTIwMCB2aWV3LXN3aXRjaFwiPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJnLXdoaXRlIGRhcms6YmctZ3JheS03MDAgcm91bmRlZC1sZyB0ZXh0LWdyYXktNTAwIGRhcms6dGV4dC13aGl0ZSBob3ZlcjpiZy1ncmF5LTEwMCBkYXJrOmhvdmVyOmJnLWdyYXktNjAwIGhvdmVyOnRleHQtZ3JheS05MDAgZGFyazpob3Zlcjp0ZXh0LXdoaXRlIHRleHQtbGcgcC0yLjUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWdyYXktMjAwIG5leHQtYnRuXCI+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1tYWluIHAtMVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWZvb3RlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY29udHJvbHMgZmxleCBzcGFjZS14LTIgbXQtMlwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiVidXR0b25DbGFzcyUgdG9kYXktYnRuIHRleHQtd2hpdGUgYmctYmx1ZS03MDAgZGFyazpiZy1ibHVlLTYwMCBob3ZlcjpiZy1ibHVlLTgwMCBkYXJrOmhvdmVyOmJnLWJsdWUtNzAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWJsdWUtMzAwIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgdGV4dC1zbSBweC01IHB5LTIgdGV4dC1jZW50ZXIgdy0xLzJcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIlYnV0dG9uQ2xhc3MlIGNsZWFyLWJ0biB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZSBiZy13aGl0ZSBkYXJrOmJnLWdyYXktNzAwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgZGFyazpib3JkZXItZ3JheS02MDAgaG92ZXI6YmctZ3JheS0xMDAgZGFyazpob3ZlcjpiZy1ncmF5LTYwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1ibHVlLTMwMCBmb250LW1lZGl1bSByb3VuZGVkLWxnIHRleHQtc20gcHgtNSBweS0yIHRleHQtY2VudGVyIHctMS8yXCI+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gKTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgdGVtcGxhdGVzX3BpY2tlclRlbXBsYXRlID0gKHBpY2tlclRlbXBsYXRlKTtcblxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvcGlja2VyL3RlbXBsYXRlcy9kYXlzVGVtcGxhdGUuanNcblxuXG5jb25zdCBkYXlzVGVtcGxhdGUgPSAoMCx1dGlscy8qIG9wdGltaXplVGVtcGxhdGVIVE1MICovLnpoKShgPGRpdiBjbGFzcz1cImRheXNcIj5cbiAgPGRpdiBjbGFzcz1cImRheXMtb2Ytd2VlayBncmlkIGdyaWQtY29scy03IG1iLTFcIj4keygwLHV0aWxzLyogY3JlYXRlVGFnUmVwZWF0ICovLmVtKSgnc3BhbicsIDcsIHtjbGFzczogJ2RvdyBibG9jayBmbGV4LTEgbGVhZGluZy05IGJvcmRlci0wIHJvdW5kZWQtbGcgY3Vyc29yLWRlZmF1bHQgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTkwMCBmb250LXNlbWlib2xkIHRleHQtc20nfSl9PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWdyaWQgdy02NCBncmlkIGdyaWQtY29scy03XCI+JHsoMCx1dGlscy8qIGNyZWF0ZVRhZ1JlcGVhdCAqLy5lbSkoJ3NwYW4nLCA0MiAsIHtjbGFzczogJ2Jsb2NrIGZsZXgtMSBsZWFkaW5nLTkgYm9yZGVyLTAgcm91bmRlZC1sZyBjdXJzb3ItZGVmYXVsdCB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktOTAwIGZvbnQtc2VtaWJvbGQgdGV4dC1zbSBoLTYgbGVhZGluZy02IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBkYXJrOnRleHQtZ3JheS00MDAnfSl9PC9kaXY+XG48L2Rpdj5gKTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgdGVtcGxhdGVzX2RheXNUZW1wbGF0ZSA9IChkYXlzVGVtcGxhdGUpO1xuXG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9waWNrZXIvdGVtcGxhdGVzL2NhbGVuZGFyV2Vla3NUZW1wbGF0ZS5qc1xuXG5cbmNvbnN0IGNhbGVuZGFyV2Vla3NUZW1wbGF0ZSA9ICgwLHV0aWxzLyogb3B0aW1pemVUZW1wbGF0ZUhUTUwgKi8uemgpKGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItd2Vla3NcIj5cbiAgPGRpdiBjbGFzcz1cImRheXMtb2Ytd2VlayBmbGV4XCI+PHNwYW4gY2xhc3M9XCJkb3cgaC02IGxlYWRpbmctNiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgZGFyazp0ZXh0LWdyYXktNDAwXCI+PC9zcGFuPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwid2Vla3NcIj4keygwLHV0aWxzLyogY3JlYXRlVGFnUmVwZWF0ICovLmVtKSgnc3BhbicsIDYsIHtjbGFzczogJ3dlZWsgYmxvY2sgZmxleC0xIGxlYWRpbmctOSBib3JkZXItMCByb3VuZGVkLWxnIGN1cnNvci1kZWZhdWx0IHRleHQtY2VudGVyIHRleHQtZ3JheS05MDAgZm9udC1zZW1pYm9sZCB0ZXh0LXNtJ30pfTwvZGl2PlxuPC9kaXY+YCk7XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIHRlbXBsYXRlc19jYWxlbmRhcldlZWtzVGVtcGxhdGUgPSAoY2FsZW5kYXJXZWVrc1RlbXBsYXRlKTtcblxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvcGlja2VyL3ZpZXdzL1ZpZXcuanNcblxuXG5cbi8vIEJhc2UgY2xhc3Mgb2YgdGhlIHZpZXcgY2xhc3Nlc1xuY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKHBpY2tlciwgY29uZmlnKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcsIHtcbiAgICAgIHBpY2tlcixcbiAgICAgIGVsZW1lbnQ6IHBhcnNlSFRNTChgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItdmlldyBmbGV4XCI+PC9kaXY+YCkuZmlyc3RDaGlsZCxcbiAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICB9KTtcbiAgICB0aGlzLmluaXQodGhpcy5waWNrZXIuZGF0ZXBpY2tlci5jb25maWcpO1xuICB9XG5cbiAgaW5pdChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucGlja0xldmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaXNNaW5WaWV3ID0gdGhpcy5pZCA9PT0gb3B0aW9ucy5waWNrTGV2ZWw7XG4gICAgfVxuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIC8vIEV4ZWN1dGUgYmVmb3JlU2hvdygpIGNhbGxiYWNrIGFuZCBhcHBseSB0aGUgcmVzdWx0IHRvIHRoZSBlbGVtZW50XG4gIC8vIGFyZ3M6XG4gIC8vIC0gY3VycmVudCAtIGN1cnJlbnQgdmFsdWUgb24gdGhlIGl0ZXJhdGlvbiBvbiB2aWV3IHJlbmRlcmluZ1xuICAvLyAtIHRpbWVWYWx1ZSAtIHRpbWUgdmFsdWUgb2YgdGhlIGRhdGUgdG8gcGFzcyB0byBiZWZvcmVTaG93KClcbiAgcGVyZm9ybUJlZm9yZUhvb2soZWwsIGN1cnJlbnQsIHRpbWVWYWx1ZSkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmJlZm9yZVNob3cobmV3IERhdGUodGltZVZhbHVlKSk7XG4gICAgc3dpdGNoICh0eXBlb2YgcmVzdWx0KSB7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmVzdWx0ID0ge2VuYWJsZWQ6IHJlc3VsdH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmVzdWx0ID0ge2NsYXNzZXM6IHJlc3VsdH07XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdC5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAoMCx1dGlscy8qIHB1c2hVbmlxdWUgKi8uJEMpKHRoaXMuZGlzYWJsZWQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5jbGFzc2VzKSB7XG4gICAgICAgIGNvbnN0IGV4dHJhQ2xhc3NlcyA9IHJlc3VsdC5jbGFzc2VzLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uZXh0cmFDbGFzc2VzKTtcbiAgICAgICAgaWYgKGV4dHJhQ2xhc3Nlcy5pbmNsdWRlcygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICgwLHV0aWxzLyogcHVzaFVuaXF1ZSAqLy4kQykodGhpcy5kaXNhYmxlZCwgY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQuY29udGVudCkge1xuICAgICAgICByZXBsYWNlQ2hpbGROb2RlcyhlbCwgcmVzdWx0LmNvbnRlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9waWNrZXIvdmlld3MvRGF5c1ZpZXcuanNcblxuXG5cblxuXG5cblxuXG5jbGFzcyBEYXlzVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihwaWNrZXIpIHtcbiAgICBzdXBlcihwaWNrZXIsIHtcbiAgICAgIGlkOiAwLFxuICAgICAgbmFtZTogJ2RheXMnLFxuICAgICAgY2VsbENsYXNzOiAnZGF5JyxcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQob3B0aW9ucywgb25Db25zdHJ1Y3Rpb24gPSB0cnVlKSB7XG4gICAgaWYgKG9uQ29uc3RydWN0aW9uKSB7XG4gICAgICBjb25zdCBpbm5lciA9IHBhcnNlSFRNTCh0ZW1wbGF0ZXNfZGF5c1RlbXBsYXRlKS5maXJzdENoaWxkO1xuICAgICAgdGhpcy5kb3cgPSBpbm5lci5maXJzdENoaWxkO1xuICAgICAgdGhpcy5ncmlkID0gaW5uZXIubGFzdENoaWxkO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICB9XG4gICAgc3VwZXIuaW5pdChvcHRpb25zKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGxldCB1cGRhdGVET1c7XG5cbiAgICBpZiAoKDAsdXRpbHMvKiBoYXNQcm9wZXJ0eSAqLy5sJCkob3B0aW9ucywgJ21pbkRhdGUnKSkge1xuICAgICAgdGhpcy5taW5EYXRlID0gb3B0aW9ucy5taW5EYXRlO1xuICAgIH1cbiAgICBpZiAoKDAsdXRpbHMvKiBoYXNQcm9wZXJ0eSAqLy5sJCkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgICAgdGhpcy5tYXhEYXRlID0gb3B0aW9ucy5tYXhEYXRlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmRhdGVzRGlzYWJsZWQgPSBvcHRpb25zLmRhdGVzRGlzYWJsZWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRheXNPZldlZWtEaXNhYmxlZCkge1xuICAgICAgdGhpcy5kYXlzT2ZXZWVrRGlzYWJsZWQgPSBvcHRpb25zLmRheXNPZldlZWtEaXNhYmxlZDtcbiAgICAgIHVwZGF0ZURPVyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRheXNPZldlZWtIaWdobGlnaHRlZCkge1xuICAgICAgdGhpcy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQgPSBvcHRpb25zLmRheXNPZldlZWtIaWdobGlnaHRlZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudG9kYXlIaWdobGlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy50b2RheUhpZ2hsaWdodCA9IG9wdGlvbnMudG9kYXlIaWdobGlnaHQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLndlZWtTdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLndlZWtTdGFydCA9IG9wdGlvbnMud2Vla1N0YXJ0O1xuICAgICAgdGhpcy53ZWVrRW5kID0gb3B0aW9ucy53ZWVrRW5kO1xuICAgICAgdXBkYXRlRE9XID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubG9jYWxlKSB7XG4gICAgICBjb25zdCBsb2NhbGUgPSB0aGlzLmxvY2FsZSA9IG9wdGlvbnMubG9jYWxlO1xuICAgICAgdGhpcy5kYXlOYW1lcyA9IGxvY2FsZS5kYXlzTWluO1xuICAgICAgdGhpcy5zd2l0Y2hMYWJlbEZvcm1hdCA9IGxvY2FsZS50aXRsZUZvcm1hdDtcbiAgICAgIHVwZGF0ZURPVyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJlZm9yZVNob3dEYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5iZWZvcmVTaG93ID0gdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2hvd0RheSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IG9wdGlvbnMuYmVmb3JlU2hvd0RheVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jYWxlbmRhcldlZWtzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcHRpb25zLmNhbGVuZGFyV2Vla3MgJiYgIXRoaXMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICBjb25zdCB3ZWVrc0VsZW0gPSBwYXJzZUhUTUwodGVtcGxhdGVzX2NhbGVuZGFyV2Vla3NUZW1wbGF0ZSkuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5jYWxlbmRhcldlZWtzID0ge1xuICAgICAgICAgIGVsZW1lbnQ6IHdlZWtzRWxlbSxcbiAgICAgICAgICBkb3c6IHdlZWtzRWxlbS5maXJzdENoaWxkLFxuICAgICAgICAgIHdlZWtzOiB3ZWVrc0VsZW0ubGFzdENoaWxkLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHdlZWtzRWxlbSwgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MgJiYgIW9wdGlvbnMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYWxlbmRhcldlZWtzLmVsZW1lbnQpO1xuICAgICAgICB0aGlzLmNhbGVuZGFyV2Vla3MgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zaG93RGF5c09mV2VlayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3B0aW9ucy5zaG93RGF5c09mV2Vlaykge1xuICAgICAgICBzaG93RWxlbWVudCh0aGlzLmRvdyk7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICBzaG93RWxlbWVudCh0aGlzLmNhbGVuZGFyV2Vla3MuZG93KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZUVsZW1lbnQodGhpcy5kb3cpO1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgaGlkZUVsZW1lbnQodGhpcy5jYWxlbmRhcldlZWtzLmRvdyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGF5cy1vZi13ZWVrIHdoZW4gbG9jYWxlLCBkYXlzT2Z3ZWVrRGlzYWJsZWQgb3Igd2Vla1N0YXJ0IGlzIGNoYW5nZWRcbiAgICBpZiAodXBkYXRlRE9XKSB7XG4gICAgICBBcnJheS5mcm9tKHRoaXMuZG93LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZG93ID0gKHRoaXMud2Vla1N0YXJ0ICsgaW5kZXgpICUgNztcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0aGlzLmRheU5hbWVzW2Rvd107XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IHRoaXMuZGF5c09mV2Vla0Rpc2FibGVkLmluY2x1ZGVzKGRvdykgPyAnZG93IGRpc2FibGVkIHRleHQtY2VudGVyIGgtNiBsZWFkaW5nLTYgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIGRhcms6dGV4dC1ncmF5LTQwMCBjdXJzb3Itbm90LWFsbG93ZWQnIDogJ2RvdyB0ZXh0LWNlbnRlciBoLTYgbGVhZGluZy02IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBkYXJrOnRleHQtZ3JheS00MDAnO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQXBwbHkgdXBkYXRlIG9uIHRoZSBmb2N1c2VkIGRhdGUgdG8gdmlldydzIHNldHRpbmdzXG4gIHVwZGF0ZUZvY3VzKCkge1xuICAgIGNvbnN0IHZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5waWNrZXIudmlld0RhdGUpO1xuICAgIGNvbnN0IHZpZXdZZWFyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCB2aWV3TW9udGggPSB2aWV3RGF0ZS5nZXRNb250aCgpO1xuICAgIGNvbnN0IGZpcnN0T2ZNb250aCA9ICgwLGxpYl9kYXRlLyogZGF0ZVZhbHVlICovLmJ5KSh2aWV3WWVhciwgdmlld01vbnRoLCAxKTtcbiAgICBjb25zdCBzdGFydCA9ICgwLGxpYl9kYXRlLyogZGF5T2ZUaGVXZWVrT2YgKi8uZnIpKGZpcnN0T2ZNb250aCwgdGhpcy53ZWVrU3RhcnQsIHRoaXMud2Vla1N0YXJ0KTtcblxuICAgIHRoaXMuZmlyc3QgPSBmaXJzdE9mTW9udGg7XG4gICAgdGhpcy5sYXN0ID0gKDAsbGliX2RhdGUvKiBkYXRlVmFsdWUgKi8uYnkpKHZpZXdZZWFyLCB2aWV3TW9udGggKyAxLCAwKTtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5mb2N1c2VkID0gdGhpcy5waWNrZXIudmlld0RhdGU7XG4gIH1cblxuICAvLyBBcHBseSB1cGRhdGUgb24gdGhlIHNlbGVjdGVkIGRhdGVzIHRvIHZpZXcncyBzZXR0aW5nc1xuICB1cGRhdGVTZWxlY3Rpb24oKSB7XG4gICAgY29uc3Qge2RhdGVzLCByYW5nZXBpY2tlcn0gPSB0aGlzLnBpY2tlci5kYXRlcGlja2VyO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlcztcbiAgICBpZiAocmFuZ2VwaWNrZXIpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSByYW5nZXBpY2tlci5kYXRlcztcbiAgICB9XG4gIH1cblxuICAgLy8gVXBkYXRlIHRoZSBlbnRpcmUgdmlldyBVSVxuICByZW5kZXIoKSB7XG4gICAgLy8gdXBkYXRlIHRvZGF5IG1hcmtlciBvbiBldmVyIHJlbmRlclxuICAgIHRoaXMudG9kYXkgPSB0aGlzLnRvZGF5SGlnaGxpZ2h0ID8gKDAsbGliX2RhdGUvKiB0b2RheSAqLy5MZykoKSA6IHVuZGVmaW5lZDtcbiAgICAvLyByZWZyZXNoIGRpc2FibGVkIGRhdGVzIG9uIGV2ZXJ5IHJlbmRlciBpbiBvcmRlciB0byBjbGVhciB0aGUgb25lcyBhZGRlZFxuICAgIC8vIGJ5IGJlZm9yZVNob3cgaG9vayBhdCBwcmV2aW91cyByZW5kZXJcbiAgICB0aGlzLmRpc2FibGVkID0gWy4uLnRoaXMuZGF0ZXNEaXNhYmxlZF07XG5cbiAgICBjb25zdCBzd2l0Y2hMYWJlbCA9ICgwLGRhdGVfZm9ybWF0LyogZm9ybWF0RGF0ZSAqLy5wNikodGhpcy5mb2N1c2VkLCB0aGlzLnN3aXRjaExhYmVsRm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgdGhpcy5waWNrZXIuc2V0Vmlld1N3aXRjaExhYmVsKHN3aXRjaExhYmVsKTtcbiAgICB0aGlzLnBpY2tlci5zZXRQcmV2QnRuRGlzYWJsZWQodGhpcy5maXJzdCA8PSB0aGlzLm1pbkRhdGUpO1xuICAgIHRoaXMucGlja2VyLnNldE5leHRCdG5EaXNhYmxlZCh0aGlzLmxhc3QgPj0gdGhpcy5tYXhEYXRlKTtcblxuICAgIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgIC8vIHN0YXJ0IG9mIHRoZSBVVEMgd2VlayAoTW9uZGF5KSBvZiB0aGUgMXN0IG9mIHRoZSBtb250aFxuICAgICAgY29uc3Qgc3RhcnRPZldlZWsgPSAoMCxsaWJfZGF0ZS8qIGRheU9mVGhlV2Vla09mICovLmZyKSh0aGlzLmZpcnN0LCAxLCAxKTtcbiAgICAgIEFycmF5LmZyb20odGhpcy5jYWxlbmRhcldlZWtzLndlZWtzLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSAoMCxsaWJfZGF0ZS8qIGdldFdlZWsgKi8uUWspKCgwLGxpYl9kYXRlLyogYWRkV2Vla3MgKi8uamgpKHN0YXJ0T2ZXZWVrLCBpbmRleCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSAoMCxsaWJfZGF0ZS8qIGFkZERheXMgKi8uRTQpKHRoaXMuc3RhcnQsIGluZGV4KTtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjdXJyZW50KTtcbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XG5cbiAgICAgIGVsLmNsYXNzTmFtZSA9IGBkYXRlcGlja2VyLWNlbGwgaG92ZXI6YmctZ3JheS0xMDAgZGFyazpob3ZlcjpiZy1ncmF5LTYwMCBibG9jayBmbGV4LTEgbGVhZGluZy05IGJvcmRlci0wIHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXIgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXNtICR7dGhpcy5jZWxsQ2xhc3N9YDtcbiAgICAgIGVsLmRhdGFzZXQuZGF0ZSA9IGN1cnJlbnQ7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgICBpZiAoY3VycmVudCA8IHRoaXMuZmlyc3QpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncHJldicsICd0ZXh0LWdyYXktNTAwJywgJ2Rhcms6dGV4dC13aGl0ZScpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID4gdGhpcy5sYXN0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ25leHQnLCAndGV4dC1ncmF5LTUwMCcsICdkYXJrOnRleHQtd2hpdGUnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRvZGF5ID09PSBjdXJyZW50KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3RvZGF5JywgJ2JnLWdyYXktMTAwJywgJ2Rhcms6YmctZ3JheS02MDAnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50IDwgdGhpcy5taW5EYXRlIHx8IGN1cnJlbnQgPiB0aGlzLm1heERhdGUgfHwgdGhpcy5kaXNhYmxlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcsICdjdXJzb3Itbm90LWFsbG93ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRheXNPZldlZWtEaXNhYmxlZC5pbmNsdWRlcyhkYXkpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJywgJ2N1cnNvci1ub3QtYWxsb3dlZCcpO1xuICAgICAgICAoMCx1dGlscy8qIHB1c2hVbmlxdWUgKi8uJEMpKHRoaXMuZGlzYWJsZWQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF5c09mV2Vla0hpZ2hsaWdodGVkLmluY2x1ZGVzKGRheSkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSB0aGlzLnJhbmdlO1xuICAgICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnLCAnYmctZ3JheS0yMDAnLCAnZGFyazpiZy1ncmF5LTYwMCcpO1xuICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJ3JvdW5kZWQtbGcnLCAncm91bmRlZC1sLWxnJywgJ3JvdW5kZWQtci1sZycpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcsICdiZy1ncmF5LTEwMCcsICdkYXJrOmJnLWdyYXktNjAwJywgJ3JvdW5kZWQtbC1sZycpO1xuICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJ3JvdW5kZWQtbGcnLCAncm91bmRlZC1yLWxnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJywgJ2JnLWdyYXktMTAwJywgJ2Rhcms6YmctZ3JheS02MDAnLCAncm91bmRlZC1yLWxnJyk7XG4gICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgncm91bmRlZC1sZycsICdyb3VuZGVkLWwtbGcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnLCAnYmctYmx1ZS03MDAnLCAndGV4dC13aGl0ZScsICdkYXJrOmJnLWJsdWUtNjAwJywgJ2Rhcms6dGV4dC13aGl0ZScpO1xuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWdyYXktOTAwJywgJ3RleHQtZ3JheS01MDAnLCAnaG92ZXI6YmctZ3JheS0xMDAnLCAnZGFyazp0ZXh0LXdoaXRlJywgJ2Rhcms6aG92ZXI6YmctZ3JheS02MDAnLCAnZGFyazpiZy1ncmF5LTYwMCcsICdiZy1ncmF5LTEwMCcsICdiZy1ncmF5LTIwMCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZm9yZVNob3cpIHtcbiAgICAgICAgdGhpcy5wZXJmb3JtQmVmb3JlSG9vayhlbCwgY3VycmVudCwgY3VycmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZXMgb2Ygc2VsZWN0ZWQgYW5kIGZvY3VzZWQgaXRlbXNcbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gdGhpcy5yYW5nZSB8fCBbXTtcbiAgICB0aGlzLmdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2UsIC5yYW5nZS1zdGFydCwgLnJhbmdlLWVuZCwgLnNlbGVjdGVkLCAuZm9jdXNlZCcpXG4gICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2UnLCAncmFuZ2Utc3RhcnQnLCAncmFuZ2UtZW5kJywgJ3NlbGVjdGVkJywgJ2JnLWJsdWUtNzAwJywgJ3RleHQtd2hpdGUnLCAnZGFyazpiZy1ibHVlLTYwMCcsICdkYXJrOnRleHQtd2hpdGUnLCAnZm9jdXNlZCcpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWdyYXktOTAwJywgJ3JvdW5kZWQtbGcnLCAnZGFyazp0ZXh0LXdoaXRlJyk7XG4gICAgICB9KTtcbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBOdW1iZXIoZWwuZGF0YXNldC5kYXRlKTtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJ2JnLWdyYXktMjAwJywgJ2Rhcms6YmctZ3JheS02MDAnLCAncm91bmRlZC1sLWxnJywgJ3JvdW5kZWQtci1sZycpXG4gICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJywgJ2JnLWdyYXktMjAwJywgJ2Rhcms6YmctZ3JheS02MDAnKTtcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgncm91bmRlZC1sZycpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnLCAnYmctZ3JheS0yMDAnLCAnZGFyazpiZy1ncmF5LTYwMCcsICdyb3VuZGVkLWwtbGcnKTtcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgncm91bmRlZC1sZycsICdyb3VuZGVkLXItbGcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnLCAnYmctZ3JheS0yMDAnLCAnZGFyazpiZy1ncmF5LTYwMCcsICdyb3VuZGVkLXItbGcnKTtcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgncm91bmRlZC1sZycsICdyb3VuZGVkLWwtbGcnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJywgJ2JnLWJsdWUtNzAwJywgJ3RleHQtd2hpdGUnLCAnZGFyazpiZy1ibHVlLTYwMCcsICdkYXJrOnRleHQtd2hpdGUnKTtcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1ncmF5LTkwMCcsICdob3ZlcjpiZy1ncmF5LTEwMCcsICdkYXJrOnRleHQtd2hpdGUnLCAnZGFyazpob3ZlcjpiZy1ncmF5LTYwMCcsICdiZy1ncmF5LTEwMCcsICdiZy1ncmF5LTIwMCcsICdkYXJrOmJnLWdyYXktNjAwJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlIG9mIGZvY3VzZWQgaXRlbVxuICByZWZyZXNoRm9jdXMoKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLnJvdW5kKCh0aGlzLmZvY3VzZWQgLSB0aGlzLnN0YXJ0KSAvIDg2NDAwMDAwKTtcbiAgICB0aGlzLmdyaWQucXVlcnlTZWxlY3RvckFsbCgnLmZvY3VzZWQnKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXNlZCcpO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JpZC5jaGlsZHJlbltpbmRleF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICB9XG59XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL3BpY2tlci92aWV3cy9Nb250aHNWaWV3LmpzXG5cblxuXG5cblxuZnVuY3Rpb24gY29tcHV0ZU1vbnRoUmFuZ2UocmFuZ2UsIHRoaXNZZWFyKSB7XG4gIGlmICghcmFuZ2UgfHwgIXJhbmdlWzBdIHx8ICFyYW5nZVsxXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IFtbc3RhcnRZLCBzdGFydE1dLCBbZW5kWSwgZW5kTV1dID0gcmFuZ2U7XG4gIGlmIChzdGFydFkgPiB0aGlzWWVhciB8fCBlbmRZIDwgdGhpc1llYXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIFtcbiAgICBzdGFydFkgPT09IHRoaXNZZWFyID8gc3RhcnRNIDogLTEsXG4gICAgZW5kWSA9PT0gdGhpc1llYXIgPyBlbmRNIDogMTIsXG4gIF07XG59XG5cbmNsYXNzIE1vbnRoc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IocGlja2VyKSB7XG4gICAgc3VwZXIocGlja2VyLCB7XG4gICAgICBpZDogMSxcbiAgICAgIG5hbWU6ICdtb250aHMnLFxuICAgICAgY2VsbENsYXNzOiAnbW9udGgnLFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdChvcHRpb25zLCBvbkNvbnN0cnVjdGlvbiA9IHRydWUpIHtcbiAgICBpZiAob25Db25zdHJ1Y3Rpb24pIHtcbiAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtb250aHMnLCAnZGF0ZXBpY2tlci1ncmlkJywgJ3ctNjQnLCAnZ3JpZCcsICdncmlkLWNvbHMtNCcpO1xuICAgICAgdGhpcy5ncmlkLmFwcGVuZENoaWxkKHBhcnNlSFRNTCgoMCx1dGlscy8qIGNyZWF0ZVRhZ1JlcGVhdCAqLy5lbSkoJ3NwYW4nLCAxMiwgeydkYXRhLW1vbnRoJzogaXggPT4gaXh9KSkpO1xuICAgIH1cbiAgICBzdXBlci5pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMubG9jYWxlKSB7XG4gICAgICB0aGlzLm1vbnRoTmFtZXMgPSBvcHRpb25zLmxvY2FsZS5tb250aHNTaG9ydDtcbiAgICB9XG4gICAgaWYgKCgwLHV0aWxzLyogaGFzUHJvcGVydHkgKi8ubCQpKG9wdGlvbnMsICdtaW5EYXRlJykpIHtcbiAgICAgIGlmIChvcHRpb25zLm1pbkRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pbk1vbnRoID0gdGhpcy5taW5EYXRlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWluRGF0ZU9iaiA9IG5ldyBEYXRlKG9wdGlvbnMubWluRGF0ZSk7XG4gICAgICAgIHRoaXMubWluWWVhciA9IG1pbkRhdGVPYmouZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5taW5Nb250aCA9IG1pbkRhdGVPYmouZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5taW5EYXRlID0gbWluRGF0ZU9iai5zZXREYXRlKDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKDAsdXRpbHMvKiBoYXNQcm9wZXJ0eSAqLy5sJCkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWF4RGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubWF4WWVhciA9IHRoaXMubWF4TW9udGggPSB0aGlzLm1heERhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXhEYXRlT2JqID0gbmV3IERhdGUob3B0aW9ucy5tYXhEYXRlKTtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gbWF4RGF0ZU9iai5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLm1heE1vbnRoID0gbWF4RGF0ZU9iai5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLm1heERhdGUgPSAoMCxsaWJfZGF0ZS8qIGRhdGVWYWx1ZSAqLy5ieSkodGhpcy5tYXhZZWFyLCB0aGlzLm1heE1vbnRoICsgMSwgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJlZm9yZVNob3dNb250aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJlZm9yZVNob3cgPSB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTaG93TW9udGggPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBvcHRpb25zLmJlZm9yZVNob3dNb250aFxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgdmlldydzIHNldHRpbmdzIHRvIHJlZmxlY3QgdGhlIHZpZXdEYXRlIHNldCBvbiB0aGUgcGlja2VyXG4gIHVwZGF0ZUZvY3VzKCkge1xuICAgIGNvbnN0IHZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5waWNrZXIudmlld0RhdGUpO1xuICAgIHRoaXMueWVhciA9IHZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5mb2N1c2VkID0gdmlld0RhdGUuZ2V0TW9udGgoKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB2aWV3J3Mgc2V0dGluZ3MgdG8gcmVmbGVjdCB0aGUgc2VsZWN0ZWQgZGF0ZXNcbiAgdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IHtkYXRlcywgcmFuZ2VwaWNrZXJ9ID0gdGhpcy5waWNrZXIuZGF0ZXBpY2tlcjtcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZXMucmVkdWNlKChzZWxlY3RlZCwgdGltZVZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZVZhbHVlKTtcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgIGlmIChzZWxlY3RlZFt5ZWFyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGVjdGVkW3llYXJdID0gW21vbnRoXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICgwLHV0aWxzLyogcHVzaFVuaXF1ZSAqLy4kQykoc2VsZWN0ZWRbeWVhcl0sIG1vbnRoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICB9LCB7fSk7XG4gICAgaWYgKHJhbmdlcGlja2VyICYmIHJhbmdlcGlja2VyLmRhdGVzKSB7XG4gICAgICB0aGlzLnJhbmdlID0gcmFuZ2VwaWNrZXIuZGF0ZXMubWFwKHRpbWVWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lVmFsdWUpO1xuICAgICAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyB1bmRlZmluZWQgOiBbZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCldO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBlbnRpcmUgdmlldyBVSVxuICByZW5kZXIoKSB7XG4gICAgLy8gcmVmcmVzaCBkaXNhYmxlZCBtb250aHMgb24gZXZlcnkgcmVuZGVyIGluIG9yZGVyIHRvIGNsZWFyIHRoZSBvbmVzIGFkZGVkXG4gICAgLy8gYnkgYmVmb3JlU2hvdyBob29rIGF0IHByZXZpb3VzIHJlbmRlclxuICAgIHRoaXMuZGlzYWJsZWQgPSBbXTtcblxuICAgIHRoaXMucGlja2VyLnNldFZpZXdTd2l0Y2hMYWJlbCh0aGlzLnllYXIpO1xuICAgIHRoaXMucGlja2VyLnNldFByZXZCdG5EaXNhYmxlZCh0aGlzLnllYXIgPD0gdGhpcy5taW5ZZWFyKTtcbiAgICB0aGlzLnBpY2tlci5zZXROZXh0QnRuRGlzYWJsZWQodGhpcy55ZWFyID49IHRoaXMubWF4WWVhcik7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRbdGhpcy55ZWFyXSB8fCBbXTtcbiAgICBjb25zdCB5ck91dE9mUmFuZ2UgPSB0aGlzLnllYXIgPCB0aGlzLm1pblllYXIgfHwgdGhpcy55ZWFyID4gdGhpcy5tYXhZZWFyO1xuICAgIGNvbnN0IGlzTWluWWVhciA9IHRoaXMueWVhciA9PT0gdGhpcy5taW5ZZWFyO1xuICAgIGNvbnN0IGlzTWF4WWVhciA9IHRoaXMueWVhciA9PT0gdGhpcy5tYXhZZWFyO1xuICAgIGNvbnN0IHJhbmdlID0gY29tcHV0ZU1vbnRoUmFuZ2UodGhpcy5yYW5nZSwgdGhpcy55ZWFyKTtcblxuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IGRhdGUgPSAoMCxsaWJfZGF0ZS8qIGRhdGVWYWx1ZSAqLy5ieSkodGhpcy55ZWFyLCBpbmRleCwgMSk7XG5cbiAgICAgIGVsLmNsYXNzTmFtZSA9IGBkYXRlcGlja2VyLWNlbGwgaG92ZXI6YmctZ3JheS0xMDAgZGFyazpob3ZlcjpiZy1ncmF5LTYwMCBibG9jayBmbGV4LTEgbGVhZGluZy05IGJvcmRlci0wIHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXIgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXNtICR7dGhpcy5jZWxsQ2xhc3N9YDtcbiAgICAgIGlmICh0aGlzLmlzTWluVmlldykge1xuICAgICAgICBlbC5kYXRhc2V0LmRhdGUgPSBkYXRlO1xuICAgICAgfVxuICAgICAgLy8gcmVzZXQgdGV4dCBvbiBldmVyeSByZW5kZXIgdG8gY2xlYXIgdGhlIGN1c3RvbSBjb250ZW50IHNldFxuICAgICAgLy8gYnkgYmVmb3JlU2hvdyBob29rIGF0IHByZXZpb3VzIHJlbmRlclxuICAgICAgZWwudGV4dENvbnRlbnQgPSB0aGlzLm1vbnRoTmFtZXNbaW5kZXhdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHlyT3V0T2ZSYW5nZVxuICAgICAgICB8fCBpc01pblllYXIgJiYgaW5kZXggPCB0aGlzLm1pbk1vbnRoXG4gICAgICAgIHx8IGlzTWF4WWVhciAmJiBpbmRleCA+IHRoaXMubWF4TW9udGhcbiAgICAgICkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSByYW5nZTtcbiAgICAgICAgaWYgKGluZGV4ID4gcmFuZ2VTdGFydCAmJiBpbmRleCA8IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkLmluY2x1ZGVzKGluZGV4KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcsICdiZy1ibHVlLTcwMCcsICd0ZXh0LXdoaXRlJywgJ2Rhcms6YmctYmx1ZS02MDAnLCAnZGFyazp0ZXh0LXdoaXRlJyk7XG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZ3JheS05MDAnLCAnaG92ZXI6YmctZ3JheS0xMDAnLCAnZGFyazp0ZXh0LXdoaXRlJywgJ2Rhcms6aG92ZXI6YmctZ3JheS02MDAnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVmb3JlU2hvdykge1xuICAgICAgICB0aGlzLnBlcmZvcm1CZWZvcmVIb29rKGVsLCBpbmRleCwgZGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZXMgb2Ygc2VsZWN0ZWQgYW5kIGZvY3VzZWQgaXRlbXNcbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRbdGhpcy55ZWFyXSB8fCBbXTtcbiAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gY29tcHV0ZU1vbnRoUmFuZ2UodGhpcy5yYW5nZSwgdGhpcy55ZWFyKSB8fCBbXTtcbiAgICB0aGlzLmdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2UsIC5yYW5nZS1zdGFydCwgLnJhbmdlLWVuZCwgLnNlbGVjdGVkLCAuZm9jdXNlZCcpXG4gICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2UnLCAncmFuZ2Utc3RhcnQnLCAncmFuZ2UtZW5kJywgJ3NlbGVjdGVkJywgJ2JnLWJsdWUtNzAwJywgJ2Rhcms6YmctYmx1ZS02MDAnLCAnZGFyazp0ZXh0LXdoaXRlJywgJ3RleHQtd2hpdGUnLCAnZm9jdXNlZCcpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWdyYXktOTAwJywgJ2hvdmVyOmJnLWdyYXktMTAwJywgJ2Rhcms6dGV4dC13aGl0ZScsICdkYXJrOmhvdmVyOmJnLWdyYXktNjAwJyk7XG4gICAgICB9KTtcbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBpZiAoaW5kZXggPiByYW5nZVN0YXJ0ICYmIGluZGV4IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5pbmNsdWRlcyhpbmRleCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnLCAnYmctYmx1ZS03MDAnLCAndGV4dC13aGl0ZScsICdkYXJrOmJnLWJsdWUtNjAwJywgJ2Rhcms6dGV4dC13aGl0ZScpO1xuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWdyYXktOTAwJywgJ2hvdmVyOmJnLWdyYXktMTAwJywgJ2Rhcms6dGV4dC13aGl0ZScsICdkYXJrOmhvdmVyOmJnLWdyYXktNjAwJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZSBvZiBmb2N1c2VkIGl0ZW1cbiAgcmVmcmVzaEZvY3VzKCkge1xuICAgIHRoaXMuZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9jdXNlZCcpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XG4gICAgfSk7XG4gICAgdGhpcy5ncmlkLmNoaWxkcmVuW3RoaXMuZm9jdXNlZF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICB9XG59XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9waWNrZXIvdmlld3MvWWVhcnNWaWV3LmpzXG5cblxuXG5cblxuZnVuY3Rpb24gdG9UaXRsZUNhc2Uod29yZCkge1xuICByZXR1cm4gWy4uLndvcmRdLnJlZHVjZSgoc3RyLCBjaCwgaXgpID0+IHN0ciArPSBpeCA/IGNoIDogY2gudG9VcHBlckNhc2UoKSwgJycpO1xufVxuXG4vLyBDbGFzcyByZXByZXNlbnRpbmcgdGhlIHllYXJzIGFuZCBkZWNhZGVzIHZpZXcgZWxlbWVudHNcbmNsYXNzIFllYXJzVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihwaWNrZXIsIGNvbmZpZykge1xuICAgIHN1cGVyKHBpY2tlciwgY29uZmlnKTtcbiAgfVxuXG4gIGluaXQob3B0aW9ucywgb25Db25zdHJ1Y3Rpb24gPSB0cnVlKSB7XG4gICAgaWYgKG9uQ29uc3RydWN0aW9uKSB7XG4gICAgICB0aGlzLm5hdlN0ZXAgPSB0aGlzLnN0ZXAgKiAxMDtcbiAgICAgIHRoaXMuYmVmb3JlU2hvd09wdGlvbiA9IGBiZWZvcmVTaG93JHt0b1RpdGxlQ2FzZSh0aGlzLmNlbGxDbGFzcyl9YDtcbiAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMubmFtZSwgJ2RhdGVwaWNrZXItZ3JpZCcsICd3LTY0JywgJ2dyaWQnLCAnZ3JpZC1jb2xzLTQnKTtcbiAgICAgIHRoaXMuZ3JpZC5hcHBlbmRDaGlsZChwYXJzZUhUTUwoKDAsdXRpbHMvKiBjcmVhdGVUYWdSZXBlYXQgKi8uZW0pKCdzcGFuJywgMTIpKSk7XG4gICAgfVxuICAgIHN1cGVyLmluaXQob3B0aW9ucyk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAoKDAsdXRpbHMvKiBoYXNQcm9wZXJ0eSAqLy5sJCkob3B0aW9ucywgJ21pbkRhdGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWluRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubWluWWVhciA9IHRoaXMubWluRGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWluWWVhciA9ICgwLGxpYl9kYXRlLyogc3RhcnRPZlllYXJQZXJpb2QgKi8uYWspKG9wdGlvbnMubWluRGF0ZSwgdGhpcy5zdGVwKTtcbiAgICAgICAgdGhpcy5taW5EYXRlID0gKDAsbGliX2RhdGUvKiBkYXRlVmFsdWUgKi8uYnkpKHRoaXMubWluWWVhciwgMCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgoMCx1dGlscy8qIGhhc1Byb3BlcnR5ICovLmwkKShvcHRpb25zLCAnbWF4RGF0ZScpKSB7XG4gICAgICBpZiAob3B0aW9ucy5tYXhEYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gdGhpcy5tYXhEYXRlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gKDAsbGliX2RhdGUvKiBzdGFydE9mWWVhclBlcmlvZCAqLy5haykob3B0aW9ucy5tYXhEYXRlLCB0aGlzLnN0ZXApO1xuICAgICAgICB0aGlzLm1heERhdGUgPSAoMCxsaWJfZGF0ZS8qIGRhdGVWYWx1ZSAqLy5ieSkodGhpcy5tYXhZZWFyLCAxMSwgMzEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9uc1t0aGlzLmJlZm9yZVNob3dPcHRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGJlZm9yZVNob3cgPSBvcHRpb25zW3RoaXMuYmVmb3JlU2hvd09wdGlvbl07XG4gICAgICB0aGlzLmJlZm9yZVNob3cgPSB0eXBlb2YgYmVmb3JlU2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGJlZm9yZVNob3cgOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHZpZXcncyBzZXR0aW5ncyB0byByZWZsZWN0IHRoZSB2aWV3RGF0ZSBzZXQgb24gdGhlIHBpY2tlclxuICB1cGRhdGVGb2N1cygpIHtcbiAgICBjb25zdCB2aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMucGlja2VyLnZpZXdEYXRlKTtcbiAgICBjb25zdCBmaXJzdCA9ICgwLGxpYl9kYXRlLyogc3RhcnRPZlllYXJQZXJpb2QgKi8uYWspKHZpZXdEYXRlLCB0aGlzLm5hdlN0ZXApO1xuICAgIGNvbnN0IGxhc3QgPSBmaXJzdCArIDkgKiB0aGlzLnN0ZXA7XG5cbiAgICB0aGlzLmZpcnN0ID0gZmlyc3Q7XG4gICAgdGhpcy5sYXN0ID0gbGFzdDtcbiAgICB0aGlzLnN0YXJ0ID0gZmlyc3QgLSB0aGlzLnN0ZXA7XG4gICAgdGhpcy5mb2N1c2VkID0gKDAsbGliX2RhdGUvKiBzdGFydE9mWWVhclBlcmlvZCAqLy5haykodmlld0RhdGUsIHRoaXMuc3RlcCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdmlldydzIHNldHRpbmdzIHRvIHJlZmxlY3QgdGhlIHNlbGVjdGVkIGRhdGVzXG4gIHVwZGF0ZVNlbGVjdGlvbigpIHtcbiAgICBjb25zdCB7ZGF0ZXMsIHJhbmdlcGlja2VyfSA9IHRoaXMucGlja2VyLmRhdGVwaWNrZXI7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGVzLnJlZHVjZSgoeWVhcnMsIHRpbWVWYWx1ZSkgPT4ge1xuICAgICAgcmV0dXJuICgwLHV0aWxzLyogcHVzaFVuaXF1ZSAqLy4kQykoeWVhcnMsICgwLGxpYl9kYXRlLyogc3RhcnRPZlllYXJQZXJpb2QgKi8uYWspKHRpbWVWYWx1ZSwgdGhpcy5zdGVwKSk7XG4gICAgfSwgW10pO1xuICAgIGlmIChyYW5nZXBpY2tlciAmJiByYW5nZXBpY2tlci5kYXRlcykge1xuICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlcGlja2VyLmRhdGVzLm1hcCh0aW1lVmFsdWUgPT4ge1xuICAgICAgICBpZiAodGltZVZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gKDAsbGliX2RhdGUvKiBzdGFydE9mWWVhclBlcmlvZCAqLy5haykodGltZVZhbHVlLCB0aGlzLnN0ZXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIGVudGlyZSB2aWV3IFVJXG4gIHJlbmRlcigpIHtcbiAgICAvLyByZWZyZXNoIGRpc2FibGVkIHllYXJzIG9uIGV2ZXJ5IHJlbmRlciBpbiBvcmRlciB0byBjbGVhciB0aGUgb25lcyBhZGRlZFxuICAgIC8vIGJ5IGJlZm9yZVNob3cgaG9vayBhdCBwcmV2aW91cyByZW5kZXJcbiAgICB0aGlzLmRpc2FibGVkID0gW107XG5cbiAgICB0aGlzLnBpY2tlci5zZXRWaWV3U3dpdGNoTGFiZWwoYCR7dGhpcy5maXJzdH0tJHt0aGlzLmxhc3R9YCk7XG4gICAgdGhpcy5waWNrZXIuc2V0UHJldkJ0bkRpc2FibGVkKHRoaXMuZmlyc3QgPD0gdGhpcy5taW5ZZWFyKTtcbiAgICB0aGlzLnBpY2tlci5zZXROZXh0QnRuRGlzYWJsZWQodGhpcy5sYXN0ID49IHRoaXMubWF4WWVhcik7XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5zdGFydCArIChpbmRleCAqIHRoaXMuc3RlcCk7XG4gICAgICBjb25zdCBkYXRlID0gKDAsbGliX2RhdGUvKiBkYXRlVmFsdWUgKi8uYnkpKGN1cnJlbnQsIDAsIDEpO1xuXG4gICAgICBlbC5jbGFzc05hbWUgPSBgZGF0ZXBpY2tlci1jZWxsIGhvdmVyOmJnLWdyYXktMTAwIGRhcms6aG92ZXI6YmctZ3JheS02MDAgYmxvY2sgZmxleC0xIGxlYWRpbmctOSBib3JkZXItMCByb3VuZGVkLWxnIGN1cnNvci1wb2ludGVyIHRleHQtY2VudGVyIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbSAke3RoaXMuY2VsbENsYXNzfWA7XG4gICAgICBpZiAodGhpcy5pc01pblZpZXcpIHtcbiAgICAgICAgZWwuZGF0YXNldC5kYXRlID0gZGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsLnRleHRDb250ZW50ID0gZWwuZGF0YXNldC55ZWFyID0gY3VycmVudDtcblxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDExKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ25leHQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50IDwgdGhpcy5taW5ZZWFyIHx8IGN1cnJlbnQgPiB0aGlzLm1heFllYXIpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSB0aGlzLnJhbmdlO1xuICAgICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJywgJ2JnLWJsdWUtNzAwJywgJ3RleHQtd2hpdGUnLCAnZGFyazpiZy1ibHVlLTYwMCcsICdkYXJrOnRleHQtd2hpdGUnKTtcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1ncmF5LTkwMCcsICdob3ZlcjpiZy1ncmF5LTEwMCcsICdkYXJrOnRleHQtd2hpdGUnLCAnZGFyazpob3ZlcjpiZy1ncmF5LTYwMCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZm9yZVNob3cpIHtcbiAgICAgICAgdGhpcy5wZXJmb3JtQmVmb3JlSG9vayhlbCwgY3VycmVudCwgZGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZXMgb2Ygc2VsZWN0ZWQgYW5kIGZvY3VzZWQgaXRlbXNcbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gdGhpcy5yYW5nZSB8fCBbXTtcbiAgICB0aGlzLmdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2UsIC5yYW5nZS1zdGFydCwgLnJhbmdlLWVuZCwgLnNlbGVjdGVkLCAuZm9jdXNlZCcpXG4gICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2UnLCAncmFuZ2Utc3RhcnQnLCAncmFuZ2UtZW5kJywgJ3NlbGVjdGVkJywgJ2JnLWJsdWUtNzAwJywgJ3RleHQtd2hpdGUnLCAnZGFyazpiZy1ibHVlLTYwMCcsICdkYXJrOnRleHQtd2hpdGUnLCAnZm9jdXNlZCcpO1xuICAgICAgfSk7XG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gTnVtYmVyKGVsLnRleHRDb250ZW50KTtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGlmIChjdXJyZW50ID4gcmFuZ2VTdGFydCAmJiBjdXJyZW50IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcsICdiZy1ibHVlLTcwMCcsICd0ZXh0LXdoaXRlJywgJ2Rhcms6YmctYmx1ZS02MDAnLCAnZGFyazp0ZXh0LXdoaXRlJyk7XG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZ3JheS05MDAnLCAnaG92ZXI6YmctZ3JheS0xMDAnLCAnZGFyazp0ZXh0LXdoaXRlJywgJ2Rhcms6aG92ZXI6YmctZ3JheS02MDAnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2Ugb2YgZm9jdXNlZCBpdGVtXG4gIHJlZnJlc2hGb2N1cygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGgucm91bmQoKHRoaXMuZm9jdXNlZCAtIHRoaXMuc3RhcnQpIC8gdGhpcy5zdGVwKTtcbiAgICB0aGlzLmdyaWQucXVlcnlTZWxlY3RvckFsbCgnLmZvY3VzZWQnKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXNlZCcpO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JpZC5jaGlsZHJlbltpbmRleF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICB9XG59XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL2V2ZW50cy9mdW5jdGlvbnMuanNcblxuXG5cbmZ1bmN0aW9uIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQoZGF0ZXBpY2tlciwgdHlwZSkge1xuICBjb25zdCBkZXRhaWwgPSB7XG4gICAgZGF0ZTogZGF0ZXBpY2tlci5nZXREYXRlKCksXG4gICAgdmlld0RhdGU6IG5ldyBEYXRlKGRhdGVwaWNrZXIucGlja2VyLnZpZXdEYXRlKSxcbiAgICB2aWV3SWQ6IGRhdGVwaWNrZXIucGlja2VyLmN1cnJlbnRWaWV3LmlkLFxuICAgIGRhdGVwaWNrZXIsXG4gIH07XG4gIGRhdGVwaWNrZXIuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCh0eXBlLCB7ZGV0YWlsfSkpO1xufVxuXG4vLyBkaXJlY3Rpb246IC0xICh0byBwcmV2aW91cyksIDEgKHRvIG5leHQpXG5mdW5jdGlvbiBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCBkaXJlY3Rpb24pIHtcbiAgY29uc3Qge21pbkRhdGUsIG1heERhdGV9ID0gZGF0ZXBpY2tlci5jb25maWc7XG4gIGNvbnN0IHtjdXJyZW50Vmlldywgdmlld0RhdGV9ID0gZGF0ZXBpY2tlci5waWNrZXI7XG4gIGxldCBuZXdWaWV3RGF0ZTtcbiAgc3dpdGNoIChjdXJyZW50Vmlldy5pZCkge1xuICAgIGNhc2UgMDpcbiAgICAgIG5ld1ZpZXdEYXRlID0gKDAsbGliX2RhdGUvKiBhZGRNb250aHMgKi8uekkpKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgbmV3Vmlld0RhdGUgPSAoMCxsaWJfZGF0ZS8qIGFkZFllYXJzICovLkJjKSh2aWV3RGF0ZSwgZGlyZWN0aW9uKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBuZXdWaWV3RGF0ZSA9ICgwLGxpYl9kYXRlLyogYWRkWWVhcnMgKi8uQmMpKHZpZXdEYXRlLCBkaXJlY3Rpb24gKiBjdXJyZW50Vmlldy5uYXZTdGVwKTtcbiAgfVxuICBuZXdWaWV3RGF0ZSA9ICgwLHV0aWxzLyogbGltaXRUb1JhbmdlICovLmpHKShuZXdWaWV3RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGRhdGVwaWNrZXIucGlja2VyLmNoYW5nZUZvY3VzKG5ld1ZpZXdEYXRlKS5yZW5kZXIoKTtcbn1cblxuZnVuY3Rpb24gc3dpdGNoVmlldyhkYXRlcGlja2VyKSB7XG4gIGNvbnN0IHZpZXdJZCA9IGRhdGVwaWNrZXIucGlja2VyLmN1cnJlbnRWaWV3LmlkO1xuICBpZiAodmlld0lkID09PSBkYXRlcGlja2VyLmNvbmZpZy5tYXhWaWV3KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRhdGVwaWNrZXIucGlja2VyLmNoYW5nZVZpZXcodmlld0lkICsgMSkucmVuZGVyKCk7XG59XG5cbmZ1bmN0aW9uIHVuZm9jdXMoZGF0ZXBpY2tlcikge1xuICBpZiAoZGF0ZXBpY2tlci5jb25maWcudXBkYXRlT25CbHVyKSB7XG4gICAgZGF0ZXBpY2tlci51cGRhdGUoe2F1dG9oaWRlOiB0cnVlfSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0ZXBpY2tlci5yZWZyZXNoKCdpbnB1dCcpO1xuICAgIGRhdGVwaWNrZXIuaGlkZSgpO1xuICB9XG59XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL2V2ZW50cy9waWNrZXJMaXN0ZW5lcnMuanNcblxuXG5cblxuZnVuY3Rpb24gZ29Ub1NlbGVjdGVkTW9udGhPclllYXIoZGF0ZXBpY2tlciwgc2VsZWN0aW9uKSB7XG4gIGNvbnN0IHBpY2tlciA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBjb25zdCB2aWV3RGF0ZSA9IG5ldyBEYXRlKHBpY2tlci52aWV3RGF0ZSk7XG4gIGNvbnN0IHZpZXdJZCA9IHBpY2tlci5jdXJyZW50Vmlldy5pZDtcbiAgY29uc3QgbmV3RGF0ZSA9IHZpZXdJZCA9PT0gMVxuICAgID8gKDAsbGliX2RhdGUvKiBhZGRNb250aHMgKi8uekkpKHZpZXdEYXRlLCBzZWxlY3Rpb24gLSB2aWV3RGF0ZS5nZXRNb250aCgpKVxuICAgIDogKDAsbGliX2RhdGUvKiBhZGRZZWFycyAqLy5CYykodmlld0RhdGUsIHNlbGVjdGlvbiAtIHZpZXdEYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gIHBpY2tlci5jaGFuZ2VGb2N1cyhuZXdEYXRlKS5jaGFuZ2VWaWV3KHZpZXdJZCAtIDEpLnJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBvbkNsaWNrVG9kYXlCdG4oZGF0ZXBpY2tlcikge1xuICBjb25zdCBwaWNrZXIgPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgY29uc3QgY3VycmVudERhdGUgPSAoMCxsaWJfZGF0ZS8qIHRvZGF5ICovLkxnKSgpO1xuICBpZiAoZGF0ZXBpY2tlci5jb25maWcudG9kYXlCdG5Nb2RlID09PSAxKSB7XG4gICAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLmF1dG9oaWRlKSB7XG4gICAgICBkYXRlcGlja2VyLnNldERhdGUoY3VycmVudERhdGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRlcGlja2VyLnNldERhdGUoY3VycmVudERhdGUsIHtyZW5kZXI6IGZhbHNlfSk7XG4gICAgcGlja2VyLnVwZGF0ZSgpO1xuICB9XG4gIGlmIChwaWNrZXIudmlld0RhdGUgIT09IGN1cnJlbnREYXRlKSB7XG4gICAgcGlja2VyLmNoYW5nZUZvY3VzKGN1cnJlbnREYXRlKTtcbiAgfVxuICBwaWNrZXIuY2hhbmdlVmlldygwKS5yZW5kZXIoKTtcbn1cblxuZnVuY3Rpb24gb25DbGlja0NsZWFyQnRuKGRhdGVwaWNrZXIpIHtcbiAgZGF0ZXBpY2tlci5zZXREYXRlKHtjbGVhcjogdHJ1ZX0pO1xufVxuXG5mdW5jdGlvbiBvbkNsaWNrVmlld1N3aXRjaChkYXRlcGlja2VyKSB7XG4gIHN3aXRjaFZpZXcoZGF0ZXBpY2tlcik7XG59XG5cbmZ1bmN0aW9uIG9uQ2xpY2tQcmV2QnRuKGRhdGVwaWNrZXIpIHtcbiAgZ29Ub1ByZXZPck5leHQoZGF0ZXBpY2tlciwgLTEpO1xufVxuXG5mdW5jdGlvbiBvbkNsaWNrTmV4dEJ0bihkYXRlcGlja2VyKSB7XG4gIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIDEpO1xufVxuXG4vLyBGb3IgdGhlIHBpY2tlcidzIG1haW4gYmxvY2sgdG8gZGVsZWdldGUgdGhlIGV2ZW50cyBmcm9tIGBkYXRlcGlja2VyLWNlbGxgc1xuZnVuY3Rpb24gb25DbGlja1ZpZXcoZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3QgdGFyZ2V0ID0gKDAsbGliX2V2ZW50LyogZmluZEVsZW1lbnRJbkV2ZW50UGF0aCAqLy5IZSkoZXYsICcuZGF0ZXBpY2tlci1jZWxsJyk7XG4gIGlmICghdGFyZ2V0IHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7aWQsIGlzTWluVmlld30gPSBkYXRlcGlja2VyLnBpY2tlci5jdXJyZW50VmlldztcbiAgaWYgKGlzTWluVmlldykge1xuICAgIGRhdGVwaWNrZXIuc2V0RGF0ZShOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZGF0ZSkpO1xuICB9IGVsc2UgaWYgKGlkID09PSAxKSB7XG4gICAgZ29Ub1NlbGVjdGVkTW9udGhPclllYXIoZGF0ZXBpY2tlciwgTnVtYmVyKHRhcmdldC5kYXRhc2V0Lm1vbnRoKSk7XG4gIH0gZWxzZSB7XG4gICAgZ29Ub1NlbGVjdGVkTW9udGhPclllYXIoZGF0ZXBpY2tlciwgTnVtYmVyKHRhcmdldC5kYXRhc2V0LnllYXIpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkNsaWNrUGlja2VyKGRhdGVwaWNrZXIpIHtcbiAgaWYgKCFkYXRlcGlja2VyLmlubGluZSAmJiAhZGF0ZXBpY2tlci5jb25maWcuZGlzYWJsZVRvdWNoS2V5Ym9hcmQpIHtcbiAgICBkYXRlcGlja2VyLmlucHV0RmllbGQuZm9jdXMoKTtcbiAgfVxufVxuXG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9waWNrZXIvUGlja2VyLmpzXG5cblxuXG5cblxuXG5cblxuXG5cblxuZnVuY3Rpb24gcHJvY2Vzc1BpY2tlck9wdGlvbnMocGlja2VyLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3B0aW9ucy50aXRsZSkge1xuICAgICAgcGlja2VyLmNvbnRyb2xzLnRpdGxlLnRleHRDb250ZW50ID0gb3B0aW9ucy50aXRsZTtcbiAgICAgIHNob3dFbGVtZW50KHBpY2tlci5jb250cm9scy50aXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpY2tlci5jb250cm9scy50aXRsZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgaGlkZUVsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRpdGxlKTtcbiAgICB9XG4gIH1cbiAgaWYgKG9wdGlvbnMucHJldkFycm93KSB7XG4gICAgY29uc3QgcHJldkJ0biA9IHBpY2tlci5jb250cm9scy5wcmV2QnRuO1xuICAgIGVtcHR5Q2hpbGROb2RlcyhwcmV2QnRuKTtcbiAgICBvcHRpb25zLnByZXZBcnJvdy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBwcmV2QnRuLmFwcGVuZENoaWxkKG5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuICBpZiAob3B0aW9ucy5uZXh0QXJyb3cpIHtcbiAgICBjb25zdCBuZXh0QnRuID0gcGlja2VyLmNvbnRyb2xzLm5leHRCdG47XG4gICAgZW1wdHlDaGlsZE5vZGVzKG5leHRCdG4pO1xuICAgIG9wdGlvbnMubmV4dEFycm93LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5leHRCdG4uYXBwZW5kQ2hpbGQobm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH0pO1xuICB9XG4gIGlmIChvcHRpb25zLmxvY2FsZSkge1xuICAgIHBpY2tlci5jb250cm9scy50b2RheUJ0bi50ZXh0Q29udGVudCA9IG9wdGlvbnMubG9jYWxlLnRvZGF5O1xuICAgIHBpY2tlci5jb250cm9scy5jbGVhckJ0bi50ZXh0Q29udGVudCA9IG9wdGlvbnMubG9jYWxlLmNsZWFyO1xuICB9XG4gIGlmIChvcHRpb25zLnRvZGF5QnRuICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3B0aW9ucy50b2RheUJ0bikge1xuICAgICAgc2hvd0VsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRvZGF5QnRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUVsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRvZGF5QnRuKTtcbiAgICB9XG4gIH1cbiAgaWYgKCgwLHV0aWxzLyogaGFzUHJvcGVydHkgKi8ubCQpKG9wdGlvbnMsICdtaW5EYXRlJykgfHwgKDAsdXRpbHMvKiBoYXNQcm9wZXJ0eSAqLy5sJCkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlfSA9IHBpY2tlci5kYXRlcGlja2VyLmNvbmZpZztcbiAgICBwaWNrZXIuY29udHJvbHMudG9kYXlCdG4uZGlzYWJsZWQgPSAhKDAsdXRpbHMvKiBpc0luUmFuZ2UgKi8ubWgpKCgwLGxpYl9kYXRlLyogdG9kYXkgKi8uTGcpKCksIG1pbkRhdGUsIG1heERhdGUpO1xuICB9XG4gIGlmIChvcHRpb25zLmNsZWFyQnRuICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3B0aW9ucy5jbGVhckJ0bikge1xuICAgICAgc2hvd0VsZW1lbnQocGlja2VyLmNvbnRyb2xzLmNsZWFyQnRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUVsZW1lbnQocGlja2VyLmNvbnRyb2xzLmNsZWFyQnRuKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gQ29tcHV0ZSB2aWV3IGRhdGUgdG8gcmVzZXQsIHdoaWNoIHdpbGwgYmUuLi5cbi8vIC0gdGhlIGxhc3QgaXRlbSBvZiB0aGUgc2VsZWN0ZWQgZGF0ZXMgb3IgZGVmYXVsdFZpZXdEYXRlIGlmIG5vIHNlbGVjdGlvblxuLy8gLSBsaW1pdHRlZCB0byBtaW5EYXRlIG9yIG1heERhdGUgaWYgaXQgZXhjZWVkcyB0aGUgcmFuZ2VcbmZ1bmN0aW9uIGNvbXB1dGVSZXNldFZpZXdEYXRlKGRhdGVwaWNrZXIpIHtcbiAgY29uc3Qge2RhdGVzLCBjb25maWd9ID0gZGF0ZXBpY2tlcjtcbiAgY29uc3Qgdmlld0RhdGUgPSBkYXRlcy5sZW5ndGggPiAwID8gKDAsdXRpbHMvKiBsYXN0SXRlbU9mICovLkptKShkYXRlcykgOiBjb25maWcuZGVmYXVsdFZpZXdEYXRlO1xuICByZXR1cm4gKDAsdXRpbHMvKiBsaW1pdFRvUmFuZ2UgKi8uakcpKHZpZXdEYXRlLCBjb25maWcubWluRGF0ZSwgY29uZmlnLm1heERhdGUpO1xufVxuXG4vLyBDaGFuZ2UgY3VycmVudCB2aWV3J3MgdmlldyBkYXRlXG5mdW5jdGlvbiBzZXRWaWV3RGF0ZShwaWNrZXIsIG5ld0RhdGUpIHtcbiAgY29uc3Qgb2xkVmlld0RhdGUgPSBuZXcgRGF0ZShwaWNrZXIudmlld0RhdGUpO1xuICBjb25zdCBuZXdWaWV3RGF0ZSA9IG5ldyBEYXRlKG5ld0RhdGUpO1xuICBjb25zdCB7aWQsIHllYXIsIGZpcnN0LCBsYXN0fSA9IHBpY2tlci5jdXJyZW50VmlldztcbiAgY29uc3Qgdmlld1llYXIgPSBuZXdWaWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIHBpY2tlci52aWV3RGF0ZSA9IG5ld0RhdGU7XG4gIGlmICh2aWV3WWVhciAhPT0gb2xkVmlld0RhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQocGlja2VyLmRhdGVwaWNrZXIsICdjaGFuZ2VZZWFyJyk7XG4gIH1cbiAgaWYgKG5ld1ZpZXdEYXRlLmdldE1vbnRoKCkgIT09IG9sZFZpZXdEYXRlLmdldE1vbnRoKCkpIHtcbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KHBpY2tlci5kYXRlcGlja2VyLCAnY2hhbmdlTW9udGgnKTtcbiAgfVxuXG4gIC8vIHJldHVybiB3aGV0aGVyIHRoZSBuZXcgZGF0ZSBpcyBpbiBkaWZmZXJlbnQgcGVyaW9kIG9uIHRpbWUgZnJvbSB0aGUgb25lXG4gIC8vIGRpc3BsYXllZCBpbiB0aGUgY3VycmVudCB2aWV3XG4gIC8vIHdoZW4gdHJ1ZSwgdGhlIHZpZXcgbmVlZHMgdG8gYmUgcmUtcmVuZGVyZWQgb24gdGhlIG5leHQgVUkgcmVmcmVzaC5cbiAgc3dpdGNoIChpZCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBuZXdEYXRlIDwgZmlyc3QgfHwgbmV3RGF0ZSA+IGxhc3Q7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHZpZXdZZWFyICE9PSB5ZWFyO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmlld1llYXIgPCBmaXJzdCB8fCB2aWV3WWVhciA+IGxhc3Q7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGV4dERpcmVjdGlvbihlbCkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmRpcmVjdGlvbjtcbn1cblxuLy8gQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBwaWNrZXIgVUlcbmNsYXNzIFBpY2tlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGVwaWNrZXIpIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIgPSBkYXRlcGlja2VyO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNfcGlja2VyVGVtcGxhdGUucmVwbGFjZSgvJWJ1dHRvbkNsYXNzJS9nLCBkYXRlcGlja2VyLmNvbmZpZy5idXR0b25DbGFzcyk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudCA9IHBhcnNlSFRNTCh0ZW1wbGF0ZSkuZmlyc3RDaGlsZDtcbiAgICBjb25zdCBbaGVhZGVyLCBtYWluLCBmb290ZXJdID0gZWxlbWVudC5maXJzdENoaWxkLmNoaWxkcmVuO1xuICAgIGNvbnN0IHRpdGxlID0gaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IFtwcmV2QnRuLCB2aWV3U3dpdGNoLCBuZXh0QnRuXSA9IGhlYWRlci5sYXN0RWxlbWVudENoaWxkLmNoaWxkcmVuO1xuICAgIGNvbnN0IFt0b2RheUJ0biwgY2xlYXJCdG5dID0gZm9vdGVyLmZpcnN0Q2hpbGQuY2hpbGRyZW47XG4gICAgY29uc3QgY29udHJvbHMgPSB7XG4gICAgICB0aXRsZSxcbiAgICAgIHByZXZCdG4sXG4gICAgICB2aWV3U3dpdGNoLFxuICAgICAgbmV4dEJ0bixcbiAgICAgIHRvZGF5QnRuLFxuICAgICAgY2xlYXJCdG4sXG4gICAgfTtcbiAgICB0aGlzLm1haW4gPSBtYWluO1xuICAgIHRoaXMuY29udHJvbHMgPSBjb250cm9scztcblxuICAgIGNvbnN0IGVsZW1lbnRDbGFzcyA9IGRhdGVwaWNrZXIuaW5saW5lID8gJ2lubGluZScgOiAnZHJvcGRvd24nO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChgZGF0ZXBpY2tlci0ke2VsZW1lbnRDbGFzc31gKTtcbiAgICBlbGVtZW50Q2xhc3MgPT09ICdkcm9wZG93bicgPyBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJywgJ2Fic29sdXRlJywgJ3RvcC0wJywgJ2xlZnQtMCcsICd6LTUwJywgJ3B0LTInKSA6IG51bGw7XG5cbiAgICBwcm9jZXNzUGlja2VyT3B0aW9ucyh0aGlzLCBkYXRlcGlja2VyLmNvbmZpZyk7XG4gICAgdGhpcy52aWV3RGF0ZSA9IGNvbXB1dGVSZXNldFZpZXdEYXRlKGRhdGVwaWNrZXIpO1xuXG4gICAgLy8gc2V0IHVwIGV2ZW50IGxpc3RlbmVyc1xuICAgICgwLGxpYl9ldmVudC8qIHJlZ2lzdGVyTGlzdGVuZXJzICovLmNGKShkYXRlcGlja2VyLCBbXG4gICAgICBbZWxlbWVudCwgJ2NsaWNrJywgb25DbGlja1BpY2tlci5iaW5kKG51bGwsIGRhdGVwaWNrZXIpLCB7Y2FwdHVyZTogdHJ1ZX1dLFxuICAgICAgW21haW4sICdjbGljaycsIG9uQ2xpY2tWaWV3LmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLnZpZXdTd2l0Y2gsICdjbGljaycsIG9uQ2xpY2tWaWV3U3dpdGNoLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLnByZXZCdG4sICdjbGljaycsIG9uQ2xpY2tQcmV2QnRuLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLm5leHRCdG4sICdjbGljaycsIG9uQ2xpY2tOZXh0QnRuLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLnRvZGF5QnRuLCAnY2xpY2snLCBvbkNsaWNrVG9kYXlCdG4uYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgICBbY29udHJvbHMuY2xlYXJCdG4sICdjbGljaycsIG9uQ2xpY2tDbGVhckJ0bi5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICBdKTtcblxuICAgIC8vIHNldCB1cCB2aWV3c1xuICAgIHRoaXMudmlld3MgPSBbXG4gICAgICBuZXcgRGF5c1ZpZXcodGhpcyksXG4gICAgICBuZXcgTW9udGhzVmlldyh0aGlzKSxcbiAgICAgIG5ldyBZZWFyc1ZpZXcodGhpcywge2lkOiAyLCBuYW1lOiAneWVhcnMnLCBjZWxsQ2xhc3M6ICd5ZWFyJywgc3RlcDogMX0pLFxuICAgICAgbmV3IFllYXJzVmlldyh0aGlzLCB7aWQ6IDMsIG5hbWU6ICdkZWNhZGVzJywgY2VsbENsYXNzOiAnZGVjYWRlJywgc3RlcDogMTB9KSxcbiAgICBdO1xuICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLnZpZXdzW2RhdGVwaWNrZXIuY29uZmlnLnN0YXJ0Vmlld107XG5cbiAgICB0aGlzLmN1cnJlbnRWaWV3LnJlbmRlcigpO1xuICAgIHRoaXMubWFpbi5hcHBlbmRDaGlsZCh0aGlzLmN1cnJlbnRWaWV3LmVsZW1lbnQpO1xuICAgIGRhdGVwaWNrZXIuY29uZmlnLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcHJvY2Vzc1BpY2tlck9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gICAgICB2aWV3LmluaXQob3B0aW9ucywgZmFsc2UpO1xuICAgIH0pO1xuICAgIHRoaXMuY3VycmVudFZpZXcucmVuZGVyKCk7XG4gIH1cblxuICBkZXRhY2goKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLmNvbmZpZy5jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnLCAnYmxvY2snKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgY29uc3QgZGF0ZXBpY2tlciA9IHRoaXMuZGF0ZXBpY2tlcjtcbiAgICBpZiAoIWRhdGVwaWNrZXIuaW5saW5lKSB7XG4gICAgICAvLyBlbnN1cmUgcGlja2VyJ3MgZGlyZWN0aW9uIG1hdGNoZXMgaW5wdXQnc1xuICAgICAgY29uc3QgaW5wdXREaXJlY3Rpb24gPSBnZXRUZXh0RGlyZWN0aW9uKGRhdGVwaWNrZXIuaW5wdXRGaWVsZCk7XG4gICAgICBpZiAoaW5wdXREaXJlY3Rpb24gIT09IGdldFRleHREaXJlY3Rpb24oZGF0ZXBpY2tlci5jb25maWcuY29udGFpbmVyKSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuZGlyID0gaW5wdXREaXJlY3Rpb247XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZWxlbWVudC5kaXIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlyJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGxhY2UoKTtcbiAgICAgIGlmIChkYXRlcGlja2VyLmNvbmZpZy5kaXNhYmxlVG91Y2hLZXlib2FyZCkge1xuICAgICAgICBkYXRlcGlja2VyLmlucHV0RmllbGQuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KGRhdGVwaWNrZXIsICdzaG93Jyk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kYXRlcGlja2VyLmV4aXRFZGl0TW9kZSgpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnYmxvY2snKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJywgJ2Jsb2NrJywgJ2hpZGRlbicpO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudCh0aGlzLmRhdGVwaWNrZXIsICdoaWRlJyk7XG4gIH1cblxuICBwbGFjZSgpIHtcbiAgICBjb25zdCB7Y2xhc3NMaXN0LCBzdHlsZX0gPSB0aGlzLmVsZW1lbnQ7XG4gICAgY29uc3Qge2NvbmZpZywgaW5wdXRGaWVsZH0gPSB0aGlzLmRhdGVwaWNrZXI7XG4gICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcbiAgICBjb25zdCB7XG4gICAgICB3aWR0aDogY2FsZW5kYXJXaWR0aCxcbiAgICAgIGhlaWdodDogY2FsZW5kYXJIZWlnaHQsXG4gICAgfSA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7XG4gICAgICBsZWZ0OiBjb250YWluZXJMZWZ0LFxuICAgICAgdG9wOiBjb250YWluZXJUb3AsXG4gICAgICB3aWR0aDogY29udGFpbmVyV2lkdGgsXG4gICAgfSA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7XG4gICAgICBsZWZ0OiBpbnB1dExlZnQsXG4gICAgICB0b3A6IGlucHV0VG9wLFxuICAgICAgd2lkdGg6IGlucHV0V2lkdGgsXG4gICAgICBoZWlnaHQ6IGlucHV0SGVpZ2h0XG4gICAgfSA9IGlucHV0RmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IHt4OiBvcmllbnRYLCB5OiBvcmllbnRZfSA9IGNvbmZpZy5vcmllbnRhdGlvbjtcbiAgICBsZXQgc2Nyb2xsVG9wO1xuICAgIGxldCBsZWZ0O1xuICAgIGxldCB0b3A7XG5cbiAgICBpZiAoY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgIGxlZnQgPSBpbnB1dExlZnQgKyB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgIHRvcCA9IGlucHV0VG9wICsgc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xuICAgICAgbGVmdCA9IGlucHV0TGVmdCAtIGNvbnRhaW5lckxlZnQ7XG4gICAgICB0b3AgPSBpbnB1dFRvcCAtIGNvbnRhaW5lclRvcCArIHNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBpZiAob3JpZW50WCA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAobGVmdCA8IDApIHtcbiAgICAgICAgLy8gYWxpZ24gdG8gdGhlIGxlZnQgYW5kIG1vdmUgaW50byB2aXNpYmxlIGFyZWEgaWYgaW5wdXQncyBsZWZ0IGVkZ2UgPCB3aW5kb3cnc1xuICAgICAgICBvcmllbnRYID0gJ2xlZnQnO1xuICAgICAgICBsZWZ0ID0gMTA7XG4gICAgICB9IGVsc2UgaWYgKGxlZnQgKyBjYWxlbmRhcldpZHRoID4gY29udGFpbmVyV2lkdGgpIHtcbiAgICAgICAgLy8gYWxpZ24gdG8gdGhlIHJpZ2h0IGlmIGNhbmxlbmRhcidzIHJpZ2h0IGVkZ2UgPiBjb250YWluZXInc1xuICAgICAgICBvcmllbnRYID0gJ3JpZ2h0JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yaWVudFggPSBnZXRUZXh0RGlyZWN0aW9uKGlucHV0RmllbGQpID09PSAncnRsJyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmllbnRYID09PSAncmlnaHQnKSB7XG4gICAgICBsZWZ0IC09IGNhbGVuZGFyV2lkdGggLSBpbnB1dFdpZHRoO1xuICAgIH1cblxuICAgIGlmIChvcmllbnRZID09PSAnYXV0bycpIHtcbiAgICAgIG9yaWVudFkgPSB0b3AgLSBjYWxlbmRhckhlaWdodCA8IHNjcm9sbFRvcCA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgfVxuICAgIGlmIChvcmllbnRZID09PSAndG9wJykge1xuICAgICAgdG9wIC09IGNhbGVuZGFySGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3AgKz0gaW5wdXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICdkYXRlcGlja2VyLW9yaWVudC10b3AnLFxuICAgICAgJ2RhdGVwaWNrZXItb3JpZW50LWJvdHRvbScsXG4gICAgICAnZGF0ZXBpY2tlci1vcmllbnQtcmlnaHQnLFxuICAgICAgJ2RhdGVwaWNrZXItb3JpZW50LWxlZnQnXG4gICAgKTtcbiAgICBjbGFzc0xpc3QuYWRkKGBkYXRlcGlja2VyLW9yaWVudC0ke29yaWVudFl9YCwgYGRhdGVwaWNrZXItb3JpZW50LSR7b3JpZW50WH1gKTtcblxuICAgIHN0eWxlLnRvcCA9IHRvcCA/IGAke3RvcH1weGAgOiB0b3A7XG4gICAgc3R5bGUubGVmdCA9IGxlZnQgPyBgJHtsZWZ0fXB4YCA6IGxlZnQ7XG4gIH1cblxuICBzZXRWaWV3U3dpdGNoTGFiZWwobGFiZWxUZXh0KSB7XG4gICAgdGhpcy5jb250cm9scy52aWV3U3dpdGNoLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xuICB9XG5cbiAgc2V0UHJldkJ0bkRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5jb250cm9scy5wcmV2QnRuLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBzZXROZXh0QnRuRGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmNvbnRyb2xzLm5leHRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIGNoYW5nZVZpZXcodmlld0lkKSB7XG4gICAgY29uc3Qgb2xkVmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgY29uc3QgbmV3VmlldyA9ICB0aGlzLnZpZXdzW3ZpZXdJZF07XG4gICAgaWYgKG5ld1ZpZXcuaWQgIT09IG9sZFZpZXcuaWQpIHtcbiAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBuZXdWaWV3O1xuICAgICAgdGhpcy5fcmVuZGVyTWV0aG9kID0gJ3JlbmRlcic7XG4gICAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KHRoaXMuZGF0ZXBpY2tlciwgJ2NoYW5nZVZpZXcnKTtcbiAgICAgIHRoaXMubWFpbi5yZXBsYWNlQ2hpbGQobmV3Vmlldy5lbGVtZW50LCBvbGRWaWV3LmVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIENoYW5nZSB0aGUgZm9jdXNlZCBkYXRlICh2aWV3IGRhdGUpXG4gIGNoYW5nZUZvY3VzKG5ld1ZpZXdEYXRlKSB7XG4gICAgdGhpcy5fcmVuZGVyTWV0aG9kID0gc2V0Vmlld0RhdGUodGhpcywgbmV3Vmlld0RhdGUpID8gJ3JlbmRlcicgOiAncmVmcmVzaEZvY3VzJztcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgIHZpZXcudXBkYXRlRm9jdXMoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEFwcGx5IHRoZSBjaGFuZ2Ugb2YgdGhlIHNlbGVjdGVkIGRhdGVzXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBuZXdWaWV3RGF0ZSA9IGNvbXB1dGVSZXNldFZpZXdEYXRlKHRoaXMuZGF0ZXBpY2tlcik7XG4gICAgdGhpcy5fcmVuZGVyTWV0aG9kID0gc2V0Vmlld0RhdGUodGhpcywgbmV3Vmlld0RhdGUpID8gJ3JlbmRlcicgOiAncmVmcmVzaCc7XG4gICAgdGhpcy52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gICAgICB2aWV3LnVwZGF0ZUZvY3VzKCk7XG4gICAgICB2aWV3LnVwZGF0ZVNlbGVjdGlvbigpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUmVmcmVzaCB0aGUgcGlja2VyIFVJXG4gIHJlbmRlcihxdWlja1JlbmRlciA9IHRydWUpIHtcbiAgICBjb25zdCByZW5kZXJNZXRob2QgPSAocXVpY2tSZW5kZXIgJiYgdGhpcy5fcmVuZGVyTWV0aG9kKSB8fCAncmVuZGVyJztcbiAgICBkZWxldGUgdGhpcy5fcmVuZGVyTWV0aG9kO1xuXG4gICAgdGhpcy5jdXJyZW50Vmlld1tyZW5kZXJNZXRob2RdKCk7XG4gIH1cbn1cblxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlLWRhdGVwaWNrZXIvanMvZXZlbnRzL2lucHV0RmllbGRMaXN0ZW5lcnMuanNcblxuXG5cblxuLy8gRmluZCB0aGUgY2xvc2VzdCBkYXRlIHRoYXQgZG9lc24ndCBtZWV0IHRoZSBjb25kaXRpb24gZm9yIHVuYXZhaWxhYmxlIGRhdGVcbi8vIFJldHVybnMgdW5kZWZpbmVkIGlmIG5vIGF2YWlsYWJsZSBkYXRlIGlzIGZvdW5kXG4vLyBhZGRGbjogZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBuZXh0IGRhdGVcbi8vICAgLSBhcmdzOiB0aW1lIHZhbHVlLCBhbW91bnRcbi8vIGluY3JlYXNlOiBhbW91bnQgdG8gcGFzcyB0byBhZGRGblxuLy8gdGVzdEZuOiBmdW5jdGlvbiB0byB0ZXN0IHRoZSB1bmF2YWlsYWJsaXR5IG9mIHRoZSBkYXRlXG4vLyAgIC0gYXJnczogdGltZSB2YWx1ZTsgcmV0dW46IHRydWUgaWYgdW5hdmFpbGFibGVcbmZ1bmN0aW9uIGZpbmROZXh0QXZhaWxhYmxlT25lKGRhdGUsIGFkZEZuLCBpbmNyZWFzZSwgdGVzdEZuLCBtaW4sIG1heCkge1xuICBpZiAoISgwLHV0aWxzLyogaXNJblJhbmdlICovLm1oKShkYXRlLCBtaW4sIG1heCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHRlc3RGbihkYXRlKSkge1xuICAgIGNvbnN0IG5ld0RhdGUgPSBhZGRGbihkYXRlLCBpbmNyZWFzZSk7XG4gICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlT25lKG5ld0RhdGUsIGFkZEZuLCBpbmNyZWFzZSwgdGVzdEZuLCBtaW4sIG1heCk7XG4gIH1cbiAgcmV0dXJuIGRhdGU7XG59XG5cbi8vIGRpcmVjdGlvbjogLTEgKGxlZnQvdXApLCAxIChyaWdodC9kb3duKVxuLy8gdmVydGljYWw6IHRydWUgZm9yIHVwL2Rvd24sIGZhbHNlIGZvciBsZWZ0L3JpZ2h0XG5mdW5jdGlvbiBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgZGlyZWN0aW9uLCB2ZXJ0aWNhbCkge1xuICBjb25zdCBwaWNrZXIgPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgY29uc3QgY3VycmVudFZpZXcgPSBwaWNrZXIuY3VycmVudFZpZXc7XG4gIGNvbnN0IHN0ZXAgPSBjdXJyZW50Vmlldy5zdGVwIHx8IDE7XG4gIGxldCB2aWV3RGF0ZSA9IHBpY2tlci52aWV3RGF0ZTtcbiAgbGV0IGFkZEZuO1xuICBsZXQgdGVzdEZuO1xuICBzd2l0Y2ggKGN1cnJlbnRWaWV3LmlkKSB7XG4gICAgY2FzZSAwOlxuICAgICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICAgIHZpZXdEYXRlID0gKDAsbGliX2RhdGUvKiBhZGREYXlzICovLkU0KSh2aWV3RGF0ZSwgZGlyZWN0aW9uICogNyk7XG4gICAgICB9IGVsc2UgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICB2aWV3RGF0ZSA9ICgwLGxpYl9kYXRlLyogYWRkWWVhcnMgKi8uQmMpKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlld0RhdGUgPSAoMCxsaWJfZGF0ZS8qIGFkZERheXMgKi8uRTQpKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgfVxuICAgICAgYWRkRm4gPSBsaWJfZGF0ZS8qIGFkZERheXMgKi8uRTQ7XG4gICAgICB0ZXN0Rm4gPSAoZGF0ZSkgPT4gY3VycmVudFZpZXcuZGlzYWJsZWQuaW5jbHVkZXMoZGF0ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICB2aWV3RGF0ZSA9ICgwLGxpYl9kYXRlLyogYWRkTW9udGhzICovLnpJKSh2aWV3RGF0ZSwgdmVydGljYWwgPyBkaXJlY3Rpb24gKiA0IDogZGlyZWN0aW9uKTtcbiAgICAgIGFkZEZuID0gbGliX2RhdGUvKiBhZGRNb250aHMgKi8uekk7XG4gICAgICB0ZXN0Rm4gPSAoZGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBjb25zdCB7eWVhciwgZGlzYWJsZWR9ID0gY3VycmVudFZpZXc7XG4gICAgICAgIHJldHVybiBkdC5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmIGRpc2FibGVkLmluY2x1ZGVzKGR0LmdldE1vbnRoKCkpO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2aWV3RGF0ZSA9ICgwLGxpYl9kYXRlLyogYWRkWWVhcnMgKi8uQmMpKHZpZXdEYXRlLCBkaXJlY3Rpb24gKiAodmVydGljYWwgPyA0IDogMSkgKiBzdGVwKTtcbiAgICAgIGFkZEZuID0gbGliX2RhdGUvKiBhZGRZZWFycyAqLy5CYztcbiAgICAgIHRlc3RGbiA9IGRhdGUgPT4gY3VycmVudFZpZXcuZGlzYWJsZWQuaW5jbHVkZXMoKDAsbGliX2RhdGUvKiBzdGFydE9mWWVhclBlcmlvZCAqLy5haykoZGF0ZSwgc3RlcCkpO1xuICB9XG4gIHZpZXdEYXRlID0gZmluZE5leHRBdmFpbGFibGVPbmUoXG4gICAgdmlld0RhdGUsXG4gICAgYWRkRm4sXG4gICAgZGlyZWN0aW9uIDwgMCA/IC1zdGVwIDogc3RlcCxcbiAgICB0ZXN0Rm4sXG4gICAgY3VycmVudFZpZXcubWluRGF0ZSxcbiAgICBjdXJyZW50Vmlldy5tYXhEYXRlXG4gICk7XG4gIGlmICh2aWV3RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcGlja2VyLmNoYW5nZUZvY3VzKHZpZXdEYXRlKS5yZW5kZXIoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbktleWRvd24oZGF0ZXBpY2tlciwgZXYpIHtcbiAgaWYgKGV2LmtleSA9PT0gJ1RhYicpIHtcbiAgICB1bmZvY3VzKGRhdGVwaWNrZXIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHBpY2tlciA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBjb25zdCB7aWQsIGlzTWluVmlld30gPSBwaWNrZXIuY3VycmVudFZpZXc7XG4gIGlmICghcGlja2VyLmFjdGl2ZSkge1xuICAgIHN3aXRjaCAoZXYua2V5KSB7XG4gICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgcGlja2VyLnNob3coKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGRhdGVwaWNrZXIudXBkYXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRlcGlja2VyLmVkaXRNb2RlKSB7XG4gICAgc3dpdGNoIChldi5rZXkpIHtcbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIHBpY2tlci5oaWRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBkYXRlcGlja2VyLmV4aXRFZGl0TW9kZSh7dXBkYXRlOiB0cnVlLCBhdXRvaGlkZTogZGF0ZXBpY2tlci5jb25maWcuYXV0b2hpZGV9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAoZXYua2V5KSB7XG4gICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICBwaWNrZXIuaGlkZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgIGlmIChldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpIHtcbiAgICAgICAgICBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCAtMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXYuc2hpZnRLZXkpIHtcbiAgICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIC0xLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICAgIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vdmVCeUFycm93S2V5KGRhdGVwaWNrZXIsIGV2LCAxLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICAgIHN3aXRjaFZpZXcoZGF0ZXBpY2tlcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZXYuc2hpZnRLZXkpIHtcbiAgICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIC0xLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGlmIChldi5zaGlmdEtleSAmJiAhZXYuY3RybEtleSAmJiAhZXYubWV0YUtleSkge1xuICAgICAgICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgMSwgdHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBpZiAoaXNNaW5WaWV3KSB7XG4gICAgICAgICAgZGF0ZXBpY2tlci5zZXREYXRlKHBpY2tlci52aWV3RGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGlja2VyLmNoYW5nZVZpZXcoaWQgLSAxKS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICBjYXNlICdEZWxldGUnOlxuICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGV2LmtleS5sZW5ndGggPT09IDEgJiYgIWV2LmN0cmxLZXkgJiYgIWV2Lm1ldGFLZXkpIHtcbiAgICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xufVxuXG5mdW5jdGlvbiBvbkZvY3VzKGRhdGVwaWNrZXIpIHtcbiAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLnNob3dPbkZvY3VzICYmICFkYXRlcGlja2VyLl9zaG93aW5nKSB7XG4gICAgZGF0ZXBpY2tlci5zaG93KCk7XG4gIH1cbn1cblxuLy8gZm9yIHRoZSBwcmV2ZW50aW9uIGZvciBlbnRlcmluZyBlZGl0IG1vZGUgd2hpbGUgZ2V0dGluZyBmb2N1cyBvbiBjbGlja1xuZnVuY3Rpb24gb25Nb3VzZWRvd24oZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3QgZWwgPSBldi50YXJnZXQ7XG4gIGlmIChkYXRlcGlja2VyLnBpY2tlci5hY3RpdmUgfHwgZGF0ZXBpY2tlci5jb25maWcuc2hvd09uQ2xpY2spIHtcbiAgICBlbC5fYWN0aXZlID0gZWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgZWwuX2NsaWNraW5nID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkZWxldGUgZWwuX2FjdGl2ZTtcbiAgICAgIGRlbGV0ZSBlbC5fY2xpY2tpbmc7XG4gICAgfSwgMjAwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25DbGlja0lucHV0KGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IGVsID0gZXYudGFyZ2V0O1xuICBpZiAoIWVsLl9jbGlja2luZykge1xuICAgIHJldHVybjtcbiAgfVxuICBjbGVhclRpbWVvdXQoZWwuX2NsaWNraW5nKTtcbiAgZGVsZXRlIGVsLl9jbGlja2luZztcblxuICBpZiAoZWwuX2FjdGl2ZSkge1xuICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICB9XG4gIGRlbGV0ZSBlbC5fYWN0aXZlO1xuXG4gIGlmIChkYXRlcGlja2VyLmNvbmZpZy5zaG93T25DbGljaykge1xuICAgIGRhdGVwaWNrZXIuc2hvdygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uUGFzdGUoZGF0ZXBpY2tlciwgZXYpIHtcbiAgaWYgKGV2LmNsaXBib2FyZERhdGEudHlwZXMuaW5jbHVkZXMoJ3RleHQvcGxhaW4nKSkge1xuICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICB9XG59XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS1kYXRlcGlja2VyL2pzL2V2ZW50cy9vdGhlckxpc3RlbmVycy5qc1xuXG5cblxuLy8gZm9yIHRoZSBgZG9jdW1lbnRgIHRvIGRlbGVnYXRlIHRoZSBldmVudHMgZnJvbSBvdXRzaWRlIHRoZSBwaWNrZXIvaW5wdXQgZmllbGRcbmZ1bmN0aW9uIG9uQ2xpY2tPdXRzaWRlKGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkYXRlcGlja2VyLmVsZW1lbnQ7XG4gIGlmIChlbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBpY2tlckVsZW0gPSBkYXRlcGlja2VyLnBpY2tlci5lbGVtZW50O1xuICBpZiAoKDAsbGliX2V2ZW50LyogZmluZEVsZW1lbnRJbkV2ZW50UGF0aCAqLy5IZSkoZXYsIGVsID0+IGVsID09PSBlbGVtZW50IHx8IGVsID09PSBwaWNrZXJFbGVtKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB1bmZvY3VzKGRhdGVwaWNrZXIpO1xufVxuXG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUtZGF0ZXBpY2tlci9qcy9EYXRlcGlja2VyLmpzXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5mdW5jdGlvbiBzdHJpbmdpZnlEYXRlcyhkYXRlcywgY29uZmlnKSB7XG4gIHJldHVybiBkYXRlc1xuICAgIC5tYXAoZHQgPT4gKDAsZGF0ZV9mb3JtYXQvKiBmb3JtYXREYXRlICovLnA2KShkdCwgY29uZmlnLmZvcm1hdCwgY29uZmlnLmxvY2FsZSkpXG4gICAgLmpvaW4oY29uZmlnLmRhdGVEZWxpbWl0ZXIpO1xufVxuXG4vLyBwYXJzZSBpbnB1dCBkYXRlcyBhbmQgY3JlYXRlIGFuIGFycmF5IG9mIHRpbWUgdmFsdWVzIGZvciBzZWxlY3Rpb25cbi8vIHJldHVybnMgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyB2YWxpZCBkYXRlcyBpbiBpbnB1dERhdGVzXG4vLyB3aGVuIG9yaWdEYXRlcyAoY3VycmVudCBzZWxlY3Rpb24pIGlzIHBhc3NlZCwgdGhlIGZ1bmN0aW9uIHdvcmtzIHRvIG1peFxuLy8gdGhlIGlucHV0IGRhdGVzIGludG8gdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5mdW5jdGlvbiBwcm9jZXNzSW5wdXREYXRlcyhkYXRlcGlja2VyLCBpbnB1dERhdGVzLCBjbGVhciA9IGZhbHNlKSB7XG4gIGNvbnN0IHtjb25maWcsIGRhdGVzOiBvcmlnRGF0ZXMsIHJhbmdlcGlja2VyfSA9IGRhdGVwaWNrZXI7XG4gIGlmIChpbnB1dERhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIGVtcHR5IGlucHV0IGlzIGNvbnNpZGVyZWQgdmFsaWQgdW5sZXNzIG9yaWdpRGF0ZXMgaXMgcGFzc2VkXG4gICAgcmV0dXJuIGNsZWFyID8gW10gOiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCByYW5nZUVuZCA9IHJhbmdlcGlja2VyICYmIGRhdGVwaWNrZXIgPT09IHJhbmdlcGlja2VyLmRhdGVwaWNrZXJzWzFdO1xuICBsZXQgbmV3RGF0ZXMgPSBpbnB1dERhdGVzLnJlZHVjZSgoZGF0ZXMsIGR0KSA9PiB7XG4gICAgbGV0IGRhdGUgPSAoMCxkYXRlX2Zvcm1hdC8qIHBhcnNlRGF0ZSAqLy5zRykoZHQsIGNvbmZpZy5mb3JtYXQsIGNvbmZpZy5sb2NhbGUpO1xuICAgIGlmIChkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBkYXRlcztcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5waWNrTGV2ZWwgPiAwKSB7XG4gICAgICAvLyBhZGp1c3QgdG8gMXN0IG9mIHRoZSBtb250aC9KYW4gMXN0IG9mIHRoZSB5ZWFyXG4gICAgICAvLyBvciB0byB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbmgvRGVjIDMxc3Qgb2YgdGhlIHllYXIgaWYgdGhlIGRhdGVwaWNrZXJcbiAgICAgIC8vIGlzIHRoZSByYW5nZS1lbmQgcGlja2VyIG9mIGEgcmFuZ2VwaWNrZXJcbiAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICBpZiAoY29uZmlnLnBpY2tMZXZlbCA9PT0gMSkge1xuICAgICAgICBkYXRlID0gcmFuZ2VFbmRcbiAgICAgICAgICA/IGR0LnNldE1vbnRoKGR0LmdldE1vbnRoKCkgKyAxLCAwKVxuICAgICAgICAgIDogZHQuc2V0RGF0ZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGUgPSByYW5nZUVuZFxuICAgICAgICAgID8gZHQuc2V0RnVsbFllYXIoZHQuZ2V0RnVsbFllYXIoKSArIDEsIDAsIDApXG4gICAgICAgICAgOiBkdC5zZXRNb250aCgwLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgKDAsdXRpbHMvKiBpc0luUmFuZ2UgKi8ubWgpKGRhdGUsIGNvbmZpZy5taW5EYXRlLCBjb25maWcubWF4RGF0ZSlcbiAgICAgICYmICFkYXRlcy5pbmNsdWRlcyhkYXRlKVxuICAgICAgJiYgIWNvbmZpZy5kYXRlc0Rpc2FibGVkLmluY2x1ZGVzKGRhdGUpXG4gICAgICAmJiAhY29uZmlnLmRheXNPZldlZWtEaXNhYmxlZC5pbmNsdWRlcyhuZXcgRGF0ZShkYXRlKS5nZXREYXkoKSlcbiAgICApIHtcbiAgICAgIGRhdGVzLnB1c2goZGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlcztcbiAgfSwgW10pO1xuICBpZiAobmV3RGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb25maWcubXVsdGlkYXRlICYmICFjbGVhcikge1xuICAgIC8vIGdldCB0aGUgc3lubWV0cmljIGRpZmZlcmVuY2UgYmV0d2VlbiBvcmlnRGF0ZXMgYW5kIG5ld0RhdGVzXG4gICAgbmV3RGF0ZXMgPSBuZXdEYXRlcy5yZWR1Y2UoKGRhdGVzLCBkYXRlKSA9PiB7XG4gICAgICBpZiAoIW9yaWdEYXRlcy5pbmNsdWRlcyhkYXRlKSkge1xuICAgICAgICBkYXRlcy5wdXNoKGRhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGVzO1xuICAgIH0sIG9yaWdEYXRlcy5maWx0ZXIoZGF0ZSA9PiAhbmV3RGF0ZXMuaW5jbHVkZXMoZGF0ZSkpKTtcbiAgfVxuICAvLyBkbyBsZW5ndGggY2hlY2sgYWx3YXlzIGJlY2F1c2UgdXNlciBjYW4gaW5wdXQgbXVsdGlwbGUgZGF0ZXMgcmVnYXJkbGVzcyBvZiB0aGUgbW9kZVxuICByZXR1cm4gY29uZmlnLm1heE51bWJlck9mRGF0ZXMgJiYgbmV3RGF0ZXMubGVuZ3RoID4gY29uZmlnLm1heE51bWJlck9mRGF0ZXNcbiAgICA/IG5ld0RhdGVzLnNsaWNlKGNvbmZpZy5tYXhOdW1iZXJPZkRhdGVzICogLTEpXG4gICAgOiBuZXdEYXRlcztcbn1cblxuLy8gcmVmcmVzaCB0aGUgVUkgZWxlbWVudHNcbi8vIG1vZGVzOiAxOiBpbnB1dCBvbmx5LCAyLCBwaWNrZXIgb25seSwgMyBib3RoXG5mdW5jdGlvbiByZWZyZXNoVUkoZGF0ZXBpY2tlciwgbW9kZSA9IDMsIHF1aWNrUmVuZGVyID0gdHJ1ZSkge1xuICBjb25zdCB7Y29uZmlnLCBwaWNrZXIsIGlucHV0RmllbGR9ID0gZGF0ZXBpY2tlcjtcbiAgaWYgKG1vZGUgJiAyKSB7XG4gICAgY29uc3QgbmV3VmlldyA9IHBpY2tlci5hY3RpdmUgPyBjb25maWcucGlja0xldmVsIDogY29uZmlnLnN0YXJ0VmlldztcbiAgICBwaWNrZXIudXBkYXRlKCkuY2hhbmdlVmlldyhuZXdWaWV3KS5yZW5kZXIocXVpY2tSZW5kZXIpO1xuICB9XG4gIGlmIChtb2RlICYgMSAmJiBpbnB1dEZpZWxkKSB7XG4gICAgaW5wdXRGaWVsZC52YWx1ZSA9IHN0cmluZ2lmeURhdGVzKGRhdGVwaWNrZXIuZGF0ZXMsIGNvbmZpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RGF0ZShkYXRlcGlja2VyLCBpbnB1dERhdGVzLCBvcHRpb25zKSB7XG4gIGxldCB7Y2xlYXIsIHJlbmRlciwgYXV0b2hpZGV9ID0gb3B0aW9ucztcbiAgaWYgKHJlbmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmVuZGVyID0gdHJ1ZTtcbiAgfVxuICBpZiAoIXJlbmRlcikge1xuICAgIGF1dG9oaWRlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoYXV0b2hpZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIGF1dG9oaWRlID0gZGF0ZXBpY2tlci5jb25maWcuYXV0b2hpZGU7XG4gIH1cblxuICBjb25zdCBuZXdEYXRlcyA9IHByb2Nlc3NJbnB1dERhdGVzKGRhdGVwaWNrZXIsIGlucHV0RGF0ZXMsIGNsZWFyKTtcbiAgaWYgKCFuZXdEYXRlcykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobmV3RGF0ZXMudG9TdHJpbmcoKSAhPT0gZGF0ZXBpY2tlci5kYXRlcy50b1N0cmluZygpKSB7XG4gICAgZGF0ZXBpY2tlci5kYXRlcyA9IG5ld0RhdGVzO1xuICAgIHJlZnJlc2hVSShkYXRlcGlja2VyLCByZW5kZXIgPyAzIDogMSk7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudChkYXRlcGlja2VyLCAnY2hhbmdlRGF0ZScpO1xuICB9IGVsc2Uge1xuICAgIHJlZnJlc2hVSShkYXRlcGlja2VyLCAxKTtcbiAgfVxuICBpZiAoYXV0b2hpZGUpIHtcbiAgICBkYXRlcGlja2VyLmhpZGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGRhdGUgcGlja2VyXG4gKi9cbmNsYXNzIERhdGVwaWNrZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgZGF0ZSBwaWNrZXJcbiAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCAtIGVsZW1lbnQgdG8gYmluZCBhIGRhdGUgcGlja2VyXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnNdIC0gY29uZmlnIG9wdGlvbnNcbiAgICogQHBhcmFtICB7RGF0ZVJhbmdlUGlja2VyfSBbcmFuZ2VwaWNrZXJdIC0gRGF0ZVJhbmdlUGlja2VyIGluc3RhbmNlIHRoZVxuICAgKiBkYXRlIHBpY2tlciBiZWxvbmdzIHRvLiBVc2UgdGhpcyBvbmx5IHdoZW4gY3JlYXRpbmcgZGF0ZSBwaWNrZXIgYXMgYSBwYXJ0XG4gICAqIG9mIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30sIHJhbmdlcGlja2VyID0gdW5kZWZpbmVkKSB7XG4gICAgZWxlbWVudC5kYXRlcGlja2VyID0gdGhpcztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8gc2V0IHVwIGNvbmZpZ1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBidXR0b25DbGFzczogKG9wdGlvbnMuYnV0dG9uQ2xhc3MgJiYgU3RyaW5nKG9wdGlvbnMuYnV0dG9uQ2xhc3MpKSB8fCAnYnV0dG9uJyxcbiAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keSxcbiAgICAgIGRlZmF1bHRWaWV3RGF0ZTogKDAsbGliX2RhdGUvKiB0b2RheSAqLy5MZykoKSxcbiAgICAgIG1heERhdGU6IHVuZGVmaW5lZCxcbiAgICAgIG1pbkRhdGU6IHVuZGVmaW5lZCxcbiAgICB9LCBwcm9jZXNzT3B0aW9ucyhvcHRpb25zX2RlZmF1bHRPcHRpb25zLCB0aGlzKSk7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHByb2Nlc3NPcHRpb25zKG9wdGlvbnMsIHRoaXMpKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBieSB0eXBlXG4gICAgY29uc3QgaW5saW5lID0gdGhpcy5pbmxpbmUgPSBlbGVtZW50LnRhZ05hbWUgIT09ICdJTlBVVCc7XG4gICAgbGV0IGlucHV0RmllbGQ7XG4gICAgbGV0IGluaXRpYWxEYXRlcztcblxuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIGNvbmZpZy5jb250YWluZXIgPSBlbGVtZW50O1xuICAgICAgaW5pdGlhbERhdGVzID0gKDAsdXRpbHMvKiBzdHJpbmdUb0FycmF5ICovLlc3KShlbGVtZW50LmRhdGFzZXQuZGF0ZSwgY29uZmlnLmRhdGVEZWxpbWl0ZXIpO1xuICAgICAgZGVsZXRlIGVsZW1lbnQuZGF0YXNldC5kYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpIDogbnVsbDtcbiAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29uZmlnLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgIH1cbiAgICAgIGlucHV0RmllbGQgPSB0aGlzLmlucHV0RmllbGQgPSBlbGVtZW50O1xuICAgICAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdkYXRlcGlja2VyLWlucHV0Jyk7XG4gICAgICBpbml0aWFsRGF0ZXMgPSAoMCx1dGlscy8qIHN0cmluZ1RvQXJyYXkgKi8uVzcpKGlucHV0RmllbGQudmFsdWUsIGNvbmZpZy5kYXRlRGVsaW1pdGVyKTtcbiAgICB9XG4gICAgaWYgKHJhbmdlcGlja2VyKSB7XG4gICAgICAvLyBjaGVjayB2YWxpZGlyeVxuICAgICAgY29uc3QgaW5kZXggPSByYW5nZXBpY2tlci5pbnB1dHMuaW5kZXhPZihpbnB1dEZpZWxkKTtcbiAgICAgIGNvbnN0IGRhdGVwaWNrZXJzID0gcmFuZ2VwaWNrZXIuZGF0ZXBpY2tlcnM7XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gMSB8fCAhQXJyYXkuaXNBcnJheShkYXRlcGlja2VycykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgcmFuZ2VwaWNrZXIgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgLy8gYXR0YWNoIGl0YWVsZiB0byB0aGUgcmFuZ2VwaWNrZXIgaGVyZSBzbyB0aGF0IHByb2Nlc3NJbnB1dERhdGVzKCkgY2FuXG4gICAgICAvLyBkZXRlcm1pbmUgaWYgdGhpcyBpcyB0aGUgcmFuZ2UtZW5kIHBpY2tlciBvZiB0aGUgcmFuZ2VwaWNrZXIgd2hpbGVcbiAgICAgIC8vIHNldHRpbmcgaW5pdGFsIHZhbHVlcyB3aGVuIHBpY2tMZXZlbCA+IDBcbiAgICAgIGRhdGVwaWNrZXJzW2luZGV4XSA9IHRoaXM7XG4gICAgICAvLyBhZGQgZ2V0dGVyIGZvciByYW5nZXBpY2tlclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyYW5nZXBpY2tlcicsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiByYW5nZXBpY2tlcjtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHNldCBpbml0aWFsIGRhdGVzXG4gICAgdGhpcy5kYXRlcyA9IFtdO1xuICAgIC8vIHByb2Nlc3MgaW5pdGlhbCB2YWx1ZVxuICAgIGNvbnN0IGlucHV0RGF0ZVZhbHVlcyA9IHByb2Nlc3NJbnB1dERhdGVzKHRoaXMsIGluaXRpYWxEYXRlcyk7XG4gICAgaWYgKGlucHV0RGF0ZVZhbHVlcyAmJiBpbnB1dERhdGVWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5kYXRlcyA9IGlucHV0RGF0ZVZhbHVlcztcbiAgICB9XG4gICAgaWYgKGlucHV0RmllbGQpIHtcbiAgICAgIGlucHV0RmllbGQudmFsdWUgPSBzdHJpbmdpZnlEYXRlcyh0aGlzLmRhdGVzLCBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IHBpY2tlciA9IHRoaXMucGlja2VyID0gbmV3IFBpY2tlcih0aGlzKTtcblxuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXQgdXAgZXZlbnQgbGlzdGVuZXJzIGluIG90aGVyIG1vZGVzXG4gICAgICBjb25zdCBvbk1vdXNlZG93bkRvY3VtZW50ID0gb25DbGlja091dHNpZGUuYmluZChudWxsLCB0aGlzKTtcbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IFtcbiAgICAgICAgW2lucHV0RmllbGQsICdrZXlkb3duJywgb25LZXlkb3duLmJpbmQobnVsbCwgdGhpcyldLFxuICAgICAgICBbaW5wdXRGaWVsZCwgJ2ZvY3VzJywgb25Gb2N1cy5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdtb3VzZWRvd24nLCBvbk1vdXNlZG93bi5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdjbGljaycsIG9uQ2xpY2tJbnB1dC5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdwYXN0ZScsIG9uUGFzdGUuYmluZChudWxsLCB0aGlzKV0sXG4gICAgICAgIFtkb2N1bWVudCwgJ21vdXNlZG93bicsIG9uTW91c2Vkb3duRG9jdW1lbnRdLFxuICAgICAgICBbZG9jdW1lbnQsICd0b3VjaHN0YXJ0Jywgb25Nb3VzZWRvd25Eb2N1bWVudF0sXG4gICAgICAgIFt3aW5kb3csICdyZXNpemUnLCBwaWNrZXIucGxhY2UuYmluZChwaWNrZXIpXVxuICAgICAgXTtcbiAgICAgICgwLGxpYl9ldmVudC8qIHJlZ2lzdGVyTGlzdGVuZXJzICovLmNGKSh0aGlzLCBsaXN0ZW5lcnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgRGF0ZSBvYmplY3Qgb3IgdGltZSB2YWx1ZSBpbiBnaXZlbiBmb3JtYXQgYW5kIGxhbmd1YWdlXG4gICAqIEBwYXJhbSAge0RhdGV8TnVtYmVyfSBkYXRlIC0gZGF0ZSBvciB0aW1lIHZhbHVlIHRvIGZvcm1hdFxuICAgKiBAcGFyYW0gIHtTdHJpbmd8T2JqZWN0fSBmb3JtYXQgLSBmb3JtYXQgc3RyaW5nIG9yIG9iamVjdCB0aGF0IGNvbnRhaW5zXG4gICAqIHRvRGlzcGxheSgpIGN1c3RvbSBmb3JtYXR0ZXIsIHdob3NlIHNpZ25hdHVyZSBpc1xuICAgKiAtIGFyZ3M6XG4gICAqICAgLSBkYXRlOiB7RGF0ZX0gLSBEYXRlIGluc3RhbmNlIG9mIHRoZSBkYXRlIHBhc3NlZCB0byB0aGUgbWV0aG9kXG4gICAqICAgLSBmb3JtYXQ6IHtPYmplY3R9IC0gdGhlIGZvcm1hdCBvYmplY3QgcGFzc2VkIHRvIHRoZSBtZXRob2RcbiAgICogICAtIGxvY2FsZToge09iamVjdH0gLSBsb2NhbGUgZm9yIHRoZSBsYW5ndWFnZSBzcGVjaWZpZWQgYnkgYGxhbmdgXG4gICAqIC0gcmV0dXJuOlxuICAgKiAgICAge1N0cmluZ30gZm9ybWF0dGVkIGRhdGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbbGFuZz1lbl0gLSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBkYXRlXG4gICAqL1xuICBzdGF0aWMgZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIGxhbmcpIHtcbiAgICByZXR1cm4gKDAsZGF0ZV9mb3JtYXQvKiBmb3JtYXREYXRlICovLnA2KShkYXRlLCBmb3JtYXQsIGxhbmcgJiYgbG9jYWxlc1tsYW5nXSB8fCBsb2NhbGVzLmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBkYXRlIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd8RGF0ZXxOdW1iZXJ9IGRhdGVTdHIgLSBkYXRlIHN0cmluZywgRGF0ZSBvYmplY3Qgb3IgdGltZVxuICAgKiB2YWx1ZSB0byBwYXJzZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd8T2JqZWN0fSBmb3JtYXQgLSBmb3JtYXQgc3RyaW5nIG9yIG9iamVjdCB0aGF0IGNvbnRhaW5zXG4gICAqIHRvVmFsdWUoKSBjdXN0b20gcGFyc2VyLCB3aG9zZSBzaWduYXR1cmUgaXNcbiAgICogLSBhcmdzOlxuICAgKiAgIC0gZGF0ZVN0cjoge1N0cmluZ3xEYXRlfE51bWJlcn0gLSB0aGUgZGF0ZVN0ciBwYXNzZWQgdG8gdGhlIG1ldGhvZFxuICAgKiAgIC0gZm9ybWF0OiB7T2JqZWN0fSAtIHRoZSBmb3JtYXQgb2JqZWN0IHBhc3NlZCB0byB0aGUgbWV0aG9kXG4gICAqICAgLSBsb2NhbGU6IHtPYmplY3R9IC0gbG9jYWxlIGZvciB0aGUgbGFuZ3VhZ2Ugc3BlY2lmaWVkIGJ5IGBsYW5nYFxuICAgKiAtIHJldHVybjpcbiAgICogICAgIHtEYXRlfE51bWJlcn0gcGFyc2VkIGRhdGUgb3IgaXRzIHRpbWUgdmFsdWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbbGFuZz1lbl0gLSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRpbWUgdmFsdWUgb2YgcGFyc2VkIGRhdGVcbiAgICovXG4gIHN0YXRpYyBwYXJzZURhdGUoZGF0ZVN0ciwgZm9ybWF0LCBsYW5nKSB7XG4gICAgcmV0dXJuICgwLGRhdGVfZm9ybWF0LyogcGFyc2VEYXRlICovLnNHKShkYXRlU3RyLCBmb3JtYXQsIGxhbmcgJiYgbG9jYWxlc1tsYW5nXSB8fCBsb2NhbGVzLmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0fSAtIEluc3RhbGxlZCBsb2NhbGVzIGluIGBbbGFuZ3VhZ2VDb2RlXTogbG9jYWxlT2JqZWN0YCBmb3JtYXRcbiAgICogZW5gOl9FbmdsaXNoIChVUylfIGlzIHByZS1pbnN0YWxsZWQuXG4gICAqL1xuICBzdGF0aWMgZ2V0IGxvY2FsZXMoKSB7XG4gICAgcmV0dXJuIGxvY2FsZXM7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Jvb2xlYW59IC0gV2hldGhlciB0aGUgcGlja2VyIGVsZW1lbnQgaXMgc2hvd24uIGB0cnVlYCB3aG5lIHNob3duXG4gICAqL1xuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiAhISh0aGlzLnBpY2tlciAmJiB0aGlzLnBpY2tlci5hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gLSBET00gb2JqZWN0IG9mIHBpY2tlciBlbGVtZW50XG4gICAqL1xuICBnZXQgcGlja2VyRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIgPyB0aGlzLnBpY2tlci5lbGVtZW50IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdmFsdWVzIHRvIHRoZSBjb25maWcgb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGNvbmZpZyBvcHRpb25zIHRvIHVwZGF0ZVxuICAgKi9cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgcGlja2VyID0gdGhpcy5waWNrZXI7XG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHByb2Nlc3NPcHRpb25zKG9wdGlvbnMsIHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgbmV3T3B0aW9ucyk7XG4gICAgcGlja2VyLnNldE9wdGlvbnMobmV3T3B0aW9ucyk7XG5cbiAgICByZWZyZXNoVUkodGhpcywgMyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgcGlja2VyIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuaW5wdXRGaWVsZCkge1xuICAgICAgaWYgKHRoaXMuaW5wdXRGaWVsZC5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pbnB1dEZpZWxkICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3Nob3dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlucHV0RmllbGQuZm9jdXMoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3Nob3dpbmc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGlja2VyLnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBwaWNrZXIgZWxlbWVudFxuICAgKiBOb3QgYXZhaWxhYmxlIG9uIGlubGluZSBwaWNrZXJcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGlja2VyLmhpZGUoKTtcbiAgICB0aGlzLnBpY2tlci51cGRhdGUoKS5jaGFuZ2VWaWV3KHRoaXMuY29uZmlnLnN0YXJ0VmlldykucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgRGF0ZXBpY2tlciBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHtEZXRlcGlja2VyfSAtIHRoZSBpbnN0YW5jZSBkZXN0cm95ZWRcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgKDAsbGliX2V2ZW50LyogdW5yZWdpc3Rlckxpc3RlbmVycyAqLy51VikodGhpcyk7XG4gICAgdGhpcy5waWNrZXIuZGV0YWNoKCk7XG4gICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgdGhpcy5pbnB1dEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2RhdGVwaWNrZXItaW5wdXQnKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuZWxlbWVudC5kYXRlcGlja2VyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VsZWN0ZWQgZGF0ZShzKVxuICAgKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgYSBEYXRlIG9iamVjdCBvZiBzZWxlY3RlZCBkYXRlIGJ5IGRlZmF1bHQsIGFuZCByZXR1cm5zXG4gICAqIGFuIGFycmF5IG9mIHNlbGVjdGVkIGRhdGVzIGluIG11bHRpZGF0ZSBtb2RlLiBJZiBmb3JtYXQgc3RyaW5nIGlzIHBhc3NlZCxcbiAgICogaXQgcmV0dXJucyBkYXRlIHN0cmluZyhzKSBmb3JtYXR0ZWQgaW4gZ2l2ZW4gZm9ybWF0LlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtmb3JtYXRdIC0gRm9ybWF0IHN0cmluZyB0byBzdHJpbmdpZnkgdGhlIGRhdGUocylcbiAgICogQHJldHVybiB7RGF0ZXxTdHJpbmd8RGF0ZVtdfFN0cmluZ1tdfSAtIHNlbGVjdGVkIGRhdGUocyksIG9yIGlmIG5vbmUgaXNcbiAgICogc2VsZWN0ZWQsIGVtcHR5IGFycmF5IGluIG11bHRpZGF0ZSBtb2RlIGFuZCB1bnRpdGxlZCBpbiBzaWdsZWRhdGUgbW9kZVxuICAgKi9cbiAgZ2V0RGF0ZShmb3JtYXQgPSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IGZvcm1hdFxuICAgICAgPyBkYXRlID0+ICgwLGRhdGVfZm9ybWF0LyogZm9ybWF0RGF0ZSAqLy5wNikoZGF0ZSwgZm9ybWF0LCB0aGlzLmNvbmZpZy5sb2NhbGUpXG4gICAgICA6IGRhdGUgPT4gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcubXVsdGlkYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlcy5tYXAoY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5kYXRlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBzZWxlY3RlZCBkYXRlKHMpXG4gICAqXG4gICAqIEluIG11bHRpZGF0ZSBtb2RlLCB5b3UgY2FuIHBhc3MgbXVsdGlwbGUgZGF0ZXMgYXMgYSBzZXJpZXMgb2YgYXJndW1lbnRzXG4gICAqIG9yIGFuIGFycmF5LiAoU2luY2UgZWFjaCBkYXRlIGlzIHBhcnNlZCBpbmRpdmlkdWFsbHksIHRoZSB0eXBlIG9mIHRoZVxuICAgKiBkYXRlcyBkb2Vzbid0IGhhdmUgdG8gYmUgdGhlIHNhbWUuKVxuICAgKiBUaGUgZ2l2ZW4gZGF0ZXMgYXJlIHVzZWQgdG8gdG9nZ2xlIHRoZSBzZWxlY3Qgc3RhdHVzIG9mIGVhY2ggZGF0ZS4gVGhlXG4gICAqIG51bWJlciBvZiBzZWxlY3RlZCBkYXRlcyBpcyBrZXB0IGZyb20gZXhjZWVkaW5nIHRoZSBsZW5ndGggc2V0IHRvXG4gICAqIG1heE51bWJlck9mRGF0ZXMuXG4gICAqXG4gICAqIFdpdGggY2xlYXI6IHRydWUgb3B0aW9uLCB0aGUgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICogYW5kIHRvIHJlcGxhY2UgdGhlIHNlbGVjdGlvbiBpbnN0ZWFkIG9mIHRvZ2dsaW5nIGluIG11bHRpZGF0ZSBtb2RlLlxuICAgKiBJZiB0aGUgb3B0aW9uIGlzIHBhc3NlZCB3aXRoIG5vIGRhdGUgYXJndW1lbnRzIG9yIGFuIGVtcHR5IGRhdGVzIGFycmF5LFxuICAgKiBpdCB3b3JrcyBhcyBcImNsZWFyXCIgKGNsZWFyIHRoZSBzZWxlY3Rpb24gdGhlbiBzZXQgbm90aGluZyksIGFuZCBpZiB0aGVcbiAgICogb3B0aW9uIGlzIHBhc3NlZCB3aXRoIG5ldyBkYXRlcyB0byBzZWxlY3QsIGl0IHdvcmtzIGFzIFwicmVwbGFjZVwiIChjbGVhclxuICAgKiB0aGUgc2VsZWN0aW9uIHRoZW4gc2V0IHRoZSBnaXZlbiBkYXRlcylcbiAgICpcbiAgICogV2hlbiByZW5kZXI6IGZhbHNlIG9wdGlvbiBpcyB1c2VkLCB0aGUgbWV0aG9kIG9taXRzIHJlLXJlbmRlcmluZyB0aGVcbiAgICogcGlja2VyIGVsZW1lbnQuIEluIHRoaXMgY2FzZSwgeW91IG5lZWQgdG8gY2FsbCByZWZyZXNoKCkgbWV0aG9kIGxhdGVyIGluXG4gICAqIG9yZGVyIGZvciB0aGUgcGlja2VyIGVsZW1lbnQgdG8gcmVmbGVjdCB0aGUgY2hhbmdlcy4gVGhlIGlucHV0IGZpZWxkIGlzXG4gICAqIHJlZnJlc2hlZCBhbHdheXMgcmVnYXJkbGVzcyBvZiB0aGlzIG9wdGlvbi5cbiAgICpcbiAgICogV2hlbiBpbnZhbGlkICh1bnBhcnNhYmxlLCByZXBlYXRlZCwgZGlzYWJsZWQgb3Igb3V0LW9mLXJhbmdlKSBkYXRlcyBhcmVcbiAgICogcGFzc2VkLCB0aGUgbWV0aG9kIGlnbm9yZXMgdGhlbSBhbmQgYXBwbGllcyBvbmx5IHZhbGlkIG9uZXMuIEluIHRoZSBjYXNlXG4gICAqIHRoYXQgYWxsIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW52YWxpZCwgd2hpY2ggaXMgZGlzdGluZ3Vpc2hlZCBmcm9tIHBhc3NpbmdcbiAgICogbm8gZGF0ZXMsIHRoZSBtZXRob2QgY29uc2lkZXJzIGl0IGFzIGFuIGVycm9yIGFuZCBsZWF2ZXMgdGhlIHNlbGVjdGlvblxuICAgKiB1bnRvdWNoZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Li4uKERhdGV8TnVtYmVyfFN0cmluZyl8QXJyYXl9IFtkYXRlc10gLSBEYXRlIHN0cmluZ3MsIERhdGVcbiAgICogb2JqZWN0cywgdGltZSB2YWx1ZXMgb3IgbWl4IG9mIHRob3NlIGZvciBuZXcgc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBmdW5jdGlvbiBvcHRpb25zXG4gICAqIC0gY2xlYXI6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gY2xlYXIgdGhlIGV4aXN0aW5nIHNlbGVjdGlvblxuICAgKiAgICAgZGVmdWFsdDogZmFsc2VcbiAgICogLSByZW5kZXI6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gcmUtcmVuZGVyIHRoZSBwaWNrZXIgZWxlbWVudFxuICAgKiAgICAgZGVmYXVsdDogdHJ1ZVxuICAgKiAtIGF1dG9oaWRlOiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRvIGhpZGUgdGhlIHBpY2tlciBlbGVtZW50IGFmdGVyIHJlLXJlbmRlclxuICAgKiAgICAgSWdub3JlZCB3aGVuIHVzZWQgd2l0aCByZW5kZXI6IGZhbHNlXG4gICAqICAgICBkZWZhdWx0OiBjb25maWcuYXV0b2hpZGVcbiAgICovXG4gIHNldERhdGUoLi4uYXJncykge1xuICAgIGNvbnN0IGRhdGVzID0gWy4uLmFyZ3NdO1xuICAgIGNvbnN0IG9wdHMgPSB7fTtcbiAgICBjb25zdCBsYXN0QXJnID0gKDAsdXRpbHMvKiBsYXN0SXRlbU9mICovLkptKShhcmdzKTtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgbGFzdEFyZyA9PT0gJ29iamVjdCdcbiAgICAgICYmICFBcnJheS5pc0FycmF5KGxhc3RBcmcpXG4gICAgICAmJiAhKGxhc3RBcmcgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgJiYgbGFzdEFyZ1xuICAgICkge1xuICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCBkYXRlcy5wb3AoKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXREYXRlcyA9IEFycmF5LmlzQXJyYXkoZGF0ZXNbMF0pID8gZGF0ZXNbMF0gOiBkYXRlcztcbiAgICBzZXREYXRlKHRoaXMsIGlucHV0RGF0ZXMsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgZGF0ZShzKSB3aXRoIGlucHV0IGZpZWxkJ3MgdmFsdWVcbiAgICogTm90IGF2YWlsYWJsZSBvbiBpbmxpbmUgcGlja2VyXG4gICAqXG4gICAqIFRoZSBpbnB1dCBmaWVsZCB3aWxsIGJlIHJlZnJlc2hlZCB3aXRoIHByb3Blcmx5IGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9uc10gLSBmdW5jdGlvbiBvcHRpb25zXG4gICAqIC0gYXV0b2hpZGU6IHtib29sZWFufSAtIHdoZXRoZXIgdG8gaGlkZSB0aGUgcGlja2VyIGVsZW1lbnQgYWZ0ZXIgcmVmcmVzaFxuICAgKiAgICAgZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHVwZGF0ZShvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0cyA9IHtjbGVhcjogdHJ1ZSwgYXV0b2hpZGU6ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5hdXRvaGlkZSl9O1xuICAgIGNvbnN0IGlucHV0RGF0ZXMgPSAoMCx1dGlscy8qIHN0cmluZ1RvQXJyYXkgKi8uVzcpKHRoaXMuaW5wdXRGaWVsZC52YWx1ZSwgdGhpcy5jb25maWcuZGF0ZURlbGltaXRlcik7XG4gICAgc2V0RGF0ZSh0aGlzLCBpbnB1dERhdGVzLCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSBwaWNrZXIgZWxlbWVudCBhbmQgdGhlIGFzc29jaWF0ZWQgaW5wdXQgZmllbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0YXJnZXRdIC0gdGFyZ2V0IGl0ZW0gd2hlbiByZWZyZXNoaW5nIG9uZSBpdGVtIG9ubHlcbiAgICogJ3BpY2tlcicgb3IgJ2lucHV0J1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZVJlbmRlcl0gLSB3aGV0aGVyIHRvIHJlLXJlbmRlciB0aGUgcGlja2VyIGVsZW1lbnRcbiAgICogcmVnYXJkbGVzcyBvZiBpdHMgc3RhdGUgaW5zdGVhZCBvZiBvcHRpbWl6ZWQgcmVmcmVzaFxuICAgKi9cbiAgcmVmcmVzaCh0YXJnZXQgPSB1bmRlZmluZWQsIGZvcmNlUmVuZGVyID0gZmFsc2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBmb3JjZVJlbmRlciA9IHRhcmdldDtcbiAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgbW9kZTtcbiAgICBpZiAodGFyZ2V0ID09PSAncGlja2VyJykge1xuICAgICAgbW9kZSA9IDI7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgPT09ICdpbnB1dCcpIHtcbiAgICAgIG1vZGUgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlID0gMztcbiAgICB9XG4gICAgcmVmcmVzaFVJKHRoaXMsIG1vZGUsICFmb3JjZVJlbmRlcik7XG4gIH1cblxuICAvKipcbiAgICogRW50ZXIgZWRpdCBtb2RlXG4gICAqIE5vdCBhdmFpbGFibGUgb24gaW5saW5lIHBpY2tlciBvciB3aGVuIHRoZSBwaWNrZXIgZWxlbWVudCBpcyBoaWRkZW5cbiAgICovXG4gIGVudGVyRWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lIHx8ICF0aGlzLnBpY2tlci5hY3RpdmUgfHwgdGhpcy5lZGl0TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICB0aGlzLmlucHV0RmllbGQuY2xhc3NMaXN0LmFkZCgnaW4tZWRpdCcsICdib3JkZXItYmx1ZS03MDAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGl0IGZyb20gZWRpdCBtb2RlXG4gICAqIE5vdCBhdmFpbGFibGUgb24gaW5saW5lIHBpY2tlclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zXSAtIGZ1bmN0aW9uIG9wdGlvbnNcbiAgICogLSB1cGRhdGU6IHtib29sZWFufSAtIHdoZXRoZXIgdG8gY2FsbCB1cGRhdGUoKSBhZnRlciBleGl0aW5nXG4gICAqICAgICBJZiBmYWxzZSwgaW5wdXQgZmllbGQgaXMgcmV2ZXJ0IHRvIHRoZSBleGlzdGluZyBzZWxlY3Rpb25cbiAgICogICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBleGl0RWRpdE1vZGUob3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLmlubGluZSB8fCAhdGhpcy5lZGl0TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7dXBkYXRlOiBmYWxzZX0sIG9wdGlvbnMpO1xuICAgIGRlbGV0ZSB0aGlzLmVkaXRNb2RlO1xuICAgIHRoaXMuaW5wdXRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdpbi1lZGl0JywgJ2JvcmRlci1ibHVlLTcwMCcpO1xuICAgIGlmIChvcHRzLnVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGUob3B0cyk7XG4gICAgfVxuICB9XG59XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDk2Mzpcbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIkNMXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyByZUZvcm1hdFRva2VuczsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJwNlwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gZm9ybWF0RGF0ZTsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJzR1wiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gcGFyc2VEYXRlOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydCByZU5vbkRhdGVQYXJ0cyAqL1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9kYXRlX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU2MCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3V0aWxzX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNSk7XG5cblxuXG4vLyBwYXR0ZXJuIGZvciBmb3JtYXQgcGFydHNcbmNvbnN0IHJlRm9ybWF0VG9rZW5zID0gL2RkP3xERD98bW0/fE1NP3x5eT8oPzp5eSk/Lztcbi8vIHBhdHRlcm4gZm9yIG5vbiBkYXRlIHBhcnRzXG5jb25zdCByZU5vbkRhdGVQYXJ0cyA9IC9bXFxzIS0vOi1AWy1gey1+5bm05pyI5pelXSsvO1xuLy8gY2FjaGUgZm9yIHBlcnNlZCBmb3JtYXRzXG5sZXQga25vd25Gb3JtYXRzID0ge307XG4vLyBwYXJzZSBmdW50aW9ucyBmb3IgZGF0ZSBwYXJ0c1xuY29uc3QgcGFyc2VGbnMgPSB7XG4gIHkoZGF0ZSwgeWVhcikge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS5zZXRGdWxsWWVhcihwYXJzZUludCh5ZWFyLCAxMCkpO1xuICB9LFxuICBtKGRhdGUsIG1vbnRoLCBsb2NhbGUpIHtcbiAgICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgbGV0IG1vbnRoSW5kZXggPSBwYXJzZUludChtb250aCwgMTApIC0gMTtcblxuICAgIGlmIChpc05hTihtb250aEluZGV4KSkge1xuICAgICAgaWYgKCFtb250aCkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtb250aE5hbWUgPSBtb250aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgY29tcGFyZU5hbWVzID0gbmFtZSA9PiBuYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChtb250aE5hbWUpO1xuICAgICAgLy8gY29tcGFyZSB3aXRoIGJvdGggc2hvcnQgYW5kIGZ1bGwgbmFtZXMgYmVjYXVzZSBzb21lIGxvY2FsZXMgaGF2ZSBwZXJpb2RzXG4gICAgICAvLyBpbiB0aGUgc2hvcnQgbmFtZXMgKG5vdCBlcXVhbCB0byB0aGUgZmlyc3QgWCBsZXR0ZXJzIG9mIHRoZSBmdWxsIG5hbWVzKVxuICAgICAgbW9udGhJbmRleCA9IGxvY2FsZS5tb250aHNTaG9ydC5maW5kSW5kZXgoY29tcGFyZU5hbWVzKTtcbiAgICAgIGlmIChtb250aEluZGV4IDwgMCkge1xuICAgICAgICBtb250aEluZGV4ID0gbG9jYWxlLm1vbnRocy5maW5kSW5kZXgoY29tcGFyZU5hbWVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb250aEluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld0RhdGUuc2V0TW9udGgobW9udGhJbmRleCk7XG4gICAgcmV0dXJuIG5ld0RhdGUuZ2V0TW9udGgoKSAhPT0gbm9ybWFsaXplTW9udGgobW9udGhJbmRleClcbiAgICAgID8gbmV3RGF0ZS5zZXREYXRlKDApXG4gICAgICA6IG5ld0RhdGUuZ2V0VGltZSgpO1xuICB9LFxuICBkKGRhdGUsIGRheSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS5zZXREYXRlKHBhcnNlSW50KGRheSwgMTApKTtcbiAgfSxcbn07XG4vLyBmb3JtYXQgZnVuY3Rpb25zIGZvciBkYXRlIHBhcnRzXG5jb25zdCBmb3JtYXRGbnMgPSB7XG4gIGQoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKTtcbiAgfSxcbiAgZGQoZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0RGF0ZSgpLCAyKTtcbiAgfSxcbiAgRChkYXRlLCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLmRheXNTaG9ydFtkYXRlLmdldERheSgpXTtcbiAgfSxcbiAgREQoZGF0ZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5kYXlzW2RhdGUuZ2V0RGF5KCldO1xuICB9LFxuICBtKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgfSxcbiAgbW0oZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xuICB9LFxuICBNKGRhdGUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUubW9udGhzU2hvcnRbZGF0ZS5nZXRNb250aCgpXTtcbiAgfSxcbiAgTU0oZGF0ZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNbZGF0ZS5nZXRNb250aCgpXTtcbiAgfSxcbiAgeShkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSxcbiAgeXkoZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0RnVsbFllYXIoKSwgMikuc2xpY2UoLTIpO1xuICB9LFxuICB5eXl5KGRhdGUpIHtcbiAgICByZXR1cm4gcGFkWmVybyhkYXRlLmdldEZ1bGxZZWFyKCksIDQpO1xuICB9LFxufTtcblxuLy8gZ2V0IG1vbnRoIGluZGV4IGluIG5vcm1hbCByYW5nZSAoMCAtIDExKSBmcm9tIGFueSBudW1iZXJcbmZ1bmN0aW9uIG5vcm1hbGl6ZU1vbnRoKG1vbnRoSW5kZXgpIHtcbiAgcmV0dXJuIG1vbnRoSW5kZXggPiAtMSA/IG1vbnRoSW5kZXggJSAxMiA6IG5vcm1hbGl6ZU1vbnRoKG1vbnRoSW5kZXggKyAxMik7XG59XG5cbmZ1bmN0aW9uIHBhZFplcm8obnVtLCBsZW5ndGgpIHtcbiAgcmV0dXJuIG51bS50b1N0cmluZygpLnBhZFN0YXJ0KGxlbmd0aCwgJzAnKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VGb3JtYXRTdHJpbmcoZm9ybWF0KSB7XG4gIGlmICh0eXBlb2YgZm9ybWF0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQuXCIpO1xuICB9XG4gIGlmIChmb3JtYXQgaW4ga25vd25Gb3JtYXRzKSB7XG4gICAgcmV0dXJuIGtub3duRm9ybWF0c1tmb3JtYXRdO1xuICB9XG5cbiAgLy8gc3ByaXQgdGhlIGZvcm1hdCBzdHJpbmcgaW50byBwYXJ0cyBhbmQgc2VwcmF0b3JzXG4gIGNvbnN0IHNlcGFyYXRvcnMgPSBmb3JtYXQuc3BsaXQocmVGb3JtYXRUb2tlbnMpO1xuICBjb25zdCBwYXJ0cyA9IGZvcm1hdC5tYXRjaChuZXcgUmVnRXhwKHJlRm9ybWF0VG9rZW5zLCAnZycpKTtcbiAgaWYgKHNlcGFyYXRvcnMubGVuZ3RoID09PSAwIHx8ICFwYXJ0cykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQuXCIpO1xuICB9XG5cbiAgLy8gY29sbGVjdCBmb3JtYXQgZnVuY3Rpb25zIHVzZWQgaW4gdGhlIGZvcm1hdFxuICBjb25zdCBwYXJ0Rm9ybWF0dGVycyA9IHBhcnRzLm1hcCh0b2tlbiA9PiBmb3JtYXRGbnNbdG9rZW5dKTtcblxuICAvLyBjb2xsZWN0IHBhcnNlIGZ1bmN0aW9uIGtleXMgdXNlZCBpbiB0aGUgZm9ybWF0XG4gIC8vIGl0ZXJhdGUgb3ZlciBwYXJzZUZucycga2V5cyBpbiBvcmRlciB0byBrZWVwIHRoZSBvcmRlciBvZiB0aGUga2V5cy5cbiAgY29uc3QgcGFydFBhcnNlcktleXMgPSBPYmplY3Qua2V5cyhwYXJzZUZucykucmVkdWNlKChrZXlzLCBrZXkpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHBhcnRzLmZpbmQocGFydCA9PiBwYXJ0WzBdICE9PSAnRCcgJiYgcGFydFswXS50b0xvd2VyQ2FzZSgpID09PSBrZXkpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGtub3duRm9ybWF0c1tmb3JtYXRdID0ge1xuICAgIHBhcnNlcihkYXRlU3RyLCBsb2NhbGUpIHtcbiAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGRhdGVTdHIuc3BsaXQocmVOb25EYXRlUGFydHMpLnJlZHVjZSgoZHRQYXJ0cywgcGFydCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHBhcnQubGVuZ3RoID4gMCAmJiBwYXJ0c1tpbmRleF0pIHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IHBhcnRzW2luZGV4XVswXTtcbiAgICAgICAgICBpZiAodG9rZW4gPT09ICdNJykge1xuICAgICAgICAgICAgZHRQYXJ0cy5tID0gcGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuICE9PSAnRCcpIHtcbiAgICAgICAgICAgIGR0UGFydHNbdG9rZW5dID0gcGFydDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGR0UGFydHM7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBwYXJ0UGFyc2Vya2V5cyBzbyB0aGF0IHRoZSBwYXJzaW5nIGlzIG1hZGUgaW4gdGhlIG9kZXJcbiAgICAgIC8vIG9mIHllYXIsIG1vbnRoIGFuZCBkYXkgdG8gcHJldmVudCB0aGUgZGF5IHBhcnNlciBmcm9tIGNvcnJlY3RpbmcgbGFzdFxuICAgICAgLy8gZGF5IG9mIG1vbnRoIHdyb25nbHlcbiAgICAgIHJldHVybiBwYXJ0UGFyc2VyS2V5cy5yZWR1Y2UoKG9yaWdEYXRlLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IHBhcnNlRm5zW2tleV0ob3JpZ0RhdGUsIGRhdGVQYXJ0c1trZXldLCBsb2NhbGUpO1xuICAgICAgICAvLyBpbmdub3JlIHRoZSBwYXJ0IGZhaWxlZCB0byBwYXJzZVxuICAgICAgICByZXR1cm4gaXNOYU4obmV3RGF0ZSkgPyBvcmlnRGF0ZSA6IG5ld0RhdGU7XG4gICAgICB9LCAoMCxfZGF0ZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLnRvZGF5ICovIC5MZykoKSk7XG4gICAgfSxcbiAgICBmb3JtYXR0ZXIoZGF0ZSwgbG9jYWxlKSB7XG4gICAgICBsZXQgZGF0ZVN0ciA9IHBhcnRGb3JtYXR0ZXJzLnJlZHVjZSgoc3RyLCBmbiwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIHN0ciArPSBgJHtzZXBhcmF0b3JzW2luZGV4XX0ke2ZuKGRhdGUsIGxvY2FsZSl9YDtcbiAgICAgIH0sICcnKTtcbiAgICAgIC8vIHNlcGFyYXRvcnMnIGxlbmd0aCBpcyBhbHdheXMgcGFydHMnIGxlbmd0aCArIDEsXG4gICAgICByZXR1cm4gZGF0ZVN0ciArPSAoMCxfdXRpbHNfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5sYXN0SXRlbU9mICovIC5KbSkoc2VwYXJhdG9ycyk7XG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGVTdHIsIGZvcm1hdCwgbG9jYWxlKSB7XG4gIGlmIChkYXRlU3RyIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgZGF0ZVN0ciA9PT0gJ251bWJlcicpIHtcbiAgICBjb25zdCBkYXRlID0gKDAsX2RhdGVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5zdHJpcFRpbWUgKi8gLnhSKShkYXRlU3RyKTtcbiAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyB1bmRlZmluZWQgOiBkYXRlO1xuICB9XG4gIGlmICghZGF0ZVN0cikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGRhdGVTdHIgPT09ICd0b2RheScpIHtcbiAgICByZXR1cm4gKDAsX2RhdGVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC50b2RheSAqLyAuTGcpKCk7XG4gIH1cblxuICBpZiAoZm9ybWF0ICYmIGZvcm1hdC50b1ZhbHVlKSB7XG4gICAgY29uc3QgZGF0ZSA9IGZvcm1hdC50b1ZhbHVlKGRhdGVTdHIsIGZvcm1hdCwgbG9jYWxlKTtcbiAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyB1bmRlZmluZWQgOiAoMCxfZGF0ZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLnN0cmlwVGltZSAqLyAueFIpKGRhdGUpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlRm9ybWF0U3RyaW5nKGZvcm1hdCkucGFyc2VyKGRhdGVTdHIsIGxvY2FsZSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCBsb2NhbGUpIHtcbiAgaWYgKGlzTmFOKGRhdGUpIHx8ICghZGF0ZSAmJiBkYXRlICE9PSAwKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0IGRhdGVPYmogPSB0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyBuZXcgRGF0ZShkYXRlKSA6IGRhdGU7XG5cbiAgaWYgKGZvcm1hdC50b0Rpc3BsYXkpIHtcbiAgICByZXR1cm4gZm9ybWF0LnRvRGlzcGxheShkYXRlT2JqLCBmb3JtYXQsIGxvY2FsZSk7XG4gIH1cblxuICByZXR1cm4gcGFyc2VGb3JtYXRTdHJpbmcoZm9ybWF0KS5mb3JtYXR0ZXIoZGF0ZU9iaiwgbG9jYWxlKTtcbn1cblxuXG4vKioqLyB9KSxcblxuLyoqKi8gNTYwOlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiQmNcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFkZFllYXJzOyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIkU0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBhZGREYXlzOyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIkxnXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyB0b2RheTsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJRa1wiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gZ2V0V2VlazsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJha1wiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gc3RhcnRPZlllYXJQZXJpb2Q7IH0sXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiYnlcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGRhdGVWYWx1ZTsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJmclwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gZGF5T2ZUaGVXZWVrT2Y7IH0sXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiamhcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFkZFdlZWtzOyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcInhSXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBzdHJpcFRpbWU7IH0sXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwieklcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFkZE1vbnRoczsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5mdW5jdGlvbiBzdHJpcFRpbWUodGltZVZhbHVlKSB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lVmFsdWUpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufVxuXG5mdW5jdGlvbiB0b2RheSgpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59XG5cbi8vIEdldCB0aGUgdGltZSB2YWx1ZSBvZiB0aGUgc3RhcnQgb2YgZ2l2ZW4gZGF0ZSBvciB5ZWFyLCBtb250aCBhbmQgZGF5XG5mdW5jdGlvbiBkYXRlVmFsdWUoLi4uYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHRvZGF5KCk7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHN0cmlwVGltZShhcmdzWzBdKTtcbiAgfVxuXG4gIC8vIHVzZSBzZXRGdWxsWWVhcigpIHRvIGtlZXAgMi1kaWdpdCB5ZWFyIGZyb20gYmVpbmcgbWFwcGVkIHRvIDE5MDAtMTk5OVxuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoLi4uYXJncyk7XG4gIHJldHVybiBuZXdEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufVxuXG5mdW5jdGlvbiBhZGREYXlzKGRhdGUsIGFtb3VudCkge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIHJldHVybiBuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyBhbW91bnQpO1xufVxuXG5mdW5jdGlvbiBhZGRXZWVrcyhkYXRlLCBhbW91bnQpIHtcbiAgcmV0dXJuIGFkZERheXMoZGF0ZSwgYW1vdW50ICogNyk7XG59XG5cbmZ1bmN0aW9uIGFkZE1vbnRocyhkYXRlLCBhbW91bnQpIHtcbiAgLy8gSWYgdGhlIGRheSBvZiB0aGUgZGF0ZSBpcyBub3QgaW4gdGhlIG5ldyBtb250aCwgdGhlIGxhc3QgZGF5IG9mIHRoZSBuZXdcbiAgLy8gbW9udGggd2lsbCBiZSByZXR1cm5lZC4gZS5nLiBKYW4gMzEgKyAxIG1vbnRoIOKGkiBGZWIgMjggKG5vdCBNYXIgMDMpXG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgY29uc3QgbW9udGhzVG9TZXQgPSBuZXdEYXRlLmdldE1vbnRoKCkgKyBhbW91bnQ7XG4gIGxldCBleHBlY3RlZE1vbnRoID0gbW9udGhzVG9TZXQgJSAxMjtcbiAgaWYgKGV4cGVjdGVkTW9udGggPCAwKSB7XG4gICAgZXhwZWN0ZWRNb250aCArPSAxMjtcbiAgfVxuXG4gIGNvbnN0IHRpbWUgPSBuZXdEYXRlLnNldE1vbnRoKG1vbnRoc1RvU2V0KTtcbiAgcmV0dXJuIG5ld0RhdGUuZ2V0TW9udGgoKSAhPT0gZXhwZWN0ZWRNb250aCA/IG5ld0RhdGUuc2V0RGF0ZSgwKSA6IHRpbWU7XG59XG5cbmZ1bmN0aW9uIGFkZFllYXJzKGRhdGUsIGFtb3VudCkge1xuICAvLyBJZiB0aGUgZGF0ZSBpcyBGZWIgMjkgYW5kIHRoZSBuZXcgeWVhciBpcyBub3QgYSBsZWFwIHllYXIsIEZlYiAyOCBvZiB0aGVcbiAgLy8gbmV3IHllYXIgd2lsbCBiZSByZXR1cm5lZC5cbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCBleHBlY3RlZE1vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xuICBjb25zdCB0aW1lID0gbmV3RGF0ZS5zZXRGdWxsWWVhcihuZXdEYXRlLmdldEZ1bGxZZWFyKCkgKyBhbW91bnQpO1xuICByZXR1cm4gZXhwZWN0ZWRNb250aCA9PT0gMSAmJiBuZXdEYXRlLmdldE1vbnRoKCkgPT09IDIgPyBuZXdEYXRlLnNldERhdGUoMCkgOiB0aW1lO1xufVxuXG4vLyBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHR3ZW4gMiBkYXlzIG9mIHRoZSB3ZWVrXG5mdW5jdGlvbiBkYXlEaWZmKGRheSwgZnJvbSkge1xuICByZXR1cm4gKGRheSAtIGZyb20gKyA3KSAlIDc7XG59XG5cbi8vIEdldCB0aGUgZGF0ZSBvZiB0aGUgc3BlY2lmaWVkIGRheSBvZiB0aGUgd2VlayBvZiBnaXZlbiBiYXNlIGRhdGVcbmZ1bmN0aW9uIGRheU9mVGhlV2Vla09mKGJhc2VEYXRlLCBkYXlPZldlZWssIHdlZWtTdGFydCA9IDApIHtcbiAgY29uc3QgYmFzZURheSA9IG5ldyBEYXRlKGJhc2VEYXRlKS5nZXREYXkoKTtcbiAgcmV0dXJuIGFkZERheXMoYmFzZURhdGUsIGRheURpZmYoZGF5T2ZXZWVrLCB3ZWVrU3RhcnQpIC0gZGF5RGlmZihiYXNlRGF5LCB3ZWVrU3RhcnQpKTtcbn1cblxuLy8gR2V0IHRoZSBJU08gd2VlayBvZiBhIGRhdGVcbmZ1bmN0aW9uIGdldFdlZWsoZGF0ZSkge1xuICAvLyBzdGFydCBvZiBJU08gd2VlayBpcyBNb25kYXlcbiAgY29uc3QgdGh1T2ZUaGVXZWVrID0gZGF5T2ZUaGVXZWVrT2YoZGF0ZSwgNCwgMSk7XG4gIC8vIDFzdCB3ZWVrID09IHRoZSB3ZWVrIHdoZXJlIHRoZSA0dGggb2YgSmFudWFyeSBpcyBpblxuICBjb25zdCBmaXJzdFRodSA9IGRheU9mVGhlV2Vla09mKG5ldyBEYXRlKHRodU9mVGhlV2Vlaykuc2V0TW9udGgoMCwgNCksIDQsIDEpO1xuICByZXR1cm4gTWF0aC5yb3VuZCgodGh1T2ZUaGVXZWVrIC0gZmlyc3RUaHUpIC8gNjA0ODAwMDAwKSArIDE7XG59XG5cbi8vIEdldCB0aGUgc3RhcnQgeWVhciBvZiB0aGUgcGVyaW9kIG9mIHllYXJzIHRoYXQgaW5jbHVkZXMgZ2l2ZW4gZGF0ZVxuLy8geWVhcnM6IGxlbmd0aCBvZiB0aGUgeWVhciBwZXJpb2RcbmZ1bmN0aW9uIHN0YXJ0T2ZZZWFyUGVyaW9kKGRhdGUsIHllYXJzKSB7XG4gIC8qIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvWWVhcl96ZXJvI0lTT184NjAxICovXG4gIGNvbnN0IHllYXIgPSBuZXcgRGF0ZShkYXRlKS5nZXRGdWxsWWVhcigpO1xuICByZXR1cm4gTWF0aC5mbG9vcih5ZWFyIC8geWVhcnMpICogeWVhcnM7XG59XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDY5ODpcbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIkhlXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBmaW5kRWxlbWVudEluRXZlbnRQYXRoOyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImNGXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyByZWdpc3Rlckxpc3RlbmVyczsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJ1VlwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gdW5yZWdpc3Rlckxpc3RlbmVyczsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5jb25zdCBsaXN0ZW5lclJlZ2lzdHJ5ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHthZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyfSA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZTtcblxuLy8gUmVnaXN0ZXIgZXZlbnQgbGlzdGVuZXJzIHRvIGEga2V5IG9iamVjdFxuLy8gbGlzdGVuZXJzOiBhcnJheSBvZiBsaXN0ZW5lciBkZWZpbml0aW9ucztcbi8vICAgLSBlYWNoIGRlZmluaXRpb24gbXVzdCBiZSBhIGZsYXQgYXJyYXkgb2YgZXZlbnQgdGFyZ2V0IGFuZCB0aGUgYXJndW1lbnRzXG4vLyAgICAgdXNlZCB0byBjYWxsIGFkZEV2ZW50TGlzdGVuZXIoKSBvbiB0aGUgdGFyZ2V0XG5mdW5jdGlvbiByZWdpc3Rlckxpc3RlbmVycyhrZXlPYmosIGxpc3RlbmVycykge1xuICBsZXQgcmVnaXN0ZXJlZCA9IGxpc3RlbmVyUmVnaXN0cnkuZ2V0KGtleU9iaik7XG4gIGlmICghcmVnaXN0ZXJlZCkge1xuICAgIHJlZ2lzdGVyZWQgPSBbXTtcbiAgICBsaXN0ZW5lclJlZ2lzdHJ5LnNldChrZXlPYmosIHJlZ2lzdGVyZWQpO1xuICB9XG4gIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIuY2FsbCguLi5saXN0ZW5lcik7XG4gICAgcmVnaXN0ZXJlZC5wdXNoKGxpc3RlbmVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXJMaXN0ZW5lcnMoa2V5T2JqKSB7XG4gIGxldCBsaXN0ZW5lcnMgPSBsaXN0ZW5lclJlZ2lzdHJ5LmdldChrZXlPYmopO1xuICBpZiAoIWxpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyLmNhbGwoLi4ubGlzdGVuZXIpO1xuICB9KTtcbiAgbGlzdGVuZXJSZWdpc3RyeS5kZWxldGUoa2V5T2JqKTtcbn1cblxuLy8gRXZlbnQuY29tcG9zZWRQYXRoKCkgcG9seWZpbGwgZm9yIEVkZ2Vcbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2tsZWluZnJldW5kL2U5Nzg3ZDczNzc2YzBlMzc1MGRjZmNkYzg5ZjEwMGVjXG5pZiAoIUV2ZW50LnByb3RvdHlwZS5jb21wb3NlZFBhdGgpIHtcbiAgY29uc3QgZ2V0Q29tcG9zZWRQYXRoID0gKG5vZGUsIHBhdGggPSBbXSkgPT4ge1xuICAgIHBhdGgucHVzaChub2RlKTtcblxuICAgIGxldCBwYXJlbnQ7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH0gZWxzZSBpZiAobm9kZS5ob3N0KSB7IC8vIFNoYWRvd1Jvb3RcbiAgICAgIHBhcmVudCA9IG5vZGUuaG9zdDtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGVmYXVsdFZpZXcpIHsgIC8vIERvY3VtZW50XG4gICAgICBwYXJlbnQgPSBub2RlLmRlZmF1bHRWaWV3O1xuICAgIH1cbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0Q29tcG9zZWRQYXRoKHBhcmVudCwgcGF0aCkgOiBwYXRoO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5jb21wb3NlZFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldENvbXBvc2VkUGF0aCh0aGlzLnRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRGcm9tUGF0aChwYXRoLCBjcml0ZXJpYSwgY3VycmVudFRhcmdldCwgaW5kZXggPSAwKSB7XG4gIGNvbnN0IGVsID0gcGF0aFtpbmRleF07XG4gIGlmIChjcml0ZXJpYShlbCkpIHtcbiAgICByZXR1cm4gZWw7XG4gIH0gZWxzZSBpZiAoZWwgPT09IGN1cnJlbnRUYXJnZXQgfHwgIWVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICAvLyBzdG9wIHdoZW4gcmVhY2hpbmcgY3VycmVudFRhcmdldCBvciA8aHRtbD5cbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIGZpbmRGcm9tUGF0aChwYXRoLCBjcml0ZXJpYSwgY3VycmVudFRhcmdldCwgaW5kZXggKyAxKTtcbn1cblxuLy8gU2VhcmNoIGZvciB0aGUgYWN0dWFsIHRhcmdldCBvZiBhIGRlbGVnYXRlZCBldmVudFxuZnVuY3Rpb24gZmluZEVsZW1lbnRJbkV2ZW50UGF0aChldiwgc2VsZWN0b3IpIHtcbiAgY29uc3QgY3JpdGVyaWEgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicgPyBzZWxlY3RvciA6IGVsID0+IGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuICByZXR1cm4gZmluZEZyb21QYXRoKGV2LmNvbXBvc2VkUGF0aCgpLCBjcml0ZXJpYSwgZXYuY3VycmVudFRhcmdldCk7XG59XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDEwNTpcbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIiRDXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBwdXNoVW5pcXVlOyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIkptXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBsYXN0SXRlbU9mOyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcIlc3XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBzdHJpbmdUb0FycmF5OyB9LFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImVtXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBjcmVhdGVUYWdSZXBlYXQ7IH0sXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiakdcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGxpbWl0VG9SYW5nZTsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJsJFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gaGFzUHJvcGVydHk7IH0sXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwibWhcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGlzSW5SYW5nZTsgfSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJ6aFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gb3B0aW1pemVUZW1wbGF0ZUhUTUw7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxuZnVuY3Rpb24gbGFzdEl0ZW1PZihhcnIpIHtcbiAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG59XG5cbi8vIHB1c2ggb25seSB0aGUgaXRlbXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheVxuZnVuY3Rpb24gcHVzaFVuaXF1ZShhcnIsIC4uLml0ZW1zKSB7XG4gIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFyci5wdXNoKGl0ZW0pO1xuICB9KTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHIsIHNlcGFyYXRvcikge1xuICAvLyBjb252ZXJ0IGVtcHR5IHN0cmluZyB0byBhbiBlbXB0eSBhcnJheVxuICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KHNlcGFyYXRvcikgOiBbXTtcbn1cblxuZnVuY3Rpb24gaXNJblJhbmdlKHRlc3RWYWwsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IG1pbk9LID0gbWluID09PSB1bmRlZmluZWQgfHwgdGVzdFZhbCA+PSBtaW47XG4gIGNvbnN0IG1heE9LID0gbWF4ID09PSB1bmRlZmluZWQgfHwgdGVzdFZhbCA8PSBtYXg7XG4gIHJldHVybiBtaW5PSyAmJiBtYXhPSztcbn1cblxuZnVuY3Rpb24gbGltaXRUb1JhbmdlKHZhbCwgbWluLCBtYXgpIHtcbiAgaWYgKHZhbCA8IG1pbikge1xuICAgIHJldHVybiBtaW47XG4gIH1cbiAgaWYgKHZhbCA+IG1heCkge1xuICAgIHJldHVybiBtYXg7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFnUmVwZWF0KHRhZ05hbWUsIHJlcGVhdCwgYXR0cmlidXRlcyA9IHt9LCBpbmRleCA9IDAsIGh0bWwgPSAnJykge1xuICBjb25zdCBvcGVuVGFnU3JjID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKChzcmMsIGF0dHIpID0+IHtcbiAgICBsZXQgdmFsID0gYXR0cmlidXRlc1thdHRyXTtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsID0gdmFsKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3NyY30gJHthdHRyfT1cIiR7dmFsfVwiYDtcbiAgfSwgdGFnTmFtZSk7XG4gIGh0bWwgKz0gYDwke29wZW5UYWdTcmN9PjwvJHt0YWdOYW1lfT5gO1xuXG4gIGNvbnN0IG5leHQgPSBpbmRleCArIDE7XG4gIHJldHVybiBuZXh0IDwgcmVwZWF0XG4gICAgPyBjcmVhdGVUYWdSZXBlYXQodGFnTmFtZSwgcmVwZWF0LCBhdHRyaWJ1dGVzLCBuZXh0LCBodG1sKVxuICAgIDogaHRtbDtcbn1cblxuLy8gUmVtb3ZlIHRoZSBzcGFjaW5nIHN1cnJvdW5kaW5nIHRhZ3MgZm9yIEhUTUwgcGFyc2VyIG5vdCB0byBjcmVhdGUgdGV4dCBub2Rlc1xuLy8gYmVmb3JlL2FmdGVyIGVsZW1lbnRzXG5mdW5jdGlvbiBvcHRpbWl6ZVRlbXBsYXRlSFRNTChodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLz5cXHMrL2csICc+JykucmVwbGFjZSgvXFxzKzwvLCAnPCcpO1xufVxuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA5NDc6XG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIF9fd2VicGFja191bnVzZWRfZXhwb3J0X187XG5cbl9fd2VicGFja191bnVzZWRfZXhwb3J0X18gPSAoeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFdmVudHMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRzKGV2ZW50VHlwZSwgZXZlbnRGdW5jdGlvbnMpIHtcbiAgICAgICAgaWYgKGV2ZW50RnVuY3Rpb25zID09PSB2b2lkIDApIHsgZXZlbnRGdW5jdGlvbnMgPSBbXTsgfVxuICAgICAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgICAgIHRoaXMuX2V2ZW50RnVuY3Rpb25zID0gZXZlbnRGdW5jdGlvbnM7XG4gICAgfVxuICAgIEV2ZW50cy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fZXZlbnRGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoX3RoaXMuX2V2ZW50VHlwZSwgZXZlbnRGdW5jdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50cztcbn0oKSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV2ZW50cztcblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImluaXREYXRlcGlja2Vyc1wiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gaW5pdERhdGVwaWNrZXJzOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBmbG93Yml0ZV9kYXRlcGlja2VyX0RhdGVwaWNrZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNzcwKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBmbG93Yml0ZV9kYXRlcGlja2VyX0RhdGVSYW5nZVBpY2tlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0ODIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9kb21fZXZlbnRzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk0Nyk7XG5cblxuXG52YXIgZ2V0RGF0ZXBpY2tlck9wdGlvbnMgPSBmdW5jdGlvbiBnZXREYXRlcGlja2VyT3B0aW9ucyhkYXRlcGlja2VyRWwpIHtcbiAgdmFyIGJ1dHRvbnMgPSBkYXRlcGlja2VyRWwuaGFzQXR0cmlidXRlKCdkYXRlcGlja2VyLWJ1dHRvbnMnKTtcbiAgdmFyIGF1dG9oaWRlID0gZGF0ZXBpY2tlckVsLmhhc0F0dHJpYnV0ZSgnZGF0ZXBpY2tlci1hdXRvaGlkZScpO1xuICB2YXIgZm9ybWF0ID0gZGF0ZXBpY2tlckVsLmhhc0F0dHJpYnV0ZSgnZGF0ZXBpY2tlci1mb3JtYXQnKTtcbiAgdmFyIG9yaWVudGF0aW9uID0gZGF0ZXBpY2tlckVsLmhhc0F0dHJpYnV0ZSgnZGF0ZXBpY2tlci1vcmllbnRhdGlvbicpO1xuICB2YXIgdGl0bGUgPSBkYXRlcGlja2VyRWwuaGFzQXR0cmlidXRlKCdkYXRlcGlja2VyLXRpdGxlJyk7XG4gIHZhciBvcHRpb25zID0ge307XG4gIGlmIChidXR0b25zKSB7XG4gICAgb3B0aW9ucy50b2RheUJ0biA9IHRydWU7XG4gICAgb3B0aW9ucy5jbGVhckJ0biA9IHRydWU7XG4gIH1cbiAgaWYgKGF1dG9oaWRlKSB7XG4gICAgb3B0aW9ucy5hdXRvaGlkZSA9IHRydWU7XG4gIH1cbiAgaWYgKGZvcm1hdCkge1xuICAgIG9wdGlvbnMuZm9ybWF0ID0gZGF0ZXBpY2tlckVsLmdldEF0dHJpYnV0ZSgnZGF0ZXBpY2tlci1mb3JtYXQnKTtcbiAgfVxuICBpZiAob3JpZW50YXRpb24pIHtcbiAgICBvcHRpb25zLm9yaWVudGF0aW9uID0gZGF0ZXBpY2tlckVsLmdldEF0dHJpYnV0ZSgnZGF0ZXBpY2tlci1vcmllbnRhdGlvbicpO1xuICB9XG4gIGlmICh0aXRsZSkge1xuICAgIG9wdGlvbnMudGl0bGUgPSBkYXRlcGlja2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRlcGlja2VyLXRpdGxlJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59O1xuZnVuY3Rpb24gaW5pdERhdGVwaWNrZXJzKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0ZXBpY2tlcl0nKS5mb3JFYWNoKGZ1bmN0aW9uIChkYXRlcGlja2VyRWwpIHtcbiAgICBuZXcgZmxvd2JpdGVfZGF0ZXBpY2tlcl9EYXRlcGlja2VyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiBbXCJkZWZhdWx0XCJdICovIC5aKGRhdGVwaWNrZXJFbCwgZ2V0RGF0ZXBpY2tlck9wdGlvbnMoZGF0ZXBpY2tlckVsKSk7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaW5saW5lLWRhdGVwaWNrZXJdJykuZm9yRWFjaChmdW5jdGlvbiAoZGF0ZXBpY2tlckVsKSB7XG4gICAgbmV3IGZsb3diaXRlX2RhdGVwaWNrZXJfRGF0ZXBpY2tlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogW1wiZGVmYXVsdFwiXSAqLyAuWihkYXRlcGlja2VyRWwsIGdldERhdGVwaWNrZXJPcHRpb25zKGRhdGVwaWNrZXJFbCkpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGUtcmFuZ2VwaWNrZXJdJykuZm9yRWFjaChmdW5jdGlvbiAoZGF0ZXBpY2tlckVsKSB7XG4gICAgbmV3IGZsb3diaXRlX2RhdGVwaWNrZXJfRGF0ZVJhbmdlUGlja2VyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiBbXCJkZWZhdWx0XCJdICovIC5aKGRhdGVwaWNrZXJFbCwgZ2V0RGF0ZXBpY2tlck9wdGlvbnMoZGF0ZXBpY2tlckVsKSk7XG4gIH0pO1xufVxudmFyIGV2ZW50cyA9IG5ldyBfZG9tX2V2ZW50c19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fW1wiZGVmYXVsdFwiXSgnRE9NQ29udGVudExvYWRlZCcsIFtpbml0RGF0ZXBpY2tlcnNdKTtcbmV2ZW50cy5pbml0KCk7XG59KCk7XG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlcGlja2VyLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyB0YXNrLnRzXG5pbXBvcnQgXCJmbG93Yml0ZS9kaXN0L2RhdGVwaWNrZXIuanNcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==