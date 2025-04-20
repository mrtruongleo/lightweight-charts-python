import { GlobalParams } from "./global-params";

declare const window: GlobalParams;

export class Menu {
  public id: string;
  public div: HTMLDivElement;
  public content: HTMLDivElement;
  public menuItems: HTMLDivElement;

  constructor(id: string, title: string) {
    this.id = id;

    this.div = document.createElement("div");
    this.div.classList.add("menu");
    this.div.classList.add(`menu-${id}`);
    this.div.style.display = "none";

    // title
    const titleDiv = document.createElement("div");
    titleDiv.style.textAlign = "center";
    titleDiv.style.fontWeight = "bold";
    titleDiv.style.fontSize = "larger";
    titleDiv.style.padding = "10px 0";
    titleDiv.textContent = title;
    this.div.appendChild(titleDiv);

    // content
    this.content = document.createElement("div");
    this.content.style.marginTop = "10px";
    this.content.style.marginBottom = "20px";
    this.content.style.padding = "5px 10px";
    this.div.appendChild(this.content);

    // menu items
    this.menuItems = document.createElement("div");
    this.menuItems.style.display = "flex";
    this.menuItems.style.justifyContent = "space-between";
    this.menuItems.style.padding = "15px 10px";
    this.div.appendChild(this.menuItems);

    // close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      this.hideMenu();
    });
    this.menuItems.appendChild(closeButton);
  }

  showMenu(): HTMLDivElement {
    // this helps when there are multiple menu instances
    document.querySelectorAll(".menu").forEach((menu) => {
      (menu as HTMLDivElement).style.display = "none";
    });
    this.div.style.display = "block";
    return this.div;
  }

  hideMenu() {
    this.div.style.display = "none";
  }

  createSettingsMenu(handler: any) {
    const content = this.content;
    content.innerHTML = "";

    // checkbox for OHLC display
    const showOHLC = document.createElement("div");
    showOHLC.style.display = "flex";
    showOHLC.style.justifyContent = "space-between";
    showOHLC.style.marginBottom = "10px";
    content.appendChild(showOHLC);

    const ohlcLabel = document.createElement("label");
    ohlcLabel.textContent = "Show OHLC: ";
    ohlcLabel.htmlFor = "ohlc-checkbox";
    showOHLC.appendChild(ohlcLabel);

    const ohlcCheckbox = document.createElement("input");
    ohlcCheckbox.type = "checkbox";
    ohlcCheckbox.id = "ohlc-checkbox";
    ohlcCheckbox.checked = handler.legend.ohlcEnabled;
    ohlcCheckbox.addEventListener("change", () => {
      handler.legend.ohlcEnabled = ohlcCheckbox.checked;
    });
    showOHLC.appendChild(ohlcCheckbox);

    // checkbox for percentage display
    const showPercent = document.createElement("div");
    showPercent.style.display = "flex";
    showPercent.style.justifyContent = "space-between";
    showPercent.style.marginBottom = "10px";
    content.appendChild(showPercent);

    const percentLabel = document.createElement("label");
    percentLabel.textContent = "Show % Change: ";
    percentLabel.htmlFor = "percent-checkbox";
    showPercent.appendChild(percentLabel);

    const percentCheckbox = document.createElement("input");
    percentCheckbox.type = "checkbox";
    percentCheckbox.id = "percent-checkbox";
    percentCheckbox.checked = handler.legend.percentEnabled;
    percentCheckbox.addEventListener("change", () => {
      handler.legend.percentEnabled = percentCheckbox.checked;
    });
    showPercent.appendChild(percentCheckbox);

    // checkbox for lines display
    const showLines = document.createElement("div");
    showLines.style.display = "flex";
    showLines.style.justifyContent = "space-between";
    showLines.style.marginBottom = "10px";
    content.appendChild(showLines);

    const linesLabel = document.createElement("label");
    linesLabel.textContent = "Show Lines: ";
    linesLabel.htmlFor = "lines-checkbox";
    showLines.appendChild(linesLabel);

    const linesCheckbox = document.createElement("input");
    linesCheckbox.type = "checkbox";
    linesCheckbox.id = "lines-checkbox";
    linesCheckbox.checked = handler.legend.linesEnabled;
    linesCheckbox.addEventListener("change", () => {
      handler.legend.linesEnabled = linesCheckbox.checked;
    });
    showLines.appendChild(linesCheckbox);

    // checkbox for candle-based coloring
    const candleColor = document.createElement("div");
    candleColor.style.display = "flex";
    candleColor.style.justifyContent = "space-between";
    candleColor.style.marginBottom = "10px";
    content.appendChild(candleColor);

    const candleColorLabel = document.createElement("label");
    candleColorLabel.textContent = "Candle Color for %: ";
    candleColorLabel.htmlFor = "candle-color-checkbox";
    candleColor.appendChild(candleColorLabel);

    const candleColorCheckbox = document.createElement("input");
    candleColorCheckbox.type = "checkbox";
    candleColorCheckbox.id = "candle-color-checkbox";
    candleColorCheckbox.checked = handler.legend.colorBasedOnCandle;
    candleColorCheckbox.addEventListener("change", () => {
      handler.legend.colorBasedOnCandle = candleColorCheckbox.checked;
    });
    candleColor.appendChild(candleColorCheckbox);

    // precision
    const precision = document.createElement("div");
    precision.style.display = "flex";
    precision.style.justifyContent = "space-between";
    precision.style.marginBottom = "10px";
    content.appendChild(precision);

    const precisionLabel = document.createElement("label");
    precisionLabel.textContent = "Price Precision: ";
    precisionLabel.htmlFor = "precision-input";
    precision.appendChild(precisionLabel);

    const precisionInput = document.createElement("input");
    precisionInput.type = "number";
    precisionInput.min = "1";
    precisionInput.max = "8";
    precisionInput.step = "1";
    precisionInput.id = "precision-input";
    precisionInput.value = handler.precision.toString();
    precisionInput.style.width = "50px";
    precisionInput.addEventListener("change", () => {
      handler.precision = parseInt(precisionInput.value);
    });
    precision.appendChild(precisionInput);

    return this;
  }

  addButton(
    text: string,
    callback: (event: MouseEvent) => void,
    type: string = "default"
  ) {
    const button = document.createElement("button");
    button.textContent = text;
    if (type === "primary") {
      button.style.backgroundColor = "var(--primary-button-bg)";
      button.style.color = "white";
    }
    button.addEventListener("click", callback);
    this.menuItems.appendChild(button);
    return button;
  }
}
