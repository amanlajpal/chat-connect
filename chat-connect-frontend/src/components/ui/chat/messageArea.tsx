import Message from "./message";

function MessageArea() {
  return (
    <>
      <div className="flex justify-start">
        <Message message="Hello, how are you?" time="12:00 PM" />
      </div>
      <div className="flex justify-end">
        <Message message="Hello, how are you?" time="12:00 PM" />
      </div>
    </>
  );
}

export default MessageArea;
