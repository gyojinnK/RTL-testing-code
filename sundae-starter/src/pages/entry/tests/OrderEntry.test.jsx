// msw handler를 오버라이드
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

// 실제 데이터 요청이 이루어지는 함수를 오버라이딩하여
// 에러 테스트를 위한 강제 에러 트리거 생성
test.only("/scoop, /topping 비동기 처리 에러 테스트", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  // 요청 -> 반환 함수는 비동기식 동작
  // so. query(find) 사용
  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
