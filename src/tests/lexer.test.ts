import 'mocha';
import { assert } from 'chai';
import { Token, TokenTag } from '../lexer/token';
import Lexer from '../lexer/lexer';

describe('Lexer', function () {
  it('should parse 2+2', function () {
    assert.deepEqual(new Lexer('2+2').getTokens(), [
      new Token(TokenTag.Number, 0, 1),
      new Token(TokenTag.Plus, 1, 2),
      new Token(TokenTag.Number, 2, 3),
    ]);
  });

  it('should parse 32+442', function () {
    assert.deepEqual(new Lexer('32+442').getTokens(), [
      new Token(TokenTag.Number, 0, 2),
      new Token(TokenTag.Plus, 2, 3),
      new Token(TokenTag.Number, 3, 6),
    ]);
  });

  it('should parse 32+321+154-342', function () {
    assert.deepEqual(new Lexer('32+321+154-342').getTokens(), [
      new Token(TokenTag.Number, 0, 2),
      new Token(TokenTag.Plus, 2, 3),
      new Token(TokenTag.Number, 3, 6),
      new Token(TokenTag.Plus, 6, 7),
      new Token(TokenTag.Number, 7, 10),
      new Token(TokenTag.Minus, 10, 11),
      new Token(TokenTag.Number, 11, 14)
    ]);
  });

  it('should parse floating point numbers', function () {
    assert.deepEqual(new Lexer('3.141592').getTokens(), [
      new Token(TokenTag.Number, 0, 8),
    ]);
  });

  it('should parse one-character tokens', function () {
    assert.deepEqual(new Lexer('(){}.,;^=><+-*/!').getTokens(), [
      new Token(TokenTag.LeftParen, 0, 1),
      new Token(TokenTag.RightParen, 1, 2),
      new Token(TokenTag.LeftCurly, 2, 3),
      new Token(TokenTag.RightCurly, 3, 4),
      new Token(TokenTag.Period, 4, 5),
      new Token(TokenTag.Comma, 5, 6),
      new Token(TokenTag.Semicolon, 6, 7),
      new Token(TokenTag.Circ, 7, 8),
      new Token(TokenTag.Equal, 8, 9),
      new Token(TokenTag.Greater, 9, 10),
      new Token(TokenTag.Less, 10, 11),
      new Token(TokenTag.Plus, 11, 12),
      new Token(TokenTag.Minus, 12, 13),
      new Token(TokenTag.Star, 13, 14),
      new Token(TokenTag.Slash, 14, 15),
      new Token(TokenTag.Bang, 15, 16),
    ]);
  });

  it('should parse identifiers', function () {
    assert.deepEqual(new Lexer('hello world').getTokens(), [
      new Token(TokenTag.Identifier, 0, 5),
      new Token(TokenTag.Identifier, 6, 11),
    ]);
  });

  it('should parse strings', function () {
    assert.deepEqual(new Lexer('"hello, world" "foo" "bar"').getTokens(), [
      new Token(TokenTag.String, 0, 14),
      new Token(TokenTag.String, 15, 20),
      new Token(TokenTag.String, 21, 26),
    ]);
  });

  it('should parse keywords', function () {
    assert.deepEqual(
      new Lexer(
        'else print true if return loop function false'
      ).getTokens(), [
        new Token(TokenTag.Else, 0, 4),
        new Token(TokenTag.Print, 5, 10),
        new Token(TokenTag.True, 11, 15),
        new Token(TokenTag.If, 16, 18),
        new Token(TokenTag.Return, 19, 25),
        new Token(TokenTag.Loop, 26, 30),
        new Token(TokenTag.Function, 31, 39),
        new Token(TokenTag.False, 40, 45),
    ]);
  });

  it('should parse test programm', function () {
    assert.deepEqual(
      new Lexer('function test() {\n     return 2+2;\n}').getTokens(),
      [
        new Token(TokenTag.Function, 0, 8),
        new Token(TokenTag.Identifier, 9, 13),
        new Token(TokenTag.LeftParen, 13, 14),
        new Token(TokenTag.RightParen, 14, 15),
        new Token(TokenTag.LeftCurly, 16, 17),
        new Token(TokenTag.Return, 23, 29),
        new Token(TokenTag.Number, 30, 31),
        new Token(TokenTag.Plus, 31, 32),
        new Token(TokenTag.Number, 32, 33),
        new Token(TokenTag.Semicolon, 33, 34),
        new Token(TokenTag.RightCurly, 35, 36)
      ]
    );
  });
});
