import React, { useState, useEffect } from 'react';

const DynamicForm = ({ schema, initialValues, onSubmit, onCancel, title }) => {
    const [formData, setFormData] = useState(initialValues || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const validateField = (name, value) => {
        const field = schema.find(f => f.name === name);
        if (!field) return "";

        if (field.required && !value) {
            return `${field.label} is required`;
        }

        if (field.pattern && value) {
            const regex = new RegExp(field.pattern);
            if (!regex.test(value)) {
                return field.errorMessage || `Invalid ${field.label}`;
            }
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        let isValid = true;

        schema.forEach(field => {
            const error = validateField(field.name, formData[field.name]);
            if (error) {
                newErrors[field.name] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            onSubmit(formData);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-auto animate-fade-in-down animate-duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {schema.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type={field.type || 'text'}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors[field.name]
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                        {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-600 animate-shake animate-duration-300">
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                ))}
                <div className="flex justify-end space-x-3 mt-6 *:cursor-pointer">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform active:scale-95"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
