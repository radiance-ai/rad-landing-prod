import { ThemeToggle } from '@/components/presentational/tailwind/ThemeToggle';
import { Notifications } from '@/components/ui/NavigationMenu/Notifications';
import { getUserProfile } from '@/data/user/user';
import { getUserAvatarUrl } from '@/utils/helpers';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { UserNavPopover } from './UserNavPopover';

export async function UserNav() {
  const user = await serverGetLoggedInUser();
  const { email } = user;
  if (!email) {
    // unreachable
    throw new Error('User email not found');
  }

  const userProfile = await getUserProfile(user.id);
  return (
    <>
      <ThemeToggle />
      <Notifications userId={user.id} />

      <UserNavPopover
        avatarUrl={getUserAvatarUrl({
          email,
          profileAvatarUrl: userProfile.avatar_url,
        })}
        userFullname={userProfile.full_name ?? `User ${email}`}
        userEmail={email}
        userId={user.id}
      />
    </>
  );
}
