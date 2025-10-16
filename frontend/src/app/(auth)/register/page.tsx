import Image from 'next/image';
import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <>
      <div className="min-h-screen relative register-background">
        {/* Background image */}
        <Image 
          src="/googledeepmind.jpg" 
          alt="DeepMind AI Background"
          fill
          className="object-cover z-0"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="relative z-20 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 