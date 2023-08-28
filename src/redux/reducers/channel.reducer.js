import { CHANNEL_DETAIL_FAIL, CHANNEL_DETAIL_REQUIRED, CHANNEL_DETAIL_SUCCESS, CHANNEL_SUBSCRIPTION_STATUS } from "../actionType";

export const channelDetailsReducer = (
  state = {
    loading: false,
    channel: {},
    subscriptionStatus: false
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case CHANNEL_DETAIL_REQUIRED:
      return {
        ...state,
        loading: true
      }

    case CHANNEL_DETAIL_SUCCESS:
      return {
        ...state,
        channel: payload,
        loading: false
      }

    case CHANNEL_DETAIL_FAIL:
      return {
        ...state,
        channel: null,
        loading: false,
        error: payload
      }

    case CHANNEL_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: payload
      }

    default:
      return state;
  }
}
