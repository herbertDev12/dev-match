import { Profile } from './profile.entity';

/**
 * Abstract repository interface for the Profile domain.
 * The application layer depends on this contract — not on Prisma or any ORM.
 * The concrete implementation lives in the infrastructure layer.
 */
export abstract class IProfileRepository {
  abstract findAll(): Promise<Profile[]>;
  abstract findById(id: string): Promise<Profile | null>;
  abstract create(
    data: Pick<Profile, 'name' | 'description'>,
  ): Promise<Profile>;
  abstract update(
    id: string,
    data: Partial<Pick<Profile, 'name' | 'description'>>,
  ): Promise<Profile>;
  abstract delete(id: string): Promise<void>;
}

/** Injection token used with @Inject(PROFILE_REPOSITORY) */
export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');
