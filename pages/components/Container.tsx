interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
    max-w-[1920px] 
    mx-auto
    2xl:px-20
    md:px-14
    px-7
    "
    >
      {children}
    </div>
  );
};

export default Container;
