/**
 * Domain entity for Profile.
 * Plain class — no framework or ORM dependencies.
 * Business rules and invariants live here.
 */
export class Profile {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
  ) {}

  /**
   * Factory: creates a new (unsaved) Profile with a temporary id placeholder.
   * The repository is responsible for persisting and returning the real id.
   */
  static create(name: string, description: string): Omit<Profile, 'id'> {
    return { name, description };
  }
}
