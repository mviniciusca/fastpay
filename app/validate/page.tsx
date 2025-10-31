'use client'

import { useState } from 'react'

interface FormData {
    cpf: string
    birthDate: string
    phone: string
}

interface FormErrors {
    cpf?: string
    birthDate?: string
    phone?: string
}

export default function ValidatePage() {
    const [formData, setFormData] = useState<FormData>({
        cpf: '',
        birthDate: '',
        phone: '',
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [success, setSuccess] = useState(false)

    // Validação de CPF (11 dígitos)
    const validateCPF = (cpf: string): boolean => {
        const cleanCPF = cpf.replace(/\D/g, '')
        return cleanCPF.length === 11
    }

    // Validação de Data de Nascimento
    const validateBirthDate = (date: string): boolean => {
        if (!date) return false

        const today = new Date()
        const birthDate = new Date(date)

        // Verifica se a data é válida
        if (isNaN(birthDate.getTime())) return false

        // Verifica se não é uma data futura
        if (birthDate > today) return false

        // Verifica se a pessoa tem pelo menos 18 anos
        const age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        const dayDiff = today.getDate() - birthDate.getDate()

        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            return false
        }

        return true
    }

    // Validação de Telefone
    const validatePhone = (phone: string): boolean => {
        const cleanPhone = phone.replace(/\D/g, '')
        // Aceita telefones com 10 ou 11 dígitos (com ou sem 9 no celular)
        return cleanPhone.length === 10 || cleanPhone.length === 11
    }

    // Formatar CPF
    const formatCPF = (value: string): string => {
        const clean = value.replace(/\D/g, '')
        if (clean.length <= 11) {
            return clean
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        }
        return value
    }

    // Formatar Telefone
    const formatPhone = (value: string): string => {
        const clean = value.replace(/\D/g, '')
        if (clean.length <= 11) {
            if (clean.length <= 10) {
                return clean
                    .replace(/(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{4})(\d)/, '$1-$2')
            } else {
                return clean
                    .replace(/(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{5})(\d)/, '$1-$2')
            }
        }
        return value
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let formattedValue = value

        if (name === 'cpf') {
            formattedValue = formatCPF(value)
        } else if (name === 'phone') {
            formattedValue = formatPhone(value)
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue,
        }))

        // Limpa o erro quando o usuário começa a digitar
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }))
        }
        setSuccess(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: FormErrors = {}

        // Validar CPF
        if (!formData.cpf) {
            newErrors.cpf = 'CPF é obrigatório'
        } else if (!validateCPF(formData.cpf)) {
            newErrors.cpf = 'CPF deve conter 11 dígitos'
        }

        // Validar Data de Nascimento
        if (!formData.birthDate) {
            newErrors.birthDate = 'Data de nascimento é obrigatória'
        } else if (!validateBirthDate(formData.birthDate)) {
            newErrors.birthDate = 'Data inválida ou idade inferior a 18 anos'
        }

        // Validar Telefone
        if (!formData.phone) {
            newErrors.phone = 'Telefone é obrigatório'
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Telefone deve conter 10 ou 11 dígitos'
        }

        setErrors(newErrors)

        // Se não houver erros, exibe mensagem de sucesso
        if (Object.keys(newErrors).length === 0) {
            setSuccess(true)
            console.log('Formulário válido:', formData)
        }
    }

    const handleReset = () => {
        setFormData({
            cpf: '',
            birthDate: '',
            phone: '',
        })
        setErrors({})
        setSuccess(false)
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black mb-2">
                        Validação de Cadastro
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Preencha seus dados para abrir sua conta
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* CPF */}
                    <div>
                        <label
                            htmlFor="cpf"
                            className="block text-sm font-medium text-black mb-2"
                        >
                            CPF
                        </label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${errors.cpf
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-300 focus:border-black'
                                }`}
                        />
                        {errors.cpf && (
                            <p className="mt-2 text-sm text-black font-medium">
                                ✕ {errors.cpf}
                            </p>
                        )}
                    </div>

                    {/* Data de Nascimento */}
                    <div>
                        <label
                            htmlFor="birthDate"
                            className="block text-sm font-medium text-black mb-2"
                        >
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg text-black focus:outline-none focus:ring-0 transition-colors ${errors.birthDate
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-300 focus:border-black'
                                }`}
                        />
                        {errors.birthDate && (
                            <p className="mt-2 text-sm text-black font-medium">
                                ✕ {errors.birthDate}
                            </p>
                        )}
                    </div>

                    {/* Telefone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-black mb-2"
                        >
                            Telefone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${errors.phone
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-300 focus:border-black'
                                }`}
                        />
                        {errors.phone && (
                            <p className="mt-2 text-sm text-black font-medium">
                                ✕ {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="p-4 bg-black text-white rounded-lg text-center">
                            <p className="font-medium">✓ Dados validados com sucesso!</p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Limpar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Validar
                        </button>
                    </div>
                </form>

                {/* Info */}
                <div className="mt-8 p-4 border-2 border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-black mb-2 text-sm">
                        Requisitos de validação:
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                        <li>• CPF deve conter 11 dígitos numéricos</li>
                        <li>• Data de nascimento deve ser válida</li>
                        <li>• Idade mínima de 18 anos</li>
                        <li>• Telefone deve conter 10 ou 11 dígitos</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
