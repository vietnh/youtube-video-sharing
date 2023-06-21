export interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ left, right }: HeaderProps) {
  return (
    <nav className="fixed left-0 top-0 w-full bg-gray-800 flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center">{left}</div>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        {right}
      </div>
    </nav>
  );
}
