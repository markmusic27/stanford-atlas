import { useViewportHeight } from "~/hooks/useViewportHeigh";
import Message from "../ui/chat/Message.chat";
import { BAR_HEIGHT, FOOTER_HEIGHT, SPACING } from "~/lib/constants";

const Chat = () => {
  return (
    <div className="absolute flex h-full w-full flex-col overflow-y-auto">
      <div className="mx-auto max-w-[800px] px-[16px] pt-[32px] md:pt-[48px]">
        <Message
          message={{
            type: "message",
            payload: {
              content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae dui arcu. Ut vel bibendum lorem. Nullam nec dolor purus. Integer semper orci in bibendum aliquam. Maecenas pharetra vestibulum turpis in pretium. Nam tempor id ipsum sed faucibus. Integer congue odio vitae purus interdum ullamcorper. In a ligula et massa posuere mattis at ut risus. Nam pellentesque justo ac lectus interdum accumsan. Sed in congue felis. Phasellus in leo in justo posuere faucibus vitae eu purus. Duis vitae libero tortor. Nulla ultrices interdum odio ut tincidunt.

Mauris a metus sed augue blandit blandit at ac neque. Quisque vulputate, nunc pretium luctus placerat, risus dolor faucibus magna, at lobortis augue sem eget elit. Cras feugiat ligula vitae odio accumsan, et pulvinar velit luctus. Sed ultricies placerat nunc, eget pulvinar nulla. Integer pulvinar egestas rutrum. Vestibulum neque neque, fermentum egestas est quis, ullamcorper euismod nisi. Suspendisse tincidunt laoreet purus. Duis in maximus velit. In eu leo nec dui lobortis tincidunt. Curabitur at nulla non quam ultricies luctus eget vitae leo. Suspendisse in velit pretium, pulvinar diam eget, dignissim est. Vestibulum facilisis tortor sed tincidunt vehicula. Vivamus ornare sem mauris, vitae tincidunt libero maximus vitae. Donec augue neque, dictum et risus id, placerat consectetur tortor.`,
            },
            createdAt: new Date(),
            id: "1",
          }}
        />
        <div className={`h-[${FOOTER_HEIGHT}px]`} />
      </div>
    </div>
  );
};

export default Chat;
