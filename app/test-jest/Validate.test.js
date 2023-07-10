const Validate = require("../validate");

test('入力値が 整数(正) ならtrueを返す', () => {
    expect(Validate.isNum(100000)).toEqual(true);
})

test('入力値が 整数(負) ならfalseを返す', () => {
    expect(Validate.isNum(-100)).toEqual(false);
})
test('入力値が 文字 ならFALSEを返す', () => {
    expect(Validate.isNum("momomoも")).toEqual(false);
})

test('入力値が 少数 ならFALSEを返す', () => {
    expect(Validate.isNum(0.1111)).toEqual(false);
})

test('入力値が true ならFALSEを返す', () => {
    expect(Validate.isNum(true)).toEqual(false);
})

test('入力値が null ならFALSEを返す', () => {
    expect(Validate.isNum(null)).toEqual(false);
})
test('入力値が NaN ならFALSEを返す', () => {
    expect(Validate.isNum(NaN)).toEqual(false);
})
test('入力値が Infinity ならFALSEを返す', () => {
    expect(Validate.isNum(Infinity)).toEqual(false);
})

test("メールアドレスの形式チェック 正しい例" , () => {
    expect(Validate.isEmail("tsukasa815@gmail.com")).toEqual(true);
})
test("メールアドレスの形式チェック 正しい例途中記号" , () => {
    expect(Validate.isEmail("tsukasa--8.15@gmail.com")).toEqual(true);
})

test("メールアドレスの形式チェック @なし false" , () => {
    expect(Validate.isEmail("tsukasa--8.15gmail.com")).toEqual(false);
})

test("メールアドレスの形式チェック ..ドット開始 false" , () => {
    expect(Validate.isEmail(".tsukasa--8.15gmail.com")).toEqual(false);
})
test("メールアドレスの形式チェック ..ドット二連 false" , () => {
    expect(Validate.isEmail("tsukasa--8..15gmail.com")).toEqual(false);
})
