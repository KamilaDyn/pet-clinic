import { QueryKeys } from './constant';

export const generateUserKey = (userId: string, userToken?: string) => {
  // deliberately exclude the userToken from the dependency array
  //   to keep key consistent for userId regardless of token changes
  return [QueryKeys.user, userId];
};

export const generateUserAppointmentsKey = (
  userId: string,
  userToken: string
) => {
  return [QueryKeys.appointments, QueryKeys.user, userId, userToken];
};
