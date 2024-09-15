import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

// 커스텀 렌더 생성하기
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

export * from "@testing-library/react";

// render 메소드 override
export { renderWithContext as render };
