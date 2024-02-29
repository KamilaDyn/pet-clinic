import { QueryKeys } from './constant';

export const generateUserKey = (userId: number, userToken?: string) => {
  // deliberately exclude the userToken from the dependency array
  //   to keep key consistent for userId regardless of token changes
  return [QueryKeys.user, userId];
};

export const generateUserAppointmentsKey = (
  userId: number,
  userToken: string
) => {
  return [QueryKeys.appointments, QueryKeys.user, userId, userToken];
};
