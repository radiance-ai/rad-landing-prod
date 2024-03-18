import {
  UserNotification,
  userNotificationPayloadSchema,
} from './zod-schemas/notifications';

type NormalizedNotification = {
  title: string;
  description: string;
  image: string;
  type: UserNotification['type'] | 'unknown';
} & (
    | {
      actionType: 'link';
      href: string;
    }
    | {
      actionType: 'button';
    }
  );

export const parseNotification = (
  notificationPayload: unknown,
): NormalizedNotification => {
  try {
    const notification =
      userNotificationPayloadSchema.parse(notificationPayload);
    switch (notification.type) {
      case 'invitedToOrganization':
        return {
          title: 'Invitation to join organization',
          description: `You have been invited to join ${notification.organizationName}`,
          // 2 days ago
          href: `/invitations/${notification.invitationId}`,
          image: '/logos/logo-black.png',
          actionType: 'link',
          type: notification.type,
        };
      case 'acceptedOrganizationInvitation':
        return {
          title: 'Accepted invitation to join organization',
          description: `${notification.userFullName} has accepted your invitation to join your organization`,
          href: `/organization/${notification.organizationId}/settings/members`,
          image: '/logos/logo-black.png',
          actionType: 'link',
          type: notification.type,
        };
      case 'welcome':
        return {
          title: 'Welcome to the Nextbase',
          description:
            'Welcome to the Nextbase Ultimate. We are glad to see you here!',
          actionType: 'button',
          image: '/logos/logo-black.png',
          type: notification.type,
        };
      default: {
        return {
          title: 'Unknown notification type',
          description: 'Unknown notification type',
          href: '#',
          image: '/logos/logo-black.png',
          actionType: 'link',
          type: 'unknown',
        };
      }
    }
  } catch (error) {
    return {
      title: 'Unknown notification type',
      description: 'Unknown notification type',
      image: '/logos/logo-black.png',
      actionType: 'button',
      type: 'unknown',
    };
  }
};
