type Props = {
    children: React.ReactNode;
};  

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className=" lg:block w-92 sticky self-end bottom-6">
      <div className="sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};
