import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative">
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        <div className="relative z-20 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
  );
} 