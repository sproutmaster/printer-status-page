(function() {

  window.addEventListener("load", init);

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

  /**
   * Functions that will be called when page reloaded/opened. If error occurs, it will display it.
   */
  function init() {
    try {
      console.log(data);
      console.log(data2);
      populateCard(data);
      populateCard(data2);
      populateCard(data2);
      // let container = document.getElementById("print-status");
      // container.children[0].appendChild();
    } catch (err) {
      console.log(err);
    }
  }

  function populateCard(data){
    let card = createCard(data.response.message.type === 'color', data);
    setPrinterStatus(card, data);
    setName(card, data);
    setSupplies(card, data);
    setTrays(card, data);
    let container = document.getElementById("print-status");
    container.children[0].appendChild(card);
  }

  function setPrinterStatus(card, data){
    let isError = (data.response.status === "error");
    $(card).attr("class", "card");
    if(isError){
      $(card).addClass("attention");
    } else {
      let haveErrors = (data.response.message.errors.length > 0);
      if(haveErrors){
        $(card).addClass("warning");
        setErrors(card, data);
      } else {
        $(card).addClass("ready")
        noErrors(card);
      }

    }
  }
  function setErrors(card, data){
    data = data.response.message.errors;
    for(let i = 0; i < data.length; i++){
      let result = document.createElement("p");
      result.appendChild(document.createTextNode("- " + data[i]));
      $(card).find(".card-footer").append(result);
    }
  }

  function noErrors(card){
    let result = document.createElement("p");
    result.classList.add("text-center");
    result.appendChild(document.createTextNode("No Errors!"));
    $(card).find(".card-footer").append(result);
  }
  function setName(card, data){
    data = data.response.message.name
    data = data.split("-")[1];
    $(card).find('.card-header-text').text(data);
  }

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
  function setTray(card, id, value) {
    card = $(card);
    if (value === "ok" || value === "40 - 100") {
      value = 100;
    } else if (value === "empty" || value.length === 0) {
      value = 0;
    } else {
      let sorted = value.replace(/\D/g,' ').split(/\s+/);
      if(sorted.length == 1){
        value = parseInt(sorted);
      } else {
        let sum = 0;
        let count = 0;
        for(let i = 0; i < sorted.length; i++){
          if(!isNaN(sorted[i]) && sorted[i] != ""){
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

  function setSupplies(card, data){
    data = data.response.message.supplies;
    for (let key in data) {
      let val = data[key];
      key = key.toLocaleLowerCase().split(" ");
      setSupply(card, key[0], key[1], val);
    }
  }

  function setSupply(card, type, kind, value){
    type = type.toLocaleLowerCase().split(" ")[0];
    card = $(card);
    let sorted = value.replace(/\D/g,' ').split(/\s+/);
    if(sorted.length == 1){
      value = parseInt(sorted);
    } else {
      let sum = 0;
      let count = 0;
      for(let i = 0; i < sorted.length; i++){
        if(!isNaN(sorted[i]) && sorted[i] != ""){
          sum += parseInt(sorted[i]);
          count += 1;
        }
      }
      value = sum/count;
    }
    setProgressBar(card.find("#" + type + "-" + kind), value);
  }

  function setProgressBar(progressBar, val){
    progressBar.attr({"aria-valuenow": val});
    progressBar.animate({"width": val + "%"}, 500);
  }

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
    if(isColor){
      // Cartridges
      progressContainer.classList.add("progress-container");
      progressContainer.appendChild(document.createTextNode("Cartridges"));
      progressContainer.appendChild(createProgressBar('bg-yellow', false, "yellow-cartridge"));
      progressContainer.appendChild(createProgressBar('bg-magenta', false, "magenta-cartridge"));
      progressContainer.appendChild(createProgressBar('bg-cyan', false, "cyan-cartridge"));
      progressContainer.appendChild(createProgressBar('bg-black', false, "black-cartridge"));
      body.appendChild(progressContainer);
      // Kits
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      progressContainer.appendChild(document.createTextNode("Fuser Kit"));
      progressContainer.appendChild(createProgressBar('bg-success', false, "fuser-kit"));
      body.appendChild(progressContainer);
      // second kit
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      progressContainer.appendChild(document.createTextNode("Transfer Kit"));
      progressContainer.appendChild(createProgressBar('bg-success', false, "transfer-kit"));
      body.appendChild(progressContainer);
      // Paper trays
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      progressContainer.appendChild(document.createTextNode("Paper trays"));
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
      progressContainer.appendChild(document.createTextNode("Cartridge"));
      progressContainer.appendChild(createProgressBar('bg-black', false, "black-cartridge"));
      body.appendChild(progressContainer);
      // Kits
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      progressContainer.appendChild(document.createTextNode("Maintenance Kit"));
      progressContainer.appendChild(createProgressBar('bg-success', false, "maintenance-kit"));
      body.appendChild(progressContainer);
      // Trays
      progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      progressContainer.appendChild(document.createTextNode("Paper trays"));
      for(let i = 0; i < 5; i++){
        let currentBar = createProgressBar('test', true, ("paper-tray-" + (i + 1)));
        currentBar.querySelector(".tray-num").appendChild(document.createTextNode(i + 1));
        progressContainer.appendChild(currentBar);
      }
      body.appendChild(progressContainer);
    }





    // Footer
    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    card.appendChild(cardHeader);
    card.appendChild(body);
    card.appendChild(cardFooter);


    // Testing purposes

    return card;
  }

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