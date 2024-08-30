import { render, screen } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm";
import userEvent from "@testing-library/user-event";

test("초기 상태 테스트", () => {
  render(<SummaryForm />);
  const chkbox = screen.getByRole("checkbox", { name: /i agree to/i });
  expect(chkbox).not.toBeChecked();

  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmBtn).toBeDisabled();
});

test("체크박스를 클릭(체크) -> 확인 버튼 활성화", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const chkbox = screen.getByRole("checkbox", { name: /i agree to/i });
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });

  await user.click(chkbox);
  expect(chkbox).toBeChecked();
  expect(confirmBtn).toBeEnabled();

  await user.click(chkbox);
  expect(chkbox).not.toBeChecked();
  expect(confirmBtn).toBeDisabled();
});

test("hover 시 popover가 등장한다.", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // 초기 상태: hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // hover했을 경우: visible
  const termsAndCondition = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndCondition);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // unHover했을 경우: hidden
  await user.unhover(termsAndCondition);
  expect(popover).not.toBeInTheDocument();
});
