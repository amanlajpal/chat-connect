function Message(props: { messageText: string; time: string | Date }) {
  return (
    <div className="bg-white w-1/2 px-4 py-1 border border-inherit rounded-lg">
      <div className="flex items-center gap-2">
        <p className="text-sm">{props?.messageText}</p>
      </div>
      <p className="text-right text-muted-foreground text-xs">{`${props?.time}`}</p>
    </div>
  );
}

export default Message;
