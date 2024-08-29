import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers";

test("버튼 클릭 flow", () => {
  // render App
  render(<App />);

  // find the button
  const btnElement = screen.getByRole("button", { name: /Midnight Blue/i });

  // check initial color
  expect(btnElement).toHaveClass("medium-violet-red");

  // click the button
  fireEvent.click(btnElement);

  // check button text
  expect(btnElement).toHaveTextContent(/medium violet red/i);

  // check the button color
  expect(btnElement).toHaveClass("midnight-blue");
});

test("체크박스 flow", () => {
  render(<App />);
  const btnElement = screen.getByRole("button", { name: /midnight blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  expect(btnElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  fireEvent.click(checkboxElement);

  expect(btnElement).not.toBeEnabled();
  expect(checkboxElement).toBeChecked();

  fireEvent.click(checkboxElement);

  expect(btnElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});

test("체크박스 disabled flow", () => {
  render(<App />);
  const btnElement = screen.getByRole("button");
  const chkboxElement = screen.getByRole("checkbox");

  // 초기 버튼, 체크박스 상태 테스트
  expect(btnElement).toBeEnabled();
  expect(chkboxElement).not.toBeChecked();

  // 초기 상태에서 disabled 테스트
  fireEvent.click(chkboxElement);
  expect(btnElement).toHaveClass("gray");
  expect(btnElement).not.toBeEnabled();
  expect(chkboxElement).toBeChecked();

  fireEvent.click(chkboxElement);
  expect(btnElement).toHaveClass("medium-violet-red");
  expect(btnElement).toBeEnabled();
  expect(chkboxElement).not.toBeChecked();

  // 버튼 클릭 시 disabled 테스트
  fireEvent.click(btnElement);
  expect(btnElement).toHaveClass("midnight-blue");

  fireEvent.click(chkboxElement);
  expect(chkboxElement).toBeChecked();
  expect(btnElement).not.toBeEnabled();
  expect(btnElement).toHaveClass("gray");

  fireEvent.click(chkboxElement);
  expect(chkboxElement).not.toBeChecked();
  expect(btnElement).toBeEnabled();
  expect(btnElement).toHaveClass("midnight-blue");
});

// 테스트를 그룹화
// 함수 단위의 유닛 테스트
describe("kebabCaseToTitleCase", () => {
  test("하이픈 없음 테스트", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("하이픈 1개 테스트", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("하이픈 n개 테스트", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
