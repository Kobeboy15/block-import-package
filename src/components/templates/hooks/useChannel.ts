import { Channel } from "../common/channel";
import { API_ROUTES } from "../api/APIRoutes";
import { useSupaQuery } from "../api/useSupaQuery";
import { useEditModeParams } from "../pagebuilder/hooks/useEditModeParams";

export function useChannel() {
  const { isEditMode, previewEndpoint } = useEditModeParams();

  const { data: channel, ...rest } = useSupaQuery<Channel, {}>(
    isEditMode ? previewEndpoint : API_ROUTES.channel,
    { enabled: !isEditMode }
  );

  if (rest.isError) {
    throw new Error("404: App not found.");
  }

  const isSubscribable = () => {
    return channel.availableSubscriptionMethods.includes("STRIPE");
  };

  return { channel: channel, isSubscribable, ...rest };
}
