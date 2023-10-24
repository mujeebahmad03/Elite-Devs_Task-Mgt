import { Error, IconCon, InputCon } from "./styles/signup-loginStyles";

export default function InputField({ label, name, type, value, onFocus, onBlur, onChange, required, icon, isFocused, error }) {
  return (
    <InputCon className={isFocused ? 'focus' : ''}>
      <IconCon>{icon}</IconCon>
      <div>
        <label>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          required={required}
        />
        {error && <Error>{error}</Error>}
      </div>
    </InputCon>
  );
}