import { Timer } from '@matrixai/timer';

const AsyncFunction = (async () => {}).constructor;
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;

const contexts = new WeakMap<object, number>();

function getContextIndex(
  target: any,
  key: string | symbol,
  targetName: string,
): number {
  const contextIndex = contexts.get(target[key]);
  if (contextIndex == null) {
    throw new TypeError(
      `\`${targetName}.${key.toString()}\` does not have a \`@context\` parameter decorator`,
    );
  }
  return contextIndex;
}

function checkContextCancellable(
  ctx: any,
  key: string | symbol,
  targetName: string,
): void {
  if (typeof ctx !== 'object' || ctx === null) {
    throw new TypeError(
      `\`${targetName}.${key.toString()}\` decorated \`@context\` parameter is not a context object`,
    );
  }
  if (ctx.signal !== undefined && !(ctx.signal instanceof AbortSignal)) {
    throw new TypeError(
      `\`${targetName}.${key.toString()}\` decorated \`@context\` parameter's \`signal\` property is not an instance of \`AbortSignal\``,
    );
  }
}

function checkContextTimed(
  ctx: any,
  key: string | symbol,
  targetName: string,
): void {
  if (typeof ctx !== 'object' || ctx === null) {
    throw new TypeError(
      `\`${targetName}.${key.toString()}\` decorated \`@context\` parameter is not a context object`,
    );
  }
  if (ctx.signal !== undefined && !(ctx.signal instanceof AbortSignal)) {
    throw new TypeError(
      `\`${targetName}.${key.toString()}\` decorated \`@context\` parameter's \`signal\` property is not an instance of \`AbortSignal\``,
    );
  }
  if (ctx.timer !== undefined && !(ctx.timer instanceof Timer)) {
    throw new TypeError(
      `\`${targetName}.${key.toString()}\` decorated \`@context\` parameter's \`timer\` property is not an instance of \`Timer\``,
    );
  }
}

function isPromiseLike(v: any): v is PromiseLike<unknown> {
  return v != null && typeof v.then === 'function';
}

/**
 * Is generator object
 * Use this to check for generators
 */
function isGenerator(v: any): v is Generator<unknown> {
  return (
    v != null &&
    typeof v[Symbol.iterator] === 'function' &&
    typeof v.next === 'function' &&
    typeof v.return === 'function' &&
    typeof v.throw === 'function'
  );
}

/**
 * Is async generator object
 * Use this to check for async generators
 */
function isAsyncGenerator(v: any): v is AsyncGenerator<unknown> {
  return (
    v != null &&
    typeof v === 'object' &&
    typeof v[Symbol.asyncIterator] === 'function' &&
    typeof v.next === 'function' &&
    typeof v.return === 'function' &&
    typeof v.throw === 'function'
  );
}

export {
  AsyncFunction,
  GeneratorFunction,
  AsyncGeneratorFunction,
  contexts,
  getContextIndex,
  checkContextCancellable,
  checkContextTimed,
  isPromiseLike,
  isGenerator,
  isAsyncGenerator,
};
