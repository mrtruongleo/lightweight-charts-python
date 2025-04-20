import { GlobalParams } from "./global-params";
import { Handler } from "./handler";
declare const window: GlobalParams;

export class TopBar {
  public _div: HTMLDivElement;

  constructor(handler: Handler) {
    const id = handler.id;
    this._div = document.createElement("div");
    this._div.id = `topbar-${id}`;
    this._div.classList.add("topbar");

    let searchButton = document.createElement("button");
    searchButton.innerHTML = "&#x1F50D;"; // magnifying glass emoji
    searchButton.id = `search-button-${id}`;
    searchButton.classList.add("search-button");

    let searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.classList.add("search-input");
    searchInput.id = `search-input-${id}`;
    searchInput.placeholder = "Symbol";

    searchInput.addEventListener("focus", () => (window.textBoxFocused = true));
    searchInput.addEventListener("blur", () => (window.textBoxFocused = false));
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        window.callbackFunction(`search${id}_~_${searchInput.value}`);
      }
    });

    searchButton.addEventListener("click", () => {
      window.callbackFunction(`search${id}_~_${searchInput.value}`);
    });

    const timeframeDiv = document.createElement("div");
    timeframeDiv.id = `timeframe-div-${id}`;
    timeframeDiv.classList.add("timeframe-div");

    const timeframeSelect = document.createElement("select");
    timeframeSelect.id = `timeframe-select-${id}`;
    timeframeSelect.classList.add("timeframe-select");

    const timeframeOptions = [
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "4h",
      "1d",
      "1w",
      "1M",
    ];
    timeframeOptions.forEach((interval) => {
      const option = document.createElement("option");
      option.value = interval;
      option.text = interval;
      timeframeSelect.appendChild(option);
    });

    timeframeSelect.addEventListener("change", () => {
      const selectedTimeframe = timeframeSelect.value;
      window.callbackFunction(`timeframe${id}_~_${selectedTimeframe}`);
    });

    timeframeDiv.appendChild(timeframeSelect);

    this._div.appendChild(searchInput);
    this._div.appendChild(searchButton);
    this._div.appendChild(timeframeDiv);
  }

  toJSON() {
    return {};
  }
}
