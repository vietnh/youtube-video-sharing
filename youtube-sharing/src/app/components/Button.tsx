
export interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export default function Button(props: ButtonProps) {
  const { children, onClick, className } = props;

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};