declare const value: number;
declare const expect: (value: number) => {
  toBeNaN: () => void;
};

expect(value).toBeNaN();
