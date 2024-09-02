import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("서버가 반환한 scoop 이미지를 표시한다.", async () => {
  render(<Options optionType="scoops" />);

  // 이미지 찾기
  // 정규식의 '$'기호는 앞선 텍스트가 해당 문자열의 끝에 있다는 것을 명시한다.
  // ex) 'vanilla-scoop'
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // 이미지의 alt 확인
  // Role을 이용해서 img를 가져왔기 때문에 scoopImages에는 alt 속성이 있음.
  // 이를 map을 이용해서 각 아이템들의 alt를 추출
  const altText = scoopImages.map((element) => element.alt);
  // 배열이나 객체는 .toBe가 아닌 .toEqual로 비교
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("서버가 반환한 topping 이미지를 표시한다.", async () => {
  render(<Options optionType="topping" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
