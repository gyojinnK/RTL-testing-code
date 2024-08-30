import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm";

test("초기 상태 테스트", () => {
  render(<SummaryForm />);
  const chkbox = screen.getByRole("checkbox", { name: /i agree to/i });
  expect(chkbox).not.toBeChecked();

  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmBtn).toBeDisabled();
});

test("체크박스를 클릭(체크) -> 확인 버튼 활성화", () => {
  render(<SummaryForm />);
  const chkbox = screen.getByRole("checkbox", { name: /i agree to/i });
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(chkbox);
  expect(chkbox).toBeChecked();
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(chkbox);
  expect(chkbox).not.toBeChecked();
  expect(confirmBtn).toBeDisabled();
});
