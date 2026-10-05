import React from 'react'

const InputField = ({ name, label, type = 'text', placeholder, as = 'input', inputMode, value, onChange, error }) => {
        const Tag = as;

  return (
    
    <>
       <div>
            <label htmlFor={name} className="text-xs text-btnPrimary/50 pl-1">
                {label} <span className="text-red-500">*</span>
            </label>
            <Tag
                id={name}
                name={name}
                type={as === 'input' ? type : undefined}
                inputMode={inputMode}
                rows={as === 'textarea' ? 3 : undefined}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={name === 'help' ? 1000 : name === 'phone' ? 10 : 100}
                required
                className={`w-full mt-1.5 bg-white text-[15px] text-btnPrimary placeholder:text-btnPrimary/30
                  border-b ${error ? 'border-red-500' : 'border-btnPrimary/10'} focus:border-primary outline-none
                  transition-colors duration-200 px-5 py-3 ${as === 'textarea' ? 'resize-none' : ''}`}
            />
            {error && <p className="text-xs text-red-500 pl-1 mt-1">{error}</p>}
        </div>

    </>
  )
}

export default InputField
