import Message from "../ui/chat/Message.chat";

const Chat = () => {
  return (
    <div className="absolute left-1/2 z-1 mx-auto flex h-full w-full max-w-[800px] -translate-x-1/2 flex-col px-[8px] pt-[32px] md:px-[16px] md:pt-[48px]">
      <Message
        message={{
          type: "message",
          payload: {
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae dui arcu. Ut vel bibendum lorem. Nullam nec dolor purus. Integer semper orci in bibendum aliquam. Maecenas pharetra vestibulum turpis in pretium. Nam tempor id ipsum sed faucibus. Integer congue odio vitae purus interdum ullamcorper. In a ligula et massa posuere mattis at ut risus. Nam pellentesque justo ac lectus interdum accumsan. Sed in congue felis. Phasellus in leo in justo posuere faucibus vitae eu purus. Duis vitae libero tortor. Nulla ultrices interdum odio ut tincidunt.

Mauris a metus sed augue blandit blandit at ac neque. Quisque vulputate, nunc pretium luctus placerat, risus dolor faucibus magna, at lobortis augue sem eget elit. Cras feugiat ligula vitae odio accumsan, et pulvinar velit luctus. Sed ultricies placerat nunc, eget pulvinar nulla. Integer pulvinar egestas rutrum. Vestibulum neque neque, fermentum egestas est quis, ullamcorper euismod nisi. Suspendisse tincidunt laoreet purus. Duis in maximus velit. In eu leo nec dui lobortis tincidunt. Curabitur at nulla non quam ultricies luctus eget vitae leo. Suspendisse in velit pretium, pulvinar diam eget, dignissim est. Vestibulum facilisis tortor sed tincidunt vehicula. Vivamus ornare sem mauris, vitae tincidunt libero maximus vitae. Donec augue neque, dictum et risus id, placerat consectetur tortor.

Ut ut est feugiat, dictum velit eu, interdum libero. Nam lacus enim, mollis quis lacus efficitur, posuere semper augue. Sed egestas aliquam urna nec condimentum. Fusce ut bibendum justo. In hac habitasse platea dictumst. Proin tincidunt felis libero. Pellentesque suscipit iaculis nibh ac hendrerit. Vestibulum lacinia mauris non elit varius, quis viverra lorem lacinia. Duis quis molestie est. In eget ultricies risus. Sed congue, mauris quis iaculis varius, quam purus malesuada urna, eleifend vestibulum dolor turpis id velit. Mauris aliquam, magna sit amet bibendum fringilla, lorem ante pretium nisi, id vestibulum ex libero ac lacus.

`,
          },
          createdAt: new Date(),
          id: "1",
        }}
      />
    </div>
  );
};

export default Chat;
