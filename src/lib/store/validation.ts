/**
 * Data validation for repository writes.
 *
 * Validators are registered per entity type. The base repository calls
 * validate() before every create/update. Validators return an array of
 * error strings; an empty array means the record is valid.
 */

export type Validator<T> = (data: Partial<T>) => string[];

const registry = new Map<string, Validator<unknown>>();

export function registerValidator<T>(collection: string, validator: Validator<T>): void {
  registry.set(collection, validator as Validator<unknown>);
}

export function validate<T>(collection: string, data: Partial<T>): string[] {
  const validator = registry.get(collection);
  if (!validator) return [];
  return validator(data);
}

export class ValidationError extends Error {
  constructor(
    public readonly errors: string[],
    public readonly collection: string,
  ) {
    super(`Validation failed for ${collection}: ${errors.join("; ")}`);
    this.name = "ValidationError";
  }
}

export function assertValid<T>(collection: string, data: Partial<T>): void {
  const errors = validate(collection, data);
  if (errors.length > 0) throw new ValidationError(errors, collection);
}

// ─── Common validators ────────────────────────────────────────────────────────

export function required(fields: string[]): Validator<Record<string, unknown>> {
  return (data) =>
    fields
      .filter((f) => data[f] === undefined || data[f] === null || data[f] === "")
      .map((f) => `${f} is required`);
}

export function compose<T>(...validators: Validator<T>[]): Validator<T> {
  return (data) => validators.flatMap((v) => v(data));
}
