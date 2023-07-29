import 'mocha';
import { assert } from "chai";
import { Lexer } from '../lexer/lexer';
import { Token, TokenTag } from '../lexer/token';

describe('Lexer', function () {
  it('should parse 2+2', function () {
    assert.strictEqual(new Lexer('2+2', '').getTokens(), [
      new Token(TokenTag.Number, 0, 1),
      new Token(TokenTag.Plus, 1, 2),
      new Token(TokenTag.Number, 2, 3),
    ])
  });
});
