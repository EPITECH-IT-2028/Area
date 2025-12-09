import { Areas } from 'src/generated/graphql';

export interface IActionWorker {
  process(areas: Areas[]): Promise<void>;
}
