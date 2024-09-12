import { render, screen } from "@testing-library/react";
import useEvent, { userEvent } from "@testing-library/user-event";
import Options from "../Options";

test("scoop 변경 시 금액 총합 업데이트", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);

  // 총금액을 $0.00로 시작한다.
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // 바닐라 scoop을 1개로 업데이트하고 총액을 확인한다.
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // 해당 요소의 텍스트를 clear한다.
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // 초콜릿 scoop을 2개로 업데이트하고 총금액을 확인한다.
  const chocolateSubtotal = screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateSubtotal);
  await user.type(chocolateSubtotal, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
