type logStepTypeT =
  | 'compare'
  | 'found'
  | 'notFound'
  | 'swap'
  | 'replace'
  | 'reduce'
  | 'shift'
  | 'calc'
  | 'push'
  | 'split'
  | 'append'
  | 'highlight';
type stepsLogT = {
  type: logStepTypeT;
  element?:
    | { type: 'index' | 'value'; value: number }
    | { index: number; value: number };
  elements?:
    | { type: 'index' | 'value'; value: number }[]
    | number[]
    | { from: number; to: number };
  range?: { start: number; end: number };
  source?: number;
  target?: { index: number } | number[];
  chunks?: { start: number; end: number }[];
  chunk?: { start: number; end: number };
  value?: number;
}[];
export type { logStepTypeT, stepsLogT };
