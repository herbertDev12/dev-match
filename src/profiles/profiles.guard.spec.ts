import { ProfilesGuard } from './infrastructure/profiles.guard';

describe('ProfilesGuard', () => {
  it('should be defined', () => {
    expect(new ProfilesGuard()).toBeDefined();
  });
});
