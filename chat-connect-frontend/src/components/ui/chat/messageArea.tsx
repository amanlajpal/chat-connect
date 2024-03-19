import Message from "./message";

function MessageArea(props: any) {
  const { messages, receiver } = props;

  return (
    <>
      <div className="flex justify-start">
        <Message message="Hello, how are you?" time="12:00 PM" />
      </div>
      <div className="flex justify-end">
        <Message message="Hello, how are you?" time="12:00 PM" />
      </div>
      {messages?.map((message: any, index: number) => {
        if (message?.sender === receiver) {
          return (
            <div key={index} className="flex justify-start">
              <Message message={message?.content} time={message?.sentAt} />
            </div>
          );
        } else {
          return (
            <div key={index} className="flex justify-end">
              <Message message={message?.content} time={message?.sentAt} />
            </div>
          );
        }
      })}
    </>
  );
}

export default MessageArea;
