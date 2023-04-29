/**
 * This program implements a status page for printer station and uses API to check the status of the printers.
 */

(function() {

  window.addEventListener("load", init);

  /**
     __________________________________________________
    |                                                  |
    |                   CONSTANTS                      |
    |__________________________________________________|
  */
  const ACCARDION_ERROR_ICON = "assets/icons/error.svg";
  const ACCARDION_CAUTION_ICON = "assets/icons/caution.svg";
  const ACCARDION_NO_ERROR_ICON = "assets/icons/no-errors.svg";

  const DEFAULT_PROGRESS_BAR_VALUE = 0;
  let responce1 = '{\n' +
    '    "status": "system Operational",\n' +
    '    "info": {\n' +
    '        "api_name": "Printer Info Snatcher",\n' +
    '        "version": "1.00",\n' +
    '        "description": "Returns printer info from IP address",\n' +
    '        "supported_printers": "HP Enterprise M-series",\n' +
    '        "request_type": "GET",\n' +
    '        "request_format": "https://ms.bobst-ecs.info/printer_info_snacher?ip=w.x.y.z",\n' +
    '        "response_type": "JSON",\n' +
    '        "authorization": "Not Required"\n' +
    '    },\n' +
    '    "response": {\n' +
    '        "status": "success",\n' +
    '        "message": {\n' +
    '            "host": "172.22.89.18",\n' +
    '            "name": "LL2-Color B",\n' +
    '            "type": "color",\n' +
    '            "model": "HP Color LaserJet M651",\n' +
    '            "serial": "JPCCJ6R1F2",\n' +
    '            "location": "",\n' +
    '            "trays": {\n' +
    '                "Tray 1": {\n' +
    '                    "status": "Empty",\n' +
    '                    "capacity": "100 sheets",\n' +
    '                    "size": "Any Size",\n' +
    '                    "type": "Any Type"\n' +
    '                },\n' +
    '                "Tray 2": {\n' +
    '                    "status": "OK",\n' +
    '                    "capacity": "500 sheets",\n' +
    '                    "size": "Letter",\n' +
    '                    "type": "Any Type"\n' +
    '                }\n' +
    '            },\n' +
    '            "supplies": {\n' +
    '                "Yellow Cartridge": "80",\n' +
    '                "Magenta Cartridge": "50",\n' +
    '                "Cyan Cartridge": "10 - 40",\n' +
    '                "Black Cartridge": "<10",\n' +
    '                "Fuser Kit": "90",\n' +
    '                "Transfer Kit": "20"\n' +
    '            },\n' +
    '            "errors": [\n' +
    '                "Black Cartridge low"\n' +
    '            ]\n' +
    '        }\n' +
    '    }\n' +
    '}'
  let responce3 = '{\n' +
    '    "status": "system Operational",\n' +
    '    "info": {\n' +
    '        "api_name": "Printer Info Snatcher",\n' +
    '        "version": "1.00",\n' +
    '        "description": "Returns printer info from IP address",\n' +
    '        "supported_printers": "HP Enterprise M-series",\n' +
    '        "request_type": "GET",\n' +
    '        "request_format": "https://ms.bobst-ecs.info/printer_info_snacher?ip=w.x.y.z",\n' +
    '        "response_type": "JSON",\n' +
    '        "authorization": "Not Required"\n' +
    '    },\n' +
    '    "response": {\n' +
    '        "status": "success",\n' +
    '        "message": {\n' +
    '            "host": "172.22.89.18",\n' +
    '            "name": "LL2-Color B",\n' +
    '            "type": "color",\n' +
    '            "model": "HP Color LaserJet M651",\n' +
    '            "serial": "JPCCJ6R1F3",\n' +
    '            "location": "",\n' +
    '            "trays": {\n' +
    '                "Tray 1": {\n' +
    '                    "status": "Empty",\n' +
    '                    "capacity": "100 sheets",\n' +
    '                    "size": "Any Size",\n' +
    '                    "type": "Any Type"\n' +
    '                },\n' +
    '                "Tray 2": {\n' +
    '                    "status": "OK",\n' +
    '                    "capacity": "500 sheets",\n' +
    '                    "size": "Letter",\n' +
    '                    "type": "Any Type"\n' +
    '                }\n' +
    '            },\n' +
    '            "supplies": {\n' +
    '                "Yellow Cartridge": "80",\n' +
    '                "Magenta Cartridge": "50",\n' +
    '                "Cyan Cartridge": "10 - 40",\n' +
    '                "Black Cartridge": "80",\n' +
    '                "Fuser Kit": "90",\n' +
    '                "Transfer Kit": "20"\n' +
    '            },\n' +
    '            "errors": [\n' +
    '            ]\n' +
    '        }\n' +
    '    }\n' +
    '}'
  let responce2 = '{\n' +
    '    "status": "system Operational",\n' +
    '    "info": {\n' +
    '        "api_name": "Printer Info Snatcher",\n' +
    '        "version": "1.00",\n' +
    '        "description": "Returns printer info from IP address",\n' +
    '        "supported_printers": "HP Enterprise M-series",\n' +
    '        "request_type": "GET",\n' +
    '        "request_format": "https://ms.bobst-ecs.info/printer_info_snacher?ip=w.x.y.z",\n' +
    '        "response_type": "JSON",\n' +
    '        "authorization": "Not Required"\n' +
    '    },\n' +
    '    "response": {\n' +
    '        "status": "success",\n' +
    '        "message": {\n' +
    '            "host": "172.22.89.74",\n' +
    '            "name": "LL2-PRINTER B",\n' +
    '            "type": "grayscale",\n' +
    '            "model": "HP LaserJet M806",\n' +
    '            "serial": "JPDCM2S084",\n' +
    '            "location": "",\n' +
    '            "trays": {\n' +
    '                "Tray 1": {\n' +
    '                    "status": "Empty",\n' +
    '                    "capacity": "100 sheets",\n' +
    '                    "size": "Any Size",\n' +
    '                    "type": "Any Type"\n' +
    '                },\n' +
    '                "Tray 2": {\n' +
    '                    "status": "",\n' +
    '                    "capacity": "500 sheets",\n' +
    '                    "size": "Letter",\n' +
    '                    "type": "Plain"\n' +
    '                },\n' +
    '                "Tray 3": {\n' +
    '                    "status": "40 - 100",\n' +
    '                    "capacity": "500 sheets",\n' +
    '                    "size": "Letter",\n' +
    '                    "type": "Plain"\n' +
    '                },\n' +
    '                "Tray 4": {\n' +
    '                    "status": "40 - 100",\n' +
    '                    "capacity": "1500 sheets",\n' +
    '                    "size": "Letter",\n' +
    '                    "type": "Plain"\n' +
    '                },\n' +
    '                "Tray 5": {\n' +
    '                    "status": "40 - 100",\n' +
    '                    "capacity": "2000 sheets",\n' +
    '                    "size": "Letter",\n' +
    '                    "type": "Plain"\n' +
    '                }\n' +
    '            },\n' +
    '            "supplies": {\n' +
    '                "Black Cartridge": "40",\n' +
    '                "Maintenance Kit": "20"\n' +
    '            },\n' +
    '            "errors": [\n' +
    '            ]\n' +
    '        }\n' +
    '    }\n' +
    '}';

  let data = JSON.parse(responce1);
  let data2 = JSON.parse(responce2);
  let data3 = JSON.parse(responce3);

  /**
   * Functions that will be called when page reloaded/opened. If error occurs, it will display it.
   */
  function init() {
    try {
      populateCard(data);
      populateCard(data2);
      populateCard(data3);
      // viewSettings();
    } catch (err) {
      console.log(err);
    }
  }


  /**
   * Sets up the filter bar
   */
  function viewSettings(){
    setView();
    $("#filter-menu .view-settings input").on("click", setView)
  }

  /**
   * Checks whether the current view of the cards is listview or cardview,
   * and sets up the cards' view accordingly.
   */
  function setView(){
    if(isList()){
      $("#print-status").addClass("list-view");
    } else {
      $("#print-status").removeClass("list-view");
    }
  }

  /**
   * Checks whether the current view of the cards is listview or cardview.
   * @returns {boolean} - true if it is listview. False otherwise.
   */
  function isList(){
    return $("#filter-menu .view-settings input").is(':checked');
  }

  /**
   * Takes in a parsed JSON data and populates the cards according to the data.
   * @param {JSON} data - card that needs to be inserted in the main view.
   */
  function populateCard(data){
    let card = createCard(data.response.message.type === 'color', data);
    setPrinterStatus(card, data);
    setName(card, data);
    setSupplies(card, data);
    setTrays(card, data);
    let container = document.getElementById("print-status");
    container.children[0].appendChild(card);
  }

  /**
   * Takes in a JSON data and  a card HTML element and sets up printer status according to the data.
   * @param {HTMLElement} card - card that needs to be set up.
   * @param {JSON} data - data according to which the card is set up.
   */
  function setPrinterStatus(card, data){
    let isError = (data.response.status === "error");
    $(card).attr("class", "card");
    if(isError){
      $(card).addClass("attention");
    } else {
      let haveErrors = (data.response.message.errors.length > 0);
      if(haveErrors){
        $(card).addClass("warning");
        $(card).find(".accordion-button img").attr("src", ACCARDION_CAUTION_ICON);
        setErrors(card, data);
      } else {
        $(card).addClass("ready")
        $(card).find(".accordion-button img").attr("src", ACCARDION_NO_ERROR_ICON);
        noErrors(card);
      }

    }
  }

  /**
   * Takes in a JSON data and a card HTML element and sets up errors for that card.
   * @param {HTMLElement} card - card that needs to be set up.
   * @param {JSON} data - data from which the error messages is extracted.
   */
  function setErrors(card, data){
    data = data.response.message.errors;
    $(card).find(".accordion-body").innerHTML = "";
    for(let i = 0; i < data.length; i++){
      let result = document.createElement("p");
      result.appendChild(document.createTextNode("- " + data[i]));
      $(card).find(".accordion-body").append(result);
    }
  }

  /**
   * Takes in card HTML element and sets up no Errors for that card.
   * @param {HTMLElement} card - card that needs to be set up.
   */
  function noErrors(card){
    $(card).find(".accordion-body").innerHTML = "";
    let result = document.createElement("p");
    result.classList.add("text-center");
    result.appendChild(document.createTextNode("No Errors!"));
    $(card).find(".accordion-body").append(result);
  }

  /**
   * Takes in a JSON data and a card HTML element and sets name of the printer for that card.
   * @param {HTMLElement} card - card that needs to be set up.
   * @param {JSON} data - data from which the name of the card is extracted.
   */
  function setName(card, data){
    data = data.response.message.name
    data = data.split("-")[1];
    $(card).find('.card-header-text').text(data);
  }

  /**
   * Takes in a JSON data and a card HTML element and sets up multiple trays
   * of the printer for that card.
   * @param {HTMLElement} card - card that needs to be set up.
   * @param {JSON} data - data from which the trays' informaton is extracted.
   */
  function setTrays(card, data){
    data = data.response.message.trays
    let counter = 1;
    for (let key in data) {
      let val = data[key].status.toLowerCase();
      key = key.toLocaleLowerCase().split(" ");
      setTray(card, "paper-tray-" + counter, val);
      counter++;
    }
  }

  /**
   * Takes in card HTML element and sets up single tray of the printer for that card.
   * @param {HTMLElement} card - card that needs to be set up.
   * @param {string} id - specific number of the tray for that specific card
   * @param {string} value - value to which the trays are set
   */
  function setTray(card, id, value) {
    card = $(card);
    if (value === "ok" || value === "40 - 100") {
      value = 100;
    } else if (value === "empty" || value.length === 0) {
      value = 0;
    } else {
      let sorted = value.replace(/\D/g,' ').split(/\s+/);
      if(sorted.length === 1){
        value = parseInt(sorted);
      } else {
        let sum = 0;
        let count = 0;
        for(let i = 0; i < sorted.length; i++){
          if(!isNaN(sorted[i]) && sorted[i] !== ""){
            sum += parseInt(sorted[i]);
            count += 1;
          }
        }
        value = sum/count;
      }
    }
    let classes = card.find("#container-" + id);
    classes.attr("class", "paper-tray");
    if(value >= 60){
      classes.addClass("ready");
      classes.children(".error-msg").text("")
    } else if(value > 0 && value < 60){
      classes.addClass("warning");
      classes.children(".error-msg").text("")
    } else if (value === 0){
      classes.addClass("attention");
      classes.addClass("is-error");
      classes.children(".error-msg").text("Empty")
    }
    setProgressBar(card.find("#" + id), value);
  }

  /**
   * Takes in a JSON data and a card HTML element and sets up multiple supply progress bars for the card
   * @param {HTMLElement} card - card that needs to be set up.
   * @param {JSON} data - data from which progressbar info is extracted.
   */
  function setSupplies(card, data){
    data = data.response.message.supplies;
    for (let key in data) {
      let val = data[key];
      key = key.toLocaleLowerCase().split(" ");
      setSupply(card, key[0], key[1], val);
    }
  }

  /**
   * Takes in the card which supply progressbor needs to be set up and sets up the
   * progressbar according to given parameters
   * @param {HTMLElement} card - card which supply progressbar needs to be set up.
   * @param {string} type - color of the supply progress bar
   * @param {string} kind - type of supply.
   * @param {string} value - value to which supply progressbar needs to be set up.
   */
  function setSupply(card, type, kind, value){
    type = type.toLocaleLowerCase().split(" ")[0];
    card = $(card);
    let sorted = value.replace(/\D/g,' ').split(/\s+/);
    if(sorted.length === 1){
      value = parseInt(sorted);
    } else {
      let sum = 0;
      let count = 0;
      for(let i = 0; i < sorted.length; i++){
        if(!isNaN(sorted[i]) && sorted[i] !== ""){
          sum += parseInt(sorted[i]);
          count += 1;
        }
      }
      value = sum/count;
    }
    setProgressBar(card.find("#" + type + "-" + kind), value);
  }

  /**
   * Takes in a data about the progress bar and sets up the value for it.
   * @param {HTMLElement} progressBar - Progress bar that needs to be set up
   * @param {float} val - value to which progressbar needs to be set up.
   */
  function setProgressBar(progressBar, val){
    progressBar.attr({"aria-valuenow": val});
    progressBar.animate({"width": val + "%"}, 500);
  }

  /**
   * Takes in a data about a card and generates the card according to it.
   * @param {boolean} isColor - true if it is a color printer. False, otherwise.
   * @param {JSON} data - data by which the printer is set up.
   * @returns {HTMLElement} - ready but empty card.
   */
  function createCard(isColor, data){
    // Main card
    let card = document.createElement("div");
    if(isColor){
      card.classList.add("card", "color");
    } else {
      card.classList.add("card", "black-white-printer");
    }

    // Header
    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "text-center");
    let cardHeaderText = document.createElement("div");
    cardHeaderText.classList.add("card-header-text", "text-center");
    let settings = document.createElement("a");
    settings.classList.add("settings");
    settings.href = data.response.message.host;
    let settingsImg = document.createElement("img");
    settingsImg.src = "assets/icons/gear.svg";
    settingsImg.alt = "Gear Icon";
    settings.appendChild(settingsImg);
    cardHeader.appendChild(cardHeaderText);
    cardHeader.appendChild(settings);

    // Body

    let body = document.createElement("div");
    body.classList.add("card-body");

    let progressContainer = document.createElement("div");
    let kitName = document.createElement("div");

    if(isColor){
      // Cartridges
      progressContainer.classList.add("progress-container");
      kitName.appendChild(document.createTextNode("Cartridges"));
      progressContainer.appendChild(kitName);
      progressContainer.appendChild(createProgressBar('bg-yellow', false, "yellow-cartridge"));
      progressContainer.appendChild(createProgressBar('bg-magenta', false, "magenta-cartridge"));
      progressContainer.appendChild(createProgressBar('bg-cyan', false, "cyan-cartridge"));
      progressContainer.appendChild(createProgressBar('bg-black', false, "black-cartridge"));
      body.appendChild(progressContainer);
      // Kits
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      kitName = document.createElement("div");
      kitName.appendChild(document.createTextNode("Fuser Kit"));
      progressContainer.appendChild(kitName);
      progressContainer.appendChild(createProgressBar('bg-success', false, "fuser-kit"));
      body.appendChild(progressContainer);
      // second kit
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      kitName = document.createElement("div");
      kitName.appendChild(document.createTextNode("Transfer Kit"));
      progressContainer.appendChild(kitName);
      progressContainer.appendChild(createProgressBar('bg-success', false, "transfer-kit"));
      body.appendChild(progressContainer);
      // Paper trays
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      kitName = document.createElement("div");
      kitName.appendChild(document.createTextNode("Paper Trays"));
      progressContainer.appendChild(kitName);
      for(let i = 0; i < 2; i++){
        let currentBar = createProgressBar('test', true, ("paper-tray-" + (i + 1)));
        currentBar.querySelector(".tray-num").appendChild(document.createTextNode(i + 1));
        progressContainer.appendChild(currentBar);
      }
      body.appendChild(progressContainer);
    } else {
      // Cartridges
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      kitName = document.createElement("div");
      kitName.appendChild(document.createTextNode("Cartridge"));
      progressContainer.appendChild(kitName);
      progressContainer.appendChild(createProgressBar('bg-black', false, "black-cartridge"));
      body.appendChild(progressContainer);
      // Kits
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      kitName = document.createElement("div");
      kitName.appendChild(document.createTextNode("Maintenance Kit"));
      progressContainer.appendChild(kitName);
      progressContainer.appendChild(createProgressBar('bg-success', false, "maintenance-kit"));
      body.appendChild(progressContainer);
      // Trays
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      kitName = document.createElement("div");
      kitName.appendChild(document.createTextNode("Paper trays"));
      progressContainer.appendChild(kitName);
      for(let i = 0; i < 5; i++){
        let currentBar = createProgressBar('test', true, ("paper-tray-" + (i + 1)));
        currentBar.querySelector(".tray-num").appendChild(document.createTextNode(i + 1));
        progressContainer.appendChild(currentBar);
      }
      body.appendChild(progressContainer);
    }





    // Footer
    let cardMessageBlock = document.createElement("div");
    cardMessageBlock.classList.add("card-message-block");
    cardMessageBlock.appendChild(createMessageBlock(data));

    let cardMain = document.createElement("div");
    cardMain.classList.add("card-main-block");

    cardMain.appendChild(cardHeader);
    cardMain.appendChild(body);
    card.appendChild(cardMain);
    card.appendChild(cardMessageBlock);


    return card;
  }

  /**
   * Takes in a data about a card and generates the message dropdown menu.
   * @param {JSON} data - data by which the message dropdown menu is set up.
   * @returns {HTMLElement} - ready but empty message block.
   */
  function createMessageBlock(data){

    let serial = data.response.message.serial;

    const accordionId1 = "accordion-parrent-id-" + serial;
    const accordionId2 = "accordion-child-id-" + serial;


    let accordion = document.createElement("div");
    accordion.classList.add("accordion");
    accordion.id = accordionId1;

    let accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    let accordionHeader = document.createElement("h2");
    accordionHeader.classList.add("accordion-header");
    accordionHeader.id = "headingOne";

    let accordionHeaderButton = document.createElement("button");
    accordionHeaderButton.classList.add("accordion-button", "collapsed");
    accordionHeaderButton.setAttribute("type", "button");
    accordionHeaderButton.setAttribute("data-mdb-toggle", "collapse");
    accordionHeaderButton.setAttribute("data-mdb-target", ("#" + accordionId2));
    accordionHeaderButton.setAttribute("aria-expanded", "true");
    accordionHeaderButton.setAttribute("aria-controls", accordionId1);

    let icon = document.createElement("img");
    icon.src = ACCARDION_CAUTION_ICON;
    icon.alt = "error-icon";
    accordionHeaderButton.appendChild(icon);


    let accordionCollapse = document.createElement("div");
    accordionCollapse.id = accordionId2;
    accordionCollapse.classList.add("accordion-collapse", "collapse");
    accordionCollapse.setAttribute("aria-labelledby", "headingOne");
    accordionCollapse.setAttribute("data-mdb-parent", ("#" + accordionId1));


    let accordionBody = document.createElement("div");
    accordionBody.classList.add("accordion-body");
    accordionBody.textContent = ""; // dummy text

    accordionCollapse.appendChild(accordionBody);
    accordionHeader.appendChild(accordionHeaderButton)
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionCollapse);
    accordion.appendChild(accordionItem);

    return accordion;
  }

  /**
   * Takes in a color type about a progressbar and generates a single progressbar.
   * @param {string} color - Color of the progress bar
   * @param {boolean} isPaper - True if the progressbar is for paper trays. False, otherwise.
   * @param {string} id - name for the progressbar.
   * @returns {HTMLElement} - ready but empty progressbar.
   */
  function createProgressBar(color, isPaper, id){
    let progress = document.createElement("div");
    progress.classList.add("progress");
    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar", color);
    progressBar.setAttribute("id", id);

    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuenow", DEFAULT_PROGRESS_BAR_VALUE);
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
    progressBar.style.width = DEFAULT_PROGRESS_BAR_VALUE + "%";
    progress.appendChild(progressBar);
    if(isPaper){
      let paperTray = document.createElement("div");
      paperTray.classList.add("paper-tray");
      paperTray.setAttribute("id", "container-" + id);
      let trayNum = document.createElement("span");
      trayNum.classList.add("tray-num", color);
      let errorMsg = document.createElement("div");
      errorMsg.classList.add("error-msg");
      paperTray.appendChild(trayNum);
      paperTray.appendChild(errorMsg);
      paperTray.appendChild(progress);
      return paperTray;
    } else {
      return progress;
    }

  }


})();