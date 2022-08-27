import {
  Browser,
  Builder,
  By,
  Key,
  until,
  WebElement,
} from "selenium-webdriver";
import {Options} from "selenium-webdriver/chrome";

(async () => {
  const options = new Options();
  options.addArguments("user-data-dir=/home/farid/.config/google-chrome");
  options.addArguments("profile-directory='Profile 1'");
  const driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    // .setFirefoxOptions(/* ... */)
    .build();
  try {
    await driver.get("http://localhost:3000");
    await driver.wait(
      until.elementLocated(By.className("button")),
      30000,
      "Timed out after 30 seconds",
      2000
    );
    const buttons = await driver.findElements(By.css(".button"));
    const promises: Promise<string>[] = [];
    buttons.forEach((button) => {
      promises.push(button.getText());
    });
    //console.log(buttons);
    const buttonNames = await Promise.all(promises);

    const googleButton = buttons[0];

    await googleButton?.click();
    const inputElement = await driver.wait(
      until.elementLocated(By.css("input")),
      30000,
      "Timed out after 30 seconds",
      2000
    );
    await inputElement.sendKeys("apptest1000.000@gmail.com", Key.ENTER);
    await driver.wait(() => {
      let returned = false;
      setTimeout(() => {
        returned = true;
      }, 10000);
      return returned;
    }, 15000);
    console.log("waited........");

    const passWordElement = await driver.wait(
      until.elementLocated(By.css("[type='password']")),
      30000,
      "Timed out after 30 seconds",
      2000
    );
    console.log(passWordElement);
    await passWordElement.sendKeys("Apptest90");
  } finally {
    //await driver.quit();
  }
})();
