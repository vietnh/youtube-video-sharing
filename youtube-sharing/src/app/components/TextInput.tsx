export interface TextInputProps {
  name: string
  type: string
  placeholder: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput(props: TextInputProps) {
  const { name, type, placeholder, value, onChange } = props;

  return (
    <div className="relative rounded-md shadow-sm">
      <input
        value={value}
        type={type || "text"}
        name={name}
        id={name}
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}