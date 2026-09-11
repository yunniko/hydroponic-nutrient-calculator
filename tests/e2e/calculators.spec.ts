import { expect, test } from "@playwright/test";

test("EC/PPM converter computes default EC to PPM on the 500 scale", async ({ page }) => {
  await page.goto("/ec-ppm-converter");
  // 1.4 mS/cm x 500 = 700 ppm.
  await expect(page.getByTestId("result")).toContainText("700 ppm");
  await expect(page.getByTestId("result")).toContainText("on the 500 scale");
});

test("EC/PPM converter recomputes when the scale changes", async ({ page }) => {
  await page.goto("/ec-ppm-converter");
  await page.getByLabel("Meter scale").selectOption("700");
  // 1.4 mS/cm x 700 = 980 ppm.
  await expect(page.getByTestId("result")).toContainText("980 ppm");
  await expect(page.getByTestId("all-scales")).toContainText("500 scale: 700 ppm");
});

test("EC/PPM converter switches direction to PPM to EC", async ({ page }) => {
  await page.goto("/ec-ppm-converter");
  await page.getByLabel("Conversion direction").selectOption("ppmToEc");
  await page.getByLabel("PPM").fill("700");
  await expect(page.getByTestId("result")).toContainText("1.4 mS/cm");
});

test("EC/PPM converter rejects a negative value", async ({ page }) => {
  await page.goto("/ec-ppm-converter");
  await page.getByLabel("EC in mS/cm").fill("-1");
  await expect(page.getByTestId("result").getByRole("alert")).toContainText(
    "non-negative number",
  );
});

test("nutrient dosing calculator computes a baseline-corrected target reading by default", async ({
  page,
}) => {
  await page.goto("/nutrient-dosing-calculator");
  // 1.4 desired + 0.3 baseline = 1.7 mS/cm.
  await expect(page.getByTestId("result")).toContainText("1.7 mS/cm");
});

test("nutrient dosing calculator switches to dilution mode and computes added volume", async ({
  page,
}) => {
  await page.goto("/nutrient-dosing-calculator");
  await page.getByRole("button", { name: "Dilute an over-strength reservoir" }).click();
  // 10 * (2.0 - 1.6) / (1.6 - 0.3) ≈ 3.08.
  await expect(page.getByTestId("result")).toContainText("Add");
  await expect(page.getByTestId("result")).toContainText("3.08");
});

test("nutrient dosing calculator rejects a target EC that isn't below the current EC", async ({
  page,
}) => {
  await page.goto("/nutrient-dosing-calculator");
  await page.getByRole("button", { name: "Dilute an over-strength reservoir" }).click();
  await page.getByLabel("Target EC in mS/cm").fill("2.5");
  await expect(page.getByTestId("result").getByRole("alert")).toContainText(
    "must be lower than the current EC",
  );
});

test("EC/pH reference chart lists common crops", async ({ page }) => {
  await page.goto("/hydroponic-ec-reference");
  await expect(page.getByRole("cell", { name: "Lettuce" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Tomato" })).toBeVisible();
});

test("homepage links reach every tool", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("tool-card-ec-ppm-converter").click();
  await expect(page).toHaveURL(/\/ec-ppm-converter$/);
});
