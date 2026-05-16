declare const fn: () => void;
declare const expect: (fn: () => void) => {
  toHaveBeenCalled: () => void;
};

expect(fn).toHaveBeenCalled();
