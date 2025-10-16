'use client';

import React, { useState } from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | string;
  border?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  textSize?: string;
  fontWeight?: string;
  className?: string;
}

export default function Button({
  variant = 'primary',
  children,
  size = 'medium',
  border,
  borderColor,
  hoverBorderColor,
  backgroundColor,
  hoverBackgroundColor,
  textColor,
  hoverTextColor,
  textSize,
  fontWeight,
  className = '',
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizePresets = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const sizeClass = sizePresets[size as keyof typeof sizePresets] || size;

  let variantClasses = '';
  if (variant === 'primary') {
    if (isHovered) {
      variantClasses = 'bg-white text-teal-700 border-teal-500';
    } else {
      variantClasses = 'bg-teal-600 text-white border-teal-600';
    }
  } else if (variant === 'secondary') {
    if (isHovered) {
      variantClasses = 'bg-teal-600 text-white border-teal-600';
    } else {
      variantClasses = 'bg-white text-teal-700 border-teal-500';
    }
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent text-teal-700 border-teal-500 hover:bg-teal-600 hover:text-white hover:border-teal-600';
  }

  const shadcnVariant = variant === 'primary' ? 'default' : variant === 'secondary' ? 'outline' : 'outline';

  return (
    <ShadcnButton
      variant={shadcnVariant}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md transition-all duration-200 font-medium',
        // Size
        sizeClass,
        // Variant styles (if no custom props provided)
        !backgroundColor && !textColor ? variantClasses : '',
        // Custom styles
        backgroundColor || '',
        hoverBackgroundColor ? `hover:${hoverBackgroundColor}` : '',
        textColor || '',
        hoverTextColor ? `hover:${hoverTextColor}` : '',
        border || '',
        borderColor || '',
        hoverBorderColor ? `hover:${hoverBorderColor}` : '',
        textSize || '',
        fontWeight || '',
        // Focus states
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' ? 'focus:ring-teal-500' : 'focus:ring-teal-400',
        // Disabled state (handled by shadcn Button)
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Custom className
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
}