const PageContainer = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <main className={"container" + className}>{children}</main>;
};

export default PageContainer;
