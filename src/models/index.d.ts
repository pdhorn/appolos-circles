import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerHighScore = {
  readonly id: string;
  readonly name: string;
  readonly score: number;
}

type LazyHighScore = {
  readonly id: string;
  readonly name: string;
  readonly score: number;
}

export declare type HighScore = LazyLoading extends LazyLoadingDisabled ? EagerHighScore : LazyHighScore

export declare const HighScore: (new (init: ModelInit<HighScore>) => HighScore) & {
  copyOf(source: HighScore, mutator: (draft: MutableModel<HighScore>) => MutableModel<HighScore> | void): HighScore;
}

type EagerGame = {
  readonly id: string;
  readonly startDate: string;
  readonly name?: string | null;
  readonly score?: number | null;
}

type LazyGame = {
  readonly id: string;
  readonly startDate: string;
  readonly name?: string | null;
  readonly score?: number | null;
}

export declare type Game = LazyLoading extends LazyLoadingDisabled ? EagerGame : LazyGame

export declare const Game: (new (init: ModelInit<Game>) => Game) & {
  copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}